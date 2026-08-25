import { useState } from "react";
import { TrendingUp, TrendingDown, X, Mail, ExternalLink, UserMinus } from "lucide-react";
import { FONT, creatorsData, agencyCampaignsData, CREATOR_STACKS, agencyClientsData } from "../../lib/data";
import { usePlanner } from "../../lib/plannerContext";

const C = {
  page: "#0B0A0A", shell: "#1A1715", card: "#232020", cardLine: "#302B28",
  inset: "#1B1817", hover: "#2E2A27",
  t1: "#EFE9E1", t2: "#A9A29B", t3: "#77706A",
  cream: "#EDE8E0", pos: "#4ADE80", neg: "#EF4444", attn: "#F79521", prog: "#2F80F5",
};

// ─── Platform icons ─────────────────────────────────────────────────────────────
function TwitterIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 14 14" width={size} height={size} fill="none">
      <rect width="14" height="14" rx="3" fill="#000" />
      <path d="M8.23 6.18 11.54 2.5h-.78L7.89 5.71 5.72 2.5H3.12l3.47 5.05L3.12 11.5h.78l3.04-3.53 2.42 3.53h2.6L8.23 6.18Zm-1.08 1.25-.35-.5L4.16 3.1h1.2l2.25 3.22.35.5 2.93 4.19h-1.2L7.15 7.43Z"
        fill="white" />
    </svg>
  );
}

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 14 14" width={size} height={size} fill="none">
      <rect width="14" height="14" rx="3" fill="#24292F" />
      <path fillRule="evenodd" clipRule="evenodd"
        d="M7 2.2a4.8 4.8 0 0 0-1.517 9.355c.24.044.328-.104.328-.232 0-.114-.004-.416-.006-.817-1.336.29-1.617-.644-1.617-.644-.218-.555-.533-.703-.533-.703-.436-.298.033-.292.033-.292.482.034.736.495.736.495.428.735 1.124.523 1.398.4.043-.31.167-.523.304-.643-1.067-.121-2.188-.533-2.188-2.374 0-.524.187-.952.494-1.288-.05-.122-.214-.61.047-1.27 0 0 .403-.13 1.32.49A4.59 4.59 0 0 1 7 5.2c.36.002.724.049 1.063.143.917-.62 1.32-.49 1.32-.49.261.66.097 1.148.048 1.27.308.336.493.764.493 1.288 0 1.846-1.123 2.252-2.193 2.37.172.148.326.44.326.887 0 .641-.005 1.158-.005 1.315 0 .129.086.279.33.232A4.802 4.802 0 0 0 7 2.2Z"
        fill="white" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 14 14" width={size} height={size} fill="none">
      <rect width="14" height="14" rx="3" fill="#0A66C2" />
      <path d="M4.18 11.5V5.57H2.47V11.5H4.18Zm-.86-6.74a.997.997 0 1 0 0-1.993A.997.997 0 0 0 3.32 4.76Zm8.18 6.74H9.79V8.6c0-.64-.013-1.46-.89-1.46-.891 0-1.028.696-1.028 1.415V11.5H6.16V5.57h1.64v.754h.023c.228-.432.786-.888 1.617-.888 1.73 0 2.05 1.139 2.05 2.62V11.5h-.01Z"
        fill="white" />
    </svg>
  );
}

function YouTubeIcon({ size = 14 }: { size?: number }) {
  const h = Math.round(size * 10 / 14);
  return (
    <svg viewBox="0 0 14 10" width={size} height={h} fill="none">
      <rect width="14" height="10" rx="2.5" fill="#FF0000" />
      <path d="M5.8 7.2V2.8L9.5 5Z" fill="white" />
    </svg>
  );
}

// ─── Sparkline ──────────────────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const W = 60, H = 24;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 4) - 2}`
  ).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" style={{ display: "block" }}>
      <polyline points={pts} stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ─── Platform pill ──────────────────────────────────────────────────────────────
type Social = {
  twitter?:  { handle: string; followers: string };
  github?:   { handle: string; stars: string };
  linkedin?: { handle: string };
  youtube?:  { channel: string; subscribers: string };
};

function PlatformIcons({ social, size = 13 }: { social?: Social; size?: number }) {
  if (!social) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {social.twitter  && <TwitterIcon  size={size} />}
      {social.youtube  && <YouTubeIcon  size={size} />}
      {social.github   && <GitHubIcon   size={size} />}
      {social.linkedin && <LinkedInIcon size={size} />}
    </div>
  );
}

