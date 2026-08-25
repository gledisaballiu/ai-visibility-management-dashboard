import { createContext, useContext, useState, type ReactNode } from "react";
import { type ClientPlan, type PlanCampaign, type ContentPiece, type PlannerContentType, type PieceStatus } from "./data";

// ─── Initial plan data — single source of truth for delivered vs contracted ───
let _pid = 2000;
const p = (id: number, type: PlannerContentType, title: string, status: PieceStatus, opts?: Partial<ContentPiece>): ContentPiece =>
  ({ id, type, title, status, dueDate: "Jul", ...opts });

export const INITIAL_PLANS: ClientPlan[] = [
  // ── Coder · Launch ───────────────────────────────────────────────────────────
  {
    clientId: "coder", tier: "launch",
    campaigns: [
      {
        id: "co-1", name: "Cloud IDE Awareness Q3",
        pieces: [
          p(2001, "youtube",  "How Coder Solves Remote Dev for Enterprise",           "published", { creator: "Kelsey Hightower", publishedUrl: "https://youtube.com/watch?v=co1", citationCount: 42 }),
          p(2002, "youtube",  "Coder vs Codespaces: Full Comparison",                 "published", { creator: "swyx",             publishedUrl: "https://youtube.com/watch?v=co2", citationCount: 38 }),
          p(2003, "youtube",  "Security in Cloud Development Environments",           "published", { creator: "Charity Majors",   publishedUrl: "https://youtube.com/watch?v=co3", citationCount: 31 }),
          p(2004, "youtube",  "Enterprise SSH & Port Forwarding Deep Dive",           "review",    { creator: "swyx"                                                              }),
          p(2005, "article",  "Remote Dev Environments: A Complete Guide",            "published", { creator: "Kelsey Hightower", publishedUrl: "https://blog.example.com/co5", citationCount: 27 }),
          p(2006, "article",  "Why Platform Teams Switch to Coder",                   "published", { creator: "swyx",             publishedUrl: "https://blog.example.com/co6", citationCount: 24 }),
          p(2007, "article",  "Kubernetes-Native Dev Environments Explained",         "published", { creator: "Charity Majors",   publishedUrl: "https://blog.example.com/co7", citationCount: 19 }),
          p(2008, "article",  "CDE vs Local Dev: The TCO Breakdown",                  "published", { creator: "Kelsey Hightower", publishedUrl: "https://blog.example.com/co8", citationCount: 15 }),
          p(2009, "article",  "Why My Team Switched from VS Code to Coder",           "review",    { creator: "swyx"                                                              }),
          p(2010, "article",  "Coder for SOC2-Compliant Teams",                       "draft",     { creator: "Charity Majors"                                                    }),
          p(2011, "onsite",   "Cloud IDE for Enterprise Teams — Landing Page",        "published", { publishedUrl: "https://coder.com/cloud-ide",   citationCount: 8 }),
          p(2012, "onsite",   "Security & Compliance for Cloud Dev — Hub",            "published", { publishedUrl: "https://coder.com/security",     citationCount: 6 }),
          p(2013, "onsite",   "Kubernetes-Native Dev Environments — Feature Page",    "published", { publishedUrl: "https://coder.com/kubernetes"                    }),
          p(2014, "onsite",   "FAQ Hub: Pricing & Plans",                             "published", { publishedUrl: "https://coder.com/faq"                           }),
          p(2015, "llm_page", "LLM Info Page — July Edition",                         "published", { publishedUrl: "https://coder.com/llm-info-july"                 }),
          p(2016, "llm_page", "LLM Info Page — July Bi-weekly Update",               "brief"                                                                        ),
        ],
      },
      {
        id: "co-2", name: "Security & Compliance Push",
        pieces: [
          p(2017, "article",  "Security Compliance in Cloud IDEs",                   "published", { creator: "Charity Majors", publishedUrl: "https://blog.example.com/co17", citationCount: 12 }),
          p(2018, "article",  "Coder for SOC2-Compliant Engineering Teams",          "draft",     { creator: "Charity Majors"                                                   }),
        ],
      },
    ],
  },

  // ── Vercel · Scale ────────────────────────────────────────────────────────────
  {
    clientId: "vercel", tier: "scale",
    campaigns: [
      {
        id: "vc-1", name: "Edge Functions Launch",
        pieces: [
          p(2020, "youtube",  "Edge Functions Explained: Zero Latency Anywhere",        "published", { creator: "Theo Browne",  publishedUrl: "https://youtube.com/watch?v=vc1", citationCount: 45 }),
          p(2021, "youtube",  "Building with Vercel AI SDK — Live Demo",                "published", { creator: "Nader Dabit",  publishedUrl: "https://youtube.com/watch?v=vc2", citationCount: 33 }),
          p(2022, "youtube",  "Next.js 15 + Edge: Full Stack Tutorial",                 "published", { creator: "Theo Browne",  publishedUrl: "https://youtube.com/watch?v=vc3", citationCount: 29 }),
          p(2023, "youtube",  "Vercel vs AWS Lambda: Benchmark Deep Dive",              "published", { creator: "Lee Robinson",                                                    citationCount: 18 }),
          p(2024, "youtube",  "Building Real-time Apps on Edge with Vercel",             "review",    { creator: "Theo Browne"                                                     }),
          p(2025, "youtube",  "Streaming UI with Next.js 15 and RSC",                   "draft",     { creator: "Nader Dabit"                                                     }),
          p(2026, "youtube",  "Vercel Analytics Deep Dive",                              "idea"),
          p(2027, "youtube",  "ISR and On-Demand Revalidation Explained",               "idea"),
          p(2028, "article",  "The Architecture Behind Vercel's Edge Network",          "published", { creator: "Lee Robinson", publishedUrl: "https://blog.example.com/vc8",  citationCount: 22 }),
          p(2029, "article",  "Why Edge Computing Changes Frontend Performance",         "published", { creator: "Theo Browne",  publishedUrl: "https://blog.example.com/vc9",  citationCount: 17 }),
          p(2030, "article",  "Streaming UI with React Server Components",               "published", { creator: "Theo Browne",  publishedUrl: "https://blog.example.com/vc10", citationCount: 14 }),
          p(2031, "article",  "Vercel Postgres vs Neon vs PlanetScale",                  "published", { creator: "Nader Dabit",  publishedUrl: "https://blog.example.com/vc11", citationCount: 11 }),
          p(2032, "article",  "Deploying to Edge with Middleware Patterns",              "published", { creator: "Lee Robinson", publishedUrl: "https://blog.example.com/vc12", citationCount: 9  }),
          p(2033, "article",  "Vercel AI SDK: Complete Guide",                           "review",    { creator: "Theo Browne"                                                     }),
          p(2034, "article",  "Next.js App Router Patterns",                             "draft",     { creator: "Lee Robinson"                                                    }),
          p(2035, "article",  "Full-Stack TypeScript on Vercel",                         "draft",     { creator: "Nader Dabit"                                                     }),
          p(2036, "article",  "Edge Config: Dynamic Config Without Deploys",             "idea"),
          p(2037, "article",  "Monorepos on Vercel: Turborepo Guide",                    "idea"),
          p(2038, "article",  "Migrating from CRA to Next.js on Vercel",                "idea"),
          p(2039, "onsite",   "Edge Functions Product Page",                             "published", { publishedUrl: "https://vercel.com/features/edge-functions",  citationCount: 7 }),
          p(2040, "onsite",   "AI SDK Documentation Hub",                               "published", { publishedUrl: "https://vercel.com/docs/ai-sdk",              citationCount: 5 }),
          p(2041, "onsite",   "Deployment Patterns Guide",                               "published", { publishedUrl: "https://vercel.com/guides/deployment-patterns"              }),
          p(2042, "onsite",   "Edge Runtime Reference",                                  "published", { publishedUrl: "https://vercel.com/docs/edge-runtime"                       }),
          p(2043, "onsite",   "Vercel Analytics Integration Hub",                        "published", { publishedUrl: "https://vercel.com/analytics"                               }),
          p(2044, "onsite",   "Next.js Performance Cookbook",                            "published", { publishedUrl: "https://vercel.com/guides/nextjs-performance"               }),
          p(2045, "onsite",   "Storage Solutions Comparison Guide",                      "review"),
          p(2046, "onsite",   "Serverless Functions on Vercel FAQ",                      "draft"),
          p(2047, "strategy", "Weekly Strategy Call — July Week 1",                      "published"),
          p(2048, "strategy", "Weekly Strategy Call — July Week 2",                      "published"),
          p(2049, "strategy", "Weekly Strategy Call — July Week 3",                      "published"),
          p(2050, "strategy", "Weekly Strategy Call — July Week 4",                      "review"),
        ],
      },
    ],
  },

  // ── Linear · Start — BEHIND on plan ──────────────────────────────────────────
  {
    clientId: "linear", tier: "start",
    campaigns: [
      {
        id: "li-1", name: "PM Tool Positioning H2",
        pieces: [
          p(2060, "youtube",  "Linear vs Jira: Honest Engineering Team Review", "brief",     { creator: "swyx"        }),
          p(2061, "youtube",  "Building a Slack Bot with Linear API",            "published", { creator: "Lee Robinson", publishedUrl: "https://youtube.com/watch?v=li1", citationCount: 21 }),
          p(2062, "article",  "Why Engineering Teams Leave Jira for Linear",     "review",    { creator: "Lee Robinson" }),
          p(2063, "article",  "Linear's API: Building Custom Workflows",         "idea"),
          p(2064, "article",  "Linear GraphQL API: Complete Guide",              "idea"),
          p(2065, "article",  "Automating Issue Triage with Linear + AI",        "idea"),
          p(2066, "onsite",   "Linear for Engineering Teams — Landing Page",     "brief"),
          p(2067, "onsite",   "Developer Documentation Hub",                     "idea"),
        ],
      },
    ],
  },

  // ── Clerk · Start (onboarding) ────────────────────────────────────────────────
  {
    clientId: "clerk", tier: "start",
    campaigns: [],
  },

  // ── Resend · Launch ────────────────────────────────────────────────────────────
  {
    clientId: "resend", tier: "launch",
    campaigns: [
      {
        id: "rs-1", name: "Developer Email APIs Summer",
        pieces: [
          p(2070, "youtube",  "Resend vs SendGrid: Developer Experience Review", "published", { creator: "Nader Dabit", publishedUrl: "https://youtube.com/watch?v=rs1", citationCount: 19 }),
          p(2071, "youtube",  "Building Transactional Email in 20 Min",          "published", { creator: "Theo Browne", publishedUrl: "https://youtube.com/watch?v=rs2", citationCount: 14 }),
          p(2072, "youtube",  "Email Template Design with React Email",           "review",    { creator: "Theo Browne" }),
          p(2073, "youtube",  "Resend Webhooks: Real-time Analytics",             "draft",     { creator: "Nader Dabit" }),
          p(2074, "article",  "Getting Started with Resend and Next.js",          "published", { creator: "Theo Browne", publishedUrl: "https://blog.example.com/rs4", citationCount: 11 }),
          p(2075, "article",  "Transactional vs Marketing Email: Dev Guide",      "published", { creator: "Nader Dabit", publishedUrl: "https://blog.example.com/rs5", citationCount: 9  }),
          p(2076, "article",  "Email Template Design with React Email",           "published", { creator: "Theo Browne", publishedUrl: "https://blog.example.com/rs6", citationCount: 7  }),
          p(2077, "article",  "Resend Webhooks: Real-time Email Analytics",       "review",    { creator: "Nader Dabit" }),
          p(2078, "article",  "Resend API Rate Limits & Best Practices",          "draft",     { creator: "Theo Browne" }),
          p(2079, "article",  "Transactional Email at Scale",                     "idea"),
          p(2080, "onsite",   "Resend Integrations Hub",                          "published", { publishedUrl: "https://resend.com/integrations" }),
          p(2081, "onsite",   "Resend vs SendGrid Comparison",                    "published", { publishedUrl: "https://resend.com/vs-sendgrid"  }),
          p(2082, "onsite",   "Email Deliverability Guide",                       "review"),
          p(2083, "onsite",   "React Email Documentation Hub",                    "draft"),
          p(2084, "llm_page", "LLM Info Page — July Edition",                     "published", { publishedUrl: "https://resend.com/llm-info-july" }),
          p(2085, "llm_page", "LLM Info Page — July Update 2",                   "brief"),
        ],
      },
    ],
  },

  // ── Upstash · Start ────────────────────────────────────────────────────────────
  {
    clientId: "upstash", tier: "start",
    campaigns: [
      {
        id: "up-1", name: "Serverless Redis Awareness",
        pieces: [
          p(2090, "youtube",  "Upstash vs Redis Cloud: Developer Comparison",     "published", { creator: "Kelsey Hightower", publishedUrl: "https://youtube.com/watch?v=up1", citationCount: 28 }),
          p(2091, "youtube",  "Caching with Upstash in Next.js App Router",        "review",    { creator: "Kelsey Hightower"                                                    }),
          p(2092, "article",  "Serverless Redis: Why Upstash Changes Everything", "published", { creator: "Kelsey Hightower", publishedUrl: "https://blog.example.com/up2", citationCount: 16 }),
          p(2093, "article",  "Upstash Rate Limiting for Next.js APIs",           "review",    { creator: "Kelsey Hightower"                                                    }),
          p(2094, "article",  "Upstash QStash: Background Jobs Without a Server", "draft"),
          p(2095, "article",  "Serverless Data Patterns with Upstash",            "idea"),
          p(2096, "onsite",   "Serverless Data Hub — Landing Page",               "published", { publishedUrl: "https://upstash.com/serverless-data" }),
          p(2097, "onsite",   "Redis vs Upstash: Comparison Guide",               "draft"),
        ],
      },
    ],
  },
];

