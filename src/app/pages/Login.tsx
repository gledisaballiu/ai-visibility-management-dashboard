import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Building2, Users, Eye, EyeOff, AlertCircle } from "lucide-react";
import { YardGEOLogo, WordMark } from "../lib/logo";
import { FONT, agencyClientsData } from "../lib/data";
import { C } from "../lib/theme";

type Portal = "agency" | "client";

const AGENCY_USERS = [
  { name: "Jordan Kim",  email: "jordan@yardgeo.com", role: "Account Director" },
  { name: "Priya Nair",  email: "priya@yardgeo.com",  role: "Campaign Manager" },
  { name: "Marcus Cole", email: "marcus@yardgeo.com", role: "Creator Strategist" },
];

// Map email domain → client id for demo
function clientFromEmail(email: string): string {
  const domain = email.split("@")[1]?.split(".")[0] ?? "";
  const match = agencyClientsData.find((c) => c.id === domain || c.name.toLowerCase() === domain);
  return match?.id ?? agencyClientsData[0].id;
}

export default function Login() {
  const navigate = useNavigate();
  const [portal, setPortal] = useState<Portal | null>(null);
  const [agencyEmail, setAgencyEmail] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [clientEmailError, setClientEmailError] = useState("");
  const [clientPasswordError, setClientPasswordError] = useState("");
  const [clientCredError, setClientCredError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleAgencyLogin = () => {
    const user = AGENCY_USERS.find((u) => u.email === agencyEmail) ?? AGENCY_USERS[0];
    localStorage.setItem("yardgeo_view", "agency");
    localStorage.setItem("yardgeo_user", user.email);
    localStorage.setItem("yardgeo_name", user.name);
    localStorage.removeItem("yardgeo_preview_client");
    navigate("/agency");
  };

  const handleClientLogin = () => {
    setClientEmailError(""); setClientPasswordError(""); setClientCredError("");
    // Demo mode: accept any credentials — derive client from domain if known, else default to coder
    const clientId = clientEmail.trim() ? clientFromEmail(clientEmail) : agencyClientsData[0].id;
    const client = agencyClientsData.find((c) => c.id === clientId) ?? agencyClientsData[0];
    localStorage.setItem("yardgeo_view", "client");
    localStorage.setItem("yardgeo_user", clientEmail.trim() || "demo@coder.com");
    localStorage.setItem("yardgeo_name", clientEmail.trim() ? clientEmail.split("@")[0] : "demo");
    localStorage.setItem("yardgeo_client", client.id);
    navigate("/client");
    if (client.status === "onboarding") navigate("/client/setup");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: C.page, fontFamily: FONT }}>
      <div style={{ width: "100%", maxWidth: 900 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48, justifyContent: "center" }}>
          <YardGEOLogo size={32} />
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: C.t1, fontFamily: FONT }}>YardGEO</span>
        </div>

        {!portal ? (
          <>
            <p style={{ textAlign: "center", fontSize: 14, marginBottom: 32, color: C.t2 }}>
              Sign in to your portal
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 680, margin: "0 auto" }}>
              <PortalCard
                icon={Users}
                label="Agency Login"
                sub="YardGEO team members only"
                bullets={["All client accounts", "Campaign management", "Creator roster & pipeline", "View any client's portal"]}
                onClick={() => setPortal("agency")}
              />
              <PortalCard
                icon={Building2}
                label="Client Portal"
                sub="For brands we work with"
                bullets={["Your AI visibility score", "Active campaigns overview", "Content review & approval", "Monthly reports"]}
                onClick={() => setPortal("client")}
              />
            </div>
          </>
        ) : (
          <div style={{ maxWidth: 380, margin: "0 auto" }}>
            <button
              onClick={() => { setPortal(null); setClientEmailError(""); setClientPasswordError(""); setClientCredError(""); }}
              style={{ fontSize: 12, marginBottom: 24, display: "flex", alignItems: "center", gap: 4, color: C.t3, background: "none", border: "none", cursor: "pointer", fontFamily: FONT }}>
              ← Back
            </button>

            <div style={{ background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 16, padding: 32 }}>
              {/* Portal label */}
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, background: C.inset, color: C.t2, border: `1px solid ${C.cardLine}` }}>
                  {portal === "agency" ? "Agency" : "Client Portal"}
                </span>
              </div>

              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4, color: C.t1, letterSpacing: "-0.015em" }}>
                {portal === "agency" ? "Sign in to YardGEO" : "Welcome back"}
              </h2>
              <p style={{ fontSize: 14, marginBottom: 24, color: C.t2 }}>
                {portal === "agency"
                  ? "Access all client accounts and campaigns."
                  : "Sign in to view your AI visibility dashboard."}
              </p>

              {portal === "agency" ? (
                <>
                  <p style={{ fontSize: 12, marginBottom: 16, padding: "10px 12px", borderRadius: 12, background: C.inset, border: `1px solid ${C.cardLine}`, color: C.t2 }}>
                    Agency accounts sign in through your work account. No password needed here.
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: C.t2 }}>Team member</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                    {AGENCY_USERS.map((u) => (
                      <button key={u.email} onClick={() => setAgencyEmail(u.email)}
                        style={{
                          fontSize: 12, padding: "6px 12px", borderRadius: 8,
                          border: `1px solid ${agencyEmail === u.email ? C.cream : C.cardLine}`,
                          background: agencyEmail === u.email ? C.cream : "transparent",
                          color: agencyEmail === u.email ? "#0B0A0A" : C.t2,
                          cursor: "pointer", fontFamily: FONT, transition: "all 120ms",
                        }}>
                        {u.name}
                      </button>
                    ))}
                  </div>
                  <input value={agencyEmail} onChange={(e) => setAgencyEmail(e.target.value)}
                    placeholder="or enter email address…"
                    style={{
                      width: "100%", fontSize: 14, padding: "10px 14px", borderRadius: 12, marginBottom: 20,
                      outline: "none", border: `1px solid ${C.cardLine}`, background: C.inset,
                      color: C.t1, fontFamily: FONT, boxSizing: "border-box",
                    }} />
                  <button onClick={handleAgencyLogin}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "10px 18px", borderRadius: 8, fontWeight: 600, fontSize: 14,
                      background: C.cream, color: "#0B0A0A", border: "none", cursor: "pointer", fontFamily: FONT,
                    }}>
                    Sign in <ArrowRight size={14} />
                  </button>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                    <div>
                      <label htmlFor="client-email" style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: "block", color: C.t2 }}>Work email</label>
                      <input
                        id="client-email"
                        ref={emailRef}
                        value={clientEmail}
                        onChange={(e) => { setClientEmail(e.target.value); setClientEmailError(""); setClientCredError(""); }}
                        placeholder="you@yourcompany.com"
                        type="email"
                        style={{
                          width: "100%", fontSize: 14, padding: "10px 14px", borderRadius: 12, outline: "none",
                          border: `1px solid ${clientEmailError ? "#FCA5A5" : C.cardLine}`,
                          background: C.inset, color: C.t1, fontFamily: FONT, boxSizing: "border-box",
                        }} />
                      {clientEmailError && (
                        <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, marginTop: 6, color: "#EF4444" }}>
                          <AlertCircle size={11} />{clientEmailError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="client-password" style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: "block", color: C.t2 }}>Password</label>
                      <div style={{ position: "relative" }}>
                        <input
                          id="client-password"
                          ref={passwordRef}
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setClientPasswordError(""); setClientCredError(""); }}
                          placeholder="••••••••"
                          type={showPass ? "text" : "password"}
                          style={{
                            width: "100%", fontSize: 14, padding: "10px 40px 10px 14px", borderRadius: 12, outline: "none",
                            border: `1px solid ${clientPasswordError ? "#FCA5A5" : C.cardLine}`,
                            background: C.inset, color: C.t1, fontFamily: FONT, boxSizing: "border-box",
                          }} />
                        <button onClick={() => setShowPass(!showPass)}
                          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.t3, padding: 0, display: "flex" }}>
                          {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                      {clientPasswordError && (
                        <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, marginTop: 6, color: "#EF4444" }}>
                          <AlertCircle size={11} />{clientPasswordError}
                        </p>
                      )}
                    </div>
                  </div>

                  {clientCredError && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, borderRadius: 12, padding: "10px 12px", marginBottom: 12, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      <AlertCircle size={13} style={{ marginTop: 1, flexShrink: 0, color: "#EF4444" }} />
                      <p style={{ fontSize: 12, color: "#EF4444", margin: 0 }}>{clientCredError}</p>
                    </div>
                  )}

                  <button onClick={handleClientLogin}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "10px 18px", borderRadius: 8, fontWeight: 600, fontSize: 14, marginBottom: 16,
                      background: C.cream, color: "#0B0A0A", border: "none", cursor: "pointer", fontFamily: FONT,
                    }}>
                    Sign in <ArrowRight size={14} />
                  </button>

                  <p style={{ textAlign: "center", fontSize: 12, color: C.t2 }}>
                    Forgot your password?{" "}
                    <button style={{ background: "none", border: "none", textDecoration: "underline", cursor: "pointer", color: C.t3, fontSize: 12, fontFamily: FONT }}>
                      Reset it
                    </button>
                  </p>

                  {/* Demo hint */}
                  
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PortalCard({ icon: Icon, label, sub, bullets, onClick }: {
  icon: React.ComponentType<any>;
  label: string; sub: string; bullets: string[]; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#232020", borderRadius: 16, padding: 28, textAlign: "left",
        display: "flex", flexDirection: "column", gap: 20,
        border: `1px solid ${hovered ? "#504A46" : "#302B28"}`,
        cursor: "pointer", transition: "border-color 150ms, transform 150ms",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        fontFamily: FONT,
      }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "#1B1817", flexShrink: 0 }}>
        <Icon size={18} color="#EFE9E1" />
      </div>
      <div>
        <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 2, color: "#EFE9E1" }}>{label}</p>
        <p style={{ fontSize: 12, color: "#77706A" }}>{sub}</p>
      </div>
      <ul style={{ display: "flex", flexDirection: "column", gap: 6, listStyle: "none", padding: 0, margin: 0 }}>
        {bullets.map((b) => (
          <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#77706A" }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#504A46", flexShrink: 0 }} />{b}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, marginTop: "auto", color: "#EFE9E1" }}>
        Continue <ArrowRight size={12} />
      </div>
    </button>
  );
}
