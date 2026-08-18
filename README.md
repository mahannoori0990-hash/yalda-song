# Yalda of Iran — Multilingual prototype

Open `index.html` in a modern browser.

Features:
- Interactive SVG map of Iran provinces
- Caspian Sea and Persian Gulf shapes and islands on the map
- A distinct, full-view Iranian carpet artwork for each of all 31 provinces
- GitHub-friendly carpet bundle: all 31 designs are packed into the single `carpets.js` file
- Persian, English and German language switcher
- RTL layout for Persian and LTR layout for English/German
- Province selection, song submission, filtering and likes
- Live countdown to the Yalda event on 18 December 2026 at 22:00 (Berlin time)
- Searchable and province-filterable Top 100 ranking based on community likes
- Trilingual Yalda history and traditions section
- Animated pomegranate, watermelon, candlelight, stars and scroll reveals
- Realistic transparent pomegranate and watermelon artwork
- Subtle red Persian boteh-jegheh background pattern
- Event details, map link and FAQ
- Fully visible two-row navigation on mobile screens
- Language preference saved in localStorage
- Songs, likes and Top 100 ranking synchronized with Supabase

## Supabase setup

1. Run `setup-auth.sql` once in Supabase SQL Editor.
2. Public song submission and per-browser likes work without registration or an Auth session.
3. Each browser receives a random local visitor ID so one click adds a like and a second click removes it.
4. There is no per-minute song submission limit.
5. Never place a `service_role` key in this frontend project.

The vector map is loaded from the public GitHub source used in earlier versions, so an internet connection is required for the map. The province dropdown remains available if loading fails. All province carpets are stored as optimized embedded images in the single local `carpets.js` file and are fitted inside each province without cropping. Upload `carpets.js` alongside `app.js`; no `carpets` folder is required.
