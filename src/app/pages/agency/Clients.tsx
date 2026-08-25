import { useState } from "react";
import { TrendingUp, TrendingDown, Search, ChevronUp, ChevronDown as ChevronDownIcon } from "lucide-react";
import { useNavigate } from "react-router";
import {
  FONT,
  agencyClientsData, CLIENT_PLANS,
  syncFreshness, SYNC_DOT,
  type AgencyClient,
} from "../../lib/data";

const C = {
  page: "#0B0A0A", shell: "#1A1715", card: "#232020", cardLine: "#302B28",
  inset: "#1B1817", t1: "#EFE9E1", t2: "#A9A29B", t3: "#77706A",
  cream: "#EDE8E0", positive: "#4ADE80", negative: "#EF4444", attention: "#F79521",
  blue: "#2F80F5",
};

type SortKey = "name" | "category" | "plan" | "score" | "citations" | "status" | "lastSyncedAt";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 25;

function needsAttention(c: AgencyClient): boolean {
  if (syncFreshness(c.lastSyncedAt) === "amber") return true;
  if (c.analyticsConnected === false) return true;
  if (c.status === "onboarding") return true;
  const tier = CLIENT_PLANS[c.id];
  if (c.score < 60 && (tier === "launch" || tier === "scale")) return true;
  return false;
}

function ScoreBar({ score, max = 100 }: { score: number; max?: number }) {
  const barColor = score >= 75 ? C.blue : score >= 60 ? "#F59E0B" : C.negative;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: C.t1, width: 28, textAlign: "right" }}>{score}</span>
      <div style={{ flex: 1, height: 4, background: C.cardLine, borderRadius: 2, overflow: "hidden", width: 60 }}>
        <div style={{ height: "100%", width: `${(score / max) * 100}%`, background: barColor, borderRadius: 2 }} />
      </div>
    </div>
  );
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <span style={{ color: C.t3, fontSize: 10 }}>↕</span>;
  return sortDir === "asc" ? <ChevronUp size={12} color={C.t2} /> : <ChevronDownIcon size={12} color={C.t2} />;
}

