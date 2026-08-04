# Yalda of Iran — Supabase Auth edition

Upload `index.html`, `styles.css` and `app.js` to GitHub. Then run `setup-auth.sql` once in Supabase SQL Editor.

Features:
- Interactive SVG map of Iran provinces
- Supabase email/password registration and login
- Immediate sign-in without email confirmation
- Only authenticated users can submit songs or like
- One like per user and song
- Database Row Level Security policies
- Province selection, song submission and filtering

In Supabase, open Authentication > Sign In / Providers > Email and turn off **Confirm email**. Keep the Email provider enabled. No Google or Apple setup is needed. The vector map is loaded from a public GitHub source; the province dropdown remains available if it fails.
