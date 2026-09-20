# Yalda of Iran — Multilingual prototype

Open `index.html` in a modern browser.

Features:
- Interactive SVG map of Iran provinces
- Click-to-open county lists for all 31 provinces, with Persian names, live search and responsive controls
- Province zoom with visible county boundary polygons; every county area supports hover, keyboard focus and click selection
- Caspian Sea and Persian Gulf shapes and islands on the map
- Interactive Iranian islands with trilingual names, larger click targets and province selection, including Ashuradeh in the Caspian Sea
- Province panels include their islands as selectable subregions, and a selected island prefills the optional location field when adding a song
- The introductory 31 provinces / 3 languages / Top 100 metric strip has been removed
- County selection uses a topmost double-stroke outline so the complete shared border remains visible without browser focus rectangles
- A distinct, full-view Iranian carpet artwork for each of all 31 provinces
- GitHub-friendly carpet bundle: all 31 designs are packed into the single `carpets.js` file
- Persian, English and German language switcher
- RTL layout for Persian and LTR layout for English/German
- Province selection, song submission, filtering and likes
- Optional county selection when submitting a song; the county is saved and displayed after the province
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
- Professional responsive 3D presentation layer with subtle pointer parallax and reduced-motion support
- A self-contained, real-time WebGL pomegranate made from more than 3,000 animated points
- Pointer-responsive 3D camera movement, cinematic light, glass surfaces and a mobile composition
- Scroll-responsive WebGL camera, page progress rail, magnetic CTA, interactive cursor light and section choreography
- Live music equalizer, editorial section numbering and a cinematic culture marquee
- Repeating paisley backgrounds removed for a cleaner premium presentation

The immersive styling is isolated in `premium-3d.css`. `yalda-3d.js` renders the hero artwork without an external 3D library, and `yalda-experience.js` handles lightweight page choreography. The original Supabase, map, submission, voting and multilingual application logic remains in `app.js`.

Upload `yalda-3d.js` and `yalda-experience.js` beside `index.html` when deploying. The background track keeps its original Persian filename, so upload the MP3 without renaming it.

## Supabase setup

1. Run `setup-auth.sql` once in Supabase SQL Editor. For an existing installation, running only `add-county-column.sql` is enough for this update.
2. Public song submission and per-browser likes work without registration or an Auth session.
3. Each browser receives a random local visitor ID so one click adds a like and a second click removes it.
4. There is no per-minute song submission limit.
5. Never place a `service_role` key in this frontend project.

The vector map is loaded from the public GitHub source used in earlier versions, so an internet connection is required for the map. The province dropdown remains available if loading fails. All province carpets are stored as optimized embedded images in the single local `carpets.js` file and are fitted inside each province without cropping. Upload `carpets.js` alongside `app.js`; no `carpets` folder is required.

County names are stored locally in `counties-data.js`, so the list and search continue to work even when the online vector map is unavailable. The dataset follows the county list grouped by province on Wikipedia at the time of this update and can be refreshed independently without changing the map interaction code.

County boundary polygons are stored locally in `county-map-data.js`, derived from the open geoBoundaries ADM2 dataset (OpenStreetMap/Wambacher, ODbL 1.0). Because the public geometry snapshot represents 2017 administrative boundaries, newer county creations can appear in the searchable list before their boundary polygon is available in that source.
