# GRACE Frontend

A frontend-only static website for GRACE - Gauranga Residential Academy for Culture and Education, built with Create React App, Tailwind CSS, React Router, and GitHub Pages.

## Folder Structure

```text
Grace_App/
|-- package.json
|-- package-lock.json
|-- postcss.config.js
|-- tailwind.config.js
|-- public/
|   |-- android-chrome-192x192.png
|   |-- android-chrome-512x512.png
|   |-- apple-touch-icon.png
|   |-- favicon.ico
|   |-- favicon.svg
|   |-- hero-fallback.svg
|   |-- index.html
|   |-- gallery/
|   `-- videos/
`-- src/
    |-- App.js
    |-- index.css
    |-- index.js
    |-- assets/
    |   `-- grace-logo.png
    |-- components/
    |-- data/
    `-- pages/
```

## Setup

1. Install Node.js LTS from [nodejs.org](https://nodejs.org/).
2. If you just installed Node, reopen your terminal so `node` and `npm` are available on `PATH`.
3. In this project folder, run:

```powershell
npm install
npm start
```

## Build And Deploy

Use these commands from the project root:

```powershell
npm run build
npm run deploy
```

This project uses `HashRouter`, which avoids refresh issues on GitHub Pages for nested routes.

## GitHub Pages Deployment

1. Push this project to a GitHub repository.
2. Run `npm run deploy`.
3. In GitHub, confirm Pages is serving from the `gh-pages` branch if needed.

## Replace These Placeholders

- Hero video: add your MP4 as `public/videos/grace-hero.mp4`
- Contact form: add your Google Form embed URL to `src/data/contact.json` as `formEmbedUrl`
- Gallery photos: replace the files in `public/gallery` and update `src/data/gallery.json` if filenames change

## Content Files

The homepage and supporting pages are designed so you can update content without touching layout code:

- `src/data/weeklyUpdate.json`
- `src/data/events.json`
- `src/data/curriculum.json`
- `src/data/leadership.json`
- `src/data/gallery.json`
- `src/data/contact.json`
