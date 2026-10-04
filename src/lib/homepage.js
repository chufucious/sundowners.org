import devofisheye from "#lib/assets/Photos/devofisheye.jpg?w=400;800;1200&enhanced";
import gregonrexan from "#lib/assets/Photos/gregonrexan.jpg?w=400;800;1200&enhanced";
import runninglion from "#lib/assets/Photos/runninglion.jpg?w=400;800;1200&enhanced";
import rexanFire from "#lib/assets/Photos/rexan-fire.jpg?w=400;800;1200&enhanced";
import rexanDancer from "#lib/assets/Photos/rexan-dancer.jpg?w=400;800;1200&enhanced";
import rexanNightWide from "#lib/assets/Photos/rexan-night-wide.jpg?w=400;800;1200&enhanced";
import manBurnFire from "#lib/assets/Photos/man-burn-fire.jpg?w=400;627&enhanced";
import gregFlying from "#lib/assets/Photos/greg-flying.jpg?w=400;800;1200&enhanced";
import sign from "#lib/assets/Photos/sign.jpg?w=400;800;1200&enhanced";
import jonSmoke from "#lib/assets/Photos/jon-smoke.jpg?w=400;800;1200&enhanced";
import sundownersSignLoop from "#lib/assets/Photos/sundowners-sign-loop.mp4";
import sundownersSignPoster from "#lib/assets/Photos/sundowners-sign-poster.jpg";
import jaggedBalls from "#lib/assets/jagged-balls-of-rolling-chaos.png?w=400;800;1200&enhanced";
import rexanDusk from "#lib/assets/rexan-sound/hero-rexan-dusk.jpg?w=400;800;1200&enhanced";
import build2026Frame from "#lib/assets/Photos/build-2026-frame.jpg?w=400;800;1200&enhanced";
import build2026Toolkit from "#lib/assets/Photos/build-2026-toolkit.jpg?w=400;800;1200&enhanced";
import build2026NightCanopy from "#lib/assets/Photos/build-2026-night-canopy.jpg?w=400;800;1200&enhanced";
import build2026NightDrill from "#lib/assets/Photos/build-2026-night-drill.jpg?w=400;800;1200&enhanced";
import build2026Solar from "#lib/assets/Photos/build-2026-solar.jpg?w=400;800;1200&enhanced";
import build2026Daylight from "#lib/assets/Photos/build-2026-daylight.jpg?w=400;800;1200&enhanced";

export const build2026Photos = [
  { image: build2026Frame, alt: "raising the new frame" },
  { image: build2026Toolkit, alt: "socket set at the dash" },
  { image: build2026NightCanopy, alt: "working on the canopy at dusk" },
  { image: build2026NightDrill, alt: "drilling into the side panel after dark" },
  { image: build2026Solar, alt: "solar panels on the roof rack" },
  { image: build2026Daylight, alt: "rexan in the yard" },
];

// Bottom gallery, left to right; class controls each photo's height and alignment.
export const galleryPhotos = [
  { image: manBurnFire, alt: "the man lit up above a wall of fire", class: "max-h-96" },
  { video: sundownersSignLoop, poster: sundownersSignPoster, alt: "Sundowners sign and wax-print flag at dusk", class: "h-80 w-auto max-w-none shrink-0 self-end" },
  { image: devofisheye, alt: "Three campmates in sunglasses grinning into a fisheye lens", class: "max-h-96" },
  { image: gregonrexan, alt: "A crew member riding on Rexan’s glowing front deck at night", class: "max-h-96" },
  { image: jonSmoke, alt: "A campmate swirling a trail of green smoke across the playa", class: "max-h-64" },
  { image: rexanDancer, alt: "A dancer silhouetted on Rexan’s top rail against a red sunset", class: "max-h-96 self-end" },
  { image: runninglion, alt: "Someone in a white lattice lion headdress running across the open playa", class: "max-h-80" },
  { image: sign, alt: "Campmates lifting the sequined Sundowners sign into place over camp", class: "max-h-96" },
  { image: gregFlying, alt: "A crew member in a flowing blue cape riding Rexan’s front seat, seen from above", class: "max-h-80 self-end" },
  { image: rexanFire, alt: "A fire spinner performing on the playa near Rexan at dusk", class: "max-h-80" },
  { image: rexanNightWide, alt: "Rexan lit up on the open playa at night, with glowing bikes and art around it", class: "max-h-96" },
];

export const articles = [
  {
    id: "rexan-sound-promo",
    href: "/rexan-sound-system",
    image: rexanDusk,
    alt: "rexan at dusk on the playa, headlight eyes glowing blue, speakers and lanterns on the top deck",
    position: "object-[52%_60%]",
    title: "The Rexan Sound System",
    blurb: "How we built a solar-powered QSC rig on a psychedelic safari car.",
  },
  {
    id: "jagged-balls-promo",
    href: "/jagged-balls-of-rolling-chaos",
    image: jaggedBalls,
    alt: "A shredded canopy tumbling through a dust storm as people run from it",
    title: "Jagged Balls of Rolling Chaos",
    blurb: "Hard-won camp tips for surviving the playa.",
  },
];
