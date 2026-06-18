import { useEffect } from 'react'
import heroImage from './assets/wedding-hero.png'
import { content } from './content'
import './App.css'

function App() {
  const calendarHref = `${import.meta.env.BASE_URL}${content.saveTheDate.calendarFile}`

  useEffect(() => {
    const elementId = window.location.hash.slice(1)
    if (!elementId) return

    window.requestAnimationFrame(() => {
      document.getElementById(elementId)?.scrollIntoView()
    })
  }, [])

  return (
    <main>
      <nav className="topbar" aria-label="Navigation principale">
        <a className="brand" href="#hero" aria-label="Accueil">
          {content.initials}
        </a>
        <div className="navLinks">
          <a href="#save-the-date">Save the Date</a>
          <a className="optionalNavLink" href="#story">
            Notre histoire
          </a>
          <a href="#details">Détails</a>
          <a href="#rsvp">RSVP</a>
        </div>
      </nav>

      <section className="heroSection" id="hero" aria-labelledby="hero-title">
        <img
          className="heroImage"
          src={heroImage}
          alt="Composition florale douce pour un site de mariage"
        />
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="eyebrow">{content.kicker}</p>
          <h1 id="hero-title">{content.coupleName}</h1>
          <p className="heroSubtitle">{content.heroSubtitle}</p>
          <div className="heroMeta" aria-label="Informations principales">
            <span>{content.date}</span>
            <span>{content.time}</span>
            <span>{content.city}</span>
            <span>{content.location}</span>
          </div>
        </div>
      </section>

      <section
        className="saveDateBand"
        id="save-the-date"
        aria-labelledby="save-date-title"
      >
        <div className="saveDateLead">
          <p className="sectionLabel">{content.saveTheDate.label}</p>
          <h2 id="save-date-title">{content.saveTheDate.title}</h2>
          <p>{content.saveTheDate.subtitle}</p>
        </div>

        <div className="saveDateDetails">
          <p>{content.saveTheDate.body}</p>
          <dl className="saveDateFacts" aria-label="Informations du Save the Date">
            {content.saveTheDate.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="saveDateActions">
            <a href={calendarHref} download>
              {content.saveTheDate.calendarText}
            </a>
            <a href={content.mapUrl} target="_blank" rel="noreferrer">
              {content.saveTheDate.mapText}
            </a>
          </div>
          <p className="saveDateNote">{content.saveTheDate.note}</p>
        </div>
      </section>

      <section className="introBand" id="story" aria-labelledby="story-title">
        <div className="sectionLabel">{content.story.label}</div>
        <div>
          <h2 id="story-title">{content.story.title}</h2>
          <p>{content.story.body}</p>
        </div>
      </section>

      <section className="detailsBand" id="details" aria-labelledby="details-title">
        <div className="sectionHeader">
          <p className="sectionLabel">{content.details.label}</p>
          <h2 id="details-title">{content.details.title}</h2>
        </div>

        <div className="detailGrid">
          {content.details.items.map((item) => (
            <article className="detailCard" key={item.title}>
              <p>{item.kicker}</p>
              <h3>{item.title}</h3>
              <span>{item.description}</span>
              {item.linkHref ? (
                <a
                  className="detailCardLink"
                  href={item.linkHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.linkText}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="scheduleBand" aria-labelledby="schedule-title">
        <div className="sectionHeader">
          <p className="sectionLabel">{content.schedule.label}</p>
          <h2 id="schedule-title">{content.schedule.title}</h2>
        </div>

        <ol className="scheduleList">
          {content.schedule.items.map((item) => (
            <li key={item.title}>
              <time>{item.time}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rsvpBand" id="rsvp" aria-labelledby="rsvp-title">
        <div>
          <p className="sectionLabel">{content.rsvp.label}</p>
          <h2 id="rsvp-title">{content.rsvp.title}</h2>
          <p>{content.rsvp.body}</p>
        </div>
        {content.rsvp.email ? (
          <a className="primaryAction" href={`mailto:${content.rsvp.email}`}>
            {content.rsvp.buttonText}
          </a>
        ) : (
          <span className="pendingAction">{content.rsvp.buttonText}</span>
        )}
      </section>

      <footer>
        <span>{content.footer}</span>
      </footer>
    </main>
  )
}

export default App
