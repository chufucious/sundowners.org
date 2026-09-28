// @ts-ignore - imagetools types not available in server context
import img from '$lib/assets/rexan-sound/crew-on-rexan.jpg?w=1200&h=630&fit=cover&format=jpg&as=src';

export const load = () => {
  const imageUrl = Array.isArray(img) ? img[0] : img;
  return {
    title: 'The Rexan Sound System | Sundowners – Black Rock City',
    description:
      'How we built a solar-powered QSC rig on Rexan, our psychedelic safari art car at Burning Man: the gear, the batteries, what broke on playa, and the plan for year ten.',
    ogType: 'article',
    ogImage: new URL(imageUrl, 'https://sundowners.org').href,
    ogImageAlt: 'The Sundowners crew piled onto Rexan under the QSC speakers',
    smallHeader: true
  };
};
