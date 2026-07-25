// @ts-ignore - imagetools types not available in server context
import img from '$lib/assets/jagged-balls-of-rolling-chaos.png?w=1200&format=png&as=src';

export const load = () => {
  const imageUrl = Array.isArray(img) ? img[0] : img;
  return {
    title: 'Jagged Balls of Rolling Chaos | Sundowners – Black Rock City',
    description:
      'Essential survival guide for Burning Man: bikes, generators, emergency protocols, and gear wisdom from the Sundowners camp. No cheap easy ups ever - they turn into jagged balls of rolling chaos.',
    ogType: 'article',
    ogImage: new URL(imageUrl, 'https://sundowners.org').href,
    ogImageAlt: 'Jagged Balls of Rolling Chaos survival guide'
  };
};
