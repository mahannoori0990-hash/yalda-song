# Yalda of Iran — Supabase version

This version stores songs and likes in Supabase so all visitors see the same data.

## One-time Supabase setup

1. Open the project in Supabase.
2. Go to **SQL Editor**, paste all of `setup.sql`, and click **Run**.
3. Open `index.html` locally or deploy these files to GitHub/Netlify.

The Project URL and publishable key are already configured in `app.js`. The
publishable key is safe for browser use because access is restricted by RLS.
Never place a `service_role` key in this project.

## Files to deploy

- `index.html`
- `styles.css`
- `app.js`

The map is loaded from a public GitHub SVG source, so the visitor needs an
internet connection. The province dropdown still works if the map cannot load.
