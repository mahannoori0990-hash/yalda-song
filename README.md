# Yalda of Iran — Multilingual prototype

Open `index.html` in a modern browser.

Features:
- Interactive SVG map of Iran provinces
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
2. Anonymous Sign-Ins are optional for song submission. Enable them only if you want per-visitor likes.
3. Public song submission works without registration or an Auth session.
4. There is no per-minute song submission limit.
5. Never place a `service_role` key in this frontend project.

The vector map is loaded from the public GitHub source used in earlier versions, so an internet connection is required for the map. The province dropdown remains available if loading fails.
