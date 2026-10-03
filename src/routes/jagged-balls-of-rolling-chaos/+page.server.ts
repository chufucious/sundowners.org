// @ts-ignore - imagetools types not available in server context
import img from '#lib/assets/jagged-balls-of-rolling-chaos.png?w=1200&h=630&fit=cover&format=jpg&quality=80&as=src';

export const load = () => {
  const imageUrl = Array.isArray(img) ? img[0] : img;
  return {
    title: 'Burning Man Camp Tips: Jagged Balls of Rolling Chaos | Sundowners',
    description:
      'Practical Burning Man camp tips from Poca of the Sundowners: bikes, dust, rain, gear, and links to official emergency guidance.',
    ogType: 'article',
    ogImage: new URL(imageUrl, 'https://sundowners.org').href,
    ogImageAlt: 'People running beneath a windblown canopy on the playa',
    smallHeader: true
  };
};
