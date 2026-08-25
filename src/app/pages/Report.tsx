import { useNavigate } from "react-router";
import { ArrowLeft, Printer, TrendingUp, Award, Target, ArrowUpRight, BarChart2 } from "lucide-react";
import { YardGEOLogo, WordMark } from "../lib/logo";
import { LIME, DARK, FONT, competitorScores, shareOfVoice, recommendationsData, trendData } from "../lib/data";
import { PriorityBadge } from "../lib/ui";

export default function Report() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const role = localStorage.getItem("visibai_role") ?? "marketer";

  return (
    <div style={{ background: "#EAEAE4", minHeight: "100vh", fontFamily: FONT }}>
      {/* Toolbar — hidden in print */}
      <div className="flex items-center justify-between px-6 py-3 print:hidden" style={{ background: DARK }}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
          <ArrowLeft size={14} />Back to dashboard
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>AI Visibility Report · Coder · July 2026</span>
          <button onClick={() => window.print()}
            className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl ml-4"
            style={{ background: LIME, color: DARK }}>
            <Printer size={14} />Save as PDF
          </button>
        </div>
      </div>

      {/* Report document */}
      <div className="max-w-4xl mx-auto my-8 print:my-0 print:max-w-none space-y-4 px-4 print:px-0">

        {/* Cover */}
        <div className="rounded-2xl p-10 print:rounded-none" style={{ background: DARK }}>
          <div className="flex items-center gap-2.5 mb-8">
            <YardGEOLogo size={28} />
            <WordMark />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>AI Visibility Report</p>
              <h1 className="text-4xl font-semibold text-white leading-tight">Coder<br />July 2026</h1>
              <p className="text-sm mt-4" style={{ color: "rgba(255,255,255,0.35)" }}>Prepared for {role.charAt(0).toUpperCase() + role.slice(1)} view · Generated {today}</p>
            </div>
            <div className="space-y-3">
              {[
                { label: "Visibility Score",  value: "76/100" },
                { label: "Total Citations",   value: "1,401" },
                { label: "Share of Voice",    value: "23%" },
                { label: "Category Rank",     value: "#2" },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{s.label}</p>
                  <p className="text-xl font-semibold" style={{ color: LIME }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Executive summary */}
        <div className="bg-white rounded-2xl p-8 print:rounded-none">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#CBD5E1", letterSpacing: "0.08em" }}>Executive Summary</p>
          <p className="text-base leading-relaxed" style={{ color: DARK }}>
            Coder achieved a <strong>visibility score of 76/100</strong> in July 2026, ranking <strong>#2 in the Cloud IDE category</strong> across 5 major AI models.
            Total citations grew <strong>+28% month-over-month</strong> to 1,401, with <strong>73% positive sentiment</strong>.
            Share of voice stands at <strong>23%</strong>, behind GitHub Codespaces (31%) but ahead of Replit (22%) and Gitpod (18%).
          </p>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {[
              { label: "Citations", value: "1,401",  sub: "+28% MoM", icon: BarChart2, good: true },
              { label: "Score",     value: "76",      sub: "+12 pts",  icon: Award,    good: true },
              { label: "Sentiment", value: "73%",     sub: "+5% MoM",  icon: TrendingUp, good: true },
              { label: "Rank",      value: "#2",      sub: "of 5 brands",icon: Target,  good: true },
            ].map((m) => (
              <div key={m.label} className="p-4 rounded-xl" style={{ background: "#FAFAFA", border: "1px solid #F3F4F6" }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <m.icon size={13} style={{ color: "#9CA3AF" }} />
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{m.label}</p>
                </div>
                <p className="text-2xl font-semibold" style={{ color: DARK }}>{m.value}</p>
                <p className="text-xs mt-0.5 text-emerald-600 flex items-center gap-0.5"><ArrowUpRight size={11} />{m.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Citation trend */}
        <div className="bg-white rounded-2xl p-8 print:rounded-none">
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#CBD5E1", letterSpacing: "0.08em" }}>Citation Trend — Jan to Jul 2026</p>
          <div className="flex items-end gap-2 h-24">
            {trendData.map((d, i) => {
              const maxV = Math.max(...trendData.map((x) => x.citations));
              const pct = (d.citations / maxV) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <p className="text-xs font-semibold" style={{ color: i === trendData.length - 1 ? DARK : "#9CA3AF" }}>{d.citations}</p>
                  <div className="w-full rounded-t-lg" style={{ height: `${pct}%`, background: i === trendData.length - 1 ? LIME : "rgba(17,17,17,0.08)", minHeight: 4 }} />
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{d.month}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Competitive position */}
        <div className="bg-white rounded-2xl p-8 print:rounded-none">
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#CBD5E1", letterSpacing: "0.08em" }}>Competitive Position</p>
          <div className="space-y-4">
            {competitorScores.map((c) => {
              const isYou = c.brand === "Coder";
              return (
                <div key={c.brand}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: DARK }}>{c.brand}</span>
                      {isYou && <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold" style={{ background: LIME, color: DARK }}>You</span>}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: DARK }}>{c.score}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "#F3F4F6" }}>
                    <div className="h-2 rounded-full" style={{ width: `${c.score}%`, background: isYou ? LIME : "#D1D5DB" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Share of voice */}
        <div className="bg-white rounded-2xl p-8 print:rounded-none">
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#CBD5E1", letterSpacing: "0.08em" }}>Share of Voice</p>
          <div className="flex items-center gap-8">
            <div className="flex-1 flex h-6 rounded-xl overflow-hidden gap-px">
              {shareOfVoice.map((d) => (
                <div key={d.name} className="flex items-center justify-center text-xs font-semibold"
                  style={{ width: `${d.value}%`, background: d.color, color: d.name === "Coder" ? DARK : "#fff", fontSize: d.value < 10 ? 0 : 11 }}>
                  {d.value >= 10 ? `${d.value}%` : ""}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {shareOfVoice.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-sm" style={{ background: d.color }} />
                <span style={{ color: DARK, fontWeight: d.name === "Coder" ? 700 : 500 }}>{d.name} {d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl p-8 print:rounded-none">
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#CBD5E1", letterSpacing: "0.08em" }}>Priority Recommendations</p>
          <div className="space-y-3">
            {recommendationsData.map((r) => (
              <div key={r.id} className="flex items-start gap-3 p-4 rounded-xl" style={{ border: "1px solid #F3F4F6" }}>
                <PriorityBadge priority={r.priority} />
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: DARK }}>{r.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{r.insight}</p>
                </div>
                <p className="text-xs font-semibold whitespace-nowrap" style={{ color: "#10A37F" }}>{r.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 text-center text-xs" style={{ color: "#9CA3AF" }}>
          Generated by YardGEO · AI Visibility Platform · {today} · Confidential
        </div>
      </div>

      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:my-0 { margin-top: 0 !important; margin-bottom: 0 !important; }
          .print\\:max-w-none { max-width: none !important; }
          .print\\:px-0 { padding-left: 0 !important; padding-right: 0 !important; }
        }
      `}</style>
    </div>
  );
}
