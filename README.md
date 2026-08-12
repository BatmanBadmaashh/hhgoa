# HH Goa 2026 — Frame / Builder ID Generator

Full-stack Next.js implementation for the HH Goa 2026 shortlisting task.

## Intended experience

Upload a normal photo → the app automatically places it into a fixed HH Goa 2026 editorial template → download the finished image or create a shareable URL for X.

The user's photo is **not given a cyberpunk filter**. The HH Goa identity lives in the repeatable template: typography, acid-green/orange accents, graphic registration marks, editorial blocks, and Goa/event copy. Every participant gets the same recognizable visual system.

## Features

- Builder ID and PFP Frame
- JPG / PNG / WEBP / HEIC / HEIF
- Automatic crop for any aspect ratio
- Name, stack/role, handle, generated builder class
- Real PNG output
- Server-side share image storage through Vercel Blob
- Dynamic share page with OG image metadata
- Mobile Web Share + X fallback
- No login

## Deploy to Vercel

1. Import this repository.
2. Create a Vercel Blob store under Storage.
3. Connect the Blob store to the project so `BLOB_READ_WRITE_TOKEN` is available.
4. Add `NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN.vercel.app`.
5. Deploy.

The app is intentionally a full-stack Next.js app, not a static HTML-only site.
