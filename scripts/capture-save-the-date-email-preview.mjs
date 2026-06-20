import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, resolve } from 'node:path'

const host = '127.0.0.1'
const port = Number(process.env.SAVE_DATE_CAPTURE_PORT ?? 5173)
const width = Number(process.env.SAVE_DATE_CAPTURE_WIDTH ?? 800)
const height = Number(process.env.SAVE_DATE_CAPTURE_HEIGHT ?? 1100)
const scale = Number(process.env.SAVE_DATE_CAPTURE_SCALE ?? 2)
const output = resolve(process.env.SAVE_DATE_CAPTURE_OUTPUT ?? 'public/save-the-date-email-preview.png')
const url =
  process.env.SAVE_DATE_CAPTURE_URL ??
  `http://${host}:${port}/mariage/save-the-date/?open=1&preview=email`

function delay(ms) {
  return new Promise((resolveDelay) => {
    setTimeout(resolveDelay, ms)
  })
}

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  ].filter(Boolean)

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('Chrome was not found. Set CHROME_PATH to a Chromium-based browser binary.')
  }

  return found
}

async function isReachable(targetUrl) {
  try {
    const response = await fetch(targetUrl, { cache: 'no-store' })
    return response.ok
  } catch {
    return false
  }
}

async function waitForServer(targetUrl, timeoutMs = 12000) {
  const startedAt = Date.now()
  while (Date.now() - startedAt < timeoutMs) {
    if (await isReachable(targetUrl)) return
    await delay(250)
  }

  throw new Error(`Timed out waiting for ${targetUrl}`)
}

async function waitForOutputFile(filePath, timeoutMs = 30000) {
  const startedAt = Date.now()
  while (Date.now() - startedAt < timeoutMs) {
    if (existsSync(filePath) && statSync(filePath).size > 0) return
    await delay(250)
  }

  throw new Error(`Timed out waiting for ${filePath}`)
}

async function stopProcess(childProcess, closed) {
  if (childProcess.exitCode !== null || childProcess.signalCode !== null) return

  childProcess.kill('SIGTERM')

  const closedAfterTerm = await Promise.race([
    closed.then(() => true),
    delay(2000).then(() => false),
  ])

  if (!closedAfterTerm && childProcess.exitCode === null && childProcess.signalCode === null) {
    childProcess.kill('SIGKILL')
  }
}

let viteProcess

if (!(await isReachable(url))) {
  viteProcess = spawn(
    process.execPath,
    ['node_modules/vite/bin/vite.js', '--host', host, '--port', String(port), '--strictPort'],
    {
      cwd: process.cwd(),
      stdio: 'ignore',
      env: { ...process.env, BROWSER: 'none' },
    },
  )

  await waitForServer(url)
}

mkdirSync(dirname(output), { recursive: true })
rmSync(output, { force: true })

const userDataDir = mkdtempSync(resolve(tmpdir(), 'mariage-save-date-chrome-'))
const chromeProcess = spawn(
  chromePath(),
  [
    '--headless=new',
    '--disable-gpu',
    '--disable-background-networking',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    `--window-size=${width},${height}`,
    `--force-device-scale-factor=${scale}`,
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=2000',
    `--screenshot=${output}`,
    url,
  ],
  { stdio: 'ignore' },
)

const chromeClosed = new Promise((resolveClose) => {
  chromeProcess.once('close', (code, signal) => {
    resolveClose({ code, signal })
  })
})

try {
  await Promise.race([
    waitForOutputFile(output),
    chromeClosed.then(({ code, signal }) => {
      if (!existsSync(output) || statSync(output).size === 0) {
        throw new Error(`Chrome exited before capture completed: code=${code} signal=${signal}`)
      }
    }),
  ])

  await delay(1000)
  await stopProcess(chromeProcess, chromeClosed)
} finally {
  rmSync(userDataDir, { recursive: true, force: true })

  if (viteProcess) {
    viteProcess.kill('SIGTERM')
  }
}

const stats = statSync(output)
console.log(`Generated ${output}`)
console.log(`Viewport ${width}x${height} at ${scale}x; file size ${(stats.size / 1024).toFixed(1)} KB`)
