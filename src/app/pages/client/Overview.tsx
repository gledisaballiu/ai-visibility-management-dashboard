import { useState } from "react";
import { useOutletContext } from "react-router";
import { agencyClientsData } from "../../lib/data";
import { toast } from "sonner";
import { C } from "../../lib/theme";

// Muted track behind the score arc — derived from the shared "prog" blue.
const BLUE_TRACK = "#233047";

// Competitor-comparison chart reuses the shared semantic tones instead of
// introducing new hues, so it still reads as part of the same palette.
const COMPETITOR_COLORS = [C.prog, C.pos, C.attn, C.t2];

const FONT = "Inter, -apple-system, system-ui, sans-serif";

const CARD: React.CSSProperties = {
  background: C.card,
  border: `1px solid ${C.cardLine}`,
  borderRadius: 16,
  padding: "16px 18px",
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
};

// ─── Shared sub-components ────────────────────────────────────────────────────
function CardHeader({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
      <div style={{
        fontSize: 16, fontWeight: 500, letterSpacing: "-0.012em", color: C.t1,
        lineHeight: 1.3,
        maxWidth: "calc(100% - 32px)", overflow: "hidden",
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
      }}>{title}</div>
      <div style={{
        width: 20, height: 20, borderRadius: "50%", border: "1.3px solid #4A443F", color: "#6E6862",
        fontSize: 11, fontWeight: 500, display: "grid", placeItems: "center", flexShrink: 0,
        fontFamily: "Georgia, serif", fontStyle: "italic",
      }}>i</div>
    </div>
  );
}

// ─── GEO SCORE ────────────────────────────────────────────────────────────────
function GeoScorePanel({ score = 76 }: { score?: number }) {
  const rad = (score / 100) * Math.PI;
  const ex = 150 + 120 * Math.cos(Math.PI - rad);
  const ey = 148 - 120 * Math.sin(rad);

  return (
    <div style={{ ...CARD, alignItems: "center", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10, width: "100%" }}>
        <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.012em", color: C.t1, lineHeight: 1.3 }}>GEO Score</div>
        <div style={{ width: 20, height: 20, borderRadius: "50%", border: "1.3px solid #4A443F", color: "#6E6862", fontSize: 11, fontWeight: 500, display: "grid", placeItems: "center", flexShrink: 0, fontFamily: "Georgia, serif", fontStyle: "italic" }}>i</div>
      </div>
      <div style={{ fontSize: 52, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, color: C.t1 }}>
        {score}<em style={{ fontStyle: "normal", fontSize: 26, fontWeight: 500, color: C.t2, letterSpacing: "-0.01em" }}>/100</em>
      </div>
      <svg viewBox="0 0 300 160" style={{ width: "100%", maxWidth: 300, margin: "8px 0 4px" }}>
        <path d={`M30 148 A120 120 0 0 1 270 148`} fill="none" stroke={BLUE_TRACK} strokeWidth="26" strokeLinecap="round"/>
        <path d={`M30 148 A120 120 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`} fill="none" stroke={C.prog} strokeWidth="26" strokeLinecap="round"/>
      </svg>
      <div style={{ color: C.pos, fontSize: 13, fontWeight: 500 }}>+8 points this month ↗</div>
      <div style={{ color: C.t2, fontSize: 13, marginTop: 2 }}>Top 18% in Dev tools</div>
    </div>
  );
}

