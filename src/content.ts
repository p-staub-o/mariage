export const content = {
  initials: 'S+P',
  kicker: 'Nous allons nous marier',
  coupleName: 'Sofia & Philippe',
  heroSubtitle:
    'Sofia et Philippe préparent une célébration simple, chaleureuse et entourée des personnes qui comptent pour eux.',
  date: '19 juin 2027',
  time: 'Cérémonie à 15 h',
  city: 'Montréal, Québec',
  location: 'Basilique Marie-Reine-du-Monde',
  mapUrl: 'https://maps.app.goo.gl/siPaPTSHrXeAVTsXA',
  saveTheDate: {
    label: 'Save the Date',
    title: '19 juin 2027',
    subtitle: 'Sofia & Philippe',
    fullNames: ['Sofia Viramontes de la Torre', '& Philippe St-Aubin'],
    body:
      'Nous serions heureux de vous compter parmi nous. La cérémonie aura lieu à 15 h à la Basilique Marie-Reine-du-Monde.',
    note: "Invitation officielle et détails de la réception à venir.",
    calendarFile: 'sofia-philippe-save-the-date.ics',
    calendarText: 'Ajouter au calendrier',
    mapText: 'Adresse',
    facts: [
      {
        label: 'Ville',
        value: 'Montréal, Québec',
      },
      {
        label: 'Cérémonie',
        value: '15 h',
      },
      {
        label: 'Lieu',
        value: 'Basilique Marie-Reine-du-Monde',
      },
    ],
  },
  story: {
    label: 'Notre histoire',
    title: 'Une journée pensée pour rassembler nos familles et nos amis.',
    body:
      'Ce site regroupera les informations pratiques du mariage: cérémonie, réception, hébergement, transport et RSVP. Certains détails restent provisoires et seront ajoutés au fil des confirmations.',
  },
  details: {
    label: 'Détails',
    title: 'La cérémonie aura lieu au coeur de Montréal.',
    items: [
      {
        kicker: 'Cérémonie',
        title: 'Basilique Marie-Reine-du-Monde',
        description: 'La cérémonie commencera à 15 h le 19 juin 2027.',
        linkHref: 'https://maps.app.goo.gl/siPaPTSHrXeAVTsXA',
        linkText: 'Adresse',
      },
      {
        kicker: 'Réception',
        title: 'Célébration',
        description:
          'Un espace pour partager le programme, le repas, la musique et les moments forts de la soirée.',
        linkHref: '',
        linkText: '',
      },
      {
        kicker: 'Voyage',
        title: 'Transport et séjour',
        description:
          "Les recommandations d'hôtel, stationnement et déplacement seront publiées avant l'envoi officiel.",
        linkHref: '',
        linkText: '',
      },
    ],
  },
  schedule: {
    label: 'Programme',
    title: 'Une structure claire pour la journée.',
    items: [
      {
        time: 'À venir',
        title: 'Accueil des invités',
        description: 'Arrivée, installation et premiers moments ensemble.',
      },
      {
        time: '15 h',
        title: 'Cérémonie',
        description: 'Basilique Marie-Reine-du-Monde.',
      },
      {
        time: 'À venir',
        title: 'Réception',
        description: 'Repas, discours, danse et célébration.',
      },
    ],
  },
  rsvp: {
    label: 'RSVP',
    title: 'La confirmation de presence sera ouverte plus tard.',
    body:
      'Lorsque la liste des invités et les détails seront finalisés, cette section pointera vers le bon formulaire ou courriel de réponse.',
    email: '',
    buttonText: 'RSVP à venir',
  },
  footer: 'Sofia Viramontes de la Torre & Philippe St-Aubin',
} as const
