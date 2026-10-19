/** Design tokens — alinhados à landing RecuperaJogo */
export const theme = {
  ink: "#0F1C2E",
  inkSoft: "#4A5B6E",
  seal: "#1B6B4A",
  sealHover: "#155A3E",
  paper: "#FAF8F4",
  card: "#FFFFFF",
  line: "#E6E1D6",
  mutedBg: "#F3F0E9",
  amberBg: "#FBF1DD",
  amberBorder: "#D8B368",
  amberText: "#5C4A22",
  greenBg: "#E8F5EF",
  greenBorder: "#B9CFC0",
  green: "#1B6B4A",
  dangerBg: "#FEF2F2",
  dangerBorder: "#FECACA",
  dangerText: "#991B1B",
} as const;

export type Theme = typeof theme;
