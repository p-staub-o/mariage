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

Dans les settings GitHub du repo, configurer Pages avec:

- Source: `GitHub Actions`
- Branch: `main`

## Creation du repo distant

Le repo local est prevu pour `p-staub-o/mariage`. Si `gh` est connecte au compte `p-staub-o`, la creation distante peut se faire avec:

```bash
gh repo create p-staub-o/mariage --public --source=. --remote=origin --push
```
