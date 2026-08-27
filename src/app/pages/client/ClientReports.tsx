import { useState } from "react";
import { useOutletContext } from "react-router";
import { Download, TrendingUp } from "lucide-react";
import { agencyClientsData } from "../../lib/data";
import { C } from "../../lib/theme";

const FONT = "Inter, -apple-system, system-ui, sans-serif";

const CARD = {
  background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16,
  display: "flex", flexDirection: "column" as const,
};

const REPORTS = [
  { id: 1, month: "July 2026",     dateRange: "Jul 1–31, 2026",  citations: 1401, growth: 28, campaigns: 2 },
  { id: 2, month: "June 2026",     dateRange: "Jun 1–30, 2026",  citations: 1187, growth: 21, campaigns: 2 },
  { id: 3, month: "May 2026",      dateRange: "May 1–31, 2026",  citations: 982,  growth: 15, campaigns: 1 },
  { id: 4, month: "April 2026",    dateRange: "Apr 1–30, 2026",  citations: 854,  growth: 12, campaigns: 2 },
  { id: 5, month: "March 2026",    dateRange: "Mar 1–31, 2026",  citations: 763,  growth: 8,  campaigns: 1 },
  { id: 6, month: "February 2026", dateRange: "Feb 1–28, 2026",  citations: 706,  growth: 5,  campaigns: 1 },
];

const SECTION_OPTIONS = [
  "Executive Summary",
  "GEO Score & Position",
  "Citations & AI Channels",
  "Content Delivered",
  "Creator Performance",
  "Recommendations",
];

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "5px 0" }}
    >
      <div style={{
        width: 14, height: 14, borderRadius: 4, border: `1px solid ${C.cardLine}`,
        background: checked ? C.prog : C.inset,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span style={{ fontSize: 12, color: checked ? C.t1 : C.t3 }}>{label}</span>
    </div>
  );
}

export default function ClientReports() {
  const ctx = useOutletContext<{ client: typeof agencyClientsData[0] }>();
  const client = ctx?.client || agencyClientsData[0];
  const [selected, setSelected] = useState(REPORTS[0].id);
  const report = REPORTS.find(r => r.id === selected) ?? REPORTS[0];
  const [sections, setSections] = useState<Record<string, boolean>>(
    Object.fromEntries(SECTION_OPTIONS.map(s => [s, true]))
  );

  const toggleSection = (label: string) => {
    setSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div style={{ background: "#1A1715", padding: "26px 28px", fontFamily: FONT, minHeight: "calc(100vh - 72px)", boxSizing: "border-box" }}>
      <div style={{ display: "flex", gap: 20 }}>

        {/* Left: archive list */}
        <div style={{ ...CARD, width: 380, minWidth: 380 }}>
          <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${C.cardLine}` }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.t1 }}>Monthly reports</div>
            <div style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>{client.name} · {REPORTS.length} reports</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {REPORTS.map(r => {
              const isSelected = r.id === selected;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  style={{
                    padding: "14px 20px", cursor: "pointer",
                    background: isSelected ? "rgba(47,128,245,0.1)" : "transparent",
                    borderLeft: isSelected ? `3px solid ${C.prog}` : "3px solid transparent",
                    borderBottom: `1px solid ${C.cardLine}`,
                    transition: "all 100ms",
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 4 }}>{r.month}</div>
                  <div style={{ fontSize: 12, color: C.t3, marginBottom: 6 }}>{r.dateRange}</div>
                  <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.t2 }}>
                    <span>{r.citations.toLocaleString()} citations</span>
                    <span style={{ color: C.pos, fontWeight: 600 }}>+{r.growth}%</span>
                    <span>{r.campaigns} campaigns</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: selected report */}
        <div style={{ ...CARD, flex: 1 }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.cardLine}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.t1, marginBottom: 4 }}>{report.month} GEO Report</div>
              <div style={{ fontSize: 13, color: C.t3 }}>{report.dateRange} · {client.name}</div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
            {/* Summary stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Total Citations", value: report.citations.toLocaleString(), delta: `+${report.growth}%`, positive: true },
                { label: "Active Campaigns", value: report.campaigns.toString(), delta: null, positive: true },
              ].map(s => (
                <div key={s.label} style={{ background: C.inset, border: `1px solid ${C.cardLine}`, borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.t3, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 24, fontWeight: 700, color: C.t1 }}>{s.value}</span>
                    {s.delta && (
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.pos, background: "rgba(74,222,128,0.15)", borderRadius: 999, padding: "2px 7px" }}>
                        <TrendingUp size={10} style={{ verticalAlign: "middle", marginRight: 2 }} />{s.delta}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sections to include */}
            <div style={{ background: C.inset, border: `1px solid ${C.cardLine}`, borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.t2, marginBottom: 10 }}>Sections to include</div>
              {SECTION_OPTIONS.map(label => (
                <CheckboxRow
                  key={label}
                  label={label}
                  checked={sections[label]}
                  onChange={() => toggleSection(label)}
                />
              ))}
            </div>

            {/* Download PDF button */}
            <button
              onClick={() => alert("Downloading PDF...")}
              style={{ display: "flex", alignItems: "center", gap: 8, background: C.t1, color: "#0B0A0A", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 24 }}
            >
              <Download size={15} /> Download PDF
            </button>

            {/* Report sections preview */}
            {[
              { title: "Executive Summary", desc: "Overview of GEO performance, key wins, and strategic priorities for next month." },
              { title: "Citation Analysis", desc: `Deep dive into ${report.citations.toLocaleString()} citations across ChatGPT, Claude, Perplexity, and Gemini. Breakdown by topic, sentiment, and competitor position.` },
              { title: "Campaign Performance", desc: `Results from ${report.campaigns} active campaigns. Creator content performance, citation attribution, and ROI analysis.` },
              { title: "Competitive Landscape", desc: "How your share of AI answers shifted versus Gitpod, Codespaces, and DevPod. Gap analysis and opportunities." },
              { title: "Recommendations", desc: "Agency-curated action items for next month based on data patterns and gap analysis." },
            ].map((section, i) => (
              null
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
