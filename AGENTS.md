# AGENTS.md

These instructions apply to the entire repository.

## Project

This repo contains the static wedding website for Philippe and Sofia Viramontes de la Torre.

## Commands

- Install dependencies: `npm install`
- Start local development: `npm run dev`
- Run validation before handoff: `npm run check`
- Build only: `npm run build`
- Regenerate the local hero image: `npm run assets:hero`

## Deployment

- The site is intended for GitHub Pages at `https://p-staub-o.github.io/mariage/`.
- The public Save the Date is a standalone page at `https://p-staub-o.github.io/mariage/save-the-date/`.
- Keep `vite.config.ts` configured with `base: "/mariage/"` unless the repository name changes.
- Deployment uses `.github/workflows/deploy.yml` and GitHub Pages source `GitHub Actions`.

## Content Rules

- Wedding details that are not confirmed yet must stay visibly provisional.
- Keep the public Save the Date standalone and unlinked from the broader wedding site until the user explicitly asks to connect them.
- Do not invent dates, venues, addresses, travel instructions, registry links, RSVP links, or contact details.
- Keep private guest information out of the repository.
- Keep public copy warm, concise, and suitable for family and friends.

## Code Rules

- Prefer small, static React components and plain CSS.
- Keep editable event copy in `src/content.ts`.
- Keep visual assets local when practical.
- Do not add backend, analytics, form services, or tracking without explicit approval.
- Run `npm run check` before claiming the site is ready.
