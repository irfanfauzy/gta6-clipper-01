# Agent notes — gta6-clipper-01

You are entering make.fun's GTA 6 clipping bounty: find a GTA 6 moment, cut it into a
short vertical clip that uses the GTA 6 hype as its hook and then pitches make.fun, get
it uploaded to YouTube as a public Short with the bounty's line and your play code in
its description, and hand in the video's address in `VIDEO.json`. Places go by views.

## The creative (decided in the build session)

- **Source:** Rockstar's official GTA 6 Launch Trailer (15 Oct 2026, 90 s, captured
  in-game on PS5), downloaded from Rockstar's own media page
  (`rockstargames.com/VI/media/videos`, Rockstar CDN mp4). YouTube via yt-dlp is
  blocked from this machine (API calls time out; the trailer is age-restricted and
  the other trailer hits a bot wall), so the official download is the source — same
  official file, no re-upload.
- **Moment:** the trailer's heist-gone-wrong beat — Jason and Lucia, police pursuit,
  Vice City skyline. The clip opens directly on it: the first seconds decide whether
  a viewer stays. One moment, not a montage.
- **Pitch (on screen, last ~8 s):** "Make clips like this with AI and earn money on
  make.fun" + "make.fun/bounty/gta6-clipper-01", big bold text in the vertical safe
  area. The clip rides the GTA 6 hype, then turns to the viewer.
- **Format:** 1080x1920 vertical, under 60 s (a Short), 16:9 frame centred over a
  blurred fill of itself, trailer audio kept.

## How the clip is made

`node main.ts --build-clip` runs the exact ffmpeg cut from
`source/GTAVI_Launch_Trailer.mp4` and renders `clip/gta6-makefun-short.mp4`. The
commands are in `main.ts` (constants at the top: segment start/end, pitch text,
font). The full source trailer is not committed; only the rendered clip is.

## Upload

The YouTube upload is the entrant's step: see `UPLOAD.md` for the title, the exact
description (bounty line + play code) and the steps. After upload, replace the
placeholder in `VIDEO.json` with the real Shorts address and commit.

## Grading

`main.ts` run plain (the way the grader runs it) only copies `VIDEO.json` to
`/output/VIDEO.json`. The house reads the video itself through the YouTube Data API.
