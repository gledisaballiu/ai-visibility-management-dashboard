import { createBrowserRouter, redirect } from "react-router";
import Login from "./pages/Login";
import Report from "./pages/Report";

import AgencyLayout from "./pages/agency/Layout";
import AgencyDashboard from "./pages/agency/Dashboard";
import AgencyClients from "./pages/agency/Clients";
import AgencyCreators from "./pages/agency/Creators";
import AgencySettings from "./pages/agency/AgencySettings";
import AgencyPlanner from "./pages/agency/Planner";
import AgencyClientDetail from "./pages/agency/ClientDetail";
import ClientApprovals from "./pages/client/Review";

import ClientLayout from "./pages/client/Layout";
import ClientOverview from "./pages/client/Overview";
import ClientCampaigns from "./pages/client/Campaigns";
import ClientReports from "./pages/client/ClientReports";

function requireAgency() {
  if (!localStorage.getItem("yardgeo_user")) return redirect("/login");
  if (localStorage.getItem("yardgeo_view") !== "agency" && localStorage.getItem("yardgeo_view") !== "agency_preview") {
    return redirect("/client");
  }
  return null;
}

function requireClient() {
  if (!localStorage.getItem("yardgeo_user")) return redirect("/login");
  const view = localStorage.getItem("yardgeo_view");
  if (view !== "client" && view !== "agency_preview") return redirect("/agency");
  return null;
}

export const router = createBrowserRouter([
  { path: "/login", Component: Login },
  { path: "/report", Component: Report },

  {
    path: "/agency",
    Component: AgencyLayout,
    loader: requireAgency,
    children: [
      { index: true, Component: AgencyDashboard },
      { path: "clients",       Component: AgencyClients },
      { path: "clients/:id",   Component: AgencyClientDetail },
      { path: "campaigns",     loader: () => redirect("/agency/planner") },
      { path: "creators",      Component: AgencyCreators },
      { path: "planner",       Component: AgencyPlanner },
      { path: "settings",      Component: AgencySettings },
    ],
  },

  {
    path: "/client",
    Component: ClientLayout,
    loader: requireClient,
    children: [
      { index: true, Component: ClientOverview },
      { path: "campaigns", Component: ClientCampaigns },
      { path: "content",   Component: ClientCampaigns },
      { path: "approvals", Component: ClientApprovals },
      { path: "review",    loader: () => redirect("/client/approvals") },
      { path: "citations", loader: () => redirect("/client") },
      { path: "reports",   Component: ClientReports },
    ],
  },

  {
    path: "/",
    loader: () => {
      const view = localStorage.getItem("yardgeo_view");
      const user = localStorage.getItem("yardgeo_user");
      if (!user) return redirect("/login");
      if (view === "client") return redirect("/client");
      return redirect("/agency");
    },
    Component: () => null,
  },
]);
