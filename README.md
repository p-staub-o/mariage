# Mariage Philippe & Sofia

Site web statique pour le mariage de Philippe et Sofia Viramontes de la Torre.

## Stack

- React + TypeScript
- Vite
- GitHub Pages via GitHub Actions

## Commandes locales

```bash
npm install
npm run dev
npm run check
```

Le site est configure avec `base: "/mariage/"`, ce qui correspond a l'URL GitHub Pages du repo:

```text
https://p-staub-o.github.io/mariage/
```

## Contenu

Le contenu principal est centralise dans `src/content.ts`. Remplacer les valeurs provisoires de date, lieu, horaire et RSVP dans ce fichier.

L'image hero locale est generee par:

```bash
npm run assets:hero
```

## Deploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` publie automatiquement le site lorsque la branche `main` est poussee.

Le repo distant est:

```text
https://github.com/p-staub-o/mariage
```

La configuration Pages attendue est:

- Source: `GitHub Actions`
- URL: `https://p-staub-o.github.io/mariage/`