// ─── Creator detail drawer ──────────────────────────────────────────────────────
type Creator = typeof creatorsData[number];

function CreatorDrawer({
  creator, onClose, unassigned, onUnassign,
}: {
  creator: Creator;
  onClose: () => void;
  unassigned: Set<string>;
  onUnassign: (key: string) => void;
}) {
  const { plans } = usePlanner();
  const notifyEmail = `${creator.handle?.replace("@", "") ?? creator.name.toLowerCase().replace(/\s/g, "")}@notify.yardgeo.com`;
  const campaigns = agencyCampaignsData.filter(c => c.creators.includes(creator.name));

  // Also find creator in plan pieces
  const planAssignments: { clientName: string; campaignName: string; pieceTitle: string; key: string }[] = [];
  plans.forEach(plan => {
    const client = agencyClientsData.find(c => c.id === plan.clientId);
    plan.campaigns.forEach(camp => {
      camp.pieces.forEach(piece => {
        if (piece.creator === creator.name) {
          const key = `${creator.name}::${camp.id}`;
          planAssignments.push({ clientName: client?.name ?? plan.clientId, campaignName: camp.name, pieceTitle: piece.title, key });
        }
      });
    });
  });

  const social = (creator as any).social as Social | undefined;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-30"
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-40 flex flex-col"
        style={{
          width: 360, background: C.shell, borderLeft: `1px solid ${C.cardLine}`,
          fontFamily: FONT,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4"
          style={{ borderBottom: `1px solid ${C.cardLine}` }}>
          <p className="text-sm font-semibold" style={{ color: C.t1 }}>Creator profile</p>
          <button onClick={onClose} className="p-1.5 rounded-lg"
            style={{ background: "transparent" }}
            onMouseEnter={e => (e.currentTarget.style.background = C.hover)}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <X size={14} style={{ color: C.t3 }} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5" style={{ scrollbarWidth: "thin", scrollbarColor: `${C.cardLine} transparent` }}>
          {/* Identity */}
          <div className="flex items-start gap-4">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(creator.name)}&backgroundColor=302B28&textColor=EFE9E1`}
              alt={creator.name}
              style={{ width: 52, height: 52, borderRadius: 999, flexShrink: 0 }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold" style={{ color: C.t1 }}>{creator.name}</p>
              <p className="text-xs mt-0.5" style={{ color: C.t3 }}>{creator.role} · {creator.company}</p>
              <div className="mt-2">
                <PlatformIcons social={social} size={15} />
              </div>
            </div>
          </div>

          {/* Notification email */}
          <div className="px-4 py-3 rounded-xl" style={{ background: C.card, border: `1px solid ${C.cardLine}` }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: C.t3 }}>Notification email</p>
            <div className="flex items-center gap-2">
              <Mail size={13} style={{ color: C.t3 }} />
              <span className="text-xs font-medium" style={{ color: C.t1 }}>{notifyEmail}</span>
            </div>
          </div>

          {/* Social platforms */}
          {social && (
            <div className="px-4 py-3 rounded-xl" style={{ background: C.card, border: `1px solid ${C.cardLine}` }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: C.t3 }}>Social reach</p>
              <div className="space-y-2">
                {social.twitter && (
                  <div className="flex items-center gap-2.5">
                    <TwitterIcon size={15} />
                    <span className="text-xs" style={{ color: C.t2 }}>{social.twitter.handle}</span>
                    <span className="ml-auto text-xs font-semibold" style={{ color: C.t1 }}>{social.twitter.followers}</span>
                  </div>
                )}
                {social.youtube && (
                  <div className="flex items-center gap-2.5">
                    <YouTubeIcon size={15} />
                    <span className="text-xs" style={{ color: C.t2 }}>{social.youtube.channel}</span>
                    <span className="ml-auto text-xs font-semibold" style={{ color: C.t1 }}>{social.youtube.subscribers}</span>
                  </div>
                )}
                {social.github && (
                  <div className="flex items-center gap-2.5">
                    <GitHubIcon size={15} />
                    <span className="text-xs" style={{ color: C.t2 }}>@{social.github.handle}</span>
                    <span className="ml-auto text-xs font-semibold" style={{ color: C.t1 }}>★ {social.github.stars}</span>
                  </div>
                )}
                {social.linkedin && (
                  <div className="flex items-center gap-2.5">
                    <LinkedInIcon size={15} />
                    <span className="text-xs" style={{ color: C.t2 }}>{social.linkedin.handle}</span>
                    <ExternalLink size={11} className="ml-auto" style={{ color: C.t3 }} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Campaign assignments */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: C.t3 }}>
              Campaign assignments ({campaigns.length + planAssignments.length})
            </p>
            <div className="space-y-2">
              {campaigns.map(camp => {
                const key = `${creator.name}::camp-${camp.id}`;
                const isUnassigned = unassigned.has(key);
                return (
                  <div key={camp.id}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl"
                    style={{ background: C.card, border: `1px solid ${C.cardLine}`, opacity: isUnassigned ? 0.4 : 1 }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: isUnassigned ? C.t3 : C.t1 }}>
                        {isUnassigned ? <s>{camp.name}</s> : camp.name}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: C.t3 }}>{camp.client}</p>
                    </div>
                    <button
                      onClick={() => onUnassign(key)}
                      title={isUnassigned ? "Re-assign" : "Unassign"}
                      className="shrink-0 p-1.5 rounded-lg flex items-center gap-1.5 text-[10px] font-medium"
                      style={{ background: isUnassigned ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)", color: isUnassigned ? C.pos : C.neg }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                      <UserMinus size={10} />
                      {isUnassigned ? "Re-assign" : "Unassign"}
                    </button>
                  </div>
                );
              })}

              {planAssignments.map(a => {
                const isUnassigned = unassigned.has(a.key);
                return (
                  <div key={a.key}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl"
                    style={{ background: C.card, border: `1px solid ${C.cardLine}`, opacity: isUnassigned ? 0.4 : 1 }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: isUnassigned ? C.t3 : C.t1 }}>
                        {isUnassigned ? <s>{a.campaignName}</s> : a.campaignName}
                      </p>
                      <p className="text-[10px] mt-0.5 truncate" style={{ color: C.t3 }}>{a.clientName} · {a.pieceTitle}</p>
                    </div>
                    <button
                      onClick={() => onUnassign(a.key)}
                      title={isUnassigned ? "Re-assign" : "Unassign"}
                      className="shrink-0 p-1.5 rounded-lg flex items-center gap-1.5 text-[10px] font-medium"
                      style={{ background: isUnassigned ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)", color: isUnassigned ? C.pos : C.neg }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                      <UserMinus size={10} />
                      {isUnassigned ? "Re-assign" : "Unassign"}
                    </button>
                  </div>
                );
              })}

              {campaigns.length === 0 && planAssignments.length === 0 && (
                <p className="text-xs text-center py-3" style={{ color: C.t3 }}>No active campaign assignments</p>
              )}
            </div>
          </div>

          {/* Citation stats */}
          <div className="px-4 py-3 rounded-xl" style={{ background: C.card, border: `1px solid ${C.cardLine}` }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: C.t3 }}>Performance</p>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xl font-semibold" style={{ color: C.t1 }}>{creator.citations.toLocaleString()}</p>
                <p className="text-[10px]" style={{ color: C.t3 }}>total citations</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold" style={{ color: creator.growth >= 0 ? C.pos : C.neg }}>
                  {creator.growth >= 0 ? "+" : ""}{creator.growth}%
                </p>
                <p className="text-[10px]" style={{ color: C.t3 }}>this month</p>
              </div>
              <Sparkline data={creator.weeklyTrend} color={creator.growth >= 0 ? C.pos : C.neg} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function AgencyCreators() {
  const [selected, setSelected] = useState<Creator | null>(null);
  const [unassigned, setUnassigned] = useState<Set<string>>(new Set());

  const handleUnassign = (key: string) => {
    setUnassigned(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-5" style={{ fontFamily: FONT, padding: "20px 24px" }}>
      {selected && (
        <CreatorDrawer
          creator={selected}
          onClose={() => setSelected(null)}
          unassigned={unassigned}
          onUnassign={handleUnassign}
        />
      )}

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: C.t1 }}>Creator Roster</h1>
          <p className="text-sm mt-0.5" style={{ color: C.t3 }}>{creatorsData.length} creators managed by YardGEO</p>
        </div>
        <button
          className="text-sm font-semibold px-4 py-2 rounded-xl"
          style={{ background: C.cream, color: "#0B0A0A" }}>
          + Add Creator
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Creators", value: creatorsData.length.toString() },
          { label: "Avg Citations",  value: Math.round(creatorsData.reduce((s, c) => s + c.citations, 0) / creatorsData.length).toLocaleString() },
          { label: "Active Now",     value: "6" },
          { label: "Total Citations",value: creatorsData.reduce((s, c) => s + c.citations, 0).toLocaleString() },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl p-4" style={{ background: C.card, border: `1px solid ${C.cardLine}` }}>
            <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: C.t3 }}>{label}</p>
            <p className="text-xl font-semibold" style={{ color: C.t1 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Creator list table */}
      <div style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, overflow: "hidden" }}>
        {/* Header row */}
        <div style={{
          display: "flex", alignItems: "center", padding: "10px 20px",
          borderBottom: `1px solid ${C.cardLine}`, gap: 0,
        }}>
          {[
            { label: "Creator",   width: 240 },
            { label: "Citations", width: 90 },
            { label: "Trend",     width: 80 },
            { label: "Active",    width: 80 },
            { label: "Stack",     flex: 1 },
            { label: "Status",    width: 90 },
          ].map(({ label, width, flex }) => (
            <div key={label} style={{
              flex: flex ?? `0 0 ${width}px`,
              fontSize: 10, fontWeight: 600, color: C.t3,
              textTransform: "uppercase", letterSpacing: "0.06em",
            }}>{label}</div>
          ))}
        </div>

        {creatorsData.map((creator, idx) => {
          const activeCamps = agencyCampaignsData.filter(c => c.creators.includes(creator.name) && c.status === "active");
          const tags = CREATOR_STACKS[creator.name] ?? [];
          const visibleTags = tags.slice(0, 3);
          const extraCount = tags.length - visibleTags.length;
          const isBooked = idx % 2 !== 0;
          const isLast = idx === creatorsData.length - 1;
          const social = (creator as any).social as Social | undefined;
          const isSelected = selected?.id === creator.id;

          return (
            <div
              key={creator.id}
              onClick={() => setSelected(isSelected ? null : creator)}
              style={{
                display: "flex", alignItems: "center", padding: "12px 20px",
                borderBottom: isLast ? "none" : `1px solid ${C.cardLine}`,
                gap: 0, cursor: "pointer", transition: "background 0.15s",
                background: isSelected ? C.hover : "transparent",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = C.hover)}
              onMouseLeave={e => (e.currentTarget.style.background = isSelected ? C.hover : "transparent")}
            >
              {/* Avatar + identity + platform icons */}
              <div style={{ flex: "0 0 240px", display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(creator.name)}&backgroundColor=302B28&textColor=EFE9E1`}
                  alt={creator.name}
                  style={{ width: 36, height: 36, borderRadius: 999, flexShrink: 0 }}
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.t1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 100 }}>
                      {creator.name}
                    </span>
                    <PlatformIcons social={social} size={12} />
                  </div>
                  <div style={{ fontSize: 11, color: C.t3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {creator.role} · {creator.company}
                  </div>
                </div>
              </div>

              {/* Citations */}
              <div style={{ flex: "0 0 90px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, fontVariantNumeric: "tabular-nums" }}>
                  {creator.citations.toLocaleString()}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: creator.growth >= 0 ? C.pos : C.neg }}>
                  {creator.growth >= 0 ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  {creator.growth >= 0 ? "+" : ""}{creator.growth}%
                </div>
              </div>

              {/* Sparkline (SVG polyline) */}
              <div style={{ flex: "0 0 80px", display: "flex", alignItems: "center" }}>
                <Sparkline data={creator.weeklyTrend} color={creator.growth >= 0 ? C.pos : C.neg} />
              </div>

              {/* Active campaigns */}
              <div style={{ flex: "0 0 80px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{activeCamps.length}</div>
                <div style={{ fontSize: 10, color: C.t3 }}>campaigns</div>
              </div>

              {/* Stack tags */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexWrap: "wrap", gap: 4 }}>
                {visibleTags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 6,
                    background: C.inset, color: C.t2, border: `1px solid ${C.cardLine}`,
                    whiteSpace: "nowrap",
                  }}>{tag}</span>
                ))}
                {extraCount > 0 && (
                  <span style={{ fontSize: 10, color: C.t3, padding: "2px 4px" }}>+{extraCount}</span>
                )}
              </div>

              {/* Status chip */}
              <div style={{ flex: "0 0 90px" }}>
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
    </div>
  );
}
