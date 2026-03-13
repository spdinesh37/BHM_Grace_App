# GRACE Frontend

Frontend-only static website for **GRACE - Gauranga Residential Academy for Culture and Education**.

This project is designed for GitHub Pages, so there is **no backend**. Content is rendered with React and mostly managed through JSON files so non-structural updates are easy for another developer to make.

## Project Goals

- Present GRACE as a calm, spiritual, modern, and welcoming academy site
- Keep the architecture simple enough for static hosting on GitHub Pages
- Make regular content updates easy through JSON files and local assets
- Support mobile screens well

## Tech Stack

- React (Create React App structure)
- React Router
- Tailwind CSS
- JSON-driven content
- GitHub Pages hosting via GitHub Actions

## Important Architecture Decisions

### 1. Static hosting only
This site is intended for GitHub Pages. That means:

- no backend
- no database
- no server-side rendering
- no API required for the site to function

### 2. Routing uses HashRouter
The app uses `HashRouter` in `src/index.js` instead of `BrowserRouter`.

Reason:
GitHub Pages does not handle SPA route rewrites well, so `HashRouter` avoids refresh/404 issues on nested routes.

### 3. Content lives in JSON
Editable site content is kept in `src/data/`.

This allows another developer to update text, events, menus, gallery items, and contact info without changing layout components.

### 4. Media is local
The hero video and gallery images are local static files.

Reason:
The site was requested as a frontend-only static app, and GitHub Pages can serve these files directly.

## Local Development

### Prerequisites

- Node.js
- npm
- Git

### Install

```powershell
npm install
```

### Start the development server

```powershell
npm start
```

### Build production files

```powershell
npm run build
```

## Deployment

Deployment is handled by **GitHub Actions**, not by local `gh-pages` publishing anymore.

Workflow file:

- `.github/workflows/deploy-pages.yml`

### How deployment works

1. Push changes to the `main` branch
2. GitHub Actions builds the site
3. GitHub Pages publishes the generated `build/` output

### GitHub Pages repo setting
In GitHub repo settings:

- `Settings > Pages`
- `Source = GitHub Actions`

### Live URL

- `https://spdinesh37.github.io/BHM_Grace_App/`

## Project Structure

```text
Grace_App/
|-- .github/
|   `-- workflows/
|       `-- deploy-pages.yml
|-- public/
|   |-- gallery/
|   |-- videos/
|   |-- favicon.ico
|   |-- hero-fallback.svg
|   `-- index.html
|-- src/
|   |-- assets/
|   |   |-- grace-logo.png
|   |   `-- grace-mark.svg
|   |-- components/
|   |   |-- EventCard.js
|   |   |-- EventsList.js
|   |   |-- Footer.js
|   |   |-- GalleryGrid.js
|   |   |-- HeroVideo.js
|   |   |-- Navbar.js
|   |   |-- PageHero.js
|   |   |-- ScrollToTop.js
|   |   |-- SectionHeader.js
|   |   `-- WeeklyUpdate.js
|   |-- data/
|   |   |-- contact.json
|   |   |-- curriculum.json
|   |   |-- events.json
|   |   |-- gallery.json
|   |   |-- leadership.json
|   |   `-- weeklyUpdate.json
|   |-- pages/
|   |   |-- About.js
|   |   |-- Contact.js
|   |   |-- Curriculum.js
|   |   |-- Events.js
|   |   |-- Gallery.js
|   |   |-- Home.js
|   |   |-- Leadership.js
|   |   `-- StudentLife.js
|   |-- App.js
|   |-- index.css
|   `-- index.js
|-- package.json
|-- package-lock.json
|-- postcss.config.js
|-- tailwind.config.js
`-- README.md
```

## Page Overview

### Home
Main landing page with:

- full-screen hero video
- weekly update section
- upcoming events section
- short academy overview and leadership CTA

### About
Explains the GRACE vision, mission, and values.

### Curriculum
Displays semester-based study structure.

### Student Life
Explains the daily rhythm and community experience.

### Leadership
Shows mentorship/community leadership content.

### Events
Expanded upcoming events listing.

### Gallery
Responsive grid of local images.

### Contact
Displays contact info and embeds the Google Form in an iframe.

## Where To Edit Content

### Weekly update
File:

- `src/data/weeklyUpdate.json`

This file is intentionally kept as a **single simple object** so one person can update it each week without touching React code.

Fields:

- `week`
- `announcement`
- `menuTitle`
- `mainItems`
- `soups`
- `desserts`
- `drinks`

Recommended editing rule:

- only update the text and list items inside this file
- do not rename the keys unless you also update the React component

### Events
File:

- `src/data/events.json`

Used for:

- date
- title
- time
- description

### Curriculum
File:

- `src/data/curriculum.json`

### Leadership
File:

- `src/data/leadership.json`

### Gallery captions and image references
File:

- `src/data/gallery.json`

### Contact information and Google Form
File:

- `src/data/contact.json`

This file controls:

- phone
- email
- website
- location
- Google Form embed URL

### Weekly update editing workflow

This is the simplest weekly content workflow for a future developer or content editor:

1. Open `src/data/weeklyUpdate.json`
2. Update the `week` label
3. Update the `announcement` text
4. Update the menu arrays: `mainItems`, `soups`, `desserts`, `drinks`
5. Save the file
6. Run `npm start` locally if a preview is needed
7. Commit and push to `main`
8. GitHub Actions redeploys the site automatically

Example structure:

```json
{
  "week": "March 16 - March 22, 2026",
  "announcement": "Weekly message here",
  "menuTitle": "Sunday Feast Menu",
  "mainItems": ["Item 1", "Item 2"],
  "soups": ["Soup 1"],
  "desserts": ["Dessert 1"],
  "drinks": ["Drink 1"]
}
```

## Media And Branding

### Logo
Current logo file:

- `src/assets/grace-logo.png`

Used in:

- navbar
- footer

### Favicon and app icons
Files:

- `public/favicon.ico`
- `public/apple-touch-icon.png`
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`

