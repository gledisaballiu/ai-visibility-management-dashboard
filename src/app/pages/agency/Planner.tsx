import { useState } from "react";
import { useSearchParams } from "react-router";
import { Plus, FileText, Globe, Phone, Bot, ChevronDown, ChevronRight, X, Check, MessageSquare, Users, AlertTriangle, Building2, ArrowRight, Send, DollarSign, Mail, Filter, TrendingUp } from "lucide-react";
import { Toaster, toast } from "sonner";
import {
  FONT, agencyClientsData, agencyCampaignsData,
  PLAN_QUOTAS, CLIENT_PLANS,
  type PlannerContentType, type PieceStatus, type ContentPiece, type PlanCampaign, type ClientPlan,
} from "../../lib/data";
import { usePlanner, computeDelivered, isBehindOnPlan } from "../../lib/plannerContext";
import { ClientLogo } from "../../lib/ui";
import { C } from "../../lib/theme";

const nid = () => Date.now() + Math.floor(Math.random() * 9999);

type Tier   = "start" | "launch" | "scale";
type Lane   = "off-site" | "on-site";
type SortBy = "default" | "citations_desc" | "citations_asc";

type OnboardedClient = { id: string; name: string; website: string; status: "onboarding"; tier: Tier };

// ─── Brand icon ─────────────────────────────────────────────────────────────────
function YouTubeIcon({ size = 16 }: { size?: number }) {
  const h = Math.round(size * 13 / 18);
  return (
    <svg viewBox="0 0 18 13" width={size} height={h} fill="none">
      <rect width="18" height="13" rx="3.5" fill="#FF0000"/>
      <path d="M7.5 9.3V3.7L12.8 6.5Z" fill="white"/>
    </svg>
  );
}

const OFF_SITE_TYPES: PlannerContentType[] = ["youtube", "article"];
const ON_SITE_TYPES:  PlannerContentType[] = ["onsite", "llm_page"];

function getCampaignLane(pieces: ContentPiece[]): ("off-site" | "on-site")[] {
  const out: ("off-site" | "on-site")[] = [];
  if (pieces.some(p => OFF_SITE_TYPES.includes(p.type))) out.push("off-site");
  if (pieces.some(p => ON_SITE_TYPES.includes(p.type)))  out.push("on-site");
  return out;
}

