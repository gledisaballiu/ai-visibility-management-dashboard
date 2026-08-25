export function YardGEOLogo({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      {/* Lime background */}
      <rect width="40" height="40" rx="9" fill="#C6F24E"/>
      {/* White inset card */}
      <rect x="7" y="7" width="26" height="26" rx="5.5" fill="white"/>
      {/* 4-pointed compass star */}
      <path d="M20 9.5 L22.2 17.8 L30.5 20 L22.2 22.2 L20 30.5 L17.8 22.2 L9.5 20 L17.8 17.8 Z" fill="#0D0D0D"/>
    </svg>
  );
}

export function WordMark({ size = "base" }: { size?: "sm" | "base" | "lg" }) {
  const sizes = { sm: 13, base: 15, lg: 20 };
  const fs = sizes[size];
  return (
    <span style={{ fontSize: fs, fontWeight: 700, letterSpacing: "-0.02em", color: "#EFE9E1" }}>
      yard<span style={{ color: "#C6F24E" }}>GEO</span>
    </span>
  );
}
