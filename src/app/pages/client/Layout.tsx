import { Outlet, NavLink, useNavigate } from "react-router";
import { agencyClientsData, agencyPipelineData } from "../../lib/data";
import { YardGEOLogo } from "../../lib/logo";
import { C } from "../../lib/theme";

const FONT = "Inter, -apple-system, system-ui, sans-serif";

// Nav item svgs
const NAV = [
  {
    to: "/client", end: true, label: "Overview",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={20} height={20}><rect x="3" y="3" width="7.5" height="7.5" rx="1.8"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.8"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.8"/></svg>,
  },
  {
    to: "/client/content", label: "Content",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={20} height={20}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>,
  },
  {
    to: "/client/approvals", label: "Approvals",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={20} height={20}><ellipse cx="12" cy="6" rx="8" ry="3.2"/><path d="M4 6v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V6"/><path d="M4 12v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v-6"/></svg>,
  },
  {
    to: "/client/reports", label: "Reports",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={20} height={20}><path d="M5 20V11M12 20V4M19 20v-6"/></svg>,
  },
];

export default function ClientLayout() {
  const navigate = useNavigate();
  const view = localStorage.getItem("yardgeo_view") || "client";
  const isAgencyPreview = view === "agency_preview";
  const clientId = localStorage.getItem("yardgeo_preview_client") || "coder";
  const client = agencyClientsData.find(c => c.id === clientId) || agencyClientsData[0];

  const pendingCount = agencyPipelineData.filter(
    p => p.client === client.name && p.stage === "client_review"
  ).length;

  function handleExitPreview() {
    localStorage.setItem("yardgeo_view", "agency");
    navigate("/agency");
  }

  function handleLogout() {
    localStorage.removeItem("yardgeo_user");
    localStorage.removeItem("yardgeo_view");
    localStorage.removeItem("yardgeo_preview_client");
    navigate("/login");
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: C.page, fontFamily: FONT }}>
      {/* Radial ambient glows */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(700px 380px at 68% -8%, rgba(38,120,128,.30), transparent 70%), radial-gradient(620px 420px at 6% 104%, rgba(122,26,48,.28), transparent 70%)",
      }} />

      {/* Icon-only rail */}
      <aside style={{
        position: "relative", zIndex: 10,
        width: 78, flexShrink: 0, height: "100vh",
        background: C.rail, borderRight: `1px solid ${C.railLine}`,
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "22px 0 20px",
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 26, flexShrink: 0 }}>
          <YardGEOLogo size={34} />
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
          {NAV.map(({ to, end, label, svg }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={label}
              style={({ isActive }) => ({
                width: 54, borderRadius: 11,
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "8px 0",
                color: isActive ? C.t1 : "#8B837C",
                background: isActive ? C.hover : "transparent",
                textDecoration: "none",
                transition: "background 120ms, color 120ms",
                cursor: "pointer",
              })}
            >
              {({ isActive }: { isActive: boolean }) => (
                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  {svg}
                  {/* Red notification dot on Approvals */}
                  {label === "Approvals" && pendingCount > 0 && (
                    <span style={{
                      position: "absolute", top: -2, right: -2, width: 7, height: 7,
                      borderRadius: "50%", background: "#EF4444",
                      border: `1.5px solid ${C.rail}`,
                    }} />
                  )}
                  <span style={{ fontSize: 9, fontWeight: 500, color: isActive ? C.t1 : C.t3, letterSpacing: "0.02em" }}>{label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: avatar (clickable to log out when not preview) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div
            onClick={!isAgencyPreview ? handleLogout : undefined}
            title={!isAgencyPreview ? "Log out" : undefined}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              overflow: "hidden", border: `1px solid ${C.railLine}`,
              flexShrink: 0,
              cursor: !isAgencyPreview ? "pointer" : "default",
            }}
          >
            <img
              src="https://api.dicebear.com/9.x/notionists/svg?seed=owner&backgroundColor=b6e3f4"
              alt="You"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </aside>

      {/* Main — scrolls vertically */}
      <main style={{
        position: "relative", zIndex: 1,
        flex: 1, minWidth: 0, overflowY: "auto",
        background: C.shell,
      }}>
        {/* Agency preview banner — sticky at top of scrollable area */}
        {isAgencyPreview && (
          <div style={{
            position: "sticky", top: 0, zIndex: 20,
            height: 36, background: "#171413",
            borderBottom: "1px solid #272322",
            display: "flex", alignItems: "center",
            paddingLeft: 16, paddingRight: 16, gap: 12, flexShrink: 0,
          }}>
            <button
              onClick={handleExitPreview}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: C.t2, fontSize: 12, fontWeight: 500, fontFamily: FONT, padding: 0,
                display: "flex", alignItems: "center", gap: 5,
                transition: "color 120ms",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = C.t1)}
              onMouseLeave={e => (e.currentTarget.style.color = C.t2)}
            >
              ← Back to agency
            </button>
            <div style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              fontSize: 12, color: C.t3, pointerEvents: "none",
            }}>
              Previewing as {client.name}
            </div>
          </div>
        )}
        <Outlet context={{ client, pendingCount, isAgencyPreview }} />
      </main>
    </div>
  );
}
