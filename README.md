# Yalda of Iran — Supabase Auth edition

Upload `index.html`, `styles.css` and `app.js` to GitHub. Then run `setup-auth.sql` once in Supabase SQL Editor.

Features:
- Interactive SVG map of Iran provinces
- Supabase Google and Apple OAuth login
- Email confirmation support
- Only authenticated users can submit songs or like
- One like per user and song
- Database Row Level Security policies
- Province selection, song submission and filtering

Add your Netlify address under Authentication > URL Configuration > Site URL and Redirect URLs. Enable Google and/or Apple under Authentication > Providers and enter the provider credentials. Email confirmation and Supabase email delivery are not used by this version. The vector map is loaded from a public GitHub source; the province dropdown remains available if it fails.
