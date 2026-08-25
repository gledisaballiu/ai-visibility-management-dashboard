import { useState } from "react";
import { useOutletContext } from "react-router";
import { CheckCircle, XCircle, MessageSquare, FileText, Globe, Bot, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { agencyClientsData, agencyPipelineData, STAGE_META, type PlannerContentType } from "../../lib/data";
import { usePlanner } from "../../lib/plannerContext";

const FONT = "Inter, -apple-system, system-ui, sans-serif";

const C = {
  page: "#1A1715", card: "#232020", cardLine: "#302B28", inset: "#1B1817",
  t1: "#EFE9E1", t2: "#A9A29B", t3: "#77706A",
  pos: "#4ADE80", neg: "#EF4444",
};

const SHORTLIST_CREATORS = [
  { id: 1, name: "Kelsey Hightower", handle: "@kelseyhightower", reach: "118K", tags: ["High match","LLM citations","Worked with you before"],  reason: "Deep Kubernetes and cloud IDE content. Consistently cited across ChatGPT and Claude for enterprise dev tools queries." },
  { id: 2, name: "swyx",             handle: "@swyx",            reach: "82K",  tags: ["High match","LLM citations"],                            reason: "High Perplexity citation rate. Covers AI engineering for dev teams — aligns with your growing AI positioning." },
  { id: 3, name: "Theo Browne",      handle: "@t3dotgg",         reach: "156K", tags: ["High match"],                                            reason: "Large TypeScript audience that overlaps heavily with your buyer profile. No existing relationship — low-hanging." },
];

const TYPE_LABEL: Partial<Record<PlannerContentType, string>> = {
  youtube:  "YouTube",
  article:  "Article",
  onsite:   "On-site",
  llm_page: "LLM page",
  strategy: "Strategy",
};

function TypeIcon({ type }: { type: string }) {
  if (type === "youtube") return (
    <svg viewBox="0 0 18 13" width={13} height={9} fill="none">
      <rect width="18" height="13" rx="3.5" fill="#FF0000"/>
      <path d="M7.5 9.3V3.7L12.8 6.5Z" fill="white"/>
    </svg>
  );
  if (type === "article") return <FileText size={12} />;
  if (type === "onsite")  return <Globe    size={12} />;
  if (type === "llm_page") return <Bot     size={12} />;
  return <Globe size={12} />;
}

// ─── Discriminated union for selected draft item ────────────────────────────
type DraftSel =
  | { source: "pipeline"; id: number }
  | { source: "planner"; pieceId: number; campaignId: string }
  | null;

type Tab = "shortlists" | "drafts";

const PIPELINE_DRAFTS = agencyPipelineData.filter(p => p.stage === "client_review");

export default function ClientApprovals() {
  const ctx = useOutletContext<{ client: typeof agencyClientsData[0] }>();
  const client = ctx?.client || agencyClientsData[0];

  const { plans, setPlans } = usePlanner();
  const clientPlan = plans.find(p => p.clientId === client.id);

  // Planner pieces at "review" status — these are creator submissions waiting on the client
  const plannerReviewPieces = (clientPlan?.campaigns ?? []).flatMap(c =>
    c.pieces
      .filter(p => p.status === "review")
      .map(p => ({ ...p, campaignId: c.id, campaignName: c.name }))
  );

  const [tab, setTab]                         = useState<Tab>("shortlists");
  const [selectedCreator, setSelectedCreator] = useState<number | null>(SHORTLIST_CREATORS[0]?.id ?? null);
  const [draftSel, setDraftSel]               = useState<DraftSel>(null);

  const [approvedCreators, setApprovedCreators] = useState<Set<number>>(new Set());
  const [rejectedCreators, setRejectedCreators] = useState<Set<number>>(new Set());
  // Pipeline-item local state (static)
  const [approvedPipeline, setApprovedPipeline] = useState<Set<number>>(new Set());
  const [rejectedPipeline, setRejectedPipeline] = useState<Set<number>>(new Set());
  // Planner-piece local decision state (for display after action)
  const [approvedPlanner, setApprovedPlanner]   = useState<Set<number>>(new Set());
  const [rejectedPlanner, setRejectedPlanner]   = useState<Set<number>>(new Set());

  const clientPipelineDrafts = PIPELINE_DRAFTS.filter(d => d.client === client.name);
  const totalDraftCount = clientPipelineDrafts.length + plannerReviewPieces.length;

  // ─── Creator actions ──────────────────────────────────────────────────────
  function approveCreator(id: number) {
    setApprovedCreators(s => new Set([...s, id]));
    setRejectedCreators(s => { const n = new Set(s); n.delete(id); return n; });
    toast.success("Creator approved — your account manager will reach out.");
  }
  function rejectCreator(id: number) {
    setRejectedCreators(s => new Set([...s, id]));
    setApprovedCreators(s => { const n = new Set(s); n.delete(id); return n; });
    toast("Creator declined. We'll suggest an alternative.");
  }

  // ─── Pipeline draft actions ────────────────────────────────────────────────
  function approvePipeline(id: number) {
    setApprovedPipeline(s => new Set([...s, id]));
    setRejectedPipeline(s => { const n = new Set(s); n.delete(id); return n; });
    toast.success("Draft approved — creator notified.");
  }
  function rejectPipeline(id: number) {
    setRejectedPipeline(s => new Set([...s, id]));
    setApprovedPipeline(s => { const n = new Set(s); n.delete(id); return n; });
    toast("Draft sent back for revisions.");
  }

  // ─── Planner piece actions — update shared context ─────────────────────────
  function approvePlannerPiece(campaignId: string, pieceId: number) {
    setPlans((prev: typeof plans) => prev.map(p => p.clientId !== client.id ? p : {
      ...p,
      campaigns: p.campaigns.map(c => c.id !== campaignId ? c : {
        ...c,
        pieces: c.pieces.map(pi => pi.id !== pieceId ? pi : { ...pi, status: "published" as const }),
      }),
    }));
    setApprovedPlanner(s => new Set([...s, pieceId]));
    setRejectedPlanner(s => { const n = new Set(s); n.delete(pieceId); return n; });
    toast.success("Content approved — published to your channels!");
  }

  function declinePlannerPiece(campaignId: string, pieceId: number) {
    setPlans((prev: typeof plans) => prev.map(p => p.clientId !== client.id ? p : {
      ...p,
      campaigns: p.campaigns.map(c => c.id !== campaignId ? c : {
        ...c,
        pieces: c.pieces.map(pi => pi.id !== pieceId ? pi : { ...pi, status: "draft" as const }),
      }),
    }));
    setRejectedPlanner(s => new Set([...s, pieceId]));
    setApprovedPlanner(s => { const n = new Set(s); n.delete(pieceId); return n; });
    toast("Sent back for revisions — creator will be notified.");
  }

  const currentCreator = SHORTLIST_CREATORS.find(c => c.id === selectedCreator);

  const currentPipelineDraft = draftSel?.source === "pipeline"
    ? clientPipelineDrafts.find(d => d.id === draftSel.id) ?? PIPELINE_DRAFTS.find(d => d.id === draftSel.id)
    : null;

  const currentPlannerPiece = draftSel?.source === "planner"
    ? plannerReviewPieces.find(p => p.id === draftSel.pieceId)
    : null;

  return (
    <div style={{ background: C.page, padding: "26px 28px", fontFamily: FONT, minHeight: "calc(100vh - 72px)", boxSizing: "border-box" }}>
      <div style={{ display: "flex", gap: 20 }}>

        {/* Left: tabs + list */}
        <div style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, width: 380, minWidth: 380, display: "flex", flexDirection: "column" }}>
          {/* Tab pills */}
          <div style={{ padding: "14px 16px 0", display: "flex", gap: 4, borderBottom: `1px solid ${C.cardLine}` }}>
            {([
              { key: "shortlists" as Tab, label: "Creator shortlists", count: SHORTLIST_CREATORS.length },
              { key: "drafts"     as Tab, label: "Content to approve", count: totalDraftCount },
            ]).map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  fontSize: 12, fontWeight: 600, padding: "6px 12px 10px", cursor: "pointer",
                  background: "none", border: "none",
                  color: tab === t.key ? C.t1 : C.t3,
                  borderBottom: tab === t.key ? `2px solid ${C.t1}` : "2px solid transparent",
                  marginBottom: -1,
                }}>
                {t.label}
                <span style={{ marginLeft: 5, fontSize: 10, background: tab === t.key ? "#86E03A" : C.inset, color: tab === t.key ? "#0B0A0A" : C.t3, borderRadius: 999, padding: "1px 6px" }}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {/* Creator shortlists */}
            {tab === "shortlists" && SHORTLIST_CREATORS.map(creator => {
              const approved = approvedCreators.has(creator.id);
              const rejected = rejectedCreators.has(creator.id);
              const isSelected = selectedCreator === creator.id;
              return (
                <div key={creator.id} onClick={() => setSelectedCreator(creator.id)}
                  style={{ padding: "14px 16px", cursor: "pointer", background: isSelected ? "rgba(134,224,58,0.1)" : "transparent", borderLeft: isSelected ? "3px solid #86E03A" : "3px solid transparent", borderBottom: `1px solid ${C.cardLine}` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{creator.name}</div>
                    {approved && <span style={{ fontSize: 10, fontWeight: 600, color: C.pos, background: "rgba(74,222,128,0.15)", borderRadius: 999, padding: "1px 7px" }}>Approved</span>}
                    {rejected && <span style={{ fontSize: 10, fontWeight: 600, color: C.neg, background: "rgba(239,68,68,0.15)", borderRadius: 999, padding: "1px 7px" }}>Declined</span>}
                  </div>
                  <div style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>{creator.handle} · {creator.reach} reach</div>
                  <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                    {creator.tags.map(t => (
                      <span key={t} style={{ fontSize: 10, background: "rgba(134,224,58,0.15)", color: "#86E03A", borderRadius: 999, padding: "2px 6px" }}>{t}</span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Drafts / approvals */}
            {tab === "drafts" && (
              <>
                {/* Planner-submitted pieces — creator submissions */}
                {plannerReviewPieces.length > 0 && (
                  <div>
                    <div style={{ padding: "8px 16px 6px", fontSize: 10, fontWeight: 700, color: C.t3, textTransform: "uppercase", letterSpacing: "0.06em", background: "rgba(59,130,246,0.06)", borderBottom: `1px solid ${C.cardLine}` }}>
                      Creator submissions
                    </div>
                    {plannerReviewPieces.map(piece => {
                      const wasApproved = approvedPlanner.has(piece.id);
                      const wasDeclined = rejectedPlanner.has(piece.id);
                      const isSelected  = draftSel?.source === "planner" && draftSel.pieceId === piece.id;
                      return (
                        <div
                          key={piece.id}
                          onClick={() => setDraftSel({ source: "planner", pieceId: piece.id, campaignId: piece.campaignId })}
                          style={{ padding: "13px 16px", cursor: "pointer", background: isSelected ? "rgba(59,130,246,0.1)" : "transparent", borderLeft: isSelected ? "3px solid #60A5FA" : "3px solid transparent", borderBottom: `1px solid ${C.cardLine}`, transition: "all 100ms" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{piece.title}</div>
                            {wasApproved && <span style={{ fontSize: 10, fontWeight: 600, color: C.pos, background: "rgba(74,222,128,0.15)", borderRadius: 999, padding: "1px 7px", flexShrink: 0 }}>Approved</span>}
                            {wasDeclined && <span style={{ fontSize: 10, fontWeight: 600, color: C.neg, background: "rgba(239,68,68,0.15)", borderRadius: 999, padding: "1px 7px", flexShrink: 0 }}>Declined</span>}
                            {!wasApproved && !wasDeclined && <span style={{ fontSize: 10, fontWeight: 700, color: "#60A5FA", background: "rgba(59,130,246,0.15)", borderRadius: 999, padding: "1px 7px", flexShrink: 0 }}>New</span>}
                          </div>
                          <div style={{ fontSize: 11, color: C.t3 }}>
                            {piece.creator ?? "YardGEO"} · {TYPE_LABEL[piece.type as PlannerContentType] ?? piece.type}
                          </div>
                          <div style={{ fontSize: 11, color: C.t3, marginTop: 1 }}>Campaign: {piece.campaignName}</div>
                          {piece.citationCount !== undefined && (
                            <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 600, color: C.pos }}>
                              <TrendingUp size={10} />{piece.citationCount} citations
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pipeline drafts */}
                {clientPipelineDrafts.length > 0 && (
                  <div>
                    {plannerReviewPieces.length > 0 && (
                      <div style={{ padding: "8px 16px 6px", fontSize: 10, fontWeight: 700, color: C.t3, textTransform: "uppercase", letterSpacing: "0.06em", background: C.inset, borderBottom: `1px solid ${C.cardLine}` }}>
                        Agency drafts
                      </div>
                    )}
                    {clientPipelineDrafts.map(draft => {
                      const approved  = approvedPipeline.has(draft.id);
                      const rejected  = rejectedPipeline.has(draft.id);
                      const isSelected = draftSel?.source === "pipeline" && draftSel.id === draft.id;
                      const stage = STAGE_META[draft.stage];
                      return (
                        <div key={draft.id} onClick={() => setDraftSel({ source: "pipeline", id: draft.id })}
                          style={{ padding: "14px 16px", cursor: "pointer", background: isSelected ? "rgba(134,224,58,0.1)" : "transparent", borderLeft: isSelected ? "3px solid #86E03A" : "3px solid transparent", borderBottom: `1px solid ${C.cardLine}` }}>
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, flex: 1 }}>{draft.title}</div>
                            {approved && <span style={{ fontSize: 10, fontWeight: 600, color: C.pos, background: "rgba(74,222,128,0.15)", borderRadius: 999, padding: "1px 7px", flexShrink: 0 }}>Approved</span>}
                            {rejected && <span style={{ fontSize: 10, fontWeight: 600, color: C.neg, background: "rgba(239,68,68,0.15)", borderRadius: 999, padding: "1px 7px", flexShrink: 0 }}>Declined</span>}
                            {!approved && !rejected && <span style={{ fontSize: 10, fontWeight: 500, background: stage.bg, color: stage.color, borderRadius: 999, padding: "1px 7px", flexShrink: 0 }}>{stage.label}</span>}
                          </div>
                          <div style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>{draft.creator} · {draft.type}</div>
                          <div style={{ fontSize: 11, color: C.t3, marginTop: 2 }}>Due {draft.dueDate}</div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {totalDraftCount === 0 && (
                  <div style={{ padding: "40px 20px", fontSize: 13, color: C.t3, textAlign: "center" }}>
                    No content to review right now.
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right: detail panel */}
        <div style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, flex: 1, display: "flex", flexDirection: "column" }}>

          {/* Creator shortlist detail */}
          {tab === "shortlists" && currentCreator && (
            <>
              <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.cardLine}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: C.t1, marginBottom: 4 }}>{currentCreator.name}</div>
                    <div style={{ fontSize: 13, color: C.t3 }}>{currentCreator.handle} · {currentCreator.reach} reach</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {!approvedCreators.has(currentCreator.id) && !rejectedCreators.has(currentCreator.id) && (
                      <>
                        <button onClick={() => approveCreator(currentCreator.id)}
                          style={{ display: "flex", alignItems: "center", gap: 6, background: "#86E03A", color: "#0B0A0A", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                          <CheckCircle size={15} /> Approve
                        </button>
                        <button onClick={() => rejectCreator(currentCreator.id)}
                          style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,0.15)", color: C.neg, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                          <XCircle size={15} /> Request different
                        </button>
                      </>
                    )}
                    {approvedCreators.has(currentCreator.id) && (
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.pos, background: "rgba(74,222,128,0.15)", borderRadius: 8, padding: "8px 16px" }}>✓ Approved</span>
                    )}
                    {rejectedCreators.has(currentCreator.id) && (
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.neg, background: "rgba(239,68,68,0.15)", borderRadius: 8, padding: "8px 16px" }}>✕ Declined</span>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                <div style={{ background: C.inset, border: `1px solid ${C.cardLine}`, borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.t3, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Why your account manager picked this creator</div>
                  <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.6 }}>{currentCreator.reason}</div>
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 20 }}>
                  {currentCreator.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, background: "rgba(134,224,58,0.15)", color: "#86E03A", borderRadius: 999, padding: "3px 10px" }}>{t}</span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Planner piece detail */}
          {tab === "drafts" && currentPlannerPiece && (
            <>
              <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.cardLine}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, background: "rgba(59,130,246,0.15)", color: "#60A5FA", borderRadius: 999, padding: "2px 9px" }}>
                        <TypeIcon type={currentPlannerPiece.type} />
                        {TYPE_LABEL[currentPlannerPiece.type as PlannerContentType] ?? currentPlannerPiece.type}
                      </span>
                      <span style={{ fontSize: 11, color: C.t3 }}>{currentPlannerPiece.campaignName}</span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: C.t1, marginBottom: 4 }}>{currentPlannerPiece.title}</div>
                    <div style={{ fontSize: 13, color: C.t3 }}>
                      {currentPlannerPiece.creator ?? "YardGEO"} · Due {currentPlannerPiece.dueDate}
                      {currentPlannerPiece.citationCount !== undefined && (
                        <span style={{ marginLeft: 10, display: "inline-flex", alignItems: "center", gap: 3, color: C.pos, fontWeight: 600 }}>
                          <TrendingUp size={11} />{currentPlannerPiece.citationCount} citations
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    {!approvedPlanner.has(currentPlannerPiece.id) && !rejectedPlanner.has(currentPlannerPiece.id) && (
                      <>
                        <button
                          onClick={() => approvePlannerPiece(currentPlannerPiece.campaignId, currentPlannerPiece.id)}
                          style={{ display: "flex", alignItems: "center", gap: 6, background: "#86E03A", color: "#0B0A0A", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                          <CheckCircle size={15} />Approve & Publish
                        </button>
                        <button
                          onClick={() => declinePlannerPiece(currentPlannerPiece.campaignId, currentPlannerPiece.id)}
                          style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,0.15)", color: C.neg, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                          <MessageSquare size={15} />Request changes
                        </button>
                      </>
                    )}
                    {approvedPlanner.has(currentPlannerPiece.id) && (
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.pos, background: "rgba(74,222,128,0.15)", borderRadius: 8, padding: "8px 16px" }}>✓ Approved & Published</span>
                    )}
                    {rejectedPlanner.has(currentPlannerPiece.id) && (
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.neg, background: "rgba(239,68,68,0.15)", borderRadius: 8, padding: "8px 16px" }}>✕ Changes requested</span>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                <div style={{ background: "rgba(59,130,246,0.06)", border: `1px solid rgba(59,130,246,0.2)`, borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#60A5FA", marginBottom: 4 }}>CREATOR SUBMISSION</div>
                  <div style={{ fontSize: 12, color: "#93C5FD" }}>
                    <strong>{currentPlannerPiece.creator ?? "Your team"}</strong> has submitted this piece for your approval. Review it and either approve to publish or request changes.
                  </div>
                </div>
                <div style={{ background: C.inset, border: `1px solid ${C.cardLine}`, borderRadius: 12, padding: "16px 18px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.t3, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Draft preview</div>
                  <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.7 }}>
                    This is a placeholder for the full draft. In production, the actual content — including text, images, and links — would appear here.
                    Your account manager has reviewed this for brand safety and GEO strategy alignment before surfacing it to you.
                  </div>
                </div>
                <div style={{ marginTop: 16, padding: "12px 16px", background: C.inset, borderRadius: 10, border: `1px solid ${C.cardLine}` }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.t3, marginBottom: 4 }}>What happens when you approve?</div>
                  <div style={{ fontSize: 12, color: C.t3, lineHeight: 1.6 }}>
                    The piece status updates to <span style={{ color: C.pos, fontWeight: 600 }}>Published</span> across your plan. Your account manager and the creator are notified. The piece becomes visible in your Campaigns view.
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Pipeline draft detail */}
          {tab === "drafts" && currentPipelineDraft && (
            <>
              <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.cardLine}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: C.t1, marginBottom: 4 }}>{currentPipelineDraft.title}</div>
                    <div style={{ fontSize: 13, color: C.t3 }}>{currentPipelineDraft.creator} · {currentPipelineDraft.type} · Due {currentPipelineDraft.dueDate}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {!approvedPipeline.has(currentPipelineDraft.id) && !rejectedPipeline.has(currentPipelineDraft.id) && (
                      <>
                        <button onClick={() => approvePipeline(currentPipelineDraft.id)}
                          style={{ display: "flex", alignItems: "center", gap: 6, background: "#86E03A", color: "#0B0A0A", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                          <CheckCircle size={15} /> Approve
                        </button>
                        <button onClick={() => rejectPipeline(currentPipelineDraft.id)}
                          style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,0.15)", color: C.neg, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                          <MessageSquare size={15} /> Request changes
                        </button>
                      </>
                    )}
                    {approvedPipeline.has(currentPipelineDraft.id) && (
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.pos, background: "rgba(74,222,128,0.15)", borderRadius: 8, padding: "8px 16px" }}>✓ Approved</span>
                    )}
                    {rejectedPipeline.has(currentPipelineDraft.id) && (
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.neg, background: "rgba(239,68,68,0.15)", borderRadius: 8, padding: "8px 16px" }}>✕ Changes requested</span>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                  {currentPipelineDraft.topics.map((t: string) => (
                    <span key={t} style={{ fontSize: 11, background: C.inset, border: `1px solid ${C.cardLine}`, borderRadius: 999, padding: "3px 10px", color: C.t2 }}>{t}</span>
                  ))}
                </div>
                <div style={{ background: C.inset, border: `1px solid ${C.cardLine}`, borderRadius: 12, padding: "16px 18px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.t3, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Draft preview</div>
                  <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.7 }}>
                    This is a placeholder for the draft content. The actual draft would be displayed here with full formatting, images, and links.
                    Your account manager has reviewed this draft for brand safety and alignment with your GEO strategy before sending it to you.
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Empty state */}
          {((tab === "shortlists" && !currentCreator) || (tab === "drafts" && !draftSel)) && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: C.t3, fontSize: 13, flexDirection: "column", gap: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.inset, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={18} style={{ color: C.t3 }} />
              </div>
              <p>Select an item to review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
