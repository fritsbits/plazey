# Plazey

Source code and planning docs for [plazey.be](https://plazey.be) — the website for **Plazey**, the free annual urban festival in Elisabethpark, Koekelberg (Brussels). Plazey has been free and open since 1992 and is organised by GC De Platoo together with GC De Zeyp.

This repository contains:

- **`site/`** — the production website. Astro + Tailwind, deployed on Netlify, with NL/FR routes and Netlify-handled forms.
- **`docs/wiki/`** — the project wiki: strategy, scope, tone of voice, page-by-page skeletons, NL+FR copy, tech stack notes.

Source material that informed the wiki (meeting transcripts, raw references, original photography, per-feature planning docs) is kept private and is not part of this repository.

## Run the site locally

```sh
cd site
npm install
npm run dev          # http://localhost:4321
```

Other commands:

| Command           | Action                              |
| :---------------- | :---------------------------------- |
| `npm run build`   | Build the production site to `dist/`|
| `npm run preview` | Preview the production build        |

## Repository layout

```
plazey/
├── site/              # Astro project (production website)
│   ├── src/
│   ├── public/
│   ├── astro.config.mjs
│   └── netlify.toml
├── docs/
│   └── wiki/          # Strategy, copy, page skeletons
├── LICENSE
└── README.md
```

## Contributing

Plazey is run by volunteers. The site is intentionally small and built to be edited without a CMS — content lives in the Astro source. Pull requests are welcome for accessibility fixes, copy improvements, NL/FR translation issues, and bugfixes.

For larger changes, please open an issue first so we can talk through scope.

## License

Code is released under the [MIT License](./LICENSE). The Plazey name, logo, copywriting, and photography belong to GC De Platoo and the organising team — please ask before reusing them.
