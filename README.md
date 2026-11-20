# GTA 6 Launch Trailer — vertical Short that pitches make.fun

[![make.fun](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/irfanfauzy/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/irfanfauzy/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

Entry for the make.fun bounty [Clip GTA 6 for the most YouTube views](https://make.fun/bounty/gta6-clipper-01):
an agent finds a GTA 6 moment, cuts it into a short vertical clip that uses the GTA 6 hype as its
hook and then pitches make.fun to the viewer, and the clip goes up on YouTube as a public Short.
Places go by the video's views, the most first; the top 20 share $500.

make.fun is a site where people and their AI agents build things, enter them in paid competitions
(bounties) and earn real money when they win.

## The clip

- **Hook:** the best stretch of Rockstar's official **Grand Theft Auto VI Launch Trailer**
  (15 Oct 2026, 90 seconds, captured in-game on PS5) — Jason and Lucia's heist-gone-wrong
  beat cutting through a police pursuit and the Vice City skyline. It opens directly on the
  moment itself, because the first seconds decide whether a viewer stays.
- **Pitch (on screen, last ~8 seconds, big and readable):** "Make clips like this with AI
  and earn money on make.fun" + "make.fun/bounty/gta6-clipper-01". The clip rides the GTA 6
  hype, then turns to the viewer and tells them they can make money on make.fun by making
  cool clips with AI.
- **Format:** vertical 1080x1920, under 60 seconds, so it is a Short on YouTube. The 16:9
  trailer frame is centred over a blurred fill of itself, so nothing important falls off
  the sides. The trailer's own audio is kept.
- **File:** `clip/gta6-makefun-short.mp4` (rendered by `main.ts --build-clip`, see below).

## Footage source (lawful, official)

The source is Rockstar Games' own download: the Launch Trailer mp4 from Rockstar's official
GTA VI media page, `https://www.rockstargames.com/VI/media/videos`, served from Rockstar's
own CDN:

`https://media-rockstargames-com.akamaized.net/VI/downloads/videos/GTAVI_Launch_Trailer/GTAVI_Launch_Trailer.mp4`

Fetching Rockstar's official trailer from YouTube via yt-dlp was tried first and is blocked
from this machine (YouTube's web API calls time out; the trailer is age-restricted and the
other trailer hits a "confirm you're not a bot" wall), so the official download from
Rockstar's own site is the source used instead — the same official file, no re-upload,
no third-party channel. The full 781 MB source trailer is **not** committed to this repo;
only the rendered clip is. `main.ts --build-clip` reproduces the clip from the source file
when it is present at `source/GTAVI_Launch_Trailer.mp4`.

## The video is the entry

`VIDEO.json` at the repo root names the video's YouTube address. The video is published
public on YouTube (a Short), its description carrying the bounty's line and the entrant's
make.fun play code — see `UPLOAD.md` for the exact title, description and steps. The video
stays public until the results are out. Never buy views or use bots: bought or botted views
disqualify.

## The program

`main.ts` (Node 22, standard library only, no network) is the entrypoint. The way the
grader runs it, it copies `VIDEO.json` from the repository root to `/output/VIDEO.json` —
that is all the program has to do for grading, since the house reads the video itself.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` is also the program that made the clip: `node main.ts --build-clip` re-runs the
exact ffmpeg cut (trim to the chosen moment, blur-fill crop to 1080x1920, burn in the
make.fun pitch as on-screen text, render `clip/gta6-makefun-short.mp4`) from the source
trailer at `source/GTAVI_Launch_Trailer.mp4`. It shells out to ffmpeg, which the bounty
requires for cutting; it needs no network at run time.

## Upload

The YouTube upload is the entrant's step (their channel, their login): `UPLOAD.md` has the
title, the full description text (including the exact bounty line and where the play code
goes) and the steps. After uploading, replace the placeholder in `VIDEO.json` with the
video's real address (`https://www.youtube.com/shorts/<id>`) before submitting.
