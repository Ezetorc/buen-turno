export const THEMES = {
  barber: {
    label: "Barbería",
    preview: "https://picsum.photos/id/237/1280/720"
  },
  manicure: {
    label: "Manicura",
    preview: "https://picsum.photos/id/200/1280/720"
  },
  spa: {
    label: "Spa",
    preview: "https://picsum.photos/id/100/1280/720"
  },
} as const satisfies Record<
  string,
  { label: string; preview: string }
>;