# GRACE Frontend

A frontend-only static website for GRACE - Gauranga Residential Academy for Culture and Education, built with Create React App, Tailwind CSS, React Router, and GitHub Pages.

## Setup

1. Install Node.js LTS from [nodejs.org](https://nodejs.org/).
2. If you just installed Node, reopen your terminal so `node` and `npm` are available on `PATH`.
3. In this project folder, run:

```powershell
npm install
npm start
```

## Build

```powershell
npm run build
```

## GitHub Pages Hosting

This repo is configured to deploy with GitHub Actions when you push to `main`.

1. Push your latest code to `main`.
2. In GitHub, open `Settings > Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Open the `Actions` tab and wait for the `Deploy GitHub Pages` workflow to finish.

Your site URL will be:

`https://spdinesh37.github.io/BHM_Grace_App/`

## Replace These Placeholders

- Hero video: add your MP4 as `public/videos/grace-hero.mp4`
- Contact form: add your Google Form embed URL to `src/data/contact.json` as `formEmbedUrl`
- Gallery photos: replace the files in `public/gallery` and update `src/data/gallery.json` if filenames change
