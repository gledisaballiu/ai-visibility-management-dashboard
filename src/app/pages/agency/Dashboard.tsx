import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { agencyClientsData, creatorsData } from "../../lib/data";

const C = {
  page: "#0B0A0A", shell: "#1A1715", card: "#232020", cardLine: "#302B28",
  inset: "#1B1817", t1: "#EFE9E1", t2: "#A9A29B", t3: "#77706A",
  cream: "#EDE8E0", pos: "#4ADE80", neg: "#EF4444", attn: "#F79521", prog: "#2F80F5",
};
const FONT = "Inter, -apple-system, system-ui, sans-serif";
const CARD: React.CSSProperties = {
  background: "#232020", border: "1px solid #302B28", borderRadius: 16,
  padding: "18px 20px", display: "flex", flexDirection: "column", minWidth: 0,
};

function SourceChip({ text }: { text: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: "rgba(239,232,224,0.06)", border: "1px solid #302B28",
      borderRadius: 999, padding: "3px 10px", fontSize: 11, color: C.t3, marginTop: "auto",
    }}>
      {text}
    </div>
  );
}

function SecondaryBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent", border: "1px solid #302B28", borderRadius: 8,
        padding: "5px 10px", fontSize: 12, color: C.t2, cursor: "pointer",
        whiteSpace: "nowrap", flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}

function PrimaryBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: C.prog, border: "none", borderRadius: 8,
        padding: "5px 10px", fontSize: 12, color: "#fff", cursor: "pointer",
        whiteSpace: "nowrap", flexShrink: 0, fontWeight: 600,
      }}
    >
      {label}
    </button>
  );
}

const CHART_DATA: Record<"24h" | "Week" | "Month", { values: number[]; labels: string[]; total: number; change: number }> = {
  "24h": {
    values: [820, 944, 1102, 987, 1231, 1389, 1284, 1456, 1601, 1523, 1708, 1842, 1796, 1921, 2043, 1987, 2156, 2234, 2189, 2311, 2408, 2367, 2501, 2618],
    labels: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    total: 2618,
    change: 18.7,
  },
  "Week": {
    values: [2341, 2789, 3102, 2876, 3445, 3812, 4201],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    total: 22566,
    change: 12.4,
  },
  "Month": {
    values: [45, 62, 89, 72, 118, 134, 156, 143, 178, 201, 189, 224],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    total: 18081,
    change: 24.3,
  },
};

const CHART_W = 600;
const CHART_H = 80;

function buildPath(data: number[], w: number, h: number, max: number) {
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (v / max) * (h - 8) - 4;
    return { x, y, v };
  });
  const lineD = "M " + pts.map(p => `${p.x},${p.y}`).join(" L ");
  const firstX = pts[0].x;
  const firstY = pts[0].y;
  const lastX = pts[pts.length - 1].x;
  const areaD = `M ${firstX},${h} L ${firstX},${firstY} ` +
    pts.slice(1).map(p => `L ${p.x},${p.y}`).join(" ") +
    ` L ${lastX},${h} Z`;
  return { lineD, areaD, pts };
}

const GAPS = [
  { clientId: "coder",   model: "ChatGPT",    topic: "Database optimization tools",        stat: "0/10 ChatGPT answers · 15k queries/mo",   impact: "High" },
  { clientId: "linear",  model: "Claude",     topic: "Project management for devs",         stat: "1/10 Claude answers · 8.5k queries/mo",   impact: "High" },
  { clientId: "grafana", model: "Perplexity", topic: "Observability platform comparison",   stat: "2/10 Perplexity answers · 6k queries/mo", impact: "Medium" },
];

const totalContracted = 220;
const totalDelivered = 184;

const CREATORS = ["Kelsey Hightower", "Charity Majors", "Theo Browne", "Nader Dabit", "swyx", "Lee Robinson"];
const FORMATS = ["YouTube tutorial", "Long-form article", "Comparison post", "On-site guide", "LLM info page"];

