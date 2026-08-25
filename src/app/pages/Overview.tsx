import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Zap, MessageSquare, TrendingUp, Hash, ChevronDown, ChevronRight } from "lucide-react";
import { LIME, DARK, trendData, modelData, topicData, citationsData } from "../lib/data";
import { StatCard, Card, SectionHeader, LLMIcon, LLMPill, SentimentBadge, ChartTip } from "../lib/ui";
import { type Role } from "../lib/data";
import Executive from "./Executive";
import EmptyDashboard from "./EmptyDashboard";

export default function Overview() {
  const role = (localStorage.getItem("visibai_role") as Role) ?? "marketer";
  const onboarded = localStorage.getItem("visibai_onboarded") === "true";
  if (!onboarded) return <EmptyDashboard />;
  if (role === "executive") return <Executive />;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="AI Visibility Score" value="76" sub="out of 100 — growing" trend={{ value: 28, label: "vs last mo." }} accent icon={Zap} />
        <StatCard label="Total Citations" value="1,401" sub="across 5 AI models" trend={{ value: 12, label: "vs last mo." }} icon={MessageSquare} />
        <StatCard label="Positive Sentiment" value="73%" sub="of all citations" trend={{ value: 5, label: "vs last mo." }} icon={TrendingUp} />
        <StatCard label="Unique Queries" value="312" sub="distinct AI prompts" trend={{ value: 18, label: "vs last mo." }} icon={Hash} />
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-3">
          <SectionHeader title="Citation Trend" sub="Monthly AI citations for your brand" action={
            <button className="flex items-center gap-1 text-xs font-medium rounded-lg px-2.5 py-1.5" style={{ border: "1px solid #E5E7EB", color: "#6B7280" }}>
              7 months <ChevronDown size={11} />
            </button>
          } />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
              <defs>
                <linearGradient id="overviewGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={LIME} stopOpacity={0.45} />
                  <stop offset="95%" stopColor={LIME} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <Tooltip content={(p) => <ChartTip {...(p as Parameters<typeof ChartTip>[0])} />} />
              <Area key="ov-area" type="monotone" dataKey="citations" name="Citations" stroke={DARK} strokeWidth={2} fill="url(#overviewGrad)" dot={{ fill: LIME, stroke: DARK, strokeWidth: 2, r: 3 }} activeDot={{ r: 5, fill: LIME, stroke: DARK, strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="col-span-2">
          <SectionHeader title="By AI Model" sub="Citations breakdown this month" />
          <div className="space-y-4">
            {modelData.map((m) => (
              <div key={m.model}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2"><LLMIcon model={m.model} size={18} /><span className="text-sm font-medium" style={{ color: DARK }}>{m.model}</span></div>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{m.citations}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "#F3F4F6" }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${m.share}%`, background: "#111" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2">
          <SectionHeader title="Recent Citations" sub="Latest AI mentions across all models" action={
            <button className="flex items-center gap-1 text-xs font-medium" style={{ color: "#9CA3AF" }}>View all <ChevronRight size={11} /></button>
          } />
          <div className="space-y-0.5">
            {citationsData.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <LLMIcon model={c.model} size={22} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: DARK }}>{c.query}</p>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{c.model} · {c.date}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <SentimentBadge sentiment={c.sentiment} />
                  <span className="text-sm font-semibold w-9 text-right" style={{ color: DARK }}>{c.relevance}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Top Topics" sub="Queries that cite you most" />
          <div className="space-y-3">
            {topicData.map((t, i) => {
              const pct = Math.round((t.count / topicData[0].count) * 100);
              return (
                <div key={t.topic}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: DARK }}>{t.topic}</span>
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>{t.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "#F3F4F6" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: i === 0 ? LIME : DARK, opacity: i === 0 ? 1 : Math.max(0.12, 0.6 - i * 0.1) }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
