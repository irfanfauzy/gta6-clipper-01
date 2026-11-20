// gta6-clipper-01 — make.fun "Clip GTA 6 for the most YouTube views".
//
// Two jobs, one file (Node 22, standard library only, no network at run time):
//
//   1. Grader mode (default, no flags): copy VIDEO.json from the repository root to
//      /output/VIDEO.json, where the gate reads it. That is all the program has to
//      do for grading — the house reads the video itself through the YouTube Data
//      API, so nothing this program writes about the video is scored.
//        mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
//   2. Clip mode (`node main.ts --build-clip`): the program that made the clip.
//      It shells out to ffmpeg (the tool the bounty requires for cutting) and
//      reproduces clip/gta6-makefun-short.mp4 from the source trailer at
//      source/GTAVI_Launch_Trailer.mp4, running the exact cut below. Run it from
//      the repository root with ffmpeg on PATH.
//
// The creative, decided in the build session (see README.md / AGENT.md):
//   - Source: Rockstar's official GTA 6 Launch Trailer (15 Oct 2026, 90 s, captured
//     in-game on PS5), downloaded from Rockstar's own media page.
//   - Moment: the trailer's best 30-second stretch, starting on "ROCKSTAR GAMES
//     PRESENTS" over Vice City at night and running through the red sports car, Lucia
//     and Jason in the convertible, and the sunset beat — the hook opens directly on
//     the moment, because the first seconds decide whether a viewer stays.
//   - Pitch: the last 8 seconds carry make.fun's pitch as big on-screen text —
//     "Make clips like this with AI and earn money on make.fun" plus the bounty's
//     page — so the clip rides the GTA 6 hype, then turns to the viewer.
//   - Format: vertical 1080x1920, 30 s (a Short), the 16:9 frame centred over a
//     blurred fill of itself, trailer audio kept.

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// --- the cut: every number below is the creative decision ------------------
const SOURCE_FILE = 'source/GTAVI_Launch_Trailer.mp4'; // Rockstar's official download
const CLIP_FILE = 'clip/gta6-makefun-short.mp4';
const SEGMENT_START = 15; // seconds into the trailer: Vice City skyline, "ROCKSTAR GAMES PRESENTS"
const CLIP_SECONDS = 30; // 15s -> 45s of the trailer: skyline, red car, Lucia & Jason, sunset
const PITCH_START = 22; // seconds into the clip: the make.fun pitch appears
const PITCH_END = 30; // ... and stays to the end, 8 s on screen
const FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';

const PITCH_LINE_1 = 'Make clips like this with AI';
const PITCH_LINE_2 = 'and earn money on make.fun';
const PITCH_LINE_3 = 'make.fun/bounty/gta6-clipper-01';
const HOOK_LINE = 'GTA 6 - VICE CITY IS BACK';

function drawtext(text: string, fontsize: number, y: number, from: number, to: number): string {
  return (
    `drawtext=fontfile=${FONT}:text='${text}':fontsize=${fontsize}:` +
    `fontcolor=white:borderw=2:bordercolor=black@0.8:box=1:boxcolor=black@0.65:boxborderw=24:` +
    `x=(w-text_w)/2:y=${y}:enable='between(t\\,${from}\\,${to})'`
  );
}

function buildClip(repoRoot: string): void {
  const source = join(repoRoot, SOURCE_FILE);
  const out = join(repoRoot, CLIP_FILE);
  if (!existsSync(source)) {
    console.error(`Source trailer not found at ${source}.`);
    console.error('Download it from Rockstar\'s official media page:');
    console.error('https://www.rockstargames.com/VI/media/videos');
    console.error('(GTAVI_Launch_Trailer.mp4 on Rockstar\'s CDN) and place it at source/.');
    process.exit(1);
  }
  if (!existsSync(FONT)) {
    console.error(`Font not found at ${FONT}; install DejaVu Sans Bold or edit FONT in main.ts.`);
    process.exit(1);
  }
  mkdirSync(join(repoRoot, 'clip'), { recursive: true });

  // Vertical Short: the 16:9 frame centred (1080x608) over a blurred fill of
  // itself at 1080x1920; hook text above the frame, pitch text below it, both on
  // the blurred backdrop in the frame's safe area (clear of YouTube's buttons).
  const filter =
    '[0:v]split[a][b];' +
    '[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=50[bg];' +
    '[b]scale=1080:608:force_original_aspect_ratio=decrease[fg];' +
    '[bg][fg]overlay=(W-w)/2:(H-h)/2,' +
    `${drawtext(HOOK_LINE, 56, 480, 0.5, 4)},` +
    `${drawtext(PITCH_LINE_1, 60, 1330, PITCH_START, PITCH_END)},` +
    `${drawtext(PITCH_LINE_2, 56, 1425, PITCH_START, PITCH_END)},` +
    `${drawtext(PITCH_LINE_3, 44, 1515, PITCH_START, PITCH_END)}[v]`;

  const args = [
    '-y',
    '-ss', String(SEGMENT_START),
    '-t', String(CLIP_SECONDS),
    '-i', source,
    '-filter_complex', filter,
    '-map', '[v]',
    '-map', '0:a',
    '-t', String(CLIP_SECONDS),
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-r', '30',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-movflags', '+faststart',
    out,
  ];
  console.log(`Cutting ${CLIP_SECONDS}s from ${SEGMENT_START}s of ${SOURCE_FILE} ...`);
  execFileSync('ffmpeg', args, { stdio: 'inherit' });
  console.log(`Wrote ${out}`);
}

function copyVideoJson(): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  try {
    copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
  } catch (err) {
    console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
    process.exit(1);
  }
}

if (process.argv.includes('--build-clip')) {
  buildClip(process.cwd());
} else {
  copyVideoJson();
}