### Hero video
Expected file:

- `public/videos/grace-hero.mp4`

Current note:
The hero video is large. It works, but for better mobile performance it should eventually be compressed to a smaller web-optimized MP4.

### Gallery images
Stored in:

- `public/gallery/`

The captions and file references are mapped in:

- `src/data/gallery.json`

## Key Components

### `HeroVideo`
Responsible for:

- full-screen background video
- fallback poster image
- dark overlay for text readability
- softened/dulled video treatment
- mobile hero text layout

### `Navbar`
Responsible for:

- desktop navigation
- mobile menu toggle
- branding/logo display

### `Footer`
Responsible for:

- contact details
- quick links
- branding block

### `WeeklyUpdate`
Responsible for rendering the weekly menu card layout.

### `EventsList` and `EventCard`
Responsible for event section layout and individual event cards.

### `GalleryGrid`
Responsible for responsive gallery rendering with lazy-loaded images.

## Styling Notes

Global styles and reusable Tailwind utility classes are in:

- `src/index.css`

Theme tokens are extended in:

- `tailwind.config.js`

Visual direction:

- saffron and gold accents
- white and earth-tone surfaces
- devotional/calm presentation
- rounded cards and soft shadows

## Mobile Responsiveness Notes

The main phone-specific adjustments were made in:

- `src/components/HeroVideo.js`
- `src/components/Navbar.js`
- `src/components/Footer.js`
- `src/components/SectionHeader.js`
- `src/components/PageHero.js`
- `src/pages/Contact.js`

If future mobile issues appear, check these files first.

## Known Constraints

- GitHub Pages is static only
- The hero video is currently heavier than ideal for mobile networks
- Google Form embed behavior depends on Google allowing iframe embedding
- This codebase uses CRA even though newer tooling exists, because that was a project requirement

## Recommended Handover Checklist For Another Developer

When handing this project over, make sure the next developer knows:

1. Pages deployment is through GitHub Actions
2. Routing uses `HashRouter`
3. Editable content is in `src/data/`
4. The hero video file lives in `public/videos/`
5. The Google Form URL is controlled by `src/data/contact.json`
6. Mobile responsiveness has already been tuned, but should still be checked after major layout changes
7. Large media files should be optimized before adding more content

## Suggested Next Improvements

- Compress the hero video for faster first paint on mobile
- Add real gallery photos to replace placeholders
- Add more structured academy/application content if GRACE grows
- Replace placeholder or sample text with final approved institutional copy

