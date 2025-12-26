# 🗾 Japan Trip Itinerary App

Interactive travel itinerary for Hokkaido Winter 2026 adventure!

## ✨ Features

- 📅 **Editable Itinerary** - Add, edit, and delete activities
- 🗺️ **Google Maps Integration** - Direct links to all locations
- ❄️ **Beautiful Winter Theme** - Animated snowflakes and gradient backgrounds
- 📱 **Mobile Responsive** - Works great on all devices
- ✏️ **Edit Mode** - Customize your trip on the go

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Deploy to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Push this code to a GitHub repository
2. Go to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### Option 2: Manual Deploy

1. Run `npm run build`
2. Push the `dist` folder to `gh-pages` branch
3. Enable GitHub Pages from `gh-pages` branch

## 🌐 Deploy to Vercel (Easiest)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click **Deploy** - Done!

## 🌐 Deploy to Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your repository
4. Build command: `npm run build`
5. Publish directory: `dist`

## 📁 Project Structure

```
japan-trip-app/
├── index.html          # Entry HTML
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS config
├── postcss.config.js   # PostCSS config
└── src/
    ├── main.jsx        # React entry point
    ├── App.jsx         # Main app component
    └── index.css       # Styles
```

## 🎯 Trip Highlights

- 🦀 **Two Seafood Markets** - Nijo (Sapporo) + Triangle (Otaru)
- ⛷️ **Two Ski Resorts** - Kokusai + Teine (1972 Olympics venue!)
- ♨️ **Jozankei Onsen** - Traditional hot springs
- 🚡 **Tenguyama Ropeway** - Sunset & night views
- 🏔️ **Lake Shikotsu** - Volcanic lake beauty

## 📅 Trip Dates

**January 23-31, 2026** | Family of 4

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React Icons

---

Have an amazing trip! ⛄🗾🦀⛷️♨️
