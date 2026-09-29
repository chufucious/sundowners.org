// Every Burn Sundowners has been part of, shared by the home page's table and
// the Rexan post's carousel.

// Current placement — rendered in the home page's headline, the address card,
// and the top row of the expeditions table. Update here only.
export const currentYear = 2026;
export const currentAddress = "7:45 & Bodhi";

// Newest first. `absent` dims years we didn't go; `cancelled` also strikes the row through.
export const expeditions = [
  { year: currentYear, theme: "Axis Mundi", address: currentAddress, url: "https://journal.burningman.org/2025/10/philosophical-center/the-theme/burning-man-2026-axis-mundi/" },
  { year: 2025, theme: "Tomorrow Today", address: "7:45 & Ellison", url: "https://journal.burningman.org/2024/11/philosophical-center/the-theme/burning-man-2025-tomorrow-today/" },
  { year: 2024, theme: "Curiouser & Curiouser", address: "Rest year", absent: true, url: "https://journal.burningman.org/2023/10/philosophical-center/the-theme/2024-curiouser-curiouser/" },
  { year: 2023, theme: "Animalia", address: "4:45 & Grootslang", url: "https://burningman.org/about/history/brc-history/event-archives/2023-event-archive/" },
  { year: 2022, theme: "Waking Dreams", address: "4:15 & Glimmer", url: "https://burningman.org/about/history/brc-history/event-archives/2022-event-archive/" },
  { year: 2021, theme: "The Great Unknown", address: "CANCELLED", absent: true, cancelled: true, url: "https://burningman.org/about/history/brc-history/event-archives/2021-event-archive/" },
  { year: 2020, theme: "The Multiverse", address: "CANCELLED", absent: true, cancelled: true, url: "https://burningman.org/about/history/brc-history/event-archives/2020-event-archive/" },
  { year: 2019, theme: "Metamorphoses", address: "4:15 & Hyacinth", url: "https://burningman.org/about/history/brc-history/event-archives/2019-event-archive/" },
  { year: 2018, theme: "I, Robot", address: "8:15 & Cylon", url: "https://burningman.org/about/history/brc-history/event-archives/2018-event-archive/" },
  { year: 2017, theme: "Radical Ritual", address: "7:30 & Labyrinth", url: "https://burningman.org/about/history/brc-history/event-archives/2017-event-archive/2017-art-theme-radical-ritual/" },
];

// That year's Burning Man theme, e.g. "Radical Ritual" for 2017.
export const themeOf = (year) => expeditions.find((e) => e.year === year)?.theme;