function BriefModal({ gap, clientById, navigate, onClose }: {
  gap: typeof GAPS[0];
  clientById: (id: string) => (typeof agencyClientsData[0]) | undefined;
  navigate: (path: string) => void;
  onClose: () => void;
}) {
  const [creator, setCreator] = useState("Unassigned");
  const [format, setFormat] = useState("YouTube tutorial");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const client = clientById(gap.clientId);

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#1B1817", border: "1px solid #302B28", borderRadius: 8,
    padding: "8px 12px", fontSize: 13, color: C.t2, outline: "none",
    fontFamily: FONT, boxSizing: "border-box",
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}
    >
      <div
        style={{ background: "#232020", border: "1px solid #302B28", borderRadius: 16, padding: 28, width: 480, maxWidth: "90vw" }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: C.t1 }}>New Brief</div>
          <div style={{ fontSize: 11, background: "rgba(47,128,245,0.15)", color: C.prog, borderRadius: 999, padding: "3px 10px", border: "1px solid rgba(47,128,245,0.25)" }}>
            Will appear in Planner as a brief
          </div>
        </div>
        <p style={{ fontSize: 12, color: C.t3, marginBottom: 20 }}>
          A brief creates a content piece in the client&apos;s campaign and notifies any assigned creator to start working on it.
        </p>

        {/* Read-only fields */}
        {[
          { label: "Client", value: client?.name ?? gap.clientId },
          { label: "Topic / Title", value: gap.topic },
          { label: "Target AI model", value: gap.model },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: C.t3, marginBottom: 4, fontWeight: 600 }}>{f.label}</div>
            <div style={{ ...inputStyle, color: C.t2 }}>{f.value}</div>
          </div>
        ))}

        {/* Editable fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: C.t3, marginBottom: 4, fontWeight: 600 }}>Format</div>
            <select value={format} onChange={e => setFormat(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
              {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, color: C.t3, marginBottom: 4, fontWeight: 600 }}>Due date</div>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: C.t3, marginBottom: 4, fontWeight: 600 }}>Assign creator</div>
          <select value={creator} onChange={e => setCreator(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
            <option value="Unassigned">— Unassigned</option>
            {CREATORS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {creator !== "Unassigned" && (
            <p style={{ fontSize: 11, color: C.t3, marginTop: 5 }}>
              Creator will receive a brief notification by email.
            </p>
          )}
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: C.t3, marginBottom: 4, fontWeight: 600 }}>Notes for creator (optional)</div>
          <textarea
            value={notes} onChange={e => setNotes(e.target.value)}
            rows={3} placeholder="Angle, key points, competitive references…"
            style={{ ...inputStyle, resize: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <SecondaryBtn label="Cancel" onClick={onClose} />
          <PrimaryBtn
            label="Create brief & open Planner"
            onClick={() => {
              toast.success(`Brief created in ${client?.name ?? gap.clientId} plan${creator !== "Unassigned" ? ` · ${creator} notified` : ""}`);
              onClose();
              navigate("/agency/planner");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AgencyDashboard() {
  const navigate = useNavigate();
  const [citationPeriod, setCitationPeriod] = useState<"24h" | "Week" | "Month">("Month");
  const [briefModal, setBriefModal] = useState<null | typeof GAPS[0]>(null);
  const [chartTooltip, setChartTooltip] = useState<{ x: number; y: number; value: number; label: string; idx: number } | null>(null);
  const chartSvgRef = useRef<SVGSVGElement>(null);

  const avgScore = Math.round(agencyClientsData.reduce((sum, c) => sum + c.score, 0) / agencyClientsData.length);

  // Score distribution
  const scoreBuckets = {
    red: agencyClientsData.filter(c => c.score < 60).length,
    orange: agencyClientsData.filter(c => c.score >= 60 && c.score < 75).length,
    green: agencyClientsData.filter(c => c.score >= 75).length,
  };
  const bucketMax = Math.max(scoreBuckets.red, scoreBuckets.orange, scoreBuckets.green, 1);

  const clientById = (id: string) => agencyClientsData.find(c => c.id === id);

  const ATTENTION_ITEMS = [
    { clientId: "linear",     reason: "Behind on July plan — 3 pieces unbriefed, 9 days left", action: "See what's unbriefed", severity: 1, actionFn: () => navigate("/agency/planner") },
    { clientId: "railway",    reason: "No sync in 2 days", action: "Fix sync", severity: 2, actionFn: () => navigate("/agency/settings") },
    { clientId: "spacelift",  reason: "Waiting on Spacelift for 6 days", action: "Nudge client", severity: 2, actionFn: () => { const c = clientById("spacelift"); toast.success(`Nudge sent to ${c?.name ?? "Spacelift"} — they'll receive an email prompt.`); } },
    { clientId: "clerk",      reason: "Score dropped 5 points this week", action: "Open client", severity: 3, actionFn: () => navigate(`/agency/clients/clerk`) },
    { clientId: "triggerdev", reason: "Creator declined a brief", action: "Reassign", severity: 3, actionFn: () => navigate("/agency/creators") },
    { clientId: "turso",      reason: "No sync in 3 days", action: "Fix sync", severity: 2, actionFn: () => navigate("/agency/settings") },
    { clientId: "doppler",    reason: "Waiting on Doppler for 4 days", action: "Nudge client", severity: 2, actionFn: () => { const c = clientById("doppler"); toast.success(`Nudge sent to ${c?.name ?? "Doppler"} — they'll receive an email prompt.`); } },
    { clientId: "flyio",      reason: "Analytics not connected", action: "Fix sync", severity: 3, actionFn: () => navigate("/agency/settings") },
  ];

  const chartInfo = CHART_DATA[citationPeriod];
  const chartMax = Math.max(...chartInfo.values);
  const { lineD, areaD, pts } = buildPath(chartInfo.values, CHART_W, CHART_H, chartMax);

  const handleChartMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = chartSvgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * CHART_W;
    // Find closest data point
    let closest = 0;
    let minDist = Infinity;
    pts.forEach((p, i) => {
      const d = Math.abs(p.x - svgX);
      if (d < minDist) { minDist = d; closest = i; }
    });
    const p = pts[closest];
    // Convert back to screen coords
    const screenX = (p.x / CHART_W) * rect.width + rect.left;
    const screenY = (p.y / (CHART_H + 16)) * rect.height + rect.top;
    setChartTooltip({ x: screenX, y: screenY, value: p.v, label: chartInfo.labels[closest], idx: closest });
  }, [pts, chartInfo]);

  const creators6 = creatorsData.slice(0, 6);

  return (
    <div style={{
      minHeight: "100%", overflow: "visible", display: "flex", flexDirection: "column",
      padding: "20px 24px", gap: 18, background: "#1A1715", fontFamily: FONT, boxSizing: "border-box",
    }}>

      {/* ROW 1 — fixed 240px */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>

        {/* Panel 1: Portfolio Score */}
        <div style={{ ...CARD }}>
          <div style={{ fontSize: 16, color: C.t2, marginBottom: 10 }}>Portfolio score</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 52, fontWeight: 600, color: C.t1, lineHeight: 1 }}>{avgScore}</span>
            <span style={{ fontSize: 13, color: C.pos }}>+4 pts this month</span>
          </div>

          {/* Score distribution mini bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, margin: "10px 0 6px" }}>
            {[
              { label: `<60 pts`, count: scoreBuckets.red, color: C.neg },
              { label: "60–75 pts", count: scoreBuckets.orange, color: C.attn },
              { label: "75+ pts", count: scoreBuckets.green, color: C.pos },
            ].map(b => (
              <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 9, color: C.t3 }}>{b.count} client{b.count !== 1 ? "s" : ""}</span>
                <div style={{
                  width: "100%", height: Math.max(8, (b.count / bucketMax) * 40),
                  background: b.color, borderRadius: 3, opacity: 0.8,
                }} />
                <span style={{ fontSize: 9, color: C.t3 }}>{b.label}</span>
              </div>
            ))}
          </div>

          <SourceChip text="Peec AI / Profound · synced nightly" />
        </div>

        {/* Panel 2: Delivery this month */}
        <div style={{ ...CARD }}>
          <div style={{ fontSize: 16, color: C.t2, marginBottom: 10 }}>Delivery this month</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 40, fontWeight: 600, color: C.t1, lineHeight: 1 }}>
              {totalDelivered} <span style={{ fontSize: 24, color: C.t3 }}>/ {totalContracted}</span>
            </span>
          </div>
          <div style={{ fontSize: 13, color: C.attn, marginBottom: 10 }}>3 clients behind</div>

          {/* Progress bar */}
          <div style={{ height: 8, borderRadius: 4, background: "#302B28", marginBottom: 8 }}>
            <div style={{
              height: "100%", borderRadius: 4, background: C.pos,
              width: `${(totalDelivered / totalContracted) * 100}%`,
            }} />
          </div>

          <div style={{ fontSize: 12, color: C.t2, marginBottom: 8 }}>
            Articles 98 · Videos 46 · On-site 31 · LLM pages 9
          </div>

          <SourceChip text="YardGEO · computed from planner" />
        </div>

        {/* Panel 3: Citations across all clients */}
        <div style={{ ...CARD, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 16, color: C.t2 }}>Citations across all clients</span>
            {/* Segmented control */}
            <div style={{ display: "flex", background: "#1B1817", borderRadius: 8, padding: 2, gap: 1 }}>
              {(["24h", "Week", "Month"] as const).map(p => (
                <button
                  key={p}
                  onClick={() => { setCitationPeriod(p); setChartTooltip(null); }}
                  style={{
                    background: citationPeriod === p ? "#302B28" : "transparent",
                    border: "none", borderRadius: 6, padding: "3px 8px",
                    fontSize: 11, color: citationPeriod === p ? C.t1 : C.t3,
                    cursor: "pointer", fontFamily: FONT,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 40, fontWeight: 600, color: C.t1, lineHeight: 1 }}>
              {chartInfo.total.toLocaleString()}
            </span>
            <span style={{ fontSize: 13, color: C.pos }}>+{chartInfo.change}% ↗</span>
          </div>

          {/* Inline SVG area chart with hover */}
          <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
            <svg
              ref={chartSvgRef}
              viewBox={`0 0 ${CHART_W} ${CHART_H + 16}`}
              width="100%"
              height="80px"
              style={{ display: "block", cursor: "crosshair" }}
              onMouseMove={handleChartMouseMove}
              onMouseLeave={() => setChartTooltip(null)}
            >
              <defs>
                <linearGradient id="citeGradDark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.prog} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={C.prog} stopOpacity={0} />
                </linearGradient>
              </defs>
              <path d={areaD} fill="url(#citeGradDark)" />
              <path d={lineD} fill="none" stroke={C.prog} strokeWidth={2} strokeLinejoin="round" />
              {chartInfo.labels.map((label, i) => {
                const x = (i / (chartInfo.labels.length - 1)) * CHART_W;
                return (
                  <text key={label} x={x} y={CHART_H + 14} textAnchor="middle" fontSize={9} fill={C.t3}>
                    {label}
                  </text>
                );
              })}
              {/* Hover dot */}
              {chartTooltip && (
                <circle
                  cx={pts[chartTooltip.idx]?.x ?? 0}
                  cy={pts[chartTooltip.idx]?.y ?? 0}
                  r={4}
                  fill={C.prog}
                  stroke="#1A1715"
                  strokeWidth={2}
                />
              )}
            </svg>

            {/* Floating tooltip */}
            {chartTooltip && (() => {
              const svg = chartSvgRef.current;
              if (!svg) return null;
              const rect = svg.getBoundingClientRect();
              const parentRect = svg.parentElement?.getBoundingClientRect();
              if (!parentRect) return null;
              const px = pts[chartTooltip.idx]?.x ?? 0;
              const py = pts[chartTooltip.idx]?.y ?? 0;
              const localX = (px / CHART_W) * rect.width;
              const localY = (py / (CHART_H + 16)) * rect.height;
              const prevValue = chartTooltip.idx > 0 ? chartInfo.values[chartTooltip.idx - 1] : chartInfo.values[0];
              const pct = prevValue > 0 ? (((chartTooltip.value - prevValue) / prevValue) * 100).toFixed(1) : "—";
              return (
                <div style={{
                  position: "absolute",
                  left: Math.min(localX, rect.width - 120),
                  top: Math.max(0, localY - 52),
                  background: C.card,
                  border: `1px solid ${C.cardLine}`,
                  borderRadius: 8,
                  padding: "6px 10px",
                  pointerEvents: "none",
                  zIndex: 10,
                  whiteSpace: "nowrap",
                }}>
                  <div style={{ fontSize: 11, color: C.t3, marginBottom: 2 }}>{chartTooltip.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.t1 }}>{chartTooltip.value.toLocaleString()}</div>
                  <div style={{ fontSize: 10, color: parseFloat(pct) >= 0 ? C.pos : C.neg }}>
                    {parseFloat(pct) >= 0 ? "+" : ""}{pct}% vs prev
                  </div>
                </div>
              );
            })()}
          </div>

          <SourceChip text="Peec AI / Profound · synced nightly" />
        </div>
      </div>

      {/* ROW 2 — flex:1, panels scroll internally */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(260px,32fr) minmax(300px,36fr) minmax(240px,32fr)", gap: 18 }}>

        {/* Panel 1: Needs attention */}
        <div style={{ ...CARD, padding: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #302B28", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.t1 }}>Needs attention</span>
            <span style={{
              fontSize: 11, fontWeight: 600, background: "rgba(239,68,68,0.15)",
              color: C.neg, borderRadius: 999, padding: "1px 7px",
            }}>
              {ATTENTION_ITEMS.length}
            </span>
          </div>

          <div>
            {ATTENTION_ITEMS.map((item, idx) => {
              const client = clientById(item.clientId);
              if (!client) return null;
              return (
                <div key={idx} style={{ padding: "10px 16px", borderBottom: "1px solid #2B2725" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 5, background: client.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 7, fontWeight: 700, color: "#fff", flexShrink: 0,
                    }}>
                      {client.logo}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.t1, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{client.name}</span>
                    <SecondaryBtn label={item.action} onClick={item.actionFn} />
                  </div>
                  <div style={{ paddingLeft: 30, fontSize: 11, color: C.t3, marginTop: 3, lineHeight: 1.4 }}>{item.reason}</div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "12px 16px", borderTop: "1px solid #302B28", flexShrink: 0 }}>
            <span
              onClick={() => navigate("/agency/clients")}
              style={{ fontSize: 12, color: C.prog, cursor: "pointer" }}
            >
              View all 22 clients →
            </span>
          </div>
        </div>

        {/* Panel 2: Gaps worth briefing */}
        <div style={{ ...CARD, padding: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #302B28", flexShrink: 0 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.t1 }}>Gaps worth briefing</span>
          </div>

          <div style={{ padding: "12px 16px" }}>
            {GAPS.map((gap, i) => {
              const client = clientById(gap.clientId);
              return (
                <div
                  key={i}
                  style={{
                    background: "#1B1817", border: "1px solid #302B28", borderRadius: 12,
                    padding: "14px 16px", marginBottom: 10,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    {client && (
                      <div style={{
                        width: 20, height: 20, borderRadius: 5, background: client.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 7, fontWeight: 700, color: "#fff", flexShrink: 0,
                      }}>
                        {client.logo}
                      </div>
                    )}
                    <span style={{ fontSize: 12, color: C.t2 }}>{client?.name ?? gap.clientId}</span>
                    <span style={{ fontSize: 10, color: C.t3 }}>—</span>
                    <span style={{
                      fontSize: 10, fontWeight: 500, background: "rgba(239,232,224,0.06)",
                      border: "1px solid #302B28", borderRadius: 999, padding: "2px 7px", color: C.t2,
                    }}>
                      {gap.model}
                    </span>
                    <span style={{ fontSize: 10, color: C.t3 }}>—</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>{gap.topic}</span>
                  </div>
                  <div style={{ fontSize: 13, color: C.t2, marginBottom: 10 }}>{gap.stat}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <PrimaryBtn label="Brief this →" onClick={() => setBriefModal(gap)} />
                    <SecondaryBtn
                      label="Save as idea"
                      onClick={() => toast.success(`Saved to ${client?.name ?? gap.clientId} plan as an idea. Open Planner to brief it when ready.`)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel 3: Creator capacity */}
        <div style={{ ...CARD, padding: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #302B28", flexShrink: 0 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.t1 }}>Creator capacity</span>
          </div>

          <div style={{ padding: "10px 16px 4px", fontSize: 12, color: C.t2, flexShrink: 0 }}>
            12 available this month · 6 booked · $14,200 unpaid
          </div>

          <div style={{ padding: "4px 0" }}>
            {creators6.map((creator, i) => {
              const isBooked = i % 2 !== 0;
              const hasConflict = i === 2 || i === 5;
              return (
                <div
                  key={creator.id}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 16px", borderBottom: "1px solid #2B2725",
                  }}
                >
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(creator.name)}&backgroundColor=302B28&textColor=EFE9E1`}
                    alt={creator.name}
                    style={{ width: 28, height: 28, borderRadius: 999, flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: C.t1, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {creator.name}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {hasConflict && (
                      <span style={{
                        fontSize: 10, color: C.neg,
                        background: "rgba(239,68,68,0.12)", borderRadius: 999,
                        padding: "2px 6px", whiteSpace: "nowrap",
                      }}>
                        ⚠ Conflict
                      </span>
                    )}
                    <span style={{
                      fontSize: 11, fontWeight: 500, borderRadius: 999, padding: "3px 8px",
                      background: isBooked ? "rgba(247,149,33,0.15)" : "rgba(74,222,128,0.15)",
                      color: isBooked ? C.attn : C.pos,
                      whiteSpace: "nowrap",
                    }}>
                      {isBooked ? "Booked" : "Available"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "12px 16px", borderTop: "1px solid #302B28", flexShrink: 0 }}>
            <span
              onClick={() => navigate("/agency/creators")}
              style={{ fontSize: 12, color: C.prog, cursor: "pointer" }}
            >
              Add from network →
            </span>
          </div>
        </div>
      </div>

      {/* Brief Modal */}
      {briefModal && (
        <BriefModal
          gap={briefModal}
          clientById={clientById}
          navigate={navigate}
          onClose={() => setBriefModal(null)}
        />
      )}
    </div>
  );
}
