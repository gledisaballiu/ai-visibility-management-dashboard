import { useNavigate } from "react-router";
import { Check, ArrowRight, Zap, BarChart2, MessageSquare, Users, TrendingUp, Lock } from "lucide-react";
import { LIME, DARK, FONT } from "../lib/data";

type SetupStep = { id: string; label: string; desc: string; done: boolean; action: string; path: string };

const SETUP_STEPS: SetupStep[] = [
  { id: "account",     label: "Create your account",      desc: "You're in.",                                    done: true,  action: "Done",           path: "" },
  { id: "brand",       label: "Set up your brand",        desc: "Name, domain, and industry.",                   done: true,  action: "Done",           path: "" },
  { id: "competitors", label: "Add competitors",           desc: "We'll compare your share of voice vs. theirs.", done: false, action: "Add competitors →", path: "/onboarding" },
  { id: "content",     label: "Link your content",        desc: "So we can attribute citations to your pages.",  done: false, action: "Connect content →", path: "/onboarding" },
  { id: "scan",        label: "Run your first AI scan",   desc: "Takes ~2 minutes.",                             done: false, action: "Launch scan →",     path: "/onboarding" },
];

export default function EmptyDashboard() {
  const navigate = useNavigate();
  const doneCount = SETUP_STEPS.filter((s) => s.done).length;
  const pct = Math.round((doneCount / SETUP_STEPS.length) * 100);
  const name = localStorage.getItem("visibai_name") ?? "there";

  const activateDemo = () => {
    localStorage.setItem("visibai_onboarded", "true");
    window.location.reload();
  };

  return (
    <div className="space-y-5" style={{ fontFamily: FONT }}>
      {/* Welcome + progress */}
      <div className="rounded-2xl p-6" style={{ background: DARK }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: LIME, letterSpacing: "0.1em" }}>Getting started</p>
            <h2 className="text-xl font-semibold text-white">Welcome, <span className="capitalize">{name}</span>. Set up your workspace.</h2>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Complete these steps to activate your AI visibility dashboard.</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl font-semibold" style={{ color: LIME }}>{pct}%</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{doneCount} of {SETUP_STEPS.length} steps done</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: LIME }} />
        </div>

        {/* Steps */}
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-5">
          {SETUP_STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-col gap-2 p-3.5 rounded-xl"
              style={{ background: s.done ? "rgba(201,255,77,0.08)" : i === doneCount ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)", border: s.done ? "1px solid rgba(201,255,77,0.2)" : i === doneCount ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.04)" }}>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ background: s.done ? LIME : i === doneCount ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)", color: s.done ? DARK : "#fff" }}>
                  {s.done ? <Check size={10} strokeWidth={3} /> : i + 1}
                </div>
                <p className="text-xs font-semibold" style={{ color: s.done ? "rgba(255,255,255,0.5)" : i === doneCount ? "#fff" : "rgba(255,255,255,0.2)" }}>{s.label}</p>
              </div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{s.desc}</p>
              {!s.done && i === doneCount && (
                <button onClick={() => navigate(s.path)}
                  className="flex items-center gap-1 text-xs font-semibold mt-auto hover:opacity-80"
                  style={{ color: LIME }}>
                  {s.action} <ArrowRight size={10} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Demo CTA */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: `${LIME}15`, border: `1px solid ${LIME}40` }}>
        <Zap size={14} style={{ color: "#3A5400" }} />
        <p className="text-sm flex-1" style={{ color: "#3A5400" }}>
          <span className="font-semibold">Want to explore first?</span> Preview the dashboard with sample data — no setup required.
        </p>
        <button onClick={activateDemo}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity shrink-0"
          style={{ background: DARK, color: LIME }}>
          Preview with demo data
        </button>
      </div>

      {/* Ghost / skeleton preview */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "AI Visibility Score", val: "??" },
          { label: "Total Citations",     val: "—" },
          { label: "Positive Sentiment",  val: "—" },
          { label: "Unique Queries",      val: "—" },
        ].map((s) => (
          <GhostStatCard key={s.label} label={s.label} val={s.val} />
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Ghost chart */}
        <div className="col-span-3 bg-white rounded-2xl p-5 relative overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold" style={{ color: DARK }}>Citation Trend</p>
              <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>Monthly AI citations over time</p>
            </div>
            <Lock size={13} style={{ color: "#D1D5DB" }} />
          </div>
          {/* Fake bars */}
          <div className="flex items-end gap-3 h-36 relative">
            {[30, 45, 38, 60, 52, 78, 90].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-lg" style={{ height: `${h}%`, background: i === 6 ? "#F3F4F6" : "#F9FAFB", border: "1px solid #F3F4F6" }} />
            ))}
            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(2px)" }}>
              <p className="text-sm font-semibold" style={{ color: DARK }}>No data yet</p>
              <p className="text-xs text-center max-w-48" style={{ color: "#9CA3AF" }}>Your citation trend will appear here after your first AI scan.</p>
              <button onClick={() => navigate("/onboarding")} className="flex items-center gap-1 text-xs font-semibold mt-1 hover:opacity-80" style={{ color: DARK }}>
                Complete setup <ArrowRight size={11} />
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-2 px-1">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
              <span key={m} className="text-xs" style={{ color: "#E5E7EB" }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Ghost model breakdown */}
        <div className="col-span-2 bg-white rounded-2xl p-5 relative" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold" style={{ color: DARK }}>By AI Model</p>
            <Lock size={13} style={{ color: "#D1D5DB" }} />
          </div>
          <div className="space-y-4">
            {["ChatGPT", "Claude", "Perplexity", "Gemini", "Copilot"].map((m, i) => (
              <div key={m}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md" style={{ background: "#F3F4F6" }} />
                    <span className="text-xs font-medium" style={{ color: "#D1D5DB" }}>{m}</span>
                  </div>
                  <span className="text-xs" style={{ color: "#E5E7EB" }}>—</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${55 - i * 10}%`, background: "#F3F4F6" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(2px)" }}>
            <div className="text-center">
              <p className="text-xs font-semibold" style={{ color: "#9CA3AF" }}>Awaiting first scan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ghost bottom row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, title: "Recent Citations",    desc: "Your latest AI mentions across all models — ranked by relevance." },
          { icon: Users,         title: "Creator Leaderboard", desc: "Creators citing your brand most — with social reach and growth." },
          { icon: TrendingUp,    title: "Top Topics",          desc: "Queries that surface your brand most, by category." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl p-5 relative overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Icon size={13} style={{ color: "#D1D5DB" }} />
              <p className="text-sm font-semibold" style={{ color: "#D1D5DB" }}>{title}</p>
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <div className="rounded-lg shrink-0" style={{ width: 24, height: 24, background: "#F3F4F6" }} />
                  <div className="flex-1 space-y-1">
                    <div className="h-2 rounded-full" style={{ background: "#F3F4F6", width: `${85 - n * 12}%` }} />
                    <div className="h-1.5 rounded-full" style={{ background: "#F9FAFB", width: `${60 - n * 8}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-2xl" style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(2px)" }}>
              <Lock size={14} style={{ color: "#D1D5DB" }} />
              <p className="text-xs font-medium text-center px-4" style={{ color: "#9CA3AF" }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GhostStatCard({ label, val }: { label: string; val: string }) {
  return (
    <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <p className="text-xs font-semibold uppercase mb-2" style={{ color: "#E5E7EB", letterSpacing: "0.07em" }}>{label}</p>
      <p className="text-[2rem] font-semibold leading-none" style={{ color: "#E5E7EB" }}>{val}</p>
      <div className="mt-3 h-1 rounded-full" style={{ background: "#F3F4F6", width: "60%" }} />
    </div>
  );
}
