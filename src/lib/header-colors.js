// Eight unshifted region averages across the rendered top 8px, including the
// existing black overlay. Representative crops: 390×632 and 1280×900.
// Sample centers are 6.25%, 18.75%, …, 93.75%; the ends extend to the edges.
export const BANNER_TINT = "#354151";
export const REXAN_TINT = "#1e2e47";

export const bannerEdges = {
  mobile: ["#494c5a", "#474c5a", "#464b58", "#424958", "#3b4756", "#384655", "#324451", "#2b414e"],
  desktop: ["#4f4e59", "#514f5b", "#4f4f5b", "#4b4e59", "#434b58", "#3c4956", "#354753", "#2b404c"],
  smallDesktop: ["#6d5757", "#6b5556", "#6c5657", "#685659", "#62555b", "#5d565c", "#59555c", "#515258"],
};

export const rexanEdges = {
  mobile: ["#0f233c", "#172842", "#1e2d46", "#24324b", "#29374f", "#2d3a51", "#303c53", "#323e55"],
  desktop: ["#05152b", "#0a1e36", "#152740", "#213048", "#29374f", "#2f3c52", "#333f55", "#344055"],
};

export const edgeGradient = (colors) =>
  `linear-gradient(90deg, ${colors.map((color, i) => `${color} ${(i + 0.5) * 12.5}%`).join(", ")})`;
