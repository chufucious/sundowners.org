import { REXAN_TINT, rexanEdges } from '#lib/header-colors.js';

// @ts-ignore - imagetools types not available in server context
import img from '#lib/assets/rexan-sound/hero-rexan-dusk.jpg?w=1200&h=630&fit=cover&format=jpg&as=src';
// @ts-ignore - imagetools types not available in server context
import heroPicture from '#lib/assets/rexan-sound/hero-rexan-dusk.jpg?w=800;1400;2000;2800&enhanced';
// @ts-ignore - imagetools types not available in server context
import heroPlaceholder from '#lib/assets/rexan-sound/hero-rexan-dusk.jpg?w=32&format=webp&quality=60&inline&as=src';

const heroAlt = 'Rexan at dusk on the playa, headlight eyes glowing blue, speakers and lanterns on the top deck';

export const load = () => {
  const imageUrl = Array.isArray(img) ? img[0] : img;
  return {
    title: 'The Rexan Sound System | Sundowners – Black Rock City',
    description:
      'How we built a solar-powered QSC rig on Rexan, our psychedelic safari art car at Burning Man: the gear, the batteries, the bumps in the road on playa, and the plan for 2027.',
    ogType: 'article',
    ogImage: new URL(imageUrl, 'https://sundowners.org').href,
    ogImageAlt: heroAlt,
    // The hero is the site header on this page; object-position keeps the
    // car centred as the frame is trimmed to the screen. The placeholder is a
    // tiny copy inlined in the HTML, shown blurred until the photo loads.
    headerImage: {
      src: heroPicture,
      placeholder: Array.isArray(heroPlaceholder) ? heroPlaceholder[0] : heroPlaceholder,
      alt: heroAlt,
      position: '52% 60%',
      tint: REXAN_TINT,
      edge: rexanEdges
    }
  };
};