// ─── POSITION ─────────────────────────────────────────────────────────────────
function PositionPanel() {
  const competitors = [
    { name: "Your Brand", pct: 32.4, color: COMPETITOR_COLORS[0] },
    { name: "Gitpod",     pct: 24, color: COMPETITOR_COLORS[1] },
    { name: "Codespaces", pct: 20, color: COMPETITOR_COLORS[2] },
    { name: "DevPod",     pct: 12, color: COMPETITOR_COLORS[3] },
    { name: "Others",     pct: 12, color: C.t3 },
  ];

  return (
    <div style={CARD}>
      <CardHeader title="Position" />
      {/* Fix 1: single-column layout, no fixed 152px column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.05, color: C.t1 }}>32.4%</div>
          <div style={{ color: C.pos, fontSize: 13, fontWeight: 500, marginTop: 8 }}>+6 pts this month ↗</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {competitors.map(c => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, flexWrap: "nowrap" }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: c.color, flexShrink: 0 }} />
              <span style={{ color: C.t2, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
              <span style={{ fontWeight: 600, color: C.t1, flexShrink: 0 }}>{c.pct}%</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", height: 12, gap: 5 }}>
          {competitors.map(c => (
            <div key={c.name} style={{ flex: c.pct, borderRadius: 4, background: c.color }} />
          ))}
        </div>
        <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.5 }}>
          Where your brand is positioned and discovered<br/>across AI results.
        </div>
      </div>
    </div>
  );
}

// ─── AI VISITS ────────────────────────────────────────────────────────────────
const PERIOD_DATA = {
  "24h": {
    value: "1,247",
    delta: "+3.2%",
    deltaPos: true,
    labels: ["02:00","05:00","08:00","11:00","14:00","17:00","20:00"],
    points: [[0,148],[128,162],[257,134],[385,118],[514,142],[642,108],[771,126],[900,98]] as [number,number][],
    updated: "Today, 03:43",
  },
  "Week": {
    value: "9,284",
    delta: "+12.4%",
    deltaPos: true,
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    points: [[0,160],[150,148],[300,138],[450,124],[600,132],[750,110],[900,96]] as [number,number][],
    updated: "Nov 17, 03:43",
  },
  "Month": {
    value: "39,346",
    delta: "+24.9%",
    deltaPos: true,
    labels: ["Oct 11","Oct 18","Oct 25","Nov 1","Nov 8","Nov 15","Nov 17"],
    points: [[0,158],[128,138],[257,118],[385,102],[514,108],[642,84],[771,88],[900,64]] as [number,number][],
    updated: "Nov 17, 03:43",
  },
};

const PERIOD_RANGE = {
  "24h":  { min: 80,    max: 220 },
  "Week": { min: 900,   max: 1800 },
  "Month":{ min: 25000, max: 42000 },
};

function VisitsPanel() {
  const [period, setPeriod] = useState<"24h" | "Week" | "Month">("Week");
  const [dateFrom, setDateFrom] = useState("2025-10-11");
  const [dateTo, setDateTo] = useState("2025-11-17");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [infoHover, setInfoHover] = useState(false);
  const [hoverPoint, setHoverPoint] = useState<{ x: number; y: number; value: string } | null>(null);

  const pd = PERIOD_DATA[period];
  const pts = pd.points;
  const linePath = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const fillPath = linePath + " L900,190 L0,190 Z";

  function handleSvgMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xFrac = (e.clientX - rect.left) / rect.width;
    const yFrac = (e.clientY - rect.top) / rect.height;
    const range = PERIOD_RANGE[period];
    const val = Math.round(range.max - (range.max - range.min) * yFrac);
    setHoverPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top, value: val.toLocaleString() });
    void xFrac; // used implicitly via yFrac for tooltip position
  }

  return (
    <div style={CARD}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.012em", color: C.t1, lineHeight: 1.3 }}>Total AI Visits</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", background: C.inset, border: `1px solid ${C.cardLine}`, borderRadius: 10, padding: 4 }}>
            {(["24h", "Week", "Month"] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{
                border: "none", fontSize: 13, fontWeight: period === p ? 600 : 500,
                color: period === p ? "#1A1715" : C.t2,
                background: period === p ? C.cream : "none",
                padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontFamily: FONT,
                whiteSpace: "nowrap", flexShrink: 0,
              }}>{p}</button>
            ))}
          </div>
          {/* Fix 3b: real date range picker */}
          <div style={{ position: "relative" }}>
            <div
              onClick={() => setShowDatePicker(s => !s)}
              style={{ display: "flex", alignItems: "center", gap: 6, background: C.inset, border: `1px solid ${C.cardLine}`, borderRadius: 9, padding: "5px 10px", fontSize: 11, color: C.t2, cursor: "pointer" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={16} height={16}><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>
              {dateFrom} – {dateTo}
            </div>
            {showDatePicker && (
              <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 30, background: "#232020", border: "1px solid #302B28", borderRadius: 12, padding: 16, minWidth: 260 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ fontSize: 11, color: C.t3 }}>From
                    <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ display: "block", marginTop: 4, width: "100%", background: "#1B1817", border: "1px solid #302B28", borderRadius: 8, padding: "6px 10px", color: "#EFE9E1", fontSize: 12, outline: "none" }} />
                  </label>
                  <label style={{ fontSize: 11, color: C.t3 }}>To
                    <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ display: "block", marginTop: 4, width: "100%", background: "#1B1817", border: "1px solid #302B28", borderRadius: 8, padding: "6px 10px", color: "#EFE9E1", fontSize: 12, outline: "none" }} />
                  </label>
                  <button onClick={() => setShowDatePicker(false)} style={{ background: "#EDE8E0", color: "#0B0A0A", border: "none", borderRadius: 8, padding: "7px 0", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Apply</button>
                </div>
              </div>
            )}
          </div>
          {/* Fix 3c: info tooltip */}
          <div
            onMouseEnter={() => setInfoHover(true)}
            onMouseLeave={() => setInfoHover(false)}
            style={{ position: "relative", width: 20, height: 20, borderRadius: "50%", border: "1.3px solid #4A443F", color: "#6E6862", fontSize: 11, fontWeight: 500, display: "grid", placeItems: "center", flexShrink: 0, fontFamily: "Georgia, serif", fontStyle: "italic", cursor: "default" }}
          >
            i
            {infoHover && (
              <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 40, background: "#232020", border: "1px solid #302B28", borderRadius: 10, padding: "10px 14px", width: 220, fontSize: 12, color: "#A9A29B", lineHeight: 1.5, pointerEvents: "none" }}>
                Total sessions where an AI assistant (ChatGPT, Claude, Perplexity, etc.) referred a user to your site. Synced nightly from your analytics provider.
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 22, margin: "10px 0 2px" }}>
        <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.45 }}>Last updated<br/>{pd.updated}</div>
        <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, color: C.t1 }}>{pd.value}</div>
        <div style={{ background: C.pos, color: "#0B2416", fontSize: 13, fontWeight: 600, padding: "3px 10px", borderRadius: 8, whiteSpace: "nowrap", flexShrink: 0 }}>{pd.delta}</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 100 }}>
        {/* Fix 3d: graph hover tooltip */}
        <div style={{ position: "relative" }}>
          <svg
            viewBox="0 0 900 190"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%", maxHeight: 130, display: "block" }}
            onMouseMove={handleSvgMouseMove}
            onMouseLeave={() => setHoverPoint(null)}
          >
            <defs>
              <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.pos} stopOpacity=".26"/>
                <stop offset="100%" stopColor={C.pos} stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d={fillPath} fill="url(#tealGrad)"/>
            <path d={linePath} fill="none" stroke={C.pos} strokeWidth="2.4" strokeLinejoin="round"/>
          </svg>
          {hoverPoint && (
            <div style={{ position: "absolute", left: hoverPoint.x, top: hoverPoint.y - 36, transform: "translateX(-50%)", background: "#232020", border: "1px solid #302B28", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 600, color: "#EFE9E1", pointerEvents: "none", whiteSpace: "nowrap", zIndex: 10 }}>
              {hoverPoint.value} visits
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#615A55", marginTop: 2 }}>
          {pd.labels.map(d => <span key={d}>{d}</span>)}
        </div>
      </div>
    </div>
  );
}

