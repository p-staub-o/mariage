import { content } from '../content'

export function SaveTheDatePage() {
  const calendarHref = `${import.meta.env.BASE_URL}${content.saveTheDate.calendarFile}`

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
          <h1 id="announcement-title" aria-label="Sofia Viramontes de la Torre et Philippe St-Aubin">
            {content.saveTheDate.fullNames.map((line) => (
              <span key={line}>{line}</span>
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
