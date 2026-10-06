// Chrome can round composited pixels by one RGB level between screenshots.
// Compare decoded pixels with only that tolerance, without a PNG dependency.
export async function samePaint(page, first, second) {
  if (first.equals(second)) return true;
  return page.evaluate(async (sources) => {
    const images = await Promise.all(sources.map(async (src) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      return image;
    }));
    const [a, b] = images;
    if (a.width !== b.width || a.height !== b.height) return false;
    const canvas = document.createElement("canvas");
    canvas.width = a.width;
    canvas.height = a.height;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const pixels = (image) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      return context.getImageData(0, 0, canvas.width, canvas.height).data;
    };
    const before = pixels(a);
    const after = pixels(b);
    return before.every((value, index) => Math.abs(value - after[index]) <= 1);
  }, [first, second].map((buffer) => `data:image/png;base64,${buffer.toString("base64")}`));
}
