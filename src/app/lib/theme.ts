// Shared color tokens for the dark app shell (agency + client portals, login).
// Single source of truth so every page pulls the same palette instead of
// each screen inventing its own near-duplicate greens/oranges/blues.
export const C = {
  page:     "#0B0A0A",
  shell:    "#1A1715",
  card:     "#232020",
  cardLine: "#302B28",
  inset:    "#1B1817",
  rail:     "#171413",
  railLine: "#272322",
  hover:    "#2E2A27",

  t1: "#EFE9E1",
  t2: "#A9A29B",
  t3: "#77706A",

  cream: "#EDE8E0",

  // Semantic status colors — reuse these instead of adding new hues.
  pos:  "#4ADE80", // success / positive trend
  neg:  "#EF4444", // error / negative trend
  attn: "#F59E0B", // warning / needs attention
  prog: "#2F80F5", // informational / in progress / links
};
