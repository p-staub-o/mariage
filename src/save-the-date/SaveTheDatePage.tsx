import { useLayoutEffect, useRef } from 'react'
import { content } from '../content'

export function SaveTheDatePage() {
  const calendarHref = `${import.meta.env.BASE_URL}${content.saveTheDate.calendarFile}`
  const titleRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const titleElement = titleRef.current
    if (!titleElement) return
    const title = titleElement

    let frameId = 0
    let isActive = true
    const lines = Array.from(title.querySelectorAll<HTMLElement>('.announcementNameLine'))

    function fitNameLines() {
      if (!isActive) return

      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        if (!isActive) return

        title.style.setProperty('--name-fit-scale', '1')
        void title.offsetWidth

        const availableWidth = title.clientWidth - 2
        if (availableWidth <= 0) return

        const scale = lines.reduce((currentScale, line) => {
          if (line.scrollWidth <= availableWidth) return currentScale
          return Math.min(currentScale, availableWidth / line.scrollWidth)
        }, 1)

        title.style.setProperty('--name-fit-scale', `${Math.max(0.42, Math.min(1, scale))}`)
      })
    }

    fitNameLines()
    document.fonts?.ready.then(() => fitNameLines())

    const observer = new ResizeObserver(fitNameLines)
    observer.observe(title.closest('.announcementCard') ?? title)

    window.addEventListener('resize', fitNameLines)
    window.addEventListener('orientationchange', fitNameLines)

    return () => {
      isActive = false
      cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('resize', fitNameLines)
      window.removeEventListener('orientationchange', fitNameLines)
    }
  }, [])

  function openInvitation() {
    document.documentElement.dataset.invitation = 'open'
  }

  return (
    <main className="standaloneSaveDate" aria-label="Save the Date">
      <section className="sealedScene" aria-label="Enveloppe cachetée">
        <div className="tableSurface" aria-hidden="true" />
        <div className="invitationObject">
          <div className="realEnvelope" aria-hidden="true">
            <div className="paperGrain" />
            <div className="backPanel" />
            <div className="insideCard">
              <p>{content.saveTheDate.label}</p>
              <strong>{content.date}</strong>
            </div>
            <div className="topFlap" />
            <div className="sideFold leftFold" />
            <div className="sideFold rightFold" />
            <div className="bottomFold" />
            <div className="deckleEdge" />
          </div>

          <button
            className="realWaxSeal"
            type="button"
            onClick={openInvitation}
            aria-label="Ouvrir le Save the Date"
          >
            <span>S&amp;P</span>
          </button>
        </div>
      </section>

      <section className="announcementScene" aria-labelledby="announcement-title">
        <article className="announcementCard">
          <p className="announcementKicker">{content.saveTheDate.label}</p>
          <h1
            id="announcement-title"
            ref={titleRef}
            aria-label="Sofia Viramontes de la Torre et Philippe St-Aubin"
          >
            {content.saveTheDate.fullNames.map((line) => (
              <span className="announcementNameLine" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="announcementDate">{content.date}</p>
          <p className="announcementCity">{content.city}</p>
          <div className="ornament" aria-hidden="true" />
          <p className="announcementCopy">
            La cérémonie aura lieu à <strong>15 h</strong>
            <br />à la {content.location}.
          </p>
          <p className="announcementNote">Invitation officielle et détails à venir.</p>

          <div className="announcementActions">
            <a href={calendarHref} download>
              {content.saveTheDate.calendarText}
            </a>
            <a href={content.mapUrl} target="_blank" rel="noreferrer">
              {content.saveTheDate.mapText}
            </a>
          </div>
        </article>
      </section>
    </main>
  )
}
