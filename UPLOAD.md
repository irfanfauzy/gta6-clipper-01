# Uploading the clip to YouTube

The rendered clip is `clip/gta6-makefun-short.mp4`. Upload it from the entrant's own
YouTube channel — this is the entrant's step (their channel, their login). Do not hand
the channel's password or keys to anyone.

## Steps

1. Open YouTube Studio (https://studio.youtube.com) and click **Create → Upload videos**.
2. Select `clip/gta6-makefun-short.mp4`.
3. **Title** (copy exactly):

   `GTA 6 Launch Trailer — This Heist Goes WRONG 😱 #GTA6 #Shorts`

4. **Description** (copy exactly, including the play code line — the code is the
   entrant's own make.fun play code for this bounty):

   ```
   GTA 6 is FINALLY here — Jason and Lucia's heist goes wrong in Vice City. 🔥
   Clip cut by my AI agent from Rockstar's official GTA 6 Launch Trailer.

   Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01

   Play code: makefun-bagpipe-pylon-binder

   #GTA6 #GTA6Shorts #ViceCity #RockstarGames #Shorts
   ```

   The line starting "Made by my AI agent for a $500 bounty on make.fun" must be word
   for word — the house looks in the description for "$500 bounty" and for make.fun.
   The play code must appear exactly as issued (`makefun-` plus three words), either
   here in the video's description or in the channel's description (YouTube Studio →
   Customization → Profile → Description → Publish). Leave it there until the checks
   have run.

5. **Audience:** "No, it's not made for kids".
6. **Visibility: Public** (not unlisted, not private). The video must be published at
   or after the bounty's opening (2026-11-20 01:00 UTC) and before its deadline
   (2026-11-23 01:00 UTC / Mon 23 Nov 2026 08:00 WIB).
7. Publish. Keep the video **public until the results are out** — a video gone or no
   longer public at the deadline takes no place.
8. Copy the video's address (Share → Copy link) and put it in `VIDEO.json` at this
   repo's root as `{"url": "https://www.youtube.com/shorts/<id>"}`, replacing the
   placeholder, then commit and push.

## Play code

The entrant's play code for this bounty (code 0 of 4; any one passes) is printed by the
kit's check command:

```sh
node cli/makefun.mjs check --kit . --repo <this repository> --play-code 0
```

Put the code it prints in the description as shown above (in place of
makefun-bagpipe-pylon-binder). The code is no secret — it only proves the uploader holds the
make.fun account — but it lives in this file and the video description, never in chat.

## After upload

- Do not buy views or use bots/view services: bought or botted views disqualify.
- A description can be edited later (YouTube Studio → Content → the video's Details →
  Description), so a refused entry for a missing line or code is mended there and the
  same commit submitted again, with no new upload.
