-- Run once in Supabase > SQL Editor before deploying this version.
alter table public.songs add column if not exists county text;
alter table public.songs drop constraint if exists songs_county_length_check;
alter table public.songs add constraint songs_county_length_check
  check (county is null or char_length(trim(county)) between 1 and 80);
