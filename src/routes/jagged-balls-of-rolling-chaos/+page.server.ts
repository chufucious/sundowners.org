// @ts-ignore - imagetools types not available in server context
import img from '#lib/assets/jagged-balls-of-rolling-chaos.png?w=1200&h=630&fit=cover&format=jpg&as=src';

export const load = () => {
  const imageUrl = Array.isArray(img) ? img[0] : img;
  return {
    title: 'Jagged Balls of Rolling Chaos: Burning Man Camp Tips | Sundowners',
    description:
      'Hard-won Burning Man camp tips from the Sundowners crew: bikes, generators, rain, vehicle care, and gear.',
    ogType: 'article',
    ogImage: new URL(imageUrl, 'https://sundowners.org').href,
    ogImageAlt: 'A shredded canopy tumbling through a dust storm as people run from it',
    smallHeader: true
  };
};