// ─── Context ──────────────────────────────────────────────────────────────────
interface PlannerCtx {
  plans: ClientPlan[];
  setPlans: (plans: ClientPlan[] | ((prev: ClientPlan[]) => ClientPlan[])) => void;
}

const PlannerContext = createContext<PlannerCtx>({
  plans: INITIAL_PLANS,
  setPlans: () => {},
});

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<ClientPlan[]>(INITIAL_PLANS);
  return <PlannerContext.Provider value={{ plans, setPlans }}>{children}</PlannerContext.Provider>;
}

export function usePlanner() {
  return useContext(PlannerContext);
}

// ─── Delivery computation helper ──────────────────────────────────────────────
export function computeDelivered(plans: ClientPlan[], clientId: string) {
  const clientPlan = plans.find((p) => p.clientId === clientId);
  if (!clientPlan) return { youtube: 0, article: 0, onsite: 0, llmPage: 0 };
  const allPieces = clientPlan.campaigns.flatMap((c) => c.pieces);
  const pub = (type: PlannerContentType) =>
    allPieces.filter((piece) => piece.type === type && piece.status === "published").length;
  return { youtube: pub("youtube"), article: pub("article"), onsite: pub("onsite"), llmPage: pub("llm_page") };
}

export function isBehindOnPlan(plans: ClientPlan[], clientId: string, tier: import("./data").PlanTier, planQuotas: import("./data").PlanQuota) {
  const now = new Date("2026-08-01");
  const monthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const monthEnd   = new Date(now.getFullYear(), now.getMonth(), 0);
  const daysPassed = (now.getTime() - monthStart.getTime()) / 86_400_000;
  const totalDays  = (monthEnd.getTime() - monthStart.getTime()) / 86_400_000 + 1;
  if (daysPassed < totalDays / 2) return false;

  const clientPlan = plans.find((p) => p.clientId === clientId);
  if (!clientPlan) return false;
  const allPieces = clientPlan.campaigns.flatMap((c) => c.pieces);
  const briefPlus = (type: PlannerContentType) =>
    allPieces.filter((piece) => piece.type === type && piece.status !== "idea").length;

  const contractedTotal = planQuotas.youtube + planQuotas.article + planQuotas.onsite;
  const briefPlusTotal  = briefPlus("youtube") + briefPlus("article") + briefPlus("onsite");
  return briefPlusTotal < contractedTotal / 2;
}
