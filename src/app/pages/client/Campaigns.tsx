import { useState } from "react";
import { useOutletContext } from "react-router";
import { Calendar, Globe, Users, TrendingUp, CheckCircle, RotateCcw, FileText, Bot, Phone, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { agencyClientsData, agencyCampaignsData, LIME, type PieceStatus, type PlannerContentType, type ContentPiece } from "../../lib/data";
import { usePlanner } from "../../lib/plannerContext";
import { C } from "../../lib/theme";

const FONT = "Inter, -apple-system, system-ui, sans-serif";

const TYPE_META: Record<PlannerContentType, { label: string; color: string; bg: string }> = {
  youtube:  { label: "YouTube",  color: "#EF4444", bg: "rgba(239,68,68,0.1)"  },
  article:  { label: "Article",  color: C.prog, bg: "rgba(47,128,245,0.1)" },
  onsite:   { label: "On-site",  color: C.pos, bg: "rgba(74,222,128,0.1)" },
  strategy: { label: "Strategy", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  llm_page: { label: "LLM page", color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
};

const STATUS_META: Record<PieceStatus, { label: string; color: string; bg: string }> = {
  idea:      { label: "Planning",          color: "#71717A", bg: "rgba(113,113,122,0.12)" },
  brief:     { label: "Briefed",           color: "#8B5CF6", bg: "rgba(139,92,246,0.12)"  },
  draft:     { label: "In Progress",       color: "#F59E0B", bg: "rgba(245,158,11,0.12)"  },
  review:    { label: "Needs Your Review", color: C.prog, bg: "rgba(47,128,245,0.12)"  },
  published: { label: "Live",              color: C.pos, bg: "rgba(74,222,128,0.12)"  },
};

function TypeIcon({ type }: { type: PlannerContentType }) {
  if (type === "youtube") {
    return (
      <svg viewBox="0 0 18 13" width={14} height={10} fill="none">
        <rect width="18" height="13" rx="3.5" fill="#FF0000"/>
        <path d="M7.5 9.3V3.7L12.8 6.5Z" fill="white"/>
      </svg>
    );
  }
  const icons: Record<string, React.ReactNode> = {
    article:  <FileText size={13} />,
    onsite:   <Globe    size={13} />,
    strategy: <Phone    size={13} />,
    llm_page: <Bot      size={13} />,
  };
  return <>{icons[type] ?? <Globe size={13} />}</>;
}

export default function ClientCampaigns() {
  const ctx = useOutletContext<{ client: typeof agencyClientsData[0] }>();
  const client = ctx?.client || agencyClientsData[0];
  const { plans, setPlans } = usePlanner();

  const plan = plans.find(p => p.clientId === client.id);
  const campaigns = plan?.campaigns ?? [];

  const staticMetas = agencyCampaignsData.filter(c => c.client === client.name);

  const [selectedId, setSelectedId] = useState<string | null>(campaigns[0]?.id ?? null);
  const [expandedPieces, setExpandedPieces] = useState(true);

  const selectedCampaign = campaigns.find(c => c.id === selectedId);
  const staticMeta = selectedCampaign ? staticMetas.find(c => c.name === selectedCampaign.name) : null;

  const reviewCount = selectedCampaign
    ? selectedCampaign.pieces.filter(p => p.status === "review").length
    : 0;

  function approvePiece(campaignId: string, pieceId: number) {
    setPlans((prev: typeof plans) => prev.map(p => p.clientId !== client.id ? p : {
      ...p,
      campaigns: p.campaigns.map(c => c.id !== campaignId ? c : {
        ...c,
        pieces: c.pieces.map(pi => pi.id !== pieceId ? pi : { ...pi, status: "published" as PieceStatus }),
      }),
    }));
    toast.success("Content approved — it will go live shortly.");
  }

  function requestChanges(campaignId: string, pieceId: number) {
    setPlans((prev: typeof plans) => prev.map(p => p.clientId !== client.id ? p : {
      ...p,
      campaigns: p.campaigns.map(c => c.id !== campaignId ? c : {
        ...c,
        pieces: c.pieces.map(pi => pi.id !== pieceId ? pi : { ...pi, status: "draft" as PieceStatus }),
      }),
    }));
    toast("Changes requested — creator will be notified to revise.");
  }

  function getCampaignSummary(pieces: ContentPiece[]) {
    const total = pieces.length;
    const live  = pieces.filter(p => p.status === "published").length;
    const forReview = pieces.filter(p => p.status === "review").length;
    return { total, live, forReview };
  }

  return (
    <div style={{ background: C.page, padding: "26px 28px", fontFamily: FONT, minHeight: "calc(100vh - 72px)", boxSizing: "border-box" }}>
      <div style={{ display: "flex", gap: 20, height: "calc(100vh - 128px)" }}>

        {/* Left: campaign list */}
        <div style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, width: 340, minWidth: 340, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${C.cardLine}` }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.t1 }}>Campaigns</div>
            <div style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>{campaigns.length} active for {client.name}</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {campaigns.length === 0 && (
              <div style={{ padding: 32, fontSize: 13, color: C.t3, textAlign: "center" }}>
                No campaigns set up yet.<br />Your account manager will add them soon.
              </div>
            )}
            {campaigns.map(camp => {
              const isActive = camp.id === selectedId;
              const { total, live, forReview } = getCampaignSummary(camp.pieces);
              const meta = staticMetas.find(c => c.name === camp.name);
              return (
                <button
                  key={camp.id}
                  onClick={() => setSelectedId(camp.id)}
                  style={{
                    width: "100%", textAlign: "left", padding: "14px 20px",
                    cursor: "pointer", background: isActive ? "rgba(198,242,78,0.08)" : "transparent",
                    borderLeft: isActive ? `3px solid ${LIME}` : "3px solid transparent",
                    borderBottom: `1px solid ${C.cardLine}`,
                    transition: "all 100ms",
                  }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 5 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, flex: 1, paddingRight: 8 }}>{camp.name}</div>
                    {forReview > 0 && (
                      <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(47,128,245,0.15)", color: C.prog, borderRadius: 999, padding: "1px 7px", flexShrink: 0 }}>
                        {forReview} to review
                      </span>
                    )}
                  </div>
                  {meta && (
                    <div style={{ display: "flex", gap: 10, fontSize: 11, color: C.t3, marginBottom: 5, flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Calendar size={10} /> {meta.start} – {meta.end}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Globe size={10} /> {meta.contentType}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 10, fontSize: 11, color: C.t3 }}>
                    <span>{total} pieces</span>
                    <span style={{ color: C.pos, fontWeight: 600 }}>{live} live</span>
                  </div>
                  {meta && meta.citationLift > 0 && (
                    <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 600, color: C.pos }}>
                      <TrendingUp size={10} /> +{meta.citationLift}% citation lift
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: campaign detail + piece list */}
        <div style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {!selectedCampaign ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: C.t3, fontSize: 13 }}>
              Select a campaign
            </div>
          ) : (
            <>
              {/* Campaign header */}
              <div style={{ padding: "18px 24px 14px", borderBottom: `1px solid ${C.cardLine}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: C.t1, marginBottom: 4 }}>{selectedCampaign.name}</div>
                    {staticMeta && (
                      <div style={{ display: "flex", gap: 14, fontSize: 12, color: C.t3, flexWrap: "wrap" }}>
                        <span>{staticMeta.start} → {staticMeta.end}</span>
                        <span style={{ fontWeight: 600, color: C.t2 }}>{staticMeta.budget}</span>
                        <span>{staticMeta.creators.length > 0 && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <Users size={10} /> {staticMeta.creators.join(", ")}
                          </span>
                        )}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
                    {[
                      { label: "Total",     value: selectedCampaign.pieces.length,                                        color: C.t1    },
                      { label: "Live",      value: selectedCampaign.pieces.filter(p => p.status === "published").length,  color: C.pos   },
                      { label: "To review", value: reviewCount,                                                            color: C.prog },
                    ].map(({ label, value, color }) => (
                      <div key={label} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 18, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
                        <div style={{ fontSize: 10, color: C.t3, marginTop: 3 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Piece list section */}
              <div style={{ flex: 1, overflowY: "auto" }}>
                {/* Section header */}
                <button
                  onClick={() => setExpandedPieces(o => !o)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderBottom: `1px solid ${C.cardLine}`, cursor: "pointer", background: "transparent" }}>
                  <span style={{ color: C.t3 }}>{expandedPieces ? <ChevronDown size={13} /> : <ChevronRight size={13} />}</span>
                  <p style={{ fontSize: 12, fontWeight: 600, color: C.t2, flex: 1, textAlign: "left" }}>
                    Content pieces
                    <span style={{ marginLeft: 6, fontSize: 11, color: C.t3 }}>({selectedCampaign.pieces.length})</span>
                  </p>
                  {reviewCount > 0 && (
                    <span style={{ fontSize: 11, fontWeight: 700, background: "rgba(47,128,245,0.15)", color: C.prog, borderRadius: 999, padding: "2px 8px" }}>
                      {reviewCount} awaiting your approval
                    </span>
                  )}
                </button>

                {expandedPieces && (
                  <div>
                    {selectedCampaign.pieces.length === 0 ? (
                      <div style={{ padding: "32px 24px", fontSize: 13, color: C.t3, textAlign: "center" }}>
                        No content pieces in this campaign yet.
                      </div>
                    ) : (
                      selectedCampaign.pieces.map((piece, i) => {
                        const tm = TYPE_META[piece.type];
                        const sm = STATUS_META[piece.status];
                        const needsReview = piece.status === "review";
                        return (
                          <div
                            key={piece.id}
                            style={{
                              display: "flex", alignItems: "center", gap: 12,
                              padding: "12px 24px",
                              borderBottom: i < selectedCampaign.pieces.length - 1 ? `1px solid ${C.cardLine}` : "none",
                              background: needsReview ? "rgba(47,128,245,0.04)" : "transparent",
                              transition: "background 150ms",
                            }}
                            onMouseEnter={e => { if (!needsReview) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = needsReview ? "rgba(47,128,245,0.04)" : "transparent"; }}>
                            {/* Type badge */}
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 600, background: tm.bg, color: tm.color, borderRadius: 999, padding: "2px 8px", flexShrink: 0, whiteSpace: "nowrap" }}>
                              <TypeIcon type={piece.type} />{tm.label}
                            </span>

                            {/* Title */}
                            <p style={{ flex: 1, fontSize: 13, fontWeight: 500, color: C.t1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {piece.title}
                            </p>

                            {/* Creator */}
                            <span style={{ fontSize: 11, color: C.t3, width: 110, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {piece.creator ?? (piece.type === "onsite" || piece.type === "llm_page" ? "YardGEO" : "—")}
                            </span>

                            {/* Citations */}
                            {piece.citationCount !== undefined ? (
                              <span style={{ fontSize: 11, fontWeight: 600, color: C.pos, width: 70, flexShrink: 0, display: "flex", alignItems: "center", gap: 3 }}>
                                <TrendingUp size={10} />{piece.citationCount}
                              </span>
                            ) : (
                              <span style={{ fontSize: 11, color: C.t3, width: 70, flexShrink: 0 }}>—</span>
                            )}

                            {/* Status or action buttons */}
                            {needsReview ? (
                              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                <button
                                  onClick={() => approvePiece(selectedCampaign.id, piece.id)}
                                  style={{ display: "flex", alignItems: "center", gap: 5, background: LIME, color: "#0B0A0A", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                                  <CheckCircle size={13} />Approve
                                </button>
                                <button
                                  onClick={() => requestChanges(selectedCampaign.id, piece.id)}
                                  style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(245,158,11,0.15)", color: "#F59E0B", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                                  <RotateCcw size={12} />Revise
                                </button>
                              </div>
                            ) : (
                              <span style={{ fontSize: 11, fontWeight: 600, background: sm.bg, color: sm.color, borderRadius: 999, padding: "2px 9px", flexShrink: 0 }}>
                                {sm.label}
                              </span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>

              {/* Bottom call-to-action for review items */}
              {reviewCount > 0 && (
                <div style={{ padding: "12px 24px", borderTop: `1px solid ${C.cardLine}`, background: "rgba(47,128,245,0.05)", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.prog, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: "#93C5FD", flex: 1 }}>
                    <span style={{ fontWeight: 700 }}>{reviewCount} piece{reviewCount !== 1 ? "s" : ""}</span> submitted for your approval above.
                    Approve to publish or request revisions.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
