// Legend and table colour for each speaker role, so the SPL table's swatches
// always match the diagram legends. Keyed by role, not model: the monitors
// are amber whether they're K10.2s (today) or K12.2s (the 2027 concept).
// The SVG drawings set their own fill-/stroke- classes in the same hues.
export const speakerColours = {
  tops: "bg-emerald-600",
  monitors: "bg-amber-600",
  subs: "bg-orange-600",
  lineArray: "bg-violet-300 ring-1 ring-violet-700",
  lineArraySub: "bg-red-900",
};
