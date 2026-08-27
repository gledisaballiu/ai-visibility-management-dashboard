import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import { LayoutDashboard, Users, UserSquare2, LayoutList, Settings, LogOut, Bell } from "lucide-react";
import { YardGEOLogo } from "../../lib/logo";
import { FONT } from "../../lib/data";
import { C } from "../../lib/theme";

const RAIL_COLLAPSED = 72;
const RAIL_EXPANDED  = 220;

const NAV = [
  { to: "/agency",          label: "Dashboard", Icon: LayoutDashboard, end: true },
  { to: "/agency/clients",  label: "Clients",   Icon: Users },
  { to: "/agency/planner",  label: "Planner",   Icon: LayoutList },
  { to: "/agency/creators", label: "Creators",  Icon: UserSquare2 },
];

const USERS = [
  { id: "jordan",  name: "Jordan Kim",     role: "Account Director"   },
  { id: "priya",   name: "Priya Nair",     role: "Campaign Manager"   },
  { id: "marcus",  name: "Marcus Cole",    role: "Creator Strategist"  },
];

export default function AgencyLayout() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true); // Agency defaults EXPANDED
  const [userOpen, setUserOpen] = useState(false);

  // User stored as plain email string or name string — not JSON
  const displayName = localStorage.getItem("yardgeo_name") || "";
  const userEmail = localStorage.getItem("yardgeo_user") || "";
  // Try to match against known users by email/id
  const matchedUser = USERS.find(u => u.id === userEmail || u.name === displayName);
  const currentUser = matchedUser || { id: "jordan", name: displayName || "Jordan Kim", role: "Account Director" };

  function switchUser(uid: string) {
    const u = USERS.find(x => x.id === uid);
    if (u) {
      localStorage.setItem("yardgeo_user", u.id);
      localStorage.setItem("yardgeo_name", u.name);
    }
    setUserOpen(false);
    window.location.reload();
  }

  function handleLogout() {
    localStorage.removeItem("yardgeo_user");
    localStorage.removeItem("yardgeo_name");
    localStorage.removeItem("yardgeo_view");
    navigate("/login");
  }

  const initials = currentUser.name.split(" ").map((n: string) => n[0]).join("");

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: C.page, fontFamily: FONT }}>
      {/* Rail */}
      <div
        style={{
          width: expanded ? RAIL_EXPANDED : RAIL_COLLAPSED,
          minWidth: expanded ? RAIL_EXPANDED : RAIL_COLLAPSED,
          background: C.rail,
          borderRight: `1px solid ${C.railLine}`,
          display: "flex",
          flexDirection: "column",
          transition: "width 320ms cubic-bezier(0.4,0,0.2,1), min-width 320ms cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
          zIndex: 20,
          flexShrink: 0,
        }}
      >
        {/* Logo + collapse toggle */}
        <div style={{ padding: "14px 0 10px", display: "flex", alignItems: "center", paddingLeft: 12, paddingRight: 8, gap: 8, minWidth: 0 }}>
          <div style={{ width: 28, height: 28, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <YardGEOLogo size={24} />
          </div>
          {expanded && (
            <span style={{ color: C.t1, fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", flex: 1, overflow: "hidden" }}>YardGEO</span>
          )}
          <button
            onClick={() => setExpanded(e => !e)}
            title={expanded ? "Collapse" : "Expand"}
            style={{ background: "none", border: "none", cursor: "pointer", color: C.t3, padding: "4px", borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", marginLeft: expanded ? 0 : "auto" }}
            onMouseEnter={e => (e.currentTarget.style.color = C.t2)}
            onMouseLeave={e => (e.currentTarget.style.color = C.t3)}
          >
            {expanded
              ? <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            }
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          {NAV.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={!expanded ? label : undefined}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", gap: 10,
                padding: expanded ? "10px 16px" : "10px 0",
                justifyContent: expanded ? "flex-start" : "center",
                textDecoration: "none",
                color: isActive ? C.t1 : C.t3,
                background: isActive ? C.hover : "transparent",
                borderLeft: isActive ? `3px solid ${C.t1}` : "3px solid transparent",
                marginBottom: 2, transition: "all 150ms",
              })}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {expanded && <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: settings + user pill */}
        <div style={{ borderTop: `1px solid ${C.railLine}` }}>
          {/* Settings nav item */}
          <NavLink
            to="/agency/settings"
            title={!expanded ? "Settings" : undefined}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: 10,
              padding: expanded ? "10px 16px" : "10px 0",
              justifyContent: expanded ? "flex-start" : "center",
              textDecoration: "none",
              color: isActive ? C.t1 : C.t3,
              background: isActive ? C.hover : "transparent",
              borderLeft: isActive ? `3px solid ${C.t1}` : "3px solid transparent",
              transition: "all 150ms",
            })}
          >
            <Settings size={18} style={{ flexShrink: 0 }} />
            {expanded && <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>Settings</span>}
          </NavLink>

          {/* User pill */}
          <div style={{ padding: "8px 0" }}>
            {expanded ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setUserOpen(o => !o)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", width: "100%", background: "none", border: "none", cursor: "pointer", color: C.t2 }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#3B3530", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.cream, flexShrink: 0 }}>
                    {initials}
                  </div>
                  <div style={{ flex: 1, textAlign: "left", overflow: "hidden" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.t1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentUser.name}</div>
                    <div style={{ fontSize: 10, color: C.t3 }}>{currentUser.role}</div>
                  </div>
                </button>
                {userOpen && (
                  <div style={{ position: "absolute", bottom: "100%", left: 12, right: 12, background: C.card, border: `1px solid ${C.cardLine}`, borderRadius: 10, overflow: "hidden", zIndex: 100 }}>
                    {USERS.map(u => (
                      <button key={u.id} onClick={() => switchUser(u.id)} style={{ display: "block", width: "100%", padding: "10px 14px", background: u.id === currentUser.id ? C.hover : "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: u.id === currentUser.id ? C.t1 : C.t2 }}>{u.name}</div>
                        <div style={{ fontSize: 10, color: C.t3 }}>{u.role}</div>
                      </button>
                    ))}
                    <div style={{ borderTop: `1px solid ${C.cardLine}` }}>
                      <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", color: C.t3, fontSize: 12, fontFamily: FONT }}>
                        <LogOut size={14} /> Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={handleLogout} title="Log out" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0", width: "100%", background: "none", border: "none", cursor: "pointer", color: C.t3 }}>
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Slim topbar */}
        <div style={{ height: 44, background: C.rail, borderBottom: `1px solid ${C.railLine}`, display: "flex", alignItems: "center", paddingLeft: 20, paddingRight: 20, flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: C.t3 }}>YardGEO Agency</span>
          <div style={{ flex: 1 }} />
          {/* Notification bell */}
          <div style={{ position: "relative", marginRight: 14 }}>
            <button
              style={{ background: "none", border: "none", cursor: "pointer", color: C.t3, display: "flex", alignItems: "center", padding: 4, borderRadius: 8 }}
              onMouseEnter={e => (e.currentTarget.style.color = C.t2)}
              onMouseLeave={e => (e.currentTarget.style.color = C.t3)}
              title="3 new notifications"
            >
              <Bell size={16} />
            </button>
            {/* Red dot */}
            <span style={{
              position: "absolute", top: 2, right: 2, width: 7, height: 7,
              borderRadius: "50%", background: "#EF4444", border: `1.5px solid ${C.rail}`,
              pointerEvents: "none",
            }} />
          </div>
          <span style={{ fontSize: 12, color: C.t3 }}>{currentUser.name}</span>
        </div>

        <main style={{ flex: 1, overflow: "auto", background: C.shell }}>
          <Outlet context={{ currentUser }} />
        </main>
      </div>
    </div>
  );
}
