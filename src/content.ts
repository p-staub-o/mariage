export const content = {
  initials: 'P+S',
  kicker: 'Nous allons nous marier',
  coupleName: 'Philippe & Sofia',
  heroSubtitle:
    'Avec Sofia Viramontes de la Torre, nous préparons une célébration simple, chaleureuse et entourée des personnes qui comptent pour nous.',
  date: '19 juin 2027',
  time: 'Cérémonie à 15 h',
  location: 'Basilique Marie-Reine-du-Monde',
  mapUrl: 'https://maps.app.goo.gl/siPaPTSHrXeAVTsXA',
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
        linkText: 'Ouvrir la carte',
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
  footer: 'Philippe St-Aubin & Sofia Viramontes de la Torre',
} as const
