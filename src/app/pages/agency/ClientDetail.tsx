import { useParams, useNavigate } from "react-router";
import { agencyClientsData, CLIENT_PLANS, PLAN_QUOTAS } from "../../lib/data";
import ClientOverview from "../client/Overview";
import { C } from "../../lib/theme";

const FONT = "Inter, -apple-system, system-ui, sans-serif";

export default function AgencyClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = agencyClientsData.find(c => c.id === id) || agencyClientsData[0];
  const tier = CLIENT_PLANS[client.id] || "launch";
  const quota = PLAN_QUOTAS[tier];

  function handleViewAsClient() {
    localStorage.setItem("yardgeo_view", "agency_preview");
    localStorage.setItem("yardgeo_preview_client", client.id);
    navigate("/client");
  }

  return (
    <div style={{ background: C.shell, minHeight: "100%", fontFamily: FONT }}>
      {/* Agency strip */}
      <div style={{
        background: C.card,
        borderBottom: `1px solid ${C.cardLine}`,
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}>
        {/* Back link */}
        <button
          onClick={() => navigate("/agency/clients")}
          style={{ background: "transparent", border: "none", color: C.t2, cursor: "pointer", fontSize: 13, padding: "0 4px 0 0", display: "flex", alignItems: "center", gap: 4, fontFamily: FONT, flexShrink: 0 }}
        >
          ← Clients
        </button>
        <div style={{ width: 1, height: 20, background: C.cardLine }} />
        {/* Client identity */}
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: client.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0,
        }}>{client.logo}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.t1 }}>{client.name}</span>
          <span style={{
            fontSize: 12, fontWeight: 600,
            background: "rgba(237,232,224,0.12)", color: C.cream,
            borderRadius: 999, padding: "2px 8px",
          }}>
            {tier.charAt(0).toUpperCase() + tier.slice(1)}
          </span>
          <span style={{ fontSize: 12, color: C.t2 }}>${(quota.pricePerMonth / 1000).toFixed(1)}K/mo</span>
          <span style={{ fontSize: 12, color: C.t3, marginLeft: 4 }}>
            Priya Nair · Client since {client.since}
          </span>
        </div>
        {/* Actions */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            onClick={() => navigate("/agency/planner")}
            style={{
              background: "transparent", border: `1px solid ${C.cardLine}`,
              color: C.t1, borderRadius: 8, padding: "7px 14px",
              fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap",
            }}
          >
            Open Planner →
          </button>
          <button
            onClick={handleViewAsClient}
            style={{
              background: C.cream, color: "#0B0A0A",
              border: "none", borderRadius: 8, padding: "7px 14px",
              fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap",
            }}
          >
            View as client
          </button>
        </div>
      </div>

      {/* Client overview — pass client directly to avoid useOutletContext dependency */}
      <ClientOverview clientOverride={client} />
    </div>
  );
}