const TYPE_META: Record<PlannerContentType, { label: string; Icon: React.ComponentType<any>; color: string; bg: string; short: string }> = {
  youtube:  { label: "YouTube video",    Icon: YouTubeIcon, color: "#EF4444", bg: "rgba(239,68,68,0.1)",  short: "YouTube"  },
  article:  { label: "Off-site article", Icon: FileText,    color: C.prog, bg: "rgba(47,128,245,0.1)", short: "Off-site" },
  onsite:   { label: "On-site piece",    Icon: Globe,       color: C.pos, bg: "rgba(74,222,128,0.1)", short: "On-site"  },
  strategy: { label: "Strategy call",    Icon: Phone,       color: "#F59E0B", bg: "rgba(245,158,11,0.1)", short: "Strategy" },
  llm_page: { label: "LLM info page",    Icon: Bot,         color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", short: "LLM page" },
};

const STATUS_ORDER: PieceStatus[] = ["idea", "brief", "draft", "review", "published"];
const STATUS_META: Record<PieceStatus, { label: string; color: string; bg: string }> = {
  idea:      { label: "Idea",      color: "#71717A", bg: "rgba(113,113,122,0.12)" },
  brief:     { label: "Brief",     color: "#8B5CF6", bg: "rgba(139,92,246,0.12)"  },
  draft:     { label: "In Draft",  color: "#F59E0B", bg: "rgba(245,158,11,0.12)"  },
  review:    { label: "Review",    color: "#3B82F6", bg: "rgba(59,130,246,0.12)"  },
  published: { label: "Published", color: C.pos, bg: "rgba(74,222,128,0.12)"  },
};

const TIER_META: Record<Tier, { label: string; price: string; color: string; bg: string; deliverables: string; desc: string }> = {
  start:  { label: "Start",  price: "$12.5K/mo", color: "#6B7280", bg: "rgba(107,114,128,0.08)", deliverables: "2 YouTube · 4 articles · 2 on-site", desc: "Establish your voice with consistent creator content." },
  launch: { label: "Launch", price: "$22.5K/mo", color: "#F59E0B", bg: "rgba(245,158,11,0.1)",   deliverables: "4 YouTube · 8 articles · 4 on-site · LLM page", desc: "Accelerate reach with multi-channel execution." },
  scale:  { label: "Scale",  price: "$45.5K/mo", color: C.pos, bg: "rgba(74,222,128,0.1)",   deliverables: "8 YouTube · 16 articles · 8 on-site · strategy calls", desc: "Dominate category authority through volume and strategy." },
};

const CREATORS = ["Kelsey Hightower", "Charity Majors", "Theo Browne", "Nader Dabit", "swyx", "Lee Robinson"];

// ─── Filter helper ──────────────────────────────────────────────────────────────
function applyPieceFilters<T extends ContentPiece>(
  pieces: T[],
  filterStatuses: Set<PieceStatus>,
  filterCitationMin: number,
  sortBy: SortBy,
): T[] {
  let result = pieces;
  if (filterStatuses.size > 0) {
    result = result.filter(p => filterStatuses.has(p.status));
  }
  if (filterCitationMin > 0) {
    result = result.filter(p => (p.citationCount ?? 0) >= filterCitationMin);
  }
  if (sortBy === "citations_desc") {
    result = [...result].sort((a, b) => (b.citationCount ?? 0) - (a.citationCount ?? 0));
  } else if (sortBy === "citations_asc") {
    result = [...result].sort((a, b) => (a.citationCount ?? 0) - (b.citationCount ?? 0));
  }
  return result;
}

// ─── Filter bar ─────────────────────────────────────────────────────────────────
function FilterBar({
  filterStatuses, setFilterStatuses,
  filterCitationMin, setFilterCitationMin,
  sortBy, setSortBy,
}: {
  filterStatuses: Set<PieceStatus>;
  setFilterStatuses: (s: Set<PieceStatus>) => void;
  filterCitationMin: number;
  setFilterCitationMin: (n: number) => void;
  sortBy: SortBy;
  setSortBy: (s: SortBy) => void;
}) {
  const hasFilters = filterStatuses.size > 0 || filterCitationMin > 0 || sortBy !== "default";

  function toggleStatus(s: PieceStatus) {
    const next = new Set(filterStatuses);
    if (next.has(s)) next.delete(s); else next.add(s);
    setFilterStatuses(next);
  }

  function clearAll() {
    setFilterStatuses(new Set());
    setFilterCitationMin(0);
    setSortBy("default");
  }

  return (
    null
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────────
function TypePill({ type }: { type: PlannerContentType }) {
  const m = TYPE_META[type];
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap"
      style={{ background: m.bg, color: m.color }}>
      <m.Icon size={9} />{m.short}
    </span>
  );
}

function StatusBadge({ status, onChange }: { status: PieceStatus; onChange: (s: PieceStatus) => void }) {
  const [open, setOpen] = useState(false);
  const m = STATUS_META[status];
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap cursor-pointer"
        style={{ background: m.bg, color: m.color }}>
        {m.label}<ChevronDown size={8} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 z-20 rounded-xl py-1 min-w-32"
            style={{ background: C.card, border: `1px solid ${C.cardLine}` }}>
            {STATUS_ORDER.map(s => (
              <button key={s} onClick={() => { onChange(s); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-1.5 transition-colors text-left cursor-pointer"
                style={{ background: "transparent" }}
                onMouseEnter={e => (e.currentTarget.style.background = C.hover)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: STATUS_META[s].color }} />
                <span className="text-xs" style={{ color: STATUS_META[s].color, fontWeight: 600 }}>{STATUS_META[s].label}</span>
                {s === status && <Check size={10} className="ml-auto" style={{ color: STATUS_META[s].color }} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Creator outreach helper ────────────────────────────────────────────────────
function buildOutreachMessage(creator: string, title: string, clientName: string, type: PlannerContentType): string {
  const typeLabel = TYPE_META[type]?.label ?? "content";
  return `Hi ${creator.split(" ")[0]},

We're working with ${clientName} on a campaign focused on developer awareness and AI visibility. We think your audience would be a great fit for this piece.

We'd love to collaborate on a ${typeLabel}: "${title}"

We're offering a flat fee for this piece and would love to hear your thoughts. Would you be open to a quick call to discuss details?

Best,
YardGEO Team`;
}

// ─── AddPieceRow — with optional creator outreach flow ─────────────────────────
function AddPieceRow({ onAdd, clientName }: { onAdd: (p: Omit<ContentPiece, "id">) => void; clientName: string }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<PlannerContentType>("article");
  const [creator, setCreator] = useState("");
  const [due, setDue] = useState("");
  const [rate, setRate] = useState("");
  const [outreachSent, setOutreachSent] = useState(false);
  const [outreachExpanded, setOutreachExpanded] = useState(false);
  const [message, setMessage] = useState("");

  const isOffSite = OFF_SITE_TYPES.includes(type);
  const showOutreach = isOffSite && creator !== "" && !outreachSent;

  function handleCreatorChange(c: string) {
    setCreator(c);
    setOutreachSent(false);
    if (c && title && isOffSite) {
      setMessage(buildOutreachMessage(c, title || "your content piece", clientName, type));
      setOutreachExpanded(true);
    } else {
      setOutreachExpanded(false);
    }
  }

  function handleTitleChange(t: string) {
    setTitle(t);
    if (creator && t && isOffSite) {
      setMessage(buildOutreachMessage(creator, t, clientName, type));
    }
  }

  function handleTypeChange(t: PlannerContentType) {
    setType(t);
    if (creator && title && OFF_SITE_TYPES.includes(t)) {
      setMessage(buildOutreachMessage(creator, title, clientName, t));
      setOutreachExpanded(true);
    } else {
      setOutreachExpanded(false);
    }
  }

  function handleSendOutreach() {
    const first = creator.split(" ")[0];
    toast.success(`Outreach sent to ${first}!`, {
      description: `${first} will receive an email with your proposal${rate ? ` at $${rate}/piece` : ""}. They can approve or decline.`,
      duration: 5000,
    });
    setOutreachSent(true);
    setOutreachExpanded(false);
  }

  function handleAdd() {
    if (!title.trim()) return;
    onAdd({ type, title: title.trim(), status: "idea", creator: creator || undefined, dueDate: due || "TBD" });
    setTitle(""); setType("article"); setCreator(""); setDue(""); setRate("");
    setOutreachSent(false); setOutreachExpanded(false); setMessage("");
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
    setTitle(""); setType("article"); setCreator(""); setDue(""); setRate("");
    setOutreachSent(false); setOutreachExpanded(false); setMessage("");
  }

  if (!open) return (
    <button onClick={() => setOpen(true)}
      className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl w-full transition-colors cursor-pointer"
      style={{ color: C.t3, border: `1px dashed ${C.cardLine}`, background: "transparent" }}
      onMouseEnter={e => (e.currentTarget.style.background = C.hover)}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
      <Plus size={12} />Add piece
    </button>
  );

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.cardLine}`, background: C.inset }}>
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <select value={type} onChange={e => handleTypeChange(e.target.value as PlannerContentType)}
            className="text-[10px] font-semibold pl-2 pr-6 py-1 rounded-full appearance-none outline-none cursor-pointer"
            style={{ background: TYPE_META[type].bg, color: TYPE_META[type].color, border: "none", fontFamily: FONT }}>
            {Object.entries(TYPE_META).map(([k, v]) => <option key={k} value={k}>{v.short}</option>)}
          </select>
          <input value={title} onChange={e => handleTitleChange(e.target.value)} placeholder="Title / idea…"
            className="flex-1 text-sm px-2 py-1 rounded-lg outline-none"
            style={{ border: `1px solid ${C.cardLine}`, color: C.t1, background: C.card, fontFamily: FONT }} />
        </div>
        <div className="flex items-center gap-2">
          <select value={creator} onChange={e => handleCreatorChange(e.target.value)}
            className="text-xs px-2 py-1 rounded-lg outline-none cursor-pointer"
            style={{ border: `1px solid ${C.cardLine}`, color: C.t2, background: C.card, fontFamily: FONT, minWidth: 130 }}>
            <option value="">— Creator (optional)</option>
            {CREATORS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="date" value={due} onChange={e => setDue(e.target.value)}
            className="text-xs px-2 py-1 rounded-lg outline-none"
            style={{ border: `1px solid ${C.cardLine}`, color: C.t2, background: C.card, fontFamily: FONT }} />
          <div className="ml-auto flex gap-1.5">
            <button onClick={handleClose} className="px-2 py-1 text-xs rounded-lg cursor-pointer" style={{ color: C.t2 }}>Cancel</button>
            <button onClick={handleAdd} className="px-3 py-1 text-xs font-semibold rounded-lg cursor-pointer" style={{ background: C.cream, color: "#0B0A0A" }}>Add</button>
          </div>
        </div>
      </div>

      {(showOutreach || outreachSent) && (
        <div className="border-t" style={{ borderColor: C.cardLine }}>
          {outreachSent ? (
            <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: "rgba(74,222,128,0.06)" }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(74,222,128,0.2)" }}>
                <Check size={10} style={{ color: C.pos }} />
              </div>
              <p className="text-xs flex-1" style={{ color: C.t2 }}>
                Outreach sent to <span style={{ color: C.t1, fontWeight: 600 }}>{creator.split(" ")[0]}</span> — waiting for their response.
              </p>
            </div>
          ) : (
            <div>
              <button
                className="w-full flex items-center gap-2 px-3 py-2.5 text-left cursor-pointer"
                onClick={() => setOutreachExpanded(o => !o)}
                style={{ background: "rgba(47,128,245,0.06)" }}>
                <Mail size={11} style={{ color: C.prog, flexShrink: 0 }} />
                <p className="text-xs font-semibold flex-1" style={{ color: C.prog }}>
                  Send creator outreach to {creator.split(" ")[0]}
                </p>
                <span style={{ color: C.t3 }}>
                  {outreachExpanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                </span>
              </button>

              {outreachExpanded && (
                <div className="px-3 pb-3 space-y-2.5" style={{ background: "rgba(47,128,245,0.03)" }}>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex items-center gap-1.5 flex-1">
                      <DollarSign size={11} style={{ color: C.t3, flexShrink: 0 }} />
                      <input
                        value={rate}
                        onChange={e => setRate(e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="Offer rate (e.g. 2500)"
                        className="flex-1 text-xs px-2 py-1.5 rounded-lg outline-none"
                        style={{ border: `1px solid ${C.cardLine}`, color: C.t1, background: C.card, fontFamily: FONT }}
                      />
                      <span className="text-xs" style={{ color: C.t3 }}>/piece</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold mb-1.5 uppercase tracking-wider" style={{ color: C.t3 }}>Message preview</p>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={7}
                      className="w-full text-xs px-2.5 py-2 rounded-xl resize-none outline-none"
                      style={{ border: `1px solid ${C.cardLine}`, color: C.t2, background: C.card, fontFamily: FONT, lineHeight: 1.6 }}
                    />
                  </div>
                  <button
                    onClick={handleSendOutreach}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                    style={{ background: "rgba(47,128,245,0.18)", color: C.prog, border: "1px solid rgba(47,128,245,0.3)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(47,128,245,0.28)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(47,128,245,0.18)")}>
                    <Send size={11} />
                    Send outreach email to {creator.split(" ")[0]}
                    {rate && <span style={{ opacity: 0.75 }}>· ${Number(rate).toLocaleString()}/piece</span>}
                  </button>
                  <p className="text-[10px] text-center" style={{ color: C.t3 }}>
                    {creator.split(" ")[0]} will receive an email and can approve or decline from their inbox.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PieceRow({ piece, onStatusChange, onNotesChange }: {
  piece: ContentPiece; onStatusChange: (id: number, s: PieceStatus) => void; onNotesChange: (id: number, n: string) => void;
}) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState(piece.notes ?? "");
  return (
    <div className="group">
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
        style={{ background: "transparent" }}
        onMouseEnter={e => (e.currentTarget.style.background = C.hover)}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
        <TypePill type={piece.type} />
        <p className="flex-1 text-xs font-medium min-w-0 truncate" style={{ color: C.t1 }}>{piece.title}</p>
        {piece.citationCount !== undefined && (
          <span className="text-[10px] font-semibold shrink-0 tabular-nums flex items-center gap-0.5"
            style={{ color: C.t3 }}>
            <TrendingUp size={9} style={{ color: C.pos }} />{piece.citationCount}
          </span>
        )}
        <StatusBadge status={piece.status} onChange={s => onStatusChange(piece.id, s)} />
        <div className="w-28 shrink-0">
          {piece.creator
            ? <span className="text-[10px] font-medium truncate block" style={{ color: C.t3 }}>{piece.creator.split(" ")[0]} {piece.creator.split(" ")[1]?.[0]}.</span>
            : (piece.type === "onsite" || piece.type === "llm_page" || piece.type === "strategy")
              ? <span className="text-[10px]" style={{ color: C.t3 }}>YardGEO team</span>
              : <span className="text-[10px] italic" style={{ color: C.t3 }}>Unassigned</span>}
        </div>
        <span className="text-[10px] font-medium w-12 shrink-0 text-right" style={{ color: C.t3 }}>{piece.dueDate}</span>
        <button onClick={() => setNotesOpen(o => !o)}
          className="shrink-0 p-1 rounded-lg transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
          style={{ color: piece.notes ? C.prog : C.t3 }}
          onMouseEnter={e => (e.currentTarget.style.background = C.hover)}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
          <MessageSquare size={11} />
        </button>
      </div>
      {notesOpen && (
        <div className="mx-3 mb-1 flex items-start gap-2">
          <textarea value={notes} onChange={e => setNotes(e.target.value)} onBlur={() => onNotesChange(piece.id, notes)}
            rows={2} placeholder="Notes, ideas, references…"
            className="flex-1 text-xs px-2.5 py-2 rounded-xl resize-none outline-none"
            style={{ border: `1px solid ${C.cardLine}`, color: C.t1, background: C.card, fontFamily: FONT }} />
          <button onClick={() => setNotesOpen(false)} className="mt-1 p-1 rounded-lg cursor-pointer"
            style={{ background: "transparent" }}
            onMouseEnter={e => (e.currentTarget.style.background = C.hover)}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <X size={11} style={{ color: C.t3 }} />
          </button>
        </div>
      )}
    </div>
  );
}

function CampaignSection({ campaign, clientId, onUpdate, pieceFilter, filterStatuses, filterCitationMin, sortBy }: {
  campaign: PlanCampaign; clientId: string; onUpdate: (c: PlanCampaign) => void;
  pieceFilter?: Lane | null;
  filterStatuses: Set<PieceStatus>;
  filterCitationMin: number;
  sortBy: SortBy;
}) {
  const [open, setOpen] = useState(true);
  const lanePieces = pieceFilter
    ? campaign.pieces.filter(p => (pieceFilter === "off-site" ? OFF_SITE_TYPES : ON_SITE_TYPES).includes(p.type))
    : campaign.pieces;
  const displayPieces = applyPieceFilters(lanePieces, filterStatuses, filterCitationMin, sortBy);
  const done  = displayPieces.filter(p => p.status === "published").length;
  const total = displayPieces.length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
  const campData = agencyCampaignsData.find(c => c.client === agencyClientsData.find(cl => cl.id === clientId)?.name && c.name === campaign.name);
  const counts: Partial<Record<PlannerContentType, number>> = {};
  displayPieces.forEach(p => { counts[p.type] = (counts[p.type] ?? 0) + 1; });
  const updateStatus = (id: number, s: PieceStatus) =>
    onUpdate({ ...campaign, pieces: campaign.pieces.map(p => p.id === id ? { ...p, status: s } : p) });
  const updateNotes = (id: number, n: string) =>
    onUpdate({ ...campaign, pieces: campaign.pieces.map(p => p.id === id ? { ...p, notes: n } : p) });
  const clientName = agencyClientsData.find(c => c.id === clientId)?.name ?? "Client";

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.cardLine}` }}>
      <button className="w-full flex items-center gap-3 px-5 py-4 transition-colors text-left cursor-pointer"
        style={{ background: "transparent" }}
        onMouseEnter={e => (e.currentTarget.style.background = C.hover)}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        onClick={() => setOpen(o => !o)}>
        <span className="shrink-0" style={{ color: C.t3 }}>{open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
        <p className="text-sm font-semibold flex-1" style={{ color: C.t1 }}>{campaign.name}</p>
        {getCampaignLane(campaign.pieces).map(lane => (
          <span key={lane} className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap shrink-0"
            style={{
              background: lane === "off-site" ? "rgba(47,128,245,0.14)" : "rgba(74,222,128,0.14)",
              color:      lane === "off-site" ? C.prog               : C.pos,
            }}>
            {lane === "off-site" ? "Off-site" : "On-site"}
          </span>
        ))}
        {campData && (
          <div className="hidden lg:flex items-center gap-4 text-[10px] shrink-0" style={{ color: C.t3 }}>
            <span>{campData.start} – {campData.end}</span>
            <span className="font-semibold" style={{ color: C.t1 }}>{campData.budget}</span>
            {campData.citationLift > 0 && <span className="font-semibold" style={{ color: C.pos }}>+{campData.citationLift}% lift</span>}
          </div>
        )}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(Object.entries(counts) as [PlannerContentType, number][]).map(([type, count]) => {
            const { Icon, bg, color } = TYPE_META[type];
            return (
              <span key={type} className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                style={{ background: bg, color }}>
                <Icon size={8} />{count}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-20 h-1.5 rounded-full" style={{ background: C.cardLine }}>
            <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: C.prog }} />
          </div>
          <span className="text-[10px] font-medium w-16 text-right" style={{ color: C.t3 }}>{done}/{total} done</span>
        </div>
      </button>

      {open && (
        <div className="border-t" style={{ borderColor: C.cardLine }}>
          <div className="flex items-center gap-3 px-3 py-1.5 border-b" style={{ borderColor: C.cardLine }}>
            <div className="w-[72px] shrink-0" />
            <p className="flex-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.t3 }}>Title</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider w-14 shrink-0" style={{ color: C.t3 }}>Citations</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider w-20 shrink-0" style={{ color: C.t3 }}>Status</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider w-28 shrink-0" style={{ color: C.t3 }}>Creator</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider w-12 shrink-0 text-right" style={{ color: C.t3 }}>Due</p>
            <div className="w-5 shrink-0" />
          </div>
          <div className="px-1 py-1 space-y-0.5">
            {displayPieces.length === 0 ? (
              <p className="text-center text-xs py-4" style={{ color: C.t3 }}>
                No matching pieces — adjust filters or add a new piece.
              </p>
            ) : (
              displayPieces.map(piece => (
                <PieceRow key={piece.id} piece={piece} onStatusChange={updateStatus} onNotesChange={updateNotes} />
              ))
            )}
          </div>
          <div className="px-3 pb-3 pt-1">
            <AddPieceRow
              clientName={clientName}
              onAdd={piece => onUpdate({ ...campaign, pieces: [...campaign.pieces, { ...piece, id: nid() }] })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── New campaign modal ────────────────────────────────────────────────────────
function NewCampaignModal({ clientId, clientName, onAdd, onClose }: {
  clientId: string; clientName: string; onAdd: (c: PlanCampaign) => void; onClose: () => void;
}) {
  const [name, setName] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="rounded-2xl w-96 p-6" style={{ background: C.card, border: `1px solid ${C.cardLine}`, fontFamily: FONT }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ClientLogo clientId={clientId} size={20} />
            <p className="text-sm font-semibold" style={{ color: C.t1 }}>New Campaign for {clientName}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg cursor-pointer"
            style={{ background: "transparent" }}
            onMouseEnter={e => (e.currentTarget.style.background = C.hover)}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <X size={14} style={{ color: C.t3 }} />
          </button>
        </div>
        <label className="text-xs font-semibold block mb-1.5" style={{ color: C.t3 }}>Campaign name</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Q3 Developer Awareness"
          className="w-full text-sm px-3 py-2.5 rounded-xl outline-none mb-5"
          style={{ border: `1px solid ${C.cardLine}`, color: C.t1, background: C.inset, fontFamily: FONT }} />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-sm font-medium px-4 py-2 rounded-xl cursor-pointer" style={{ color: C.t2 }}>Discard</button>
          <button onClick={() => {
            if (!name.trim()) return;
            onAdd({ id: `${clientId}-${Date.now()}`, name: name.trim(), pieces: [] });
            onClose();
          }} className="text-sm font-semibold px-5 py-2 rounded-xl cursor-pointer" style={{ background: C.cream, color: "#0B0A0A" }}>
            Create campaign
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── New client onboarding modal ───────────────────────────────────────────────
function NewClientModal({ onDone, onClose }: {
  onDone: (client: OnboardedClient) => void; onClose: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [tier, setTier] = useState<Tier>("launch");

  const handleFinish = () => {
    if (!name.trim()) return;
    const id = name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    onDone({ id, name: name.trim(), website: website.trim(), status: "onboarding", tier });
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.75)" }}>
      <div className="rounded-2xl w-[520px] overflow-hidden" style={{ background: C.card, border: `1px solid ${C.cardLine}`, fontFamily: FONT }}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b" style={{ borderColor: C.cardLine }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: C.t1 }}>
              {step === 3 ? "Client onboarded!" : "Onboard new client"}
            </p>
            {step < 3 && (
              <div className="flex items-center gap-1.5 mt-2">
                {[1, 2].map(s => (
                  <div key={s} className="h-1 rounded-full transition-all" style={{
                    width: step >= s ? 32 : 16,
                    background: step >= s ? C.cream : C.cardLine,
                  }} />
                ))}
                <span className="text-[10px] ml-1" style={{ color: C.t3 }}>Step {step} of 2</span>
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg cursor-pointer"
            style={{ background: "transparent" }}
            onMouseEnter={e => (e.currentTarget.style.background = C.hover)}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <X size={14} style={{ color: C.t3 }} />
          </button>
        </div>

        {step === 1 && (
          <div className="px-6 py-5 space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: C.t3 }}>Company name *</label>
              <input
                value={name} onChange={e => setName(e.target.value)}
                placeholder="e.g. Stripe, Vercel, Linear…"
                className="w-full text-sm px-3 py-2.5 rounded-xl outline-none"
                style={{ border: `1px solid ${C.cardLine}`, color: C.t1, background: C.inset, fontFamily: FONT }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: C.t3 }}>Website</label>
              <input
                value={website} onChange={e => setWebsite(e.target.value)}
                placeholder="https://…"
                className="w-full text-sm px-3 py-2.5 rounded-xl outline-none"
                style={{ border: `1px solid ${C.cardLine}`, color: C.t1, background: C.inset, fontFamily: FONT }}
              />
            </div>
            <div className="flex justify-end pt-1">
              <button
                onClick={() => { if (name.trim()) setStep(2); }}
                className="flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
                style={{ background: name.trim() ? C.cream : C.inset, color: name.trim() ? "#0B0A0A" : C.t3 }}>
                Continue <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="px-6 py-5">
            <p className="text-xs font-semibold mb-3" style={{ color: C.t3 }}>Select a plan for {name}</p>
            <div className="space-y-2.5 mb-5">
              {(Object.entries(TIER_META) as [Tier, typeof TIER_META[Tier]][]).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setTier(key)}
                  className="w-full flex items-start gap-4 px-4 py-3.5 rounded-xl text-left transition-all cursor-pointer"
                  style={{
                    background: tier === key ? "rgba(239,233,225,0.07)" : C.inset,
                    border: `1.5px solid ${tier === key ? C.cream : C.cardLine}`,
                  }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold" style={{ color: C.t1 }}>{meta.label}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: meta.bg, color: meta.color }}>{meta.price}</span>
                    </div>
                    <p className="text-[11px] mb-1.5" style={{ color: C.t3 }}>{meta.desc}</p>
                    <p className="text-[10px] font-medium" style={{ color: C.t2 }}>{meta.deliverables}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center"
                    style={{ borderColor: tier === key ? C.cream : C.t3 }}>
                    {tier === key && <div className="w-2 h-2 rounded-full" style={{ background: C.cream }} />}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(1)} className="text-sm font-medium px-4 py-2 rounded-xl cursor-pointer" style={{ color: C.t2 }}>Back</button>
              <button onClick={handleFinish}
                className="flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
                style={{ background: C.cream, color: "#0B0A0A" }}>
                <Building2 size={14} />Onboard client
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="px-6 py-8 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(74,222,128,0.15)" }}>
              <Check size={22} style={{ color: C.pos }} />
            </div>
            <p className="text-base font-semibold mb-1" style={{ color: C.t1 }}>{name} is onboarded</p>
            <p className="text-sm mb-6" style={{ color: C.t3 }}>
              On the <span style={{ color: C.t1, fontWeight: 600 }}>{TIER_META[tier].label}</span> plan · {TIER_META[tier].price}
            </p>
            <button onClick={onClose}
              className="text-sm font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
              style={{ background: C.cream, color: "#0B0A0A" }}>
              Go to their plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Board view — piece-level kanban ──────────────────────────────────────────
function BoardView({ activeClient, clientName, plan, onUpdateCampaign, onNewCampaign, filterStatuses, filterCitationMin, sortBy }: {
  activeClient: string;
  clientName: string;
  plan: ClientPlan;
  onUpdateCampaign: (id: string, c: PlanCampaign) => void;
  onNewCampaign: () => void;
  filterStatuses: Set<PieceStatus>;
  filterCitationMin: number;
  sortBy: SortBy;
}) {
  const [lane, setLane] = useState<Lane>("off-site");

  type PieceWithCampaign = ContentPiece & { campaignId: string; campaignName: string };
  const lanePieces: PieceWithCampaign[] = plan.campaigns.flatMap(camp =>
    camp.pieces
      .filter(p => lane === "off-site" ? OFF_SITE_TYPES.includes(p.type) : ON_SITE_TYPES.includes(p.type))
      .map(p => ({ ...p, campaignId: camp.id, campaignName: camp.name }))
  );
  const allPieces = applyPieceFilters(lanePieces, filterStatuses, filterCitationMin, sortBy);

  const piecesByStatus: Record<PieceStatus, PieceWithCampaign[]> = {
    idea: [], brief: [], draft: [], review: [], published: [],
  };
  allPieces.forEach(p => piecesByStatus[p.status].push(p));

  function updatePieceStatus(campaignId: string, pieceId: number, newStatus: PieceStatus) {
    const camp = plan.campaigns.find(c => c.id === campaignId);
    if (!camp) return;
    const updated: PlanCampaign = {
      ...camp,
      pieces: camp.pieces.map(p => p.id === pieceId ? { ...p, status: newStatus } : p),
    };
    onUpdateCampaign(campaignId, updated);
  }

  const totalCount = allPieces.length;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: C.inset }}>
          {([
            { value: "off-site" as Lane, label: "Off-site · Creator", Icon: Users },
            { value: "on-site"  as Lane, label: "On-site · Direct",   Icon: Globe },
          ]).map(({ value, label, Icon }) => (
            <button key={value} onClick={() => setLane(value)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              style={{ background: lane === value ? C.card : "transparent", color: lane === value ? C.t1 : C.t3 }}>
              <Icon size={12} />{label}
            </button>
          ))}
        </div>

        <span className="text-xs" style={{ color: C.t3 }}>
          {totalCount} piece{totalCount !== 1 ? "s" : ""} · {clientName}
        </span>

        <button onClick={onNewCampaign}
          className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl cursor-pointer"
          style={{ background: C.cream, color: "#0B0A0A" }}>
          <Plus size={12} />New campaign
        </button>
      </div>

      {totalCount === 0 && (
        <div className="rounded-2xl p-12 text-center" style={{ background: C.card, border: `1px solid ${C.cardLine}` }}>
          <p className="text-sm font-medium mb-1" style={{ color: C.t1 }}>No {lane} pieces match your filters</p>
          <p className="text-xs" style={{ color: C.t3 }}>Try adjusting the filter bar above.</p>
        </div>
      )}

      {totalCount > 0 && (
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-3" style={{ scrollbarWidth: "thin", scrollbarColor: `${C.cardLine} transparent` }}>
            {STATUS_ORDER.map(status => {
              const col = STATUS_META[status];
              const pieces = piecesByStatus[status];
              return (
                <div key={status} className="flex-shrink-0 w-64 flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-1 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                    <span className="text-xs font-semibold flex-1" style={{ color: C.t1 }}>{col.label}</span>
                    <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: col.bg, color: col.color }}>{pieces.length}</span>
                  </div>

                  <div className="space-y-2 min-h-12">
                    {pieces.map(piece => (
                      <div key={piece.id} className="rounded-xl p-3 space-y-2"
                        style={{ background: C.card, border: `1px solid ${C.cardLine}` }}>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <TypePill type={piece.type} />
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide truncate max-w-[90px]"
                            style={{ background: "rgba(167,160,148,0.1)", color: C.t3 }}
                            title={piece.campaignName}>
                            {piece.campaignName}
                          </span>
                        </div>

                        <p className="text-xs font-medium leading-snug" style={{ color: C.t1, lineHeight: 1.45 }}>
                          {piece.title}
                        </p>

                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] truncate" style={{ color: C.t3 }}>
                            {piece.creator
                              ? `${piece.creator.split(" ")[0]} ${piece.creator.split(" ")[1]?.[0] ?? ""}.`
                              : (piece.type === "onsite" || piece.type === "llm_page" || piece.type === "strategy")
                                ? "YardGEO"
                                : "Unassigned"}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {piece.citationCount !== undefined && (
                              <span className="text-[10px] font-semibold flex items-center gap-0.5" style={{ color: C.t3 }}>
                                <TrendingUp size={8} style={{ color: C.pos }} />{piece.citationCount}
                              </span>
                            )}
                            <StatusBadge
                              status={piece.status}
                              onChange={s => updatePieceStatus(piece.campaignId, piece.id, s)}
                            />
                          </div>
                        </div>

                        {piece.dueDate && piece.dueDate !== "TBD" && (
                          <p className="text-[10px]" style={{ color: C.t3 }}>Due {piece.dueDate}</p>
                        )}
                      </div>
                    ))}

                    {pieces.length === 0 && (
                      <div className="rounded-xl border-2 border-dashed p-4 text-center" style={{ borderColor: C.cardLine }}>
                        <p className="text-[11px]" style={{ color: C.t3 }}>No pieces here</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute top-0 right-0 bottom-3 w-12 pointer-events-none"
            style={{ background: `linear-gradient(to right, transparent, ${C.page})` }} />
        </div>
      )}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function AgencyPlanner() {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get("view") === "board" ? "board" : "list";

  const { plans, setPlans }          = usePlanner();
  const [activeClient, setActive]    = useState("coder");
  const [showNewCamp, setNewCamp]    = useState(false);
  const [showNewClient, setNewClient] = useState(false);
  const [listLane, setListLane]      = useState<Lane | null>(null);
  const [onboardedClients, setOnboardedClients] = useState<OnboardedClient[]>([]);

  // ─── Filter state ────────────────────────────────────────────────────────────
  const [filterStatuses, setFilterStatuses] = useState<Set<PieceStatus>>(new Set());
  const [filterCitationMin, setFilterCitationMin] = useState(0);
  const [sortBy, setSortBy] = useState<SortBy>("default");

  const setView = (v: "list" | "board") => setSearchParams(v === "board" ? { view: "board" } : {});

  const allClientOptions = [
    ...agencyClientsData.map(c => ({ id: c.id, name: c.name })),
    ...onboardedClients.map(c => ({ id: c.id, name: c.name })),
  ];

  const plan   = plans.find(p => p.clientId === activeClient) ?? plans[0];
  const staticClient = agencyClientsData.find(c => c.id === activeClient);
  const onboardedClient = onboardedClients.find(c => c.id === activeClient);
  const clientName = staticClient?.name ?? onboardedClient?.name ?? "Client";

  const tier = (() => {
    const planTier = plan?.tier ?? (onboardedClient?.tier ?? "launch");
    return TIER_META[planTier as Tier] ?? TIER_META["launch"];
  })();

  const totalPieces = plan.campaigns.reduce((s, c) => s + c.pieces.length, 0);
  const published   = plan.campaigns.reduce((s, c) => s + c.pieces.filter(p => p.status === "published").length, 0);
  const inProgress  = plan.campaigns.reduce((s, c) => s + c.pieces.filter(p => p.status === "draft" || p.status === "review" || p.status === "brief").length, 0);

  const updateCampaign = (campId: string, updated: PlanCampaign) =>
    setPlans(plans.map(p => p.clientId !== activeClient ? p : { ...p, campaigns: p.campaigns.map(c => c.id === campId ? updated : c) }));
  const addCampaign = (camp: PlanCampaign) =>
    setPlans(plans.map(p => p.clientId !== activeClient ? p : { ...p, campaigns: [...p.campaigns, camp] }));

  const handleNewClient = (client: OnboardedClient) => {
    setOnboardedClients(prev => [...prev, client]);
    setPlans(prev => [...prev, { clientId: client.id, tier: client.tier, campaigns: [] }]);
    setTimeout(() => {
      setActive(client.id);
      setNewClient(false);
      toast.success(`${client.name} onboarded on the ${TIER_META[client.tier].label} plan.`);
    }, 1200);
  };

  // Filter campaigns for list view
  const listCampaigns = (() => {
    let camps = listLane
      ? plan.campaigns.filter(c => c.pieces.some(p => (listLane === "off-site" ? OFF_SITE_TYPES : ON_SITE_TYPES).includes(p.type)))
      : plan.campaigns;
    // If status or citation filters are active, hide campaigns with no matching pieces
    if (filterStatuses.size > 0 || filterCitationMin > 0) {
      camps = camps.filter(c => {
        const lane = listLane
          ? c.pieces.filter(p => (listLane === "off-site" ? OFF_SITE_TYPES : ON_SITE_TYPES).includes(p.type))
          : c.pieces;
        return applyPieceFilters(lane, filterStatuses, filterCitationMin, sortBy).length > 0;
      });
    }
    return camps;
  })();

  return (
    <div className="space-y-5" style={{ fontFamily: FONT, padding: "20px 24px" }}>
      <Toaster position="bottom-right" />

      {showNewCamp && (
        <NewCampaignModal
          clientId={activeClient}
          clientName={clientName}
          onAdd={addCampaign}
          onClose={() => setNewCamp(false)}
        />
      )}
      {showNewClient && (
        <NewClientModal
          onDone={handleNewClient}
          onClose={() => setNewClient(false)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: C.t1 }}>Planner</h1>
          <p className="text-sm mt-0.5" style={{ color: C.t3 }}>Plan and track all content across every campaign</p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex gap-0.5 p-0.5 rounded-xl" style={{ background: C.inset }}>
            {(["list", "board"] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer"
                style={{ background: viewParam === v ? C.card : "transparent", color: viewParam === v ? C.t1 : C.t3 }}>
                {v}
              </button>
            ))}
          </div>
          {viewParam === "list" && (
            <button onClick={() => setNewCamp(true)}
              className="flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-xl cursor-pointer"
              style={{ background: C.cream, color: "#0B0A0A" }}>
              <Plus size={14} />New campaign
            </button>
          )}
          <button onClick={() => setNewClient(true)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl cursor-pointer"
            style={{ background: C.inset, color: C.t2, border: `1px solid ${C.cardLine}` }}
            onMouseEnter={e => (e.currentTarget.style.background = C.hover)}
            onMouseLeave={e => (e.currentTarget.style.background = C.inset)}>
            <Building2 size={12} />Add client
          </button>
        </div>
      </div>

      {/* Client switcher */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold" style={{ color: C.t3 }}>Client:</span>
        <select
          value={activeClient}
          onChange={e => setActive(e.target.value)}
          style={{
            fontSize: 13, fontWeight: 600, padding: "7px 12px", borderRadius: 8,
            border: `1px solid ${C.cardLine}`, background: C.inset, color: C.t1,
            cursor: "pointer", outline: "none",
          }}
        >
          {allClientOptions.filter(c => plans.some(p => p.clientId === c.id)).map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Filter bar — shared between list and board views */}
      <FilterBar
        filterStatuses={filterStatuses}
        setFilterStatuses={setFilterStatuses}
        filterCitationMin={filterCitationMin}
        setFilterCitationMin={setFilterCitationMin}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Plan tier + delivery block (List view only) */}
      {viewParam === "list" && (() => {
        const quota     = PLAN_QUOTAS[CLIENT_PLANS[activeClient] ?? "start"];
        const delivered = computeDelivered(plans, activeClient);
        const behind    = isBehindOnPlan(plans, activeClient, CLIENT_PLANS[activeClient] ?? "start", quota);
        const totalPub  = delivered.youtube + delivered.article + delivered.onsite + delivered.llmPage;
        const totalQ    = quota.youtube + quota.article + quota.onsite + (quota.llmPage > 0 ? quota.llmPage : 0);
        const unbriefed = plan.campaigns.reduce((s, c) => s + c.pieces.filter(p => p.status === "idea").length, 0);
        const bars: { label: string; done: number; total: number }[] = [
          { label: "YouTube",  done: delivered.youtube,  total: quota.youtube  },
          { label: "Articles", done: delivered.article,  total: quota.article  },
          { label: "On-site",  done: delivered.onsite,   total: quota.onsite   },
          ...(quota.llmPage > 0 ? [{ label: "LLM page", done: delivered.llmPage, total: quota.llmPage }] : []),
        ];
        return (
          <>
            {behind && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
                <AlertTriangle size={14} style={{ color: C.attn, flexShrink: 0 }} />
                <p className="text-xs font-semibold" style={{ color: C.attn }}>
                  Behind on {clientName}&apos;s July plan — {unbriefed} piece{unbriefed !== 1 ? "s" : ""} still unbriefed with 9 days left.
                </p>
              </div>
            )}
            <div className="px-5 py-4 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.cardLine}` }}>
              <div className="flex items-center gap-4 mb-4">
                <ClientLogo clientId={activeClient} size={36} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold" style={{ color: C.t1 }}>{clientName}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: tier.bg, color: tier.color }}>{tier.label} · {tier.price}</span>
                  </div>
                  <p className="text-xs" style={{ color: C.t3 }}>{totalPub} of {totalQ} pieces published this month</p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  {[{ label: "In progress", value: inProgress, color: "#F59E0B" }, { label: "Published", value: published, color: C.pos }, { label: "Total", value: totalPieces, color: C.t1 }].map(({ label, value, color }) => (
                    <div key={label} className="text-center">
                      <p className="text-lg font-semibold leading-none" style={{ color }}>{value}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: C.t3 }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {bars.map(b => (
                  <div key={b.label}>
                    <div className="flex justify-between text-[10px] font-semibold mb-1" style={{ color: C.t3 }}>
                      <span>{b.label}</span>
                      <span style={{ color: b.done >= b.total ? C.pos : C.t1 }}>{b.done} / {b.total}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.inset }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, b.total > 0 ? (b.done / b.total) * 100 : 0)}%`, background: b.done >= b.total ? C.pos : C.prog }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      })()}

      {/* List view */}
      {viewParam === "list" && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: C.inset }}>
              {([
                { value: null as Lane | null, label: "All" },
                { value: "off-site" as Lane,  label: "Off-site · Creator", Icon: Users },
                { value: "on-site"  as Lane,  label: "On-site · Direct",   Icon: Globe },
              ]).map(({ value, label, Icon }) => (
                <button key={String(value)} onClick={() => setListLane(value)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  style={{ background: listLane === value ? C.card : "transparent", color: listLane === value ? C.t1 : C.t3 }}>
                  {Icon && <Icon size={11} />}{label}
                </button>
              ))}
            </div>
            {(listLane || filterStatuses.size > 0 || filterCitationMin > 0) && (
              <span className="text-xs" style={{ color: C.t3 }}>
                {listCampaigns.length} of {plan.campaigns.length} campaigns
              </span>
            )}
          </div>

          {plan.campaigns.length === 0 ? (
            <div className="rounded-2xl p-16 text-center" style={{ background: C.card, border: `1px solid ${C.cardLine}` }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: C.inset }}>
                <Plus size={20} style={{ color: C.t3 }} />
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: C.t1 }}>No campaigns for {clientName} yet</p>
              <p className="text-xs mb-5" style={{ color: C.t3 }}>Create the first campaign to start planning content.</p>
              <button onClick={() => setNewCamp(true)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
                style={{ background: C.cream, color: "#0B0A0A" }}>
                <Plus size={14} />New campaign
              </button>
            </div>
          ) : listCampaigns.length === 0 ? (
            <div className="rounded-2xl p-12 text-center" style={{ background: C.card, border: `1px solid ${C.cardLine}` }}>
              <p className="text-sm font-medium" style={{ color: C.t3 }}>
                No campaigns match your current filters — try adjusting or clearing them.
              </p>
            </div>
          ) : (
            listCampaigns.map(camp => (
              <CampaignSection key={camp.id} campaign={camp} clientId={activeClient}
                onUpdate={updated => updateCampaign(camp.id, updated)}
                pieceFilter={listLane}
                filterStatuses={filterStatuses}
                filterCitationMin={filterCitationMin}
                sortBy={sortBy}
              />
            ))
          )}
        </div>
      )}

      {/* Board view */}
      {viewParam === "board" && (
        <BoardView
          activeClient={activeClient}
          clientName={clientName}
          plan={plan}
          onUpdateCampaign={updateCampaign}
          onNewCampaign={() => setNewCamp(true)}
          filterStatuses={filterStatuses}
          filterCitationMin={filterCitationMin}
          sortBy={sortBy}
        />
      )}
    </div>
  );
}
