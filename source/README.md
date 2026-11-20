# Source footage

The clip is cut from Rockstar Games' official **Grand Theft Auto VI Launch Trailer**
(15 Oct 2026, 90 s, captured in-game on PS5), downloaded from Rockstar's own media page:

- Page: https://www.rockstargames.com/VI/media/videos
- File: https://media-rockstargames-com.akamaized.net/VI/downloads/videos/GTAVI_Launch_Trailer/GTAVI_Launch_Trailer.mp4
  (781,762,562 bytes, 3840x2160, h264 + AAC, 89.17 s)

The full source trailer is **not** committed to this repo (781 MB). To reproduce the
clip, download the file above and place it here as `GTAVI_Launch_Trailer.mp4`, then run
from the repo root:

```sh
node main.ts --build-clip
```

The rendered clip is committed at `clip/gta6-makefun-short.mp4`.
