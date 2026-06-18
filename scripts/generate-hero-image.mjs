import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { deflateSync } from 'node:zlib'

const width = 1800
const height = 1200
const output = resolve('src/assets/wedding-hero.png')
const pixels = new Uint8Array(width * height * 4)

const crcTable = new Uint32Array(256)
for (let n = 0; n < 256; n += 1) {
  let c = n
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  }
  crcTable[n] = c >>> 0
}

function crc32(bytes) {
  let c = 0xffffffff
  for (const byte of bytes) {
    c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type)
  const length = Buffer.alloc(4)
  const crc = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])))
  return Buffer.concat([length, typeBytes, data, crc])
}

function mix(a, b, t) {
  return Math.round(a + (b - a) * t)
}

function setPixel(x, y, color, alpha = 1) {
  if (x < 0 || x >= width || y < 0 || y >= height) return
  const i = (y * width + x) * 4
  const inv = 1 - alpha
  pixels[i] = mix(pixels[i], color[0], alpha)
  pixels[i + 1] = mix(pixels[i + 1], color[1], alpha)
  pixels[i + 2] = mix(pixels[i + 2], color[2], alpha)
  pixels[i + 3] = Math.round(255 * alpha + pixels[i + 3] * inv)
}

function ellipse(cx, cy, rx, ry, rotation, color, alpha = 1) {
  const cos = Math.cos(rotation)
  const sin = Math.sin(rotation)
  const minX = Math.floor(cx - rx - ry)
  const maxX = Math.ceil(cx + rx + ry)
  const minY = Math.floor(cy - rx - ry)
  const maxY = Math.ceil(cy + rx + ry)

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const dx = x - cx
      const dy = y - cy
      const px = dx * cos + dy * sin
      const py = -dx * sin + dy * cos
      const d = (px * px) / (rx * rx) + (py * py) / (ry * ry)
      if (d <= 1) {
        const soft = Math.min(1, (1 - d) * 2.5)
        setPixel(x, y, color, alpha * soft)
      }
    }
  }
}

function line(x1, y1, x2, y2, radius, color, alpha = 1) {
  const steps = Math.ceil(Math.hypot(x2 - x1, y2 - y1) / Math.max(1, radius))
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    ellipse(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, radius, radius, 0, color, alpha)
  }
}

function noise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return n - Math.floor(n)
}

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const nx = x / width
    const ny = y / height
    const vignette = Math.hypot(nx - 0.58, ny - 0.46)
    const n = noise(x, y) * 10
    const sky = [219, 235, 229]
    const paper = [255, 250, 240]
    const blush = [238, 205, 199]
    const base = [
      mix(mix(paper[0], sky[0], ny * 0.48), blush[0], Math.max(0, 0.42 - vignette) * 0.18),
      mix(mix(paper[1], sky[1], ny * 0.48), blush[1], Math.max(0, 0.42 - vignette) * 0.18),
      mix(mix(paper[2], sky[2], ny * 0.48), blush[2], Math.max(0, 0.42 - vignette) * 0.18),
    ]
    const i = (y * width + x) * 4
    pixels[i] = Math.max(0, Math.min(255, base[0] + n - 5))
    pixels[i + 1] = Math.max(0, Math.min(255, base[1] + n - 5))
    pixels[i + 2] = Math.max(0, Math.min(255, base[2] + n - 5))
    pixels[i + 3] = 255
  }
}

const green = [32, 74, 68]
const sage = [91, 128, 111]
const gold = [208, 170, 93]
const rose = [184, 94, 103]
const ivory = [255, 252, 245]

line(80, 220, 680, 92, 7, green, 0.75)
line(1720, 164, 1060, 72, 7, green, 0.72)
line(118, 1040, 558, 786, 5, green, 0.56)
line(1640, 1020, 1160, 816, 5, green, 0.5)

for (let i = 0; i < 28; i += 1) {
  const leftX = 130 + i * 21
  ellipse(leftX, 174 - i * 2.8, 46, 15, -0.58, sage, 0.68)
  ellipse(leftX + 28, 156 - i * 3.1, 40, 13, 0.8, green, 0.42)

  const rightX = 1660 - i * 22
  ellipse(rightX, 142 - i * 1.7, 45, 15, 0.56, sage, 0.64)
  ellipse(rightX - 30, 126 - i * 1.9, 38, 13, -0.78, green, 0.4)
}

for (const flower of [
  [420, 118, 42],
  [520, 92, 30],
  [1355, 96, 38],
  [1458, 130, 32],
  [250, 888, 34],
  [1390, 900, 36],
]) {
  const [cx, cy, size] = flower
  ellipse(cx, cy, size, size * 0.8, 0, rose, 0.72)
  ellipse(cx - size * 0.28, cy + size * 0.12, size * 0.7, size * 0.5, 0.7, ivory, 0.52)
  ellipse(cx + size * 0.12, cy - size * 0.18, size * 0.55, size * 0.45, -0.5, [229, 175, 166], 0.68)
  ellipse(cx, cy, size * 0.22, size * 0.22, 0, gold, 0.88)
}

ellipse(900, 1112, 520, 110, 0, [210, 184, 126], 0.16)
ellipse(902, 536, 390, 520, 0, ivory, 0.16)

const raw = Buffer.alloc((width * 4 + 1) * height)
for (let y = 0; y < height; y += 1) {
  const rowStart = y * (width * 4 + 1)
  raw[rowStart] = 0
  for (let x = 0; x < width * 4; x += 1) {
    raw[rowStart + 1 + x] = pixels[y * width * 4 + x]
  }
}

const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(width, 0)
ihdr.writeUInt32BE(height, 4)
ihdr[8] = 8
ihdr[9] = 6
ihdr[10] = 0
ihdr[11] = 0
ihdr[12] = 0

mkdirSync(dirname(output), { recursive: true })
writeFileSync(
  output,
  Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]),
)

console.log(`Generated ${output}`)