// ─── CONTENT CREATORS ─────────────────────────────────────────────────────────
const CREATORS_DATA = [
  { seed: "typecraft",    name: "typecraft",         handle: "@typecraft_dev",  bg: "c0aede", subs: "139K", available: true,  desc: "12% LLM citation rate for coding practices. 78% audience match with DevOps engineers. Content indexed by GPT-4, Claude, Perplexity.", tags: ["High Match","LLM Citations"] },
  { seed: "dreamsofcode", name: "Dreams of Code",    handle: "@dreamsofcode",   bg: "b6e3f4", subs: "172K", available: false, desc: "18% citation rate for developer tutorials. 4-minute format drives high retention. Past campaigns increased Perplexity mentions by 34%.", tags: ["LLM Citations","Proven Impact"] },
  { seed: "devopstoolkit",name: "AI & DevOps Toolkit",handle: "@DevOpsToolkit",bg: "ffd5dc", subs: "172K", available: true,  desc: "22% citation rate across Kubernetes and platform engineering topics. Strong pull-through on Claude and Gemini.", tags: ["High Match","LLM Citations"] },
];

const CREATOR_TABS = ["Creators", "KOLs", "Newsletters", "Podcasts", "Reddit"];

function ContentCreatorsPanel() {
  const [tab, setTab] = useState("Creators");
  return (
    <div style={CARD}>
      <CardHeader title="Content Creators" />
      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
        {CREATOR_TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            fontSize: 13, fontWeight: tab === t ? 600 : 500,
            color: tab === t ? "#1A1715" : C.t2,
            background: tab === t ? C.cream : "transparent",
            padding: "6px 10px", borderRadius: 9, cursor: "pointer",
            border: "none", fontFamily: FONT, whiteSpace: "nowrap", flexShrink: 0,
          }}>{t}</button>
        ))}
      </div>
      <div>
        {CREATORS_DATA.map((cr, i) => (
          <div key={cr.seed} style={{ padding: "14px 0", borderBottom: i < CREATORS_DATA.length - 1 ? "1px solid #2B2725" : "none" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img src={`https://api.dicebear.com/9.x/notionists/svg?seed=${cr.seed}&backgroundColor=${cr.bg}`} alt={cr.name}
                  style={{ width: 36, height: 36, borderRadius: "50%", display: "block", background: C.inset }} />
                <span style={{ position: "absolute", right: -2, bottom: -2, width: 16, height: 16, borderRadius: "50%", background: "#2F80F5", border: `2px solid ${C.card}`, display: "grid", placeItems: "center" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width={8} height={8} style={{ color: "#fff" }}><path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z"/></svg>
                </span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", color: C.t1 }}>{cr.name}</div>
                <div style={{ fontSize: 12, color: C.t2, marginTop: 1 }}>{cr.handle}</div>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right", flexShrink: 0 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.inset, border: `1px solid ${C.cardLine}`, padding: "4px 8px", borderRadius: 8, fontSize: 11.5, color: C.t1, fontWeight: 500 }}>
                  <span style={{ width: 15, height: 11, borderRadius: 3, background: C.neg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ borderLeft: "5px solid #fff", borderTop: "3px solid transparent", borderBottom: "3px solid transparent", display: "block", marginLeft: 1 }}/>
                  </span>
                  {cr.subs} subscribers
                </div>
                <div style={{ fontSize: 12, fontWeight: 500, marginTop: 8, color: cr.available ? C.pos : C.attn }}>
                  {cr.available ? "Available" : "Busy Until Feb 2025"}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.55, margin: "8px 0 10px" }}>{cr.desc}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {cr.tags.map(tag => (
                <span key={tag} style={{ fontSize: 12, fontWeight: 500, border: "1px solid #3B3532", color: C.t1, padding: "4px 9px", borderRadius: 6, whiteSpace: "nowrap", flexShrink: 0 }}>{tag}</span>
              ))}
              <span style={{ marginLeft: "auto", fontSize: 15, opacity: 0.9 }}>🤖 🎯</span>
            </div>
            <a href="/client/approvals" style={{ fontSize: 12, color: C.t2, textDecoration: "none", marginTop: 8, display: "block" }}>Review in Approvals →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── GAP CARDS ────────────────────────────────────────────────────────────────
const GAP_DATA = [
  {
    title: "ChatGPT Gap: Database Optimization Tools",
    body: `When developers ask ChatGPT "best database optimization tools", your product appears in 0/10 responses. Competitors: DataDog (8/10), New Relic (6/10), Prometheus (4/10).`,
    impact: "High", effort: "Low", timeline: "1–2 weeks",
    stats: [["Queries","15k/month"],["Gap","3x behind"],["Competition","DataDog\nNew Relic\nPrometheus"]],
    analysis: "Competitors have 12 YouTube tutorials, 8 Reddit threads, and 4 technical blogs that ChatGPT cites. You need 5 creator videos on database performance.",
  },
  {
    title: "Claude Gap: Performance Monitoring",
    body: `When developers ask Claude "how do I monitor database performance?", your product appears in 1/10 responses. Competitors: Datadog (9/10), Grafana (7/10), AppDynamics (5/10).`,
    impact: "High", effort: "Medium", timeline: "3–4 weeks",
    stats: [["Queries","8.5k/month"],["Gap","9x behind"],["Competition","Datadog\nGrafana\nAppDynamics"]],
    analysis: "Claude leans on long-form practitioner posts here. Two technical guides and one podcast appearance would close most of the gap.",
  },
];

function GapCardsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {GAP_DATA.map(gc => (
        <div key={gc.title} style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.012em", lineHeight: 1.3, color: C.t1 }}>{gc.title}</div>
            <div style={{ marginLeft: "auto", background: C.neg, color: "#fff", fontSize: 12, fontWeight: 600, padding: "5px 10px", borderRadius: 7, whiteSpace: "nowrap", flexShrink: 0 }}>high priority</div>
          </div>
          <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.5 }}>{gc.body}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, margin: "14px 0 12px" }}>
            {[["Impact",gc.impact],["Effort",gc.effort],["Timeline",gc.timeline]].map(([l,v]) => (
              <div key={l}>
                <div style={{ fontSize: 12, color: C.t2 }}>{l}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.t1, marginTop: 3 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ background: C.inset, borderRadius: 12, padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {gc.stats.map(([k,v]) => (
                <div key={k} style={{ display: "flex", fontSize: 12, color: C.t2, gap: 12 }}>
                  {k}:<b style={{ marginLeft: "auto", fontWeight: 500, color: C.t1, textAlign: "right", whiteSpace: "pre-line" }}>{v}</b>
                </div>
              ))}
            </div>
            <div>
              <h6 style={{ fontSize: 12, color: C.t2, fontWeight: 400, marginBottom: 8 }}>Gap Analysis:</h6>
              <p style={{ fontSize: 13, color: C.t1, lineHeight: 1.55 }}>{gc.analysis}</p>
            </div>
          </div>
          {/* Fix 2: action row — icon buttons stay small, main CTA buttons stack vertically */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 14 }}>
            {/* Icon-only buttons */}
            <button
              title="Copy insight"
              onClick={() => { navigator.clipboard.writeText(gc.title + "\n" + gc.body); toast.success("Copied"); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: C.t3, padding: 6, flexShrink: 0 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={12} height={12}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5.5A2.5 2.5 0 0 1 7.5 3H17"/></svg>
            </button>
            <button
              title="Share with team"
              onClick={() => toast.success("Shared with your team.")}
              style={{ background: "none", border: "none", cursor: "pointer", color: C.t3, padding: 6, flexShrink: 0 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={12} height={12}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16,6 12,2 8,6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
            {/* Stacked CTA buttons — never overflow */}
            <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", gap: 6, minWidth: 0, width: "100%", maxWidth: 220 }}>
              <a href="/client/approvals" style={{ display: "block", textAlign: "center", fontSize: 13, fontWeight: 600, padding: "8px 12px", borderRadius: 8, background: "#EDE8E0", color: "#0B0A0A", textDecoration: "none" }}>
                See the 4 creators for this →
              </a>
              <button
                onClick={() => toast.success("2 pieces added to plan as ideas.")}
                style={{ fontSize: 13, fontWeight: 500, padding: "8px 12px", borderRadius: 8, background: "transparent", border: "1px solid #302B28", color: "#A9A29B", cursor: "pointer", width: "100%", fontFamily: FONT }}
              >
                Add to next month's plan
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── QUERY MATRIX ─────────────────────────────────────────────────────────────
const QUERIES = [
  { rank: 1, delta: "+24.89 ↗", up: true,  q: "best kubernetes monitoring tools 2024",              mentions: 89, pos: "#1", rank4: "4/12", sentiment: "94%", volume: "12k/month", diff: "High",   models: ["ChatGPT","Claude","Perplexity"] },
  { rank: 2, delta: "+18% ↗",   up: true,  q: "container orchestration vs serverless architecture",  mentions: 67, pos: "#2", rank4: "3/12", sentiment: "89%", volume: "8.5k/month", diff: "Medium", models: ["ChatGPT","Gemini","Copilot"] },
  { rank: 3, delta: "Stable —", up: false, q: "best database monitoring tools 2024",                 mentions: 41, pos: "#5", rank4: "7/12", sentiment: "81%", volume: "6.2k/month", diff: "Medium", models: ["Claude","Perplexity"] },
];

function QueryMatrixPanel() {
  return (
    <div style={CARD}>
      <CardHeader title="Advanced Query Performance Matrix" />
      <div>
        {QUERIES.map((q, i) => (
          <div key={q.rank} style={{ padding: "14px 0", borderBottom: i < QUERIES.length - 1 ? "1px solid #2B2725" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: C.t2 }}>
              #{q.rank}
              <span style={{ marginLeft: "auto", fontWeight: 500, color: q.up ? C.pos : C.t2 }}>{q.delta}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.012em", margin: "7px 0 16px", lineHeight: 1.35, color: C.t1 }}>{q.q}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 10 }}>
              {[["Mentions",String(q.mentions)],["Position",q.pos],["Rank",q.rank4],["Sentiment",q.sentiment]].map(([l,v]) => (
                <div key={l}>
                  <div style={{ fontSize: 12, color: C.t2 }}>{l}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: C.t1, marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 10 }}>
              {[["Volume",q.volume],["Difficulty",q.diff]].map(([l,v]) => (
                <div key={l}>
                  <div style={{ fontSize: 12, color: C.t2 }}>{l}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: C.t1, marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {q.models.map(m => (
                <span key={m} style={{ fontSize: 11.5, fontWeight: 500, border: "1px solid #3B3532", color: C.t1, padding: "4px 8px", borderRadius: 8, whiteSpace: "nowrap", flexShrink: 0 }}>{m}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ClientOverview({ clientOverride }: { clientOverride?: typeof agencyClientsData[0] } = {}) {
  const ctx = useOutletContext<{ client: typeof agencyClientsData[0] }>();
  const client = clientOverride || ctx?.client || agencyClientsData[0];

  return (
    // Fix 4: removed minWidth: 900 so page can be narrower without horizontal scroll
    <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18, fontFamily: FONT, minWidth: 0 }}>
      {/* ROW 1 — proportional three-column */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(180px, 21.4fr) minmax(220px, 26.5fr) minmax(340px, 50.1fr)", gap: 16, flexShrink: 0 }}>
        <GeoScorePanel score={client.score} />
        <PositionPanel />
        <VisitsPanel />
      </div>
      {/* ROW 2 — auto height, page scrolls */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 32.8fr) minmax(280px, 36.1fr) minmax(220px, 27.8fr)", gap: 16, alignItems: "start" }}>
        <ContentCreatorsPanel />
        <GapCardsPanel />
        <QueryMatrixPanel />
      </div>
    </div>
  );
}
