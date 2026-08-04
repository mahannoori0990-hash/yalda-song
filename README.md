# Yalda of Iran — Supabase Auth edition

Upload `index.html`, `styles.css` and `app.js` to GitHub. Then run `setup-auth.sql` once in Supabase SQL Editor.

Features:
- Interactive SVG map of Iran provinces
- Supabase email/password registration and login
- Email confirmation support
- Only authenticated users can submit songs or like
- One like per user and song
- Database Row Level Security policies
- Province selection, song submission and filtering

In Supabase Authentication settings, keep email confirmation enabled. Add your Netlify address under Authentication > URL Configuration > Site URL. The vector map is loaded from a public GitHub source; the province dropdown remains available if it fails.
