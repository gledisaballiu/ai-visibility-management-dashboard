import { useState } from "react";
import { useNavigate } from "react-router";
import { LogOut, CheckCircle2, AlertCircle, RefreshCw, Plus, ChevronDown, Eye, EyeOff } from "lucide-react";
import { FONT, agencyClientsData } from "../../lib/data";
import { C } from "../../lib/theme";

const TABS = ["Team", "Integrations", "Billing", "Notifications"] as const;
type Tab = typeof TABS[number];

const INITIAL_INTEGRATIONS: Record<string, {
  geoProvider: { name: string; connected: boolean; lastSync: string; frequency: string };
  amplitude:   { connected: boolean; lastSync: string; frequency: string };
  ga4:         { connected: boolean; lastSync: string; frequency: string };
}> = {
  coder:   { geoProvider: { name: "Peec AI",  connected: true,  lastSync: "2h ago",  frequency: "Nightly (02:00 UTC)" }, amplitude: { connected: true,  lastSync: "2h ago",  frequency: "Daily"  }, ga4: { connected: false, lastSync: "—", frequency: "Weekly" } },
  vercel:  { geoProvider: { name: "Profound", connected: true,  lastSync: "2h ago",  frequency: "Nightly (03:00 UTC)" }, amplitude: { connected: true,  lastSync: "2h ago",  frequency: "Daily"  }, ga4: { connected: true,  lastSync: "6h ago", frequency: "Weekly" } },
  linear:  { geoProvider: { name: "Peec AI",  connected: true,  lastSync: "5h ago",  frequency: "Nightly (02:00 UTC)" }, amplitude: { connected: false, lastSync: "—",       frequency: "Weekly" }, ga4: { connected: true,  lastSync: "5h ago", frequency: "Weekly" } },
  clerk:   { geoProvider: { name: "Profound", connected: true,  lastSync: "18h ago", frequency: "Nightly (03:30 UTC)" }, amplitude: { connected: false, lastSync: "—",       frequency: "Weekly" }, ga4: { connected: false, lastSync: "—", frequency: "Weekly" } },
  resend:  { geoProvider: { name: "Peec AI",  connected: true,  lastSync: "3h ago",  frequency: "Nightly (02:00 UTC)" }, amplitude: { connected: true,  lastSync: "3h ago",  frequency: "Daily"  }, ga4: { connected: false, lastSync: "—", frequency: "Weekly" } },
  upstash: { geoProvider: { name: "Profound", connected: true,  lastSync: "1h ago",  frequency: "Nightly (03:00 UTC)" }, amplitude: { connected: false, lastSync: "—",       frequency: "Weekly" }, ga4: { connected: false, lastSync: "—", frequency: "Weekly" } },
};

function ConnectModal({ title, onSave, onClose }: { title: string; onSave: (key: string) => void; onClose: () => void }) {
  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const handleSave = () => {
    if (!key.trim()) return;
    setSaving(true);
    setTimeout(() => { setSaving(false); onSave(key); }, 900);
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.55)" }} onClick={onClose}>
      <div style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, padding: 28, width: 400, fontFamily: FONT }} onClick={e => e.stopPropagation()}>
        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: C.t1 }}>Connect {title}</p>
        <p style={{ fontSize: 12, marginBottom: 20, color: C.t3 }}>Enter your API key. We'll verify the connection and start the first sync.</p>
        <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6, color: C.t2 }}>API Key</label>
        <div style={{ position: "relative", marginBottom: 16 }}>
          <input
            type={show ? "text" : "password"}
            value={key}
            onChange={e => setKey(e.target.value)}
            placeholder="Paste your API key…"
            style={{ width: "100%", fontSize: 13, padding: "10px 40px 10px 14px", borderRadius: 10, outline: "none", border: `1px solid ${C.cardLine}`, background: C.inset, color: C.t1, fontFamily: FONT, boxSizing: "border-box" }}
          />
          <button onClick={() => setShow(s => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.t3, display: "flex" }}>
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleSave} disabled={!key.trim() || saving}
            style={{ flex: 1, padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 600, background: C.cream, color: "#0B0A0A", border: "none", cursor: "pointer", opacity: (!key.trim() || saving) ? 0.5 : 1, fontFamily: FONT }}>
            {saving ? "Connecting…" : "Connect & sync"}
          </button>
          <button onClick={onClose}
            style={{ padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "transparent", color: C.t2, border: `1px solid ${C.cardLine}`, cursor: "pointer", fontFamily: FONT }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function IntegrationRow({ label, sub, connected, lastSync, frequency, onConnect, onDisconnect }: {
  label: string; sub: string; connected: boolean; lastSync: string; frequency: string;
  onConnect: () => void; onDisconnect: () => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${C.cardLine}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: connected ? "rgba(74,222,128,0.12)" : C.inset, flexShrink: 0 }}>
          {connected
            ? <CheckCircle2 size={16} style={{ color: C.pos }} />
            : <AlertCircle size={16} style={{ color: C.t3 }} />}
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: C.t1, marginBottom: 2 }}>{label}</p>
          <p style={{ fontSize: 11, color: C.t3 }}>{sub}</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {connected && (
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginBottom: 2 }}>
              <RefreshCw size={9} style={{ color: C.t3 }} />
              <span style={{ fontSize: 11, color: C.t3 }}>{lastSync}</span>
            </div>
            <span style={{ fontSize: 10, color: C.t3, opacity: 0.7 }}>{frequency}</span>
          </div>
        )}
        {connected
          ? <button onClick={onDisconnect} style={{ fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 8, background: "rgba(239,68,68,0.12)", color: C.neg, border: "none", cursor: "pointer", fontFamily: FONT }}>Disconnect</button>
          : <button onClick={onConnect}    style={{ fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 8, background: C.cream, color: "#0B0A0A", border: "none", cursor: "pointer", fontFamily: FONT }}>Connect</button>}
      </div>
    </div>
  );
}

