import { useNavigate } from "react-router";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Zap, TrendingUp, Target, FileDown, ArrowUpRight, ChevronRight, Award, AlertTriangle } from "lucide-react";
import { LIME, DARK, trendData, shareOfVoice, competitorScores, recommendationsData } from "../lib/data";
import { StatCard, Card, SectionHeader, ChartTip, Btn, PriorityBadge } from "../lib/ui";

export default function Executive() {
  const navigate = useNavigate();

  const roiMetrics = [
    { label: "Est. organic pipeline influenced", value: "$2.4M", sub: "from AI-sourced inbound leads" },
    { label: "AI-driven demo requests", value: "38", sub: "attributed to AI citations this month" },
    { label: "Avg. deal size (AI-sourced)", value: "$48K", sub: "vs $31K from other channels" },
  ];

  return (
    <div className="space-y-4">
      {/* Hero KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="AI Visibility Score" value="76" sub="out of 100 · ranked #2 in category" trend={{ value: 28, label: "vs last mo." }} accent icon={Zap} />
        <StatCard label="Total Citations" value="1,401" sub="across 5 AI models, July 2026" trend={{ value: 12, label: "vs last mo." }} icon={TrendingUp} />
        <StatCard label="Positive Sentiment" value="73%" sub="of all AI citations this month" trend={{ value: 5, label: "vs last mo." }} icon={Award} />
        <StatCard label="Share of Voice" value="23%" sub="of category AI citations" trend={{ value: 4, label: "vs last mo." }} icon={Target} />
      </div>

      {/* Trend + Competitive position */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-3">
          <SectionHeader title="Citation Trend" sub="Monthly AI visibility — all models combined" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
              <defs>
                <linearGradient id="execGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={LIME} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={LIME} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <Tooltip content={(p) => <ChartTip {...(p as Parameters<typeof ChartTip>[0])} />} />
              <Area key="exec-area" type="monotone" dataKey="citations" name="Citations" stroke={DARK} strokeWidth={2} fill="url(#execGrad)" dot={{ fill: LIME, stroke: DARK, strokeWidth: 2, r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="col-span-2 flex flex-col">
          <SectionHeader title="Share of Voice" sub="Category-level AI citation share" />
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={shareOfVoice} cx="50%" cy="50%" innerRadius={44} outerRadius={66} paddingAngle={2} dataKey="value">
                {shareOfVoice.map((e) => <Cell key={`exec-sov-${e.name}`} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-auto">
            {shareOfVoice.slice(0, 3).map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className={d.name === "Coder" ? "font-semibold" : ""} style={{ color: DARK }}>{d.name}</span>
                  {d.name === "Coder" && <span className="text-xs px-1 rounded font-semibold" style={{ background: LIME, color: DARK }}>You</span>}
                </div>
                <span className="font-semibold" style={{ color: DARK }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ROI metrics */}
      <div>
        <p className="text-sm font-semibold mb-3" style={{ color: DARK }}>Business Impact</p>
        <div className="grid grid-cols-3 gap-4">
          {roiMetrics.map((m) => (
            <Card key={m.label}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#94A3B8", letterSpacing: "0.07em" }}>{m.label}</p>
              <p className="text-3xl font-semibold" style={{ color: DARK }}>{m.value}</p>
              <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{m.sub}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Competitive ladder + Top recs */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <SectionHeader title="Competitive Ranking" sub="AI visibility score vs. direct competitors" action={
            <button className="flex items-center gap-1 text-xs font-medium" style={{ color: "#9CA3AF" }} onClick={() => navigate("/competitors")}>
              Full view <ChevronRight size={11} />
            </button>
          } />
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
                    <div className="flex items-center gap-2">
                      <span className={`text-xs flex items-center gap-0.5 ${c.growth >= 20 ? "text-emerald-600" : "text-gray-400"}`}>
                        <ArrowUpRight size={10} />{c.growth}%
                      </span>
                      <span className="text-sm font-semibold" style={{ color: DARK }}>{c.score}</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "#F3F4F6" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${c.score}%`, background: isYou ? LIME : "#D1D5DB" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Priority Actions" sub="Highest-impact recommendations for this month" action={
            <button className="flex items-center gap-1 text-xs font-medium" style={{ color: "#9CA3AF" }} onClick={() => navigate("/recommendations")}>
              All recs <ChevronRight size={11} />
            </button>
          } />
          <div className="space-y-3">
            {recommendationsData.filter((r) => r.priority === "high").map((r) => (
              <div key={r.id} className="p-3.5 rounded-xl" style={{ border: "1px solid #F3F4F6" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <PriorityBadge priority={r.priority} />
                  <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>{r.type}</span>
                </div>
                <p className="text-sm font-medium leading-snug" style={{ color: DARK }}>{r.title}</p>
                <p className="text-xs mt-1 font-semibold" style={{ color: "#10A37F" }}>{r.impact}</p>
              </div>
            ))}
            <div className="p-3 rounded-xl flex items-center gap-2" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.15)" }}>
              <AlertTriangle size={13} style={{ color: "#B45309" }} />
              <p className="text-xs" style={{ color: "#B45309" }}>Daytona growing +45% MoM — watch competitive gap</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Report CTA */}
      <div className="p-5 rounded-2xl flex items-center gap-4" style={{ background: DARK }}>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Share this with your board</p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Generate a one-page executive PDF with all KPIs, competitive position, and recommended next steps.</p>
        </div>
        <Btn variant="lime" icon={FileDown} onClick={() => navigate("/report")}>Generate PDF Report</Btn>
      </div>
    </div>
  );
}
