import { LIME, DARK, FONT, LLM_META, INTENT_STYLE, TYPE_STYLE, PRIORITY_STYLE } from "./data";
import { ArrowUpRight, ArrowDownRight, Check } from "lucide-react";

// ─── Client brand logos (inline SVG — no network required) ───────────────────
export function ClientLogo({ clientId, size = 24 }: { clientId: string; size?: number }) {
  const r = Math.round(size * 0.29);
  const logos: Record<string, React.ReactNode> = {
    vercel: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx={r} fill="#fff" stroke="#E5E7EB" strokeWidth="1"/>
        <path d="M12 5L3 19h18z" fill="#000"/>
      </svg>
    ),
    linear: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx={r} fill="#5E6AD2"/>
        <path d="M5.5 18.5L18.5 5.5M5.5 5.5h13v13" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    clerk: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx={r} fill="#6C47FF"/>
        <circle cx="12" cy="9" r="3.2" fill="#fff"/>
        <path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    coder: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx={r} fill="#0D6EFD"/>
        <path d="M9 8.5L5.5 12 9 15.5M15 8.5l3.5 3.5L15 15.5M13.5 7l-3 10" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    resend: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx={r} fill="#111"/>
        <path d="M7.5 7.5h5a3.5 3.5 0 0 1 0 7h-5M7.5 14.5l4.5 2.5" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    upstash: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx={r} fill="#00C07F"/>
        <path d="M12 18V7M7.5 11.5L12 7l4.5 4.5" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  const logo = logos[clientId];
  if (!logo) return null;
  return <>{logo}</>;
}

// ─── LLM components ───────────────────────────────────────────────────────────
export function LLMIcon({ model, size = 20 }: { model: string; size?: number }) {
  const meta = LLM_META[model];
  if (!meta) return null;
  return (
    <div className="rounded-lg shrink-0 flex items-center justify-center overflow-hidden"
      style={{ background: meta.bg, width: size, height: size, padding: size * 0.14 }} title={model}>
      <svg viewBox="0 0 24 24" fill="white" style={{ width: "100%", height: "100%" }}>
        <path d={meta.path} />
      </svg>
    </div>
  );
}

export function LLMPill({ model }: { model: string }) {
  const meta = LLM_META[model];
  if (!meta) return null;
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: meta.bg + "18" }}>
      <div className="rounded overflow-hidden shrink-0" style={{ background: meta.bg, width: 13, height: 13, padding: 1.5 }}>
        <svg viewBox="0 0 24 24" fill="white" style={{ width: "100%", height: "100%" }}>
          <path d={meta.path} />
        </svg>
      </div>
      <span className="text-xs font-medium" style={{ color: meta.bg, fontFamily: FONT }}>{model}</span>
    </div>
  );
}