const TEAM = [
  { name: "Jordan Kim",  email: "jordan@yardgeo.com", role: "Account Director",  you: true  },
  { name: "Priya Nair",  email: "priya@yardgeo.com",  role: "Campaign Manager",  you: false },
  { name: "Marcus Cole", email: "marcus@yardgeo.com", role: "Creator Strategist", you: false },
];

export default function AgencySettings() {
  const [tab, setTab] = useState<Tab>("Team");
  const [selectedClient, setSelectedClient] = useState(agencyClientsData[0].id);
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);
  const [connectModal, setConnectModal] = useState<"geoProvider" | "amplitude" | "ga4" | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("yardgeo_view");
    localStorage.removeItem("yardgeo_user");
    localStorage.removeItem("yardgeo_name");
    navigate("/login");
  };

  const client = agencyClientsData.find(c => c.id === selectedClient) ?? agencyClientsData[0];
  const cInt = integrations[selectedClient] ?? integrations[agencyClientsData[0].id];

  const connectSave = (field: "geoProvider" | "amplitude" | "ga4") => {
    setIntegrations(prev => ({
      ...prev,
      [selectedClient]: { ...prev[selectedClient], [field]: { ...prev[selectedClient]?.[field], connected: true, lastSync: "just now" } },
    }));
    setConnectModal(null);
  };

  const disconnect = (field: "geoProvider" | "amplitude" | "ga4") => {
    setIntegrations(prev => ({
      ...prev,
      [selectedClient]: { ...prev[selectedClient], [field]: { ...prev[selectedClient]?.[field], connected: false, lastSync: "—" } },
    }));
  };

  const modalTitle = connectModal === "geoProvider" ? `${cInt?.geoProvider.name ?? "GEO Provider"} (AI Visibility)` : connectModal === "amplitude" ? "Amplitude" : "Google Analytics 4";

  return (
    <div style={{ padding: "20px 24px", fontFamily: FONT, minHeight: "100%" }}>
      {connectModal && (
        <ConnectModal title={modalTitle} onSave={() => connectSave(connectModal)} onClose={() => setConnectModal(null)} />
      )}

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: C.t1, margin: 0, letterSpacing: "-0.015em" }}>Settings</h1>
        <p style={{ fontSize: 13, color: C.t3, marginTop: 3 }}>Agency account and preferences</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 2, borderBottom: `1px solid ${C.cardLine}`, marginBottom: 20 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              fontSize: 13, fontWeight: 500, padding: "8px 16px",
              marginBottom: -1,
              background: "none", border: "none",
              borderBottom: tab === t ? `2px solid ${C.t1}` : "2px solid transparent",
              color: tab === t ? C.t1 : C.t3, cursor: "pointer", fontFamily: FONT, transition: "color 120ms",
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* Team */}
      {tab === "Team" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Team members card */}
          <div style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, padding: "20px 24px" }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.t1, marginBottom: 16 }}>Team members</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TEAM.map((m, i) => (
                <div key={m.email} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < TEAM.length - 1 ? `1px solid ${C.cardLine}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.inset, border: `1px solid ${C.cardLine}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.t1, flexShrink: 0 }}>
                      {m.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: C.t1, marginBottom: 1 }}>
                        {m.name}
                        {m.you && <span style={{ fontSize: 11, marginLeft: 6, color: C.t3 }}>(you)</span>}
                      </p>
                      <p style={{ fontSize: 11, color: C.t3 }}>{m.email}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 8, background: C.inset, border: `1px solid ${C.cardLine}`, color: C.t2 }}>{m.role}</span>
                </div>
              ))}
            </div>
            <button style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, padding: "8px 14px", borderRadius: 8, background: C.cream, color: "#0B0A0A", border: "none", cursor: "pointer", fontFamily: FONT }}>
              <Plus size={13} /> Invite team member
            </button>
          </div>

          {/* Sign out card */}
          <div style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, padding: "20px 24px" }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.t1, marginBottom: 4 }}>Sign out</p>
            <p style={{ fontSize: 12, color: C.t3, marginBottom: 16 }}>You'll be returned to the portal selection screen.</p>
            <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, padding: "8px 14px", borderRadius: 8, background: "rgba(239,68,68,0.12)", color: C.neg, border: "none", cursor: "pointer", fontFamily: FONT }}>
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      )}

      {/* Integrations */}
      {tab === "Integrations" && (
        <div style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.t1, marginBottom: 3 }}>Data integrations</p>
              <p style={{ fontSize: 12, color: C.t3 }}>GEO tracking provider and analytics sources, scoped per client</p>
            </div>
            <div style={{ position: "relative" }}>
              <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)}
                style={{ fontSize: 12, fontWeight: 600, padding: "6px 28px 6px 10px", borderRadius: 8, border: `1px solid ${C.cardLine}`, background: C.inset, color: C.t1, cursor: "pointer", outline: "none", appearance: "none", fontFamily: FONT }}>
                {agencyClientsData.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <ChevronDown size={11} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: C.t3 }} />
            </div>
          </div>

          {/* Client identity strip */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: C.inset, border: `1px solid ${C.cardLine}`, marginBottom: 20 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: client.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
              {client.logo}
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.t1 }}>{client.name}</span>
            <span style={{ fontSize: 11, color: C.t3, marginLeft: "auto" }}>{client.category} · since {client.since}</span>
          </div>

          {cInt ? (
            <>
              <IntegrationRow
                label={`GEO Tracking · ${cInt.geoProvider.name}`}
                sub="Keyword visibility, ranking, and citation tracking"
                connected={cInt.geoProvider.connected} lastSync={cInt.geoProvider.lastSync} frequency={cInt.geoProvider.frequency}
                onConnect={() => setConnectModal("geoProvider")} onDisconnect={() => disconnect("geoProvider")} />
              <IntegrationRow
                label="Amplitude"
                sub="Product analytics — query intent and conversion signals"
                connected={cInt.amplitude.connected} lastSync={cInt.amplitude.lastSync} frequency={cInt.amplitude.frequency}
                onConnect={() => setConnectModal("amplitude")} onDisconnect={() => disconnect("amplitude")} />
              <IntegrationRow
                label="Google Analytics 4"
                sub="Web traffic and search intent data"
                connected={cInt.ga4.connected} lastSync={cInt.ga4.lastSync} frequency={cInt.ga4.frequency}
                onConnect={() => setConnectModal("ga4")} onDisconnect={() => disconnect("ga4")} />
            </>
          ) : (
            <div style={{ padding: "24px 0", textAlign: "center" }}>
              <p style={{ fontSize: 13, color: C.t3 }}>No integration data for this client yet.</p>
              <button onClick={() => setConnectModal("geoProvider")} style={{ marginTop: 12, fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 8, background: C.cream, color: "#0B0A0A", border: "none", cursor: "pointer", fontFamily: FONT }}>
                Connect GEO provider
              </button>
            </div>
          )}

          <p style={{ fontSize: 11, marginTop: 20, lineHeight: 1.6, color: C.t3 }}>
            Integrations sync on a daily schedule. API keys are encrypted at rest and are never shared with creators or third parties.
          </p>
        </div>
      )}

      {/* Billing / Notifications placeholder */}
      {(tab === "Billing" || tab === "Notifications") && (
        <div style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, padding: "48px 24px", textAlign: "center" }}>
          <p style={{ fontSize: 20, marginBottom: 8 }}>
            {tab === "Billing" ? "💳" : "🔔"}
          </p>
          <p style={{ fontSize: 14, fontWeight: 500, color: C.t2, marginBottom: 4 }}>{tab} settings</p>
          <p style={{ fontSize: 12, color: C.t3 }}>Coming soon.</p>
        </div>
      )}
    </div>
  );
}
