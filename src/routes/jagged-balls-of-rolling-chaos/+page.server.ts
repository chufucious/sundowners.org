// @ts-ignore - imagetools types not available in server context
import img from '$lib/assets/jagged-balls-of-rolling-chaos.png?w=1200&format=png&as=src';

export const load = () => {
  const imageUrl = Array.isArray(img) ? img[0] : img;
  return { 
    ogImage: new URL(imageUrl, 'https://sundowners.org').href
  };
};