// ─── Tag / Badge ──────────────────────────────────────────────────────────────
export function IntentBadge({ intent }: { intent: string }) {
  const s = INTENT_STYLE[intent] ?? { bg: "rgba(17,17,17,0.06)", text: "#374151" };
  return <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.text, fontFamily: FONT }}>{intent}</span>;
}
export function TypeBadge({ type }: { type: string }) {
  const s = TYPE_STYLE[type] ?? { bg: "rgba(17,17,17,0.06)", text: "#374151" };
  return <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.text, fontFamily: FONT }}>{type}</span>;
}
export function PriorityBadge({ priority }: { priority: string }) {
  const s = PRIORITY_STYLE[priority] ?? PRIORITY_STYLE.low;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full capitalize" style={{ background: s.bg, color: s.text, fontFamily: FONT }}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />{priority}
    </span>
  );
}
export function SentimentBadge({ sentiment }: { sentiment: string }) {
  const map: Record<string, { bg: string; dot: string; text: string }> = {
    positive: { bg: "rgba(16,163,127,0.1)", dot: "#10A37F", text: "#065F46" },
    neutral:  { bg: "rgba(245,158,11,0.1)",  dot: "#F59E0B", text: "#92400E" },
    negative: { bg: "rgba(239,68,68,0.08)",  dot: "#EF4444", text: "#991B1B" },
  };
  const s = map[sentiment] ?? map.neutral;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full capitalize" style={{ background: s.bg, color: s.text, fontFamily: FONT }}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />{sentiment}
    </span>
  );
}
export function TopicTag({ label }: { label: string }) {
  return <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(17,17,17,0.06)", color: "#374151", fontFamily: FONT }}>{label}</span>;
}
export function PositionBadge({ position }: { position: number }) {
  return (
    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-lg" style={{ background: position === 1 ? LIME : "rgba(17,17,17,0.06)", color: position === 1 ? DARK : "#6B7280", fontFamily: FONT }}>
      #{position}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className = "", noPad = false, style }: { children: React.ReactNode; className?: string; noPad?: boolean; style?: React.CSSProperties }) {
  return (
    <div className={`bg-white rounded-2xl ${noPad ? "" : "p-5"} ${className}`}
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)", ...style }}>
      {children}
    </div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, trend, accent = false, icon: Icon, large }: {
  label: string; value: string; sub?: string;
  trend?: { value: number; label: string }; accent?: boolean;
  icon?: React.ComponentType<any>;
  large?: boolean;
}) {
  return (
    <div className={`rounded-2xl flex flex-col gap-2.5 ${large ? "p-7" : "p-5"}`}
      style={{ background: accent ? LIME : "#fff", boxShadow: accent ? "none" : "0 1px 3px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase" style={{ color: accent ? "#3A5400" : "#94A3B8", letterSpacing: "0.07em", fontFamily: FONT }}>{label}</span>
        {Icon && <Icon size={14} style={{ color: accent ? "#3A5400" : "#CBD5E1" }} />}
      </div>
      <div className={`font-semibold leading-none tracking-tight ${large ? "text-5xl" : "text-[2.1rem]"}`} style={{ color: DARK, fontFamily: FONT }}>{value}</div>
      {sub && <div className="text-xs" style={{ color: accent ? "#3A5400" : "#94A3B8", fontFamily: FONT }}>{sub}</div>}
      {trend && (
        <div className={`flex items-center gap-0.5 text-xs font-medium ${trend.value >= 0 ? "text-emerald-600" : "text-red-500"}`}>
          {trend.value >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(trend.value)}% {trend.label}
        </div>
      )}
    </div>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
export function SectionHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-sm font-semibold" style={{ color: DARK, fontFamily: FONT }}>{title}</p>
        {sub && <p className="text-xs mt-0.5" style={{ color: "#94A3B8", fontFamily: FONT }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
export function Btn({ children, variant = "primary", size = "md", onClick, icon: Icon, disabled, className }: {
  children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger" | "lime";
  size?: "sm" | "md"; onClick?: () => void; icon?: React.ComponentType<any>;
  disabled?: boolean; className?: string;
}) {
  const styles = {
    primary:   { background: DARK,                       color: "#fff",     border: "none" },
    secondary: { background: "#fff",                     color: DARK,       border: "1px solid #E5E7EB" },
    ghost:     { background: "transparent",              color: "#6B7280",  border: "none" },
    danger:    { background: "rgba(239,68,68,0.08)",     color: "#DC2626",  border: "1px solid rgba(239,68,68,0.15)" },
    lime:      { background: LIME,                       color: DARK,       border: "none" },
  };
  const pad = size === "sm" ? "px-2.5 py-1.5 text-xs gap-1" : "px-4 py-2 text-sm gap-1.5";
  return (
    <button onClick={onClick} disabled={disabled}
      className={`rounded-xl font-medium inline-flex items-center transition-opacity hover:opacity-80 disabled:opacity-40 shrink-0 ${pad} ${className ?? ""}`}
      style={{ ...styles[variant], fontFamily: FONT }}>
      {Icon && <Icon size={size === "sm" ? 12 : 14} />}{children}
    </button>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
export function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="relative shrink-0 w-10 h-5 rounded-full transition-colors"
      style={{ background: on ? DARK : "#E2E8F0" }}>
      <span className="absolute top-0.5 rounded-full w-4 h-4 transition-all"
        style={{ background: on ? LIME : "#fff", left: on ? "calc(100% - 18px)" : "2px", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
    </button>
  );
}

// ─── FormInput ────────────────────────────────────────────────────────────────
export function FormInput({ label, placeholder, value, type = "text", hint, onChange }: {
  label: string; placeholder?: string; value?: string; type?: string; hint?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold block" style={{ color: "#6B7280", fontFamily: FONT }}>{label}</label>
      <input type={type} defaultValue={value} placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full text-sm px-3 py-2.5 rounded-xl outline-none transition-all"
        style={{ border: "1px solid #E5E7EB", color: DARK, background: "#FAFAFA", fontFamily: FONT }}
        onFocus={(e) => (e.target.style.borderColor = DARK)}
        onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")} />
      {hint && <p className="text-xs" style={{ color: "#9CA3AF", fontFamily: FONT }}>{hint}</p>}
    </div>
  );
}

// ─── MiniBar sparkline ────────────────────────────────────────────────────────
export function MiniBar({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-5">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm" style={{ height: `${(v / max) * 100}%`, minHeight: 2, background: i === data.length - 1 ? DARK : "#E2E8F0" }} />
      ))}
    </div>
  );
}

// ─── Chart tooltip ────────────────────────────────────────────────────────────
export function ChartTip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl p-3 text-xs shadow-xl" style={{ border: "1px solid #E2E8F0", fontFamily: FONT }}>
      <p className="font-semibold mb-1" style={{ color: DARK }}>{label}</p>
      {payload.map((p) => <p key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>)}
    </div>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all"
              style={{ background: i + 1 < current ? DARK : i + 1 === current ? LIME : "#F3F4F6", color: i + 1 < current ? "#fff" : i + 1 === current ? DARK : "#9CA3AF" }}>
              {i + 1 < current ? <Check size={12} /> : i + 1}
            </div>
            <span className="text-xs font-medium text-center leading-tight" style={{ color: i + 1 === current ? DARK : "#9CA3AF", fontFamily: FONT, maxWidth: 64 }}>{s}</span>
          </div>
          {i < steps.length - 1 && <div className="flex-1 h-px mx-2 mb-4" style={{ background: i + 1 < current ? DARK : "#E5E7EB" }} />}
        </div>
      ))}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
export function Empty({ icon: Icon, title, sub }: { icon: React.ComponentType<any>; title: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#F3F4F6" }}>
        <Icon size={20} style={{ color: "#9CA3AF" }} />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold" style={{ color: DARK, fontFamily: FONT }}>{title}</p>
        {sub && <p className="text-xs mt-1" style={{ color: "#9CA3AF", fontFamily: FONT }}>{sub}</p>}
      </div>
    </div>
  );
}
