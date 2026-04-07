/**
 * DaqWorksLogo — Brand mark component
 * Variants: "full" | "compact" | "powered-by" | "icon"
 * Themes:   "light" | "dark" | "amber"
 *
 * Usage:
 *   <DaqWorksLogo variant="full" theme="dark" />
 *   <DaqWorksLogo variant="powered-by" theme="light" />
 *   <DaqWorksLogo variant="icon" theme="dark" size={48} />
 */

import React from "react";

type Variant = "full" | "compact" | "powered-by" | "icon";
type Theme = "light" | "dark" | "amber";

interface DaqWorksLogoProps {
  variant?: Variant;
  theme?: Theme;
  size?: number; // only used for "icon" variant — diameter in px
  className?: string;
}

// ── Colour tokens ──────────────────────────────────────────────
const tokens = {
  light: {
    primary: "#1a2e5a",
    accent: "#f59e0b",
    text: "#1a2e5a",
    works: "#f59e0b",
    rule: "#d8d4cc",
    tagline: "#5a6070",
    poweredBy: "#aaaaaa",
    bar2: "#1a2e5a",
    bar2b: "#f59e0b",
    barAlt: "#ffffff",
  },
  dark: {
    primary: "#f8f4ec",
    accent: "#f59e0b",
    text: "#f8f4ec",
    works: "#f59e0b",
    rule: "#0e2040",
    tagline: "#4a6090",
    poweredBy: "#2a3a5e",
    bar2: "#f8f4ec",
    bar2b: "#f59e0b",
    barAlt: "#f59e0b",
  },
  amber: {
    primary: "#1a2e5a",
    accent: "#ffffff",
    text: "#1a2e5a",
    works: "#ffffff",
    rule: "#c47d08",
    tagline: "#7a3d06",
    poweredBy: "#92570a",
    bar2: "#1a2e5a",
    bar2b: "#ffffff",
    barAlt: "#ffffff",
  },
};

// ── Bars mark ──────────────────────────────────────────────────
// Heights: 80 | 52 | 25 || 23 | 52 | 80  (bottom-aligned)
interface BarsProps {
  c: typeof tokens.dark;
  scale?: number; // multiplier, default 1
}

const Bars: React.FC<BarsProps> = ({ c, scale = 1 }) => {
  const s = scale;
  const W = 7 * s;
  const G = 2 * s;
  const GS = 4 * s; // gap between sets
  const BASE = 80 * s; // bottom anchor (relative)

  const bars = [
    { h: 80 * s, fill: c.primary, opacity: 1 },
    { h: 52 * s, fill: c.primary, opacity: 0.6 },
    { h: 25 * s, fill: c.primary, opacity: 0.3 },
    { h: 23 * s, fill: c.bar2b, opacity: 0.3 },
    { h: 52 * s, fill: c.bar2b, opacity: 0.65 },
    { h: 80 * s, fill: c.bar2b, opacity: 1 },
  ];

  let x = 0;
  const rects = bars.map((bar, i) => {
    const y = BASE - bar.h;
    const rx = Math.max(2, 3.5 * s);
    const el = (
      <rect
        key={i}
        x={x}
        y={y}
        width={W}
        height={bar.h}
        rx={rx}
        fill={bar.fill}
        opacity={bar.opacity}
      />
    );
    x += W + (i === 2 ? GS : G);
    return el;
  });

  const totalWidth = W * 6 + G * 4 + GS;
  return (
    <svg
      width={totalWidth}
      height={BASE}
      viewBox={`0 0 ${totalWidth} ${BASE}`}
      style={{ display: "block" }}
    >
      {rects}
    </svg>
  );
};

// ── Full lockup ────────────────────────────────────────────────
const FullLockup: React.FC<{ c: typeof tokens.dark }> = ({ c }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <Bars c={c} />
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <span
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: 56,
          lineHeight: 1,
          color: c.text,
          letterSpacing: 2,
        }}
      >
        DAQ
      </span>
      <span
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: 17,
          lineHeight: 1,
          color: c.works,
          letterSpacing: 13,
          marginTop: 2,
        }}
      >
        WORKS
      </span>
      <div
        style={{
          height: 1,
          background: c.rule,
          marginTop: 6,
          marginBottom: 6,
          width: "100%",
        }}
      />
      <span
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 10,
          fontWeight: 300,
          color: c.tagline,
          letterSpacing: "0.25em",
        }}
      >
        DATA&nbsp;&nbsp;AUTOMATION&nbsp;&nbsp;QUALITY
      </span>
    </div>
  </div>
);

// ── Compact (header) ───────────────────────────────────────────
const CompactLockup: React.FC<{ c: typeof tokens.dark }> = ({ c }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <Bars c={c} scale={0.42} />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: 28,
          lineHeight: 1,
          color: c.text,
          letterSpacing: 1,
        }}
      >
        DAQ
      </span>
      <span
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: 10,
          lineHeight: 1,
          color: c.works,
          letterSpacing: 7,
          marginTop: 1,
        }}
      >
        WORKS
      </span>
    </div>
  </div>
);

// ── Powered by ─────────────────────────────────────────────────
const PoweredBy: React.FC<{ c: typeof tokens.dark }> = ({ c }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
    }}
  >
    <span
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 9,
        fontWeight: 300,
        color: c.poweredBy,
        letterSpacing: "0.1em",
      }}
    >
      Powered by
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Bars c={c} scale={0.26} />
      <span
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: 14,
          color: c.text,
          letterSpacing: 1.5,
          lineHeight: 1,
        }}
      >
        DAQ
      </span>
      <span
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: 9,
          color: c.works,
          letterSpacing: 3,
          lineHeight: 1,
        }}
      >
        WORKS
      </span>
    </div>
  </div>
);

// ── Icon only ──────────────────────────────────────────────────
const IconOnly: React.FC<{ c: typeof tokens.dark; size: number }> = ({
  c,
  size,
}) => {
  const scale = size / 80;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.15,
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Bars c={c} scale={scale * 0.72} />
    </div>
  );
};

// ── Main export ────────────────────────────────────────────────
const DaqWorksLogo: React.FC<DaqWorksLogoProps> = ({
  variant = "full",
  theme = "dark",
  size = 48,
  className,
}) => {
  const c = tokens[theme];

  return (
    <div className={className} style={{ display: "inline-flex" }}>
      {variant === "full" && <FullLockup c={c} />}
      {variant === "compact" && <CompactLockup c={c} />}
      {variant === "powered-by" && <PoweredBy c={c} />}
      {variant === "icon" && <IconOnly c={c} size={size} />}
    </div>
  );
};

export default DaqWorksLogo;