export default function AgencyClients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [filterAttention, setFilterAttention] = useState(false);
  const [page, setPage] = useState(0);

  const attentionCount = agencyClientsData.filter(needsAttention).length;

  function openClient(id: string) {
    navigate(`/agency/clients/${id}`);
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); setPage(0); }
  }

  const filtered = agencyClientsData.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchAttention = !filterAttention || needsAttention(c);
    return matchSearch && matchAttention;
  });

  const sorted = [...filtered].sort((a, b) => {
    let va: string | number = "";
    let vb: string | number = "";
    if (sortKey === "name") { va = a.name; vb = b.name; }
    else if (sortKey === "category") { va = a.category; vb = b.category; }
    else if (sortKey === "plan") { va = CLIENT_PLANS[a.id] ?? ""; vb = CLIENT_PLANS[b.id] ?? ""; }
    else if (sortKey === "score") { va = a.score; vb = b.score; }
    else if (sortKey === "citations") { va = a.citations; vb = b.citations; }
    else if (sortKey === "status") { va = a.status; vb = b.status; }
    else if (sortKey === "lastSyncedAt") { va = a.lastSyncedAt; vb = b.lastSyncedAt; }
    if (typeof va === "number") return sortDir === "asc" ? va - (vb as number) : (vb as number) - va;
    return sortDir === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paged = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const TH = ({ label, col }: { label: string; col: SortKey }) => (
    <th
      onClick={() => handleSort(col)}
      style={{
        textAlign: "left", fontSize: 11, fontWeight: 600, color: C.t3,
        letterSpacing: "0.05em", textTransform: "uppercase", padding: "10px 14px",
        borderBottom: `1px solid ${C.cardLine}`, cursor: "pointer", whiteSpace: "nowrap",
        userSelect: "none", background: C.card,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        {label} <SortIcon col={col} sortKey={sortKey} sortDir={sortDir} />
      </span>
    </th>
  );

  const THStatic = ({ label }: { label: string }) => (
    <th style={{
      textAlign: "left", fontSize: 11, fontWeight: 600, color: C.t3,
      letterSpacing: "0.05em", textTransform: "uppercase", padding: "10px 14px",
      borderBottom: `1px solid ${C.cardLine}`, whiteSpace: "nowrap", background: C.card,
    }}>
      {label}
    </th>
  );

  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column", overflow: "hidden",
      background: C.shell, padding: 20, fontFamily: FONT, boxSizing: "border-box",
    }}>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", overflow: "hidden",
        background: C.card, borderRadius: 18, border: `1px solid ${C.cardLine}`,
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px 14px", borderBottom: `1px solid ${C.cardLine}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: C.t1 }}>Clients</span>
            <span style={{ fontSize: 12, color: C.t3 }}>{agencyClientsData.length} clients</span>
            {attentionCount > 0 && (
              <button
                onClick={() => { setFilterAttention(f => !f); setPage(0); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  background: filterAttention ? C.attention : `${C.attention}22`,
                  border: `1px solid ${C.attention}55`,
                  borderRadius: 999, padding: "2px 10px",
                  fontSize: 11, fontWeight: 600,
                  color: filterAttention ? C.card : C.attention,
                  cursor: "pointer",
                }}
              >
                Needs attention
                <span style={{
                  background: filterAttention ? C.card : C.attention,
                  color: filterAttention ? C.attention : C.card,
                  borderRadius: 999, padding: "1px 6px", fontSize: 10, fontWeight: 700,
                }}>
                  {attentionCount}
                </span>
              </button>
            )}
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.inset, border: `1px solid ${C.cardLine}`,
            borderRadius: 10, padding: "7px 12px",
          }}>
            <Search size={13} color={C.t3} />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(0); }}
              placeholder="Search by name or category..."
              style={{
                border: "none", background: "none", fontSize: 13,
                color: C.t1, outline: "none", width: 220,
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {paged.length === 0 ? (
            <div style={{ padding: 48, textAlign: "center", color: C.t3, fontSize: 13 }}>
              No clients match "{search}"
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <tr>
                  <TH label="Client" col="name" />
                  <TH label="Category" col="category" />
                  <TH label="Plan" col="plan" />
                  <TH label="GEO Score" col="score" />
                  <TH label="Citations" col="citations" />
                  <THStatic label="This month" />
                  <TH label="Status" col="status" />
                  <TH label="Last synced" col="lastSyncedAt" />
                  <th style={{ padding: "10px 14px", borderBottom: `1px solid ${C.cardLine}`, background: C.card }} />
                </tr>
              </thead>
              <tbody>
                {paged.map((c) => {
                  const plan = CLIENT_PLANS[c.id] || "launch";
                  const freshness = syncFreshness(c.lastSyncedAt);
                  const dot = SYNC_DOT[freshness];
                  const attention = needsAttention(c);
                  const syncAge = (Date.now() - new Date(c.lastSyncedAt).getTime()) / 3_600_000;
                  const syncLabel = syncAge < 1 ? "Just now" : syncAge < 24 ? `${Math.round(syncAge)}h ago` : `${Math.round(syncAge / 24)}d ago`;

                  // Plan chip color
                  const planChipBg = plan === "scale" ? "#2F80F533" : plan === "launch" ? "#A9A29B22" : "#77706A22";
                  const planChipColor = plan === "scale" ? C.blue : C.t2;

                  // Status badge
                  const statusBg = c.status === "active" ? "#4ADE8022" : c.status === "onboarding" ? "#2F80F522" : "#77706A22";
                  const statusColor = c.status === "active" ? C.positive : c.status === "onboarding" ? C.blue : C.t3;

                  // Simulated this-month delivery
                  const thisMonth = Math.round(3 * 0.7 + 1 * 0.6);
                  const monthTotal = 4;
                  const monthPct = Math.min(thisMonth / monthTotal, 1);

                  return (
                    <tr
                      key={c.id}
                      onClick={() => openClient(c.id)}
                      style={{
                        borderBottom: `1px solid ${C.cardLine}`,
                        background: attention ? `${C.attention}0D` : C.card,
                        cursor: "pointer",
                        transition: "background 0.12s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = C.inset)}
                      onMouseLeave={e => (e.currentTarget.style.background = attention ? `${C.attention}0D` : C.card)}
                    >
                      {/* Client */}
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 30, height: 30, borderRadius: 8, background: c.color,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0,
                          }}>
                            {c.logo}
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{c.name}</div>
                            <div style={{ fontSize: 11, color: C.t3 }}>Since {c.since}</div>
                          </div>
                        </div>
                      </td>
                      {/* Category */}
                      <td style={{ padding: "12px 14px", fontSize: 12, color: C.t2 }}>{c.category}</td>
                      {/* Plan */}
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600,
                          background: planChipBg, color: planChipColor,
                          borderRadius: 999, padding: "2px 9px",
                        }}>
                          {plan.charAt(0).toUpperCase() + plan.slice(1)}
                        </span>
                      </td>
                      {/* GEO Score */}
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <ScoreBar score={c.score} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: c.trend >= 0 ? C.positive : C.negative }}>
                            {c.trend >= 0
                              ? <TrendingUp size={11} style={{ verticalAlign: "middle" }} />
                              : <TrendingDown size={11} style={{ verticalAlign: "middle" }} />}
                            {" "}{c.trend > 0 ? `+${c.trend}` : c.trend}
                          </span>
                        </div>
                      </td>
                      {/* Citations */}
                      <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600, color: C.t1 }}>
                        {c.citations.toLocaleString()}
                      </td>
                      {/* This month */}
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ fontSize: 11, color: C.t2 }}>{thisMonth} of {monthTotal}</div>
                          <div style={{ height: 3, width: 60, background: C.cardLine, borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${monthPct * 100}%`, background: C.blue, borderRadius: 2 }} />
                          </div>
                        </div>
                      </td>
                      {/* Status */}
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, borderRadius: 999, padding: "2px 9px",
                          background: statusBg, color: statusColor,
                        }}>
                          {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                        </span>
                      </td>
                      {/* Last synced */}
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: dot.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 11, color: C.t3 }}>{syncLabel}</span>
                        </div>
                      </td>
                      {/* Actions */}
                      <td style={{ padding: "12px 14px" }}>
                        <button
                          onClick={e => { e.stopPropagation(); openClient(c.id); }}
                          style={{
                            background: C.inset, border: `1px solid ${C.cardLine}`,
                            borderRadius: 7, padding: "5px 12px",
                            fontSize: 11, fontWeight: 600, color: C.t2,
                            cursor: "pointer",
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            borderTop: `1px solid ${C.cardLine}`, padding: "10px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 12, color: C.t3 }}>
              {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, sorted.length)} of {sorted.length}
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                disabled={page === 0}
                onClick={() => setPage(p => p - 1)}
                style={{
                  background: C.inset, border: `1px solid ${C.cardLine}`, borderRadius: 7,
                  padding: "4px 12px", fontSize: 12, color: page === 0 ? C.t3 : C.t1,
                  cursor: page === 0 ? "default" : "pointer",
                }}
              >
                Prev
              </button>
              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => p + 1)}
                style={{
                  background: C.inset, border: `1px solid ${C.cardLine}`, borderRadius: 7,
                  padding: "4px 12px", fontSize: 12, color: page >= totalPages - 1 ? C.t3 : C.t1,
                  cursor: page >= totalPages - 1 ? "default" : "pointer",
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
