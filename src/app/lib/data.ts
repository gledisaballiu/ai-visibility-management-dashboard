// ─── Brand tokens ─────────────────────────────────────────────────────────────
export const LIME  = "#C6F24E";
export const DARK  = "#0F1115";
export const BG    = "#F4F5F2";
export const FONT  = "'Manrope', sans-serif";
export const INK2  = "#4B5162";
export const INK3  = "#8B92A0";
export const POS   = "#157F3D";
export const NEG   = "#C4443C";

// ─── LLM icon paths (Simple Icons) ───────────────────────────────────────────
export const LLM_META: Record<string, { bg: string; path: string }> = {
  ChatGPT:    { bg: "#10A37F", path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" },
  Claude:     { bg: "#D97757", path: "M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" },
  Perplexity: { bg: "#1C1C1E", path: "M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" },
  Gemini:     { bg: "#4A90D9", path: "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" },
  Copilot:    { bg: "#0078D4", path: "M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z" },
  Llama:      { bg: "#0082FB", path: "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" },
};

// ─── Role types ───────────────────────────────────────────────────────────────
export type Role = "executive" | "marketer" | "admin";

export const ROLE_META: Record<Role, { label: string; desc: string; color: string }> = {
  executive: { label: "Executive",        desc: "CMO / VP Marketing",       color: LIME },
  marketer:  { label: "Marketer",         desc: "Content & Growth Manager", color: "#A78BFA" },
  admin:     { label: "Admin",            desc: "Developer / Operations",   color: "#60A5FA" },
};

// ─── Brand pill styles ────────────────────────────────────────────────────────
export const INTENT_STYLE: Record<string, { bg: string; text: string }> = {
  Recommendation: { bg: DARK,                   text: LIME },
  Comparison:     { bg: "rgba(15,17,21,0.07)",  text: "#374151" },
  Discovery:      { bg: `${LIME}33`,            text: "#3A5400" },
  "How-to":       { bg: "rgba(15,17,21,0.06)",  text: "#374151" },
  Evaluation:     { bg: "rgba(15,17,21,0.06)",  text: "#374151" },
};
export const TYPE_STYLE: Record<string, { bg: string; text: string }> = {
  Article:        { bg: "rgba(15,17,21,0.06)",  text: "#374151" },
  "Case Study":   { bg: DARK,                   text: LIME },
  Whitepaper:     { bg: `${LIME}22`,            text: "#3A5400" },
  Tutorial:       { bg: "rgba(15,17,21,0.06)",  text: "#374151" },
  Report:         { bg: "rgba(15,17,21,0.06)",  text: "#374151" },
};
export const PRIORITY_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  high:   { bg: "rgba(239,68,68,0.08)",   text: "#DC2626", dot: "#EF4444" },
  medium: { bg: "rgba(245,158,11,0.1)",  text: "#B45309", dot: "#F59E0B" },
  low:    { bg: "rgba(15,17,21,0.05)",   text: "#6B7280", dot: "#D1D5DB" },
};

// ─── Mock data ────────────────────────────────────────────────────────────────
export const trendData = [
  { month: "Jan", citations: 142 }, { month: "Feb", citations: 198 },
  { month: "Mar", citations: 167 }, { month: "Apr", citations: 245 },
  { month: "May", citations: 312 }, { month: "Jun", citations: 289 },
  { month: "Jul", citations: 401 },
];

export const modelData = [
  { model: "ChatGPT",    citations: 312, share: 31 },
  { model: "Perplexity", citations: 267, share: 27 },
  { model: "Claude",     citations: 189, share: 19 },
  { model: "Gemini",     citations: 145, share: 15 },
  { model: "Copilot",    citations:  88, share:  9 },
];

export const topicData = [
  { topic: "Cloud IDEs",       count: 312 },
  { topic: "Remote Dev",       count: 267 },
  { topic: "Dev Productivity", count: 198 },
  { topic: "Kubernetes",       count: 154 },
  { topic: "Security",         count: 128 },
  { topic: "Open Source",      count:  98 },
];

export const citationsData = [
  { id: 1, query: "What are the best developer tools for remote teams?",   model: "ChatGPT",    context: "Coder was mentioned as a leading platform for distributed engineering teams with enterprise-grade security and Kubernetes-native workspaces.", sentiment: "positive", date: "Jul 25", relevance: 94, position: 1, intent: "Recommendation", topics: ["Cloud IDE","Remote Work"] },
  { id: 2, query: "Top AI coding assistants in 2026",                       model: "Perplexity", context: "Listed among top 5 AI-powered developer tools with native Kubernetes support and GPU workspace capabilities.",                             sentiment: "positive", date: "Jul 24", relevance: 89, position: 2, intent: "Comparison",     topics: ["AI Tooling","DevOps"] },
  { id: 3, query: "How to improve developer productivity at scale?",         model: "Claude",     context: "Referenced in context of modern engineering workflows for large distributed teams needing consistent environments.",                          sentiment: "neutral",  date: "Jul 23", relevance: 72, position: 3, intent: "How-to",         topics: ["Productivity","Scaling"] },
  { id: 4, query: "Best platforms for cloud development environments",       model: "Gemini",     context: "Highlighted as an innovative cloud IDE with strong security model and workspace-as-code approach.",                                          sentiment: "positive", date: "Jul 22", relevance: 91, position: 1, intent: "Discovery",      topics: ["Cloud IDE","Security"] },
  { id: 5, query: "Open source vs proprietary developer tools",              model: "ChatGPT",    context: "Compared favorably against legacy local development solutions; noted for open-source core and enterprise pricing.",                           sentiment: "positive", date: "Jul 21", relevance: 68, position: 4, intent: "Comparison",     topics: ["Open Source","Enterprise"] },
  { id: 6, query: "Which dev tools integrate best with GitHub?",             model: "Copilot",    context: "Noted as having native GitHub and GitLab integration with fine-grained permissions and SSO support.",                                        sentiment: "positive", date: "Jul 20", relevance: 85, position: 2, intent: "Recommendation", topics: ["GitHub","Integration"] },
  { id: 7, query: "Is Coder worth it for enterprise teams?",                 model: "Perplexity", context: "Detailed analysis citing scalability strengths, security posture, and learning curve for initial team setup.",                               sentiment: "neutral",  date: "Jul 19", relevance: 97, position: 1, intent: "Evaluation",     topics: ["Enterprise","ROI"] },
  { id: 8, query: "Alternatives to local development environments",          model: "Claude",     context: "Recommended as primary cloud-based alternative with workspace-as-code paradigm for regulated industries.",                                   sentiment: "positive", date: "Jul 18", relevance: 88, position: 1, intent: "Discovery",      topics: ["Cloud IDE","Compliance"] },
];

const PIC = (id: string) => `https://images.unsplash.com/${id}?w=80&h=80&fit=crop&crop=face&auto=format&q=80`;

export const creatorsData = [
  { id: 1,  name: "Kelsey Hightower",  handle: "@kelseyhightower", role: "Principal Engineer", company: "Google",         photo: PIC("photo-1500648767791-00dcc994a43e"), citations: 847, growth: 34,  topModel: "ChatGPT",    models: ["ChatGPT","Claude","Perplexity","Gemini"],                content: 42, sentiment: 92, weeklyTrend: [98,112,87,134,145,156,115], topTopic: "Kubernetes",      contentBreakdown: { articles: 45, videos: 20, posts: 35 }, social: { twitter: { handle: "@kelseyhightower", followers: "118K" }, github: { handle: "kelseyhightower", stars: "22K" }, linkedin: { handle: "kelsey-hightower" } } },
  { id: 2,  name: "Charity Majors",    handle: "@mipsytipsy",      role: "CTO",               company: "Honeycomb",      photo: PIC("photo-1573496359142-b8d87734a5a2"), citations: 623, growth: 28,  topModel: "Perplexity", models: ["Perplexity","ChatGPT","Claude"],                         content: 38, sentiment: 88, weeklyTrend: [72,89,64,98,102,88,110],  topTopic: "Observability",   contentBreakdown: { articles: 60, videos: 10, posts: 30 }, social: { twitter: { handle: "@mipsytipsy", followers: "49K" }, linkedin: { handle: "charity-majors" } } },
  { id: 3,  name: "Liz Fong-Jones",    handle: "@lizthegrey",      role: "Dev Advocate",      company: "Honeycomb",      photo: PIC("photo-1573497019940-1c28c88b4f3e"), citations: 512, growth: -4,  topModel: "Claude",     models: ["Claude","ChatGPT","Gemini"],                            content: 29, sentiment: 85, weeklyTrend: [67,59,72,58,65,54,77],  topTopic: "SRE",             contentBreakdown: { articles: 55, videos: 15, posts: 30 }, social: { twitter: { handle: "@lizthegrey", followers: "18K" }, linkedin: { handle: "liz-fong-jones" }, github: { handle: "lizthegrey", stars: "3K" } } },
  { id: 4,  name: "Nader Dabit",       handle: "@dabit3",          role: "Dev Relations",     company: "AWS",            photo: PIC("photo-1595211877493-41a4e5f236b3"), citations: 489, growth: 19,  topModel: "ChatGPT",    models: ["ChatGPT","Perplexity"],                                 content: 61, sentiment: 91, weeklyTrend: [55,63,71,59,78,82,81],  topTopic: "Full-stack",      contentBreakdown: { articles: 30, videos: 50, posts: 20 }, social: { twitter: { handle: "@dabit3", followers: "73K" }, youtube: { channel: "Nader Dabit", subscribers: "15K" }, github: { handle: "dabit3", stars: "8K" } } },
  { id: 5,  name: "swyx",              handle: "@swyx",            role: "AI Engineer",       company: "Smol.ai",        photo: PIC("photo-1705645930353-0e335311ef20"), citations: 412, growth: 67,  topModel: "Perplexity", models: ["Perplexity","Claude","ChatGPT","Gemini","Copilot"],      content: 54, sentiment: 94, weeklyTrend: [42,51,48,67,88,95,121], topTopic: "AI Engineering",  contentBreakdown: { articles: 50, videos: 20, posts: 30 }, social: { twitter: { handle: "@swyx", followers: "82K" }, github: { handle: "sw-yx", stars: "14K" }, youtube: { channel: "swyx", subscribers: "9K" } } },
  { id: 6,  name: "Theo Browne",       handle: "@t3dotgg",         role: "CEO",               company: "t3.gg",          photo: PIC("photo-1590086782957-93c06ef21604"), citations: 378, growth: 42,  topModel: "Claude",     models: ["Claude","ChatGPT","Perplexity"],                        content: 87, sentiment: 89, weeklyTrend: [38,44,52,61,71,74,38],  topTopic: "TypeScript",      contentBreakdown: { articles: 10, videos: 75, posts: 15 }, social: { twitter: { handle: "@t3dotgg", followers: "156K" }, youtube: { channel: "Theo - t3.gg", subscribers: "126K" } } },
  { id: 7,  name: "Lee Robinson",      handle: "@leerob",          role: "DX",                company: "Vercel",         photo: PIC("photo-1507003211169-0a1dd7228f2d"), citations: 356, growth: 38,  topModel: "ChatGPT",    models: ["ChatGPT","Perplexity","Claude"],                        content: 52, sentiment: 90, weeklyTrend: [45,62,58,74,82,91,88],  topTopic: "Next.js",         contentBreakdown: { articles: 40, videos: 45, posts: 15 }, social: { twitter: { handle: "@leerob", followers: "89K" }, github: { handle: "leerob", stars: "12K" } } },
  { id: 8,  name: "Anthony Fu",        handle: "@antfu7",          role: "Open Source",       company: "NuxtLabs",       photo: PIC("photo-1519085360753-af0119f7cbe7"), citations: 312, growth: 44,  topModel: "Claude",     models: ["Claude","ChatGPT","Perplexity"],                        content: 61, sentiment: 93, weeklyTrend: [52,66,74,81,93,102,97], topTopic: "Vue.js",          contentBreakdown: { articles: 30, videos: 25, posts: 45 }, social: { twitter: { handle: "@antfu7", followers: "67K" }, github: { handle: "antfu", stars: "38K" } } },
  { id: 9,  name: "Guillermo Rauch",   handle: "@rauchg",          role: "CEO",               company: "Vercel",         photo: PIC("photo-1472099645785-5658abf4ff4e"), citations: 445, growth: 22,  topModel: "ChatGPT",    models: ["ChatGPT","Claude","Gemini"],                            content: 34, sentiment: 91, weeklyTrend: [78,85,91,88,97,104,99], topTopic: "Edge Functions",  contentBreakdown: { articles: 45, videos: 20, posts: 35 }, social: { twitter: { handle: "@rauchg", followers: "112K" }, github: { handle: "rauchg", stars: "15K" } } },
  { id: 10, name: "Cassidy Williams",  handle: "@cassidoo",        role: "DX",                company: "Remote",         photo: PIC("photo-1438761681033-6461ffad8d80"), citations: 289, growth: 31,  topModel: "Perplexity", models: ["Perplexity","ChatGPT","Claude"],                        content: 47, sentiment: 87, weeklyTrend: [43,56,61,68,75,71,83],  topTopic: "Developer Tools", contentBreakdown: { articles: 55, videos: 30, posts: 15 }, social: { twitter: { handle: "@cassidoo", followers: "44K" }, github: { handle: "cassidoo", stars: "6K" } } },
  { id: 11, name: "Jason Lengstorf",   handle: "@jlengstorf",      role: "DX",                company: "Learn with Jason",photo: PIC("photo-1506794778202-cad84cf45f1d"), citations: 267, growth: 28, topModel: "ChatGPT",    models: ["ChatGPT","Claude"],                                    content: 78, sentiment: 88, weeklyTrend: [41,53,60,67,73,79,85],  topTopic: "Web Development", contentBreakdown: { articles: 15, videos: 70, posts: 15 }, social: { twitter: { handle: "@jlengstorf", followers: "38K" }, youtube: { channel: "learnwithjason", subscribers: "44K" } } },
  { id: 12, name: "Adam Wathan",       handle: "@adamwathan",      role: "Creator",           company: "Tailwind Labs", photo: PIC("photo-1544725176-7c40e5a71c5e"),  citations: 398, growth: 19,  topModel: "Claude",     models: ["Claude","ChatGPT","Perplexity"],                        content: 29, sentiment: 92, weeklyTrend: [67,73,80,88,95,91,104], topTopic: "CSS / Tailwind",  contentBreakdown: { articles: 40, videos: 30, posts: 30 }, social: { twitter: { handle: "@adamwathan", followers: "178K" }, github: { handle: "adamwathan", stars: "21K" } } },
  { id: 13, name: "Tanner Linsley",    handle: "@tannerlinsley",   role: "Creator",           company: "TanStack",       photo: PIC("photo-1568602471122-7832951cc4c5"), citations: 334, growth: 42, topModel: "ChatGPT",    models: ["ChatGPT","Perplexity","Claude"],                        content: 44, sentiment: 90, weeklyTrend: [54,67,75,84,92,88,97],  topTopic: "React Query",     contentBreakdown: { articles: 35, videos: 40, posts: 25 }, social: { twitter: { handle: "@tannerlinsley", followers: "52K" }, github: { handle: "tannerlinsley", stars: "34K" } } },
  { id: 14, name: "Josh Comeau",       handle: "@joshwcomeau",     role: "Educator",          company: "Self",           photo: PIC("photo-1599566150163-29194dcaad36"), citations: 278, growth: 35, topModel: "Perplexity", models: ["Perplexity","Claude","ChatGPT"],                        content: 18, sentiment: 95, weeklyTrend: [48,55,63,71,78,85,92],  topTopic: "CSS / Animation", contentBreakdown: { articles: 80, videos: 10, posts: 10 }, social: { twitter: { handle: "@JoshWComeau", followers: "71K" }, github: { handle: "joshwcomeau", stars: "8K" } } },
  { id: 15, name: "Simon Willison",    handle: "@simonw",          role: "Author",            company: "Self",           photo: PIC("photo-1552058544-f2b08422138a"), citations: 421, growth: 29,  topModel: "Claude",     models: ["Claude","ChatGPT","Perplexity","Gemini"],              content: 96, sentiment: 89, weeklyTrend: [87,94,101,98,112,119,108],topTopic: "AI & LLMs",       contentBreakdown: { articles: 85, videos: 5, posts: 10  }, social: { twitter: { handle: "@simonw", followers: "92K" }, github: { handle: "simonw", stars: "28K" } } },
  { id: 16, name: "Julia Evans",       handle: "@b0rk",            role: "Writer",            company: "Self",           photo: PIC("photo-1531123897727-8f129e1688ce"), citations: 303, growth: 33, topModel: "Perplexity", models: ["Perplexity","ChatGPT","Claude"],                        content: 34, sentiment: 94, weeklyTrend: [58,67,72,81,88,95,90],  topTopic: "Linux / Systems", contentBreakdown: { articles: 70, videos: 5, posts: 25  }, social: { twitter: { handle: "@b0rk", followers: "58K" } } },
  { id: 17, name: "Armon Dadgar",      handle: "@armon",           role: "CTO",               company: "HashiCorp",      photo: PIC("photo-1519244703995-f4e0f30006d3"), citations: 389, growth: 17, topModel: "ChatGPT",    models: ["ChatGPT","Claude","Gemini"],                            content: 22, sentiment: 87, weeklyTrend: [71,79,85,92,97,88,103],  topTopic: "Infrastructure",  contentBreakdown: { articles: 50, videos: 30, posts: 20 }, social: { twitter: { handle: "@armon", followers: "34K" }, github: { handle: "armon", stars: "9K" } } },
  { id: 18, name: "Mitchell Hashimoto",handle: "@mitchellh",       role: "Creator",           company: "Self",           photo: PIC("photo-1463453091185-61582044d556"), citations: 412, growth: 24, topModel: "Claude",     models: ["Claude","ChatGPT","Perplexity"],                        content: 31, sentiment: 91, weeklyTrend: [66,78,84,91,99,95,108],  topTopic: "Dev Tooling",     contentBreakdown: { articles: 55, videos: 25, posts: 20 }, social: { twitter: { handle: "@mitchellh", followers: "48K" }, github: { handle: "mitchellh", stars: "19K" } } },
  { id: 19, name: "Thorsten Ball",     handle: "@thorstenball",    role: "Engineer",          company: "Zed",            photo: PIC("photo-1474176857210-7287d38d27c6"), citations: 245, growth: 45, topModel: "Perplexity", models: ["Perplexity","Claude","ChatGPT"],                        content: 28, sentiment: 88, weeklyTrend: [42,55,63,71,79,87,94],  topTopic: "Compilers",       contentBreakdown: { articles: 65, videos: 10, posts: 25 }, social: { twitter: { handle: "@thorstenball", followers: "22K" }, github: { handle: "mrnugget", stars: "7K" } } },
  { id: 20, name: "Steve Francia",     handle: "@spf13",           role: "DX",                company: "Docker",         photo: PIC("photo-1521119989659-a83eee488004"), citations: 267, growth: 21, topModel: "ChatGPT",    models: ["ChatGPT","Perplexity"],                                content: 38, sentiment: 86, weeklyTrend: [53,61,68,75,82,78,88],  topTopic: "Go / CLI Tools",  contentBreakdown: { articles: 50, videos: 30, posts: 20 }, social: { twitter: { handle: "@spf13", followers: "31K" }, github: { handle: "spf13", stars: "15K" } } },
  { id: 21, name: "Primeagen",         handle: "@theprimeagen",    role: "Creator",           company: "Self",           photo: PIC("photo-1640960543409-dbe56ccc30e2"), citations: 534, growth: 67, topModel: "ChatGPT",    models: ["ChatGPT","Claude","Perplexity","Gemini","Copilot"],      content: 134, sentiment: 86, weeklyTrend: [112,128,141,155,167,178,162], topTopic: "Vim / Neovim",   contentBreakdown: { articles: 5, videos: 90, posts: 5   }, social: { twitter: { handle: "@ThePrimeagen", followers: "248K" }, youtube: { channel: "ThePrimeagen", subscribers: "312K" } } },
  { id: 22, name: "TJ Holowaychuk",    handle: "@tjholowaychuk",   role: "Creator",           company: "Self",           photo: PIC("photo-1599566150163-29194dcaad36"), citations: 298, growth: 26, topModel: "Perplexity", models: ["Perplexity","Claude","ChatGPT"],                        content: 24, sentiment: 88, weeklyTrend: [55,63,71,78,85,91,88],  topTopic: "Node.js",         contentBreakdown: { articles: 40, videos: 15, posts: 45 }, social: { twitter: { handle: "@tjholowaychuk", followers: "37K" }, github: { handle: "tj", stars: "22K" } } },
  { id: 23, name: "Rich Harris",       handle: "@rich_harris",     role: "Creator",           company: "Svelte",         photo: PIC("photo-1570295999919-56ceb5ecca61"), citations: 367, growth: 41, topModel: "Claude",     models: ["Claude","ChatGPT","Perplexity"],                        content: 47, sentiment: 91, weeklyTrend: [63,77,85,92,101,97,112], topTopic: "Svelte",          contentBreakdown: { articles: 35, videos: 40, posts: 25 }, social: { twitter: { handle: "@Rich_Harris", followers: "89K" }, github: { handle: "Rich-Harris", stars: "18K" } } },
  { id: 24, name: "Dan Abramov",       handle: "@dan_abramov",     role: "Engineer",          company: "Bluesky",        photo: PIC("photo-1531427186611-ecfd6d936c79"), citations: 456, growth: 18, topModel: "ChatGPT",    models: ["ChatGPT","Claude","Perplexity","Gemini"],              content: 31, sentiment: 90, weeklyTrend: [88,96,103,99,112,118,108], topTopic: "React",          contentBreakdown: { articles: 45, videos: 20, posts: 35 }, social: { twitter: { handle: "@dan_abramov", followers: "234K" }, github: { handle: "gaearon", stars: "45K" } } },
  { id: 25, name: "Evan You",          handle: "@youyuxi",         role: "Creator",           company: "Vue.js",         photo: PIC("photo-1508214751196-bcfd4ca60f91"), citations: 389, growth: 23, topModel: "Claude",     models: ["Claude","ChatGPT","Perplexity"],                        content: 29, sentiment: 93, weeklyTrend: [72,81,89,97,104,98,112], topTopic: "Vue / Vite",      contentBreakdown: { articles: 30, videos: 30, posts: 40 }, social: { twitter: { handle: "@youyuxi", followers: "142K" }, github: { handle: "yyx990803", stars: "52K" } } },
  { id: 26, name: "Kent C Dodds",      handle: "@kentcdodds",      role: "Educator",          company: "Self",           photo: PIC("photo-1554151228-14d9def656e4"), citations: 312, growth: 36,  topModel: "Perplexity", models: ["Perplexity","ChatGPT","Claude"],                        content: 56, sentiment: 92, weeklyTrend: [59,68,77,85,93,88,101], topTopic: "Testing / React", contentBreakdown: { articles: 50, videos: 35, posts: 15 }, social: { twitter: { handle: "@kentcdodds", followers: "88K" }, youtube: { channel: "Kent C. Dodds", subscribers: "34K" } } },
  { id: 27, name: "Brandon Bayer",     handle: "@flybayer",        role: "Creator",           company: "Blitz.js",       photo: PIC("photo-1547425260-76bcadfb4f2c"), citations: 198, growth: 52,  topModel: "ChatGPT",    models: ["ChatGPT","Claude"],                                    content: 22, sentiment: 85, weeklyTrend: [36,44,53,62,71,79,88],  topTopic: "Full-stack React", contentBreakdown: { articles: 45, videos: 25, posts: 30 }, social: { twitter: { handle: "@flybayer", followers: "18K" }, github: { handle: "flybayer", stars: "13K" } } },
  { id: 28, name: "Ryan Florence",     handle: "@ryanflorence",    role: "Creator",           company: "Remix",          photo: PIC("photo-1492562080023-ab3db95bfbce"), citations: 334, growth: 29,  topModel: "ChatGPT",    models: ["ChatGPT","Perplexity","Claude"],                        content: 38, sentiment: 89, weeklyTrend: [64,74,82,90,97,93,106], topTopic: "React Router",    contentBreakdown: { articles: 35, videos: 45, posts: 20 }, social: { twitter: { handle: "@ryanflorence", followers: "76K" }, github: { handle: "ryanflorence", stars: "11K" } } },
  { id: 29, name: "Andrew Clark",      handle: "@acdlite",         role: "Engineer",          company: "Meta",           photo: PIC("photo-1629425733761-caae3b5f2e50"), citations: 278, growth: 22,  topModel: "Claude",     models: ["Claude","ChatGPT"],                                    content: 19, sentiment: 90, weeklyTrend: [52,61,69,77,84,91,88],  topTopic: "React Internals", contentBreakdown: { articles: 55, videos: 20, posts: 25 }, social: { twitter: { handle: "@acdlite", followers: "52K" }, github: { handle: "acdlite", stars: "9K" } } },
  { id: 30, name: "Misko Hevery",      handle: "@mhevery",         role: "Creator",           company: "Builder.io",     photo: PIC("photo-1564564321837-a57b7070ac4f"), citations: 256, growth: 38,  topModel: "Perplexity", models: ["Perplexity","Claude","ChatGPT"],                        content: 31, sentiment: 88, weeklyTrend: [48,57,65,73,81,88,95],  topTopic: "Qwik / Performance", contentBreakdown: { articles: 40, videos: 40, posts: 20 }, social: { twitter: { handle: "@mhevery", followers: "29K" }, github: { handle: "mhevery", stars: "14K" } } },
  { id: 31, name: "Fred K Schott",     handle: "@FredKSchott",     role: "Creator",           company: "Astro",          photo: PIC("photo-1590086782957-93c06ef21604"), citations: 289, growth: 44,  topModel: "ChatGPT",    models: ["ChatGPT","Perplexity","Claude"],                        content: 34, sentiment: 91, weeklyTrend: [55,65,74,83,91,98,107], topTopic: "Astro / Islands", contentBreakdown: { articles: 40, videos: 35, posts: 25 }, social: { twitter: { handle: "@FredKSchott", followers: "41K" }, github: { handle: "FredKSchott", stars: "17K" } } },
  { id: 32, name: "Jason Miller",      handle: "@_developit",      role: "Engineer",          company: "Google",         photo: PIC("photo-1519085360753-af0119f7cbe7"), citations: 312, growth: 31,  topModel: "Claude",     models: ["Claude","ChatGPT","Perplexity"],                        content: 27, sentiment: 90, weeklyTrend: [59,68,76,84,91,98,94],  topTopic: "Preact / Perf",   contentBreakdown: { articles: 45, videos: 25, posts: 30 }, social: { twitter: { handle: "@_developit", followers: "38K" }, github: { handle: "developit", stars: "24K" } } },
  { id: 33, name: "Zeno Rocha",        handle: "@zenorocha",       role: "CEO",               company: "Resend",         photo: PIC("photo-1507003211169-0a1dd7228f2d"), citations: 223, growth: 48,  topModel: "ChatGPT",    models: ["ChatGPT","Perplexity","Claude"],                        content: 42, sentiment: 89, weeklyTrend: [40,50,59,68,77,86,95],  topTopic: "Email / Dev Tools", contentBreakdown: { articles: 40, videos: 35, posts: 25 }, social: { twitter: { handle: "@zenorocha", followers: "58K" }, github: { handle: "zenorocha", stars: "12K" } } },
  { id: 34, name: "Paul Copplestone",  handle: "@kiwicopple",      role: "CEO",               company: "Supabase",       photo: PIC("photo-1472099645785-5658abf4ff4e"), citations: 267, growth: 42,  topModel: "Claude",     models: ["Claude","ChatGPT","Perplexity"],                        content: 38, sentiment: 92, weeklyTrend: [50,61,70,79,88,96,105], topTopic: "Postgres / SaaS", contentBreakdown: { articles: 45, videos: 35, posts: 20 }, social: { twitter: { handle: "@kiwicopple", followers: "34K" }, github: { handle: "kiwicopple", stars: "8K" } } },
];

export const competitorScores = [
  { brand: "GitHub Codespaces", score: 88, citations: 1923, growth: 8  },
  { brand: "Coder",             score: 76, citations: 1401, growth: 28 },
  { brand: "Replit",            score: 71, citations: 1356, growth: 21 },
  { brand: "Gitpod",            score: 61, citations: 1087, growth: 12 },
  { brand: "Daytona",           score: 34, citations:  589, growth: 45 },
];

export const shareOfVoice = [
  { name: "GitHub Codespaces", value: 31, color: "#334155" },
  { name: "Coder",             value: 23, color: LIME },
  { name: "Replit",            value: 22, color: "#64748B" },
  { name: "Gitpod",            value: 18, color: "#94A3B8" },
  { name: "Others",            value:  6, color: "#CBD5E1" },
];

export const competitorModelComp = [
  { model: "ChatGPT",    Coder: 78, "GitHub CS": 91, Replit: 74, Gitpod: 62 },
  { model: "Claude",     Coder: 71, "GitHub CS": 85, Replit: 67, Gitpod: 58 },
  { model: "Perplexity", Coder: 82, "GitHub CS": 88, Replit: 79, Gitpod: 65 },
  { model: "Gemini",     Coder: 69, "GitHub CS": 87, Replit: 61, Gitpod: 54 },
];

export const contentData = [
  { id: 1, title: "Remote Development Environments: A Complete Guide",    type: "Article",    citations: 234, models: ["ChatGPT","Claude","Perplexity"], topics: ["Cloud IDE","Remote Work"],    growth: 45 },
  { id: 2, title: "How We Cut Developer Onboarding Time by 80%",          type: "Case Study", citations: 189, models: ["Perplexity","ChatGPT"],          topics: ["Productivity","Enterprise"],  growth: 32 },
  { id: 3, title: "Security in Cloud Development Environments",            type: "Whitepaper", citations: 156, models: ["Claude","Gemini","ChatGPT"],     topics: ["Security","Compliance"],      growth: 28 },
  { id: 4, title: "Kubernetes-Native Dev Environments Explained",          type: "Tutorial",   citations: 134, models: ["Perplexity","Claude"],           topics: ["Kubernetes","DevOps"],        growth: -8 },
  { id: 5, title: "The Hidden Cost of Local Dev Environments",             type: "Report",     citations: 112, models: ["ChatGPT","Perplexity","Gemini"], topics: ["Cost","Remote Dev"],          growth: 19 },
  { id: 6, title: "Open Source vs Enterprise CDEs: An Honest Comparison",  type: "Article",    citations:  98, models: ["Claude","ChatGPT"],             topics: ["Open Source","Enterprise"],   growth: -3 },
];

export const recommendationsData = [
  { id: 1, priority: "high",   type: "Content Gap",     title: "Write about 'developer environment security compliance'",    insight: "Competitors cited 3× more on compliance queries. ChatGPT and Claude have no reference to your security content.", impact: "+34 est. citations/mo", effort: "Medium", models: ["ChatGPT","Claude"] },
  { id: 2, priority: "high",   type: "Creator Outreach",title: "Engage with Theo Browne on TypeScript tooling content",      insight: "Theo has 156K Twitter followers and never mentioned Coder — but covers 3 of your competitors regularly.",          impact: "+89 est. citations/mo", effort: "Low",    models: ["Claude","Perplexity"] },
  { id: 3, priority: "medium", type: "Keyword Gap",     title: "Target queries around 'GPU workspaces for ML teams'",        insight: "42 high-volume queries about ML dev environments cite no brand. You have GPU features but no targeting content.",   impact: "+56 est. citations/mo", effort: "Medium", models: ["Gemini","ChatGPT"] },
  { id: 4, priority: "medium", type: "Sentiment Fix",   title: "Address negative citations on 'Coder learning curve'",       insight: "Claude and Gemini cite Coder negatively on 6 onboarding queries. A quick-start guide could reverse this.",         impact: "+18% positive sentiment",effort: "Low",   models: ["Claude","Gemini"] },
  { id: 5, priority: "low",    type: "Competitor Gap",  title: "Respond to Replit's dominance in 'beginner cloud IDE'",      insight: "Replit cited in 78% of beginner-focused queries; Coder appears in 4%. Docs lack beginner-friendly language.",       impact: "+22 est. citations/mo", effort: "High",   models: ["Perplexity","ChatGPT"] },
  { id: 6, priority: "low",    type: "Content Refresh", title: "Update your Remote Dev Guide — it's 11 months old",          insight: "Your top-cited piece still performs well but aging content may be deprioritised in model training cycles.",          impact: "Maintain 234 citations", effort: "Low",   models: ["Perplexity"] },
];

// ─── Plan / category types ────────────────────────────────────────────────────
export type PlanTier = "start" | "launch" | "scale";
export type ClientCategory = "Dev tools" | "Infrastructure" | "AI & agents" | "Databases";
export const CLIENT_CATEGORIES: ClientCategory[] = ["Dev tools", "Infrastructure", "AI & agents", "Databases"];

export interface PlanQuota {
  tier: PlanTier; label: string; pricePerMonth: number;
  youtube: number; article: number; onsite: number; llmPage: number;
  strategyCall: "weekly" | "biweekly" | null; recommended: boolean;
}

export const PLAN_QUOTAS: Record<PlanTier, PlanQuota> = {
  start:  { tier: "start",  label: "Start",  pricePerMonth: 12500, youtube: 2, article: 4,  onsite: 2, llmPage: 0, strategyCall: null,       recommended: false },
  launch: { tier: "launch", label: "Launch", pricePerMonth: 22500, youtube: 4, article: 8,  onsite: 4, llmPage: 2, strategyCall: "biweekly", recommended: true  },
  scale:  { tier: "scale",  label: "Scale",  pricePerMonth: 45500, youtube: 8, article: 16, onsite: 8, llmPage: 0, strategyCall: "weekly",   recommended: false },
};

export const CLIENT_PLANS: Record<string, PlanTier> = {
  // start tier
  linear: "start", clerk: "start", upstash: "start", turso: "start",
  spacelift: "start", novu: "start", triggerdev: "start", modal: "start",
  // launch tier
  coder: "launch", resend: "launch", neon: "launch", supabase: "launch",
  railway: "launch", temporal: "launch", doppler: "launch", langsmith: "launch",
  // scale tier
  vercel: "scale", flyio: "scale", grafana: "scale", sentry: "scale",
  pulumi: "scale", planetscale: "scale",
};

export interface CitationSplit { total: number; commissioned: number; organic: number; unmatched: number; }
export const CLIENT_CITATION_SPLIT: Record<string, CitationSplit> = {
  coder:       { total: 1401, commissioned: 412,  organic: 921,  unmatched: 68  },
  vercel:      { total: 1923, commissioned: 688,  organic: 1164, unmatched: 71  },
  linear:      { total: 987,  commissioned: 201,  organic: 752,  unmatched: 34  },
  clerk:       { total: 634,  commissioned: 0,    organic: 589,  unmatched: 45  },
  resend:      { total: 1102, commissioned: 334,  organic: 723,  unmatched: 45  },
  upstash:     { total: 778,  commissioned: 189,  organic: 556,  unmatched: 33  },
  neon:        { total: 892,  commissioned: 234,  organic: 612,  unmatched: 46  },
  supabase:    { total: 1134, commissioned: 412,  organic: 678,  unmatched: 44  },
  railway:     { total: 645,  commissioned: 178,  organic: 432,  unmatched: 35  },
  flyio:       { total: 723,  commissioned: 198,  organic: 491,  unmatched: 34  },
  turso:       { total: 412,  commissioned: 112,  organic: 278,  unmatched: 22  },
  planetscale: { total: 934,  commissioned: 289,  organic: 612,  unmatched: 33  },
  temporal:    { total: 556,  commissioned: 145,  organic: 389,  unmatched: 22  },
  grafana:     { total: 1456, commissioned: 512,  organic: 889,  unmatched: 55  },
  sentry:      { total: 1289, commissioned: 445,  organic: 800,  unmatched: 44  },
  pulumi:      { total: 634,  commissioned: 198,  organic: 412,  unmatched: 24  },
  spacelift:   { total: 345,  commissioned: 89,   organic: 234,  unmatched: 22  },
  doppler:     { total: 489,  commissioned: 134,  organic: 323,  unmatched: 32  },
  novu:        { total: 378,  commissioned: 98,   organic: 256,  unmatched: 24  },
  triggerdev:  { total: 312,  commissioned: 78,   organic: 212,  unmatched: 22  },
  langsmith:   { total: 634,  commissioned: 189,  organic: 412,  unmatched: 33  },
  modal:       { total: 423,  commissioned: 112,  organic: 289,  unmatched: 22  },
};

export const PIPELINE_CITATION_COUNTS: Record<number, number> = {
  1: 89, 2: 34, 3: 47, 4: 22, 5: 0, 6: 0, 7: 0, 8: 0, 9: 56, 10: 0,
  101: 58, 102: 29, 103: 0,
};

export const CREATOR_STACKS: Record<string, string[]> = {
  "Kelsey Hightower":   ["Kubernetes", "Go", "Linux"],
  "Charity Majors":     ["Observability", "Postgres", "SRE"],
  "Liz Fong-Jones":     ["OpenTelemetry", "SRE", "Go"],
  "Nader Dabit":        ["GraphQL", "React Native", "AWS Amplify"],
  "swyx":               ["LangChain", "TypeScript", "AI Agents"],
  "Theo Browne":        ["TypeScript", "Next.js", "tRPC"],
  "Lee Robinson":       ["Next.js", "Vercel", "React"],
  "Anthony Fu":         ["Vue.js", "Vite", "Nuxt"],
  "Guillermo Rauch":    ["Next.js", "Edge Functions", "Vercel"],
  "Cassidy Williams":   ["React", "JavaScript", "DX"],
  "Jason Lengstorf":    ["Jamstack", "GraphQL", "Web Performance"],
  "Adam Wathan":        ["Tailwind CSS", "CSS", "Design Systems"],
  "Tanner Linsley":     ["React Query", "TanStack Router", "TypeScript"],
  "Josh Comeau":        ["CSS", "React", "Animation"],
  "Simon Willison":     ["Python", "SQLite", "LLMs"],
  "Julia Evans":        ["Linux", "Networking", "Systems"],
  "Armon Dadgar":       ["Terraform", "Vault", "Infrastructure"],
  "Mitchell Hashimoto": ["Go", "Terraform", "Dev Tooling"],
  "Thorsten Ball":      ["Go", "Compilers", "LSP"],
  "Steve Francia":      ["Go", "Docker", "CLI"],
  "Primeagen":          ["Neovim", "Rust", "Algorithms"],
  "TJ Holowaychuk":    ["Node.js", "Go", "Open Source"],
  "Rich Harris":        ["Svelte", "SvelteKit", "JavaScript"],
  "Dan Abramov":        ["React", "Redux", "JavaScript"],
  "Evan You":           ["Vue.js", "Vite", "JavaScript"],
  "Kent C Dodds":       ["React", "Testing Library", "TypeScript"],
  "Brandon Bayer":      ["Blitz.js", "Next.js", "Prisma"],
  "Ryan Florence":      ["Remix", "React Router", "React"],
  "Andrew Clark":       ["React", "Concurrent Mode", "JavaScript"],
  "Misko Hevery":       ["Qwik", "Angular", "Performance"],
  "Fred K Schott":      ["Astro", "Islands Architecture", "JavaScript"],
  "Jason Miller":       ["Preact", "WMR", "Performance"],
  "Zeno Rocha":         ["Email APIs", "Resend", "DX"],
  "Paul Copplestone":   ["Supabase", "Postgres", "Open Source"],
};

export const CLIENT_GEO_PROVIDER: Record<string, { name: "Peec AI" | "Profound"; syncFrequency: string }> = {
  coder:       { name: "Peec AI",  syncFrequency: "Nightly (02:00 UTC)" },
  vercel:      { name: "Profound", syncFrequency: "Nightly (03:00 UTC)" },
  linear:      { name: "Peec AI",  syncFrequency: "Nightly (02:00 UTC)" },
  clerk:       { name: "Profound", syncFrequency: "Nightly (03:30 UTC)" },
  resend:      { name: "Peec AI",  syncFrequency: "Nightly (02:00 UTC)" },
  upstash:     { name: "Profound", syncFrequency: "Nightly (03:00 UTC)" },
  neon:        { name: "Peec AI",  syncFrequency: "Nightly (02:00 UTC)" },
  supabase:    { name: "Profound", syncFrequency: "Nightly (03:00 UTC)" },
  railway:     { name: "Peec AI",  syncFrequency: "Nightly (02:30 UTC)" },
  flyio:       { name: "Peec AI",  syncFrequency: "Nightly (02:00 UTC)" },
  turso:       { name: "Profound", syncFrequency: "Nightly (03:00 UTC)" },
  planetscale: { name: "Peec AI",  syncFrequency: "Nightly (02:00 UTC)" },
  temporal:    { name: "Profound", syncFrequency: "Nightly (03:00 UTC)" },
  grafana:     { name: "Peec AI",  syncFrequency: "Nightly (02:00 UTC)" },
  sentry:      { name: "Profound", syncFrequency: "Nightly (03:00 UTC)" },
  pulumi:      { name: "Peec AI",  syncFrequency: "Nightly (02:00 UTC)" },
  spacelift:   { name: "Profound", syncFrequency: "Nightly (03:00 UTC)" },
  doppler:     { name: "Peec AI",  syncFrequency: "Nightly (02:00 UTC)" },
  novu:        { name: "Profound", syncFrequency: "Nightly (03:00 UTC)" },
  triggerdev:  { name: "Peec AI",  syncFrequency: "Nightly (02:00 UTC)" },
  langsmith:   { name: "Peec AI",  syncFrequency: "Nightly (02:00 UTC)" },
  modal:       { name: "Profound", syncFrequency: "Nightly (03:00 UTC)" },
};

export type PlannerContentType = "youtube" | "article" | "onsite" | "strategy" | "llm_page";
export type PieceStatus = "idea" | "brief" | "draft" | "review" | "published";

export interface ContentPiece {
  id: number; type: PlannerContentType; title: string; status: PieceStatus;
  creator?: string; dueDate: string; notes?: string;
  publishedUrl?: string; citationCount?: number;
}
export interface PlanCampaign { id: string; name: string; pieces: ContentPiece[]; }
export interface ClientPlan { clientId: string; tier: PlanTier; campaigns: PlanCampaign[]; }

// ─── Agency / Client data ─────────────────────────────────────────────────────
export type ClientStatus = "active" | "onboarding" | "paused";
export type CampaignStatus = "active" | "planning" | "completed" | "paused";
export type ContentStage = "brief" | "in_draft" | "client_review" | "approved" | "scheduled" | "published";

export interface AgencyClient {
  id: string; name: string; logo: string; category: ClientCategory;
  score: number; trend: number; activeCampaigns: number;
  citations: number; status: ClientStatus; color: string;
  since: string; mrr: string; lastSyncedAt: string;
  analyticsConnected?: boolean;
}

export function syncFreshness(lastSyncedAt: string): "lime" | "grey" | "amber" {
  const ageMs = Date.now() - new Date(lastSyncedAt).getTime();
  const ageH = ageMs / 3_600_000;
  if (ageH < 12) return "lime";
  if (ageH < 24) return "grey";
  return "amber";
}

export const SYNC_DOT: Record<"lime" | "grey" | "amber", { color: string; label: string }> = {
  lime:  { color: "#84CC16", label: "Fresh"  },
  grey:  { color: "#9CA3AF", label: "Synced" },
  amber: { color: "#F59E0B", label: "Stale"  },
};

export type ContentType = "off-site" | "on-site";

export interface Campaign {
  id: number; client: string; name: string; creators: string[];
  status: CampaignStatus; start: string; end: string;
  citationLift: number; budget: string; pieces: number;
  contentType: ContentType;
}

export interface PipelineItem {
  id: number; title: string; creator: string; client: string;
  type: "Article" | "Video" | "Thread" | "Newsletter";
  stage: ContentStage; dueDate: string; publishDate: string;
  topics: string[]; paymentStatus: PaymentStatus; notes?: string;
}

export const agencyClientsData: AgencyClient[] = [
  // Original 6
  { id: "coder",       name: "Coder",       logo: "CO", category: "Dev tools",     score: 76, trend: +8,  activeCampaigns: 2, citations: 1401, status: "active",     color: "#3B82F6", since: "Jan 2026", mrr: "$4,200", lastSyncedAt: "2026-07-31T09:00:00Z", analyticsConnected: true },
  { id: "vercel",      name: "Vercel",      logo: "VC", category: "Infrastructure", score: 82, trend: +12, activeCampaigns: 1, citations: 1923, status: "active",     color: "#111111", since: "Mar 2026", mrr: "$6,800", lastSyncedAt: "2026-07-31T04:30:00Z", analyticsConnected: true },
  { id: "linear",      name: "Linear",      logo: "LI", category: "Dev tools",     score: 68, trend: -3,  activeCampaigns: 3, citations: 987,  status: "active",     color: "#5E6AD2", since: "Feb 2026", mrr: "$3,500", lastSyncedAt: "2026-07-31T08:15:00Z", analyticsConnected: true },
  { id: "clerk",       name: "Clerk",       logo: "CL", category: "Dev tools",     score: 54, trend: +21, activeCampaigns: 1, citations: 634,  status: "onboarding", color: "#6C47FF", since: "Jul 2026", mrr: "$2,800", lastSyncedAt: "2026-07-29T11:00:00Z", analyticsConnected: true },
  { id: "resend",      name: "Resend",      logo: "RS", category: "Dev tools",     score: 71, trend: +5,  activeCampaigns: 2, citations: 1102, status: "active",     color: "#111111", since: "Apr 2026", mrr: "$3,900", lastSyncedAt: "2026-07-31T07:45:00Z", analyticsConnected: true },
  { id: "upstash",     name: "Upstash",     logo: "UP", category: "Databases",     score: 63, trend: +9,  activeCampaigns: 1, citations: 778,  status: "active",     color: "#00E9A3", since: "May 2026", mrr: "$2,200", lastSyncedAt: "2026-07-30T22:00:00Z", analyticsConnected: true },
  // 16 new clients
  { id: "neon",        name: "Neon",        logo: "NE", category: "Databases",     score: 71, trend: +9,  activeCampaigns: 2, citations: 892,  status: "active",     color: "#00E5FF", since: "Feb 2026", mrr: "$3,100", lastSyncedAt: "2026-07-31T06:00:00Z", analyticsConnected: true },
  { id: "supabase",    name: "Supabase",    logo: "SB", category: "Databases",     score: 78, trend: +14, activeCampaigns: 2, citations: 1134, status: "active",     color: "#3FCF8E", since: "Jan 2026", mrr: "$4,800", lastSyncedAt: "2026-07-31T05:30:00Z", analyticsConnected: true },
  { id: "railway",     name: "Railway",     logo: "RW", category: "Infrastructure", score: 62, trend: -2, activeCampaigns: 1, citations: 645,  status: "active",     color: "#B45309", since: "Mar 2026", mrr: "$2,400", lastSyncedAt: "2026-07-28T12:00:00Z", analyticsConnected: true },
  { id: "flyio",       name: "Fly.io",      logo: "FY", category: "Infrastructure", score: 69, trend: +7, activeCampaigns: 2, citations: 723,  status: "active",     color: "#7E22CE", since: "Feb 2026", mrr: "$2,900", lastSyncedAt: "2026-07-31T07:00:00Z", analyticsConnected: false },
  { id: "turso",       name: "Turso",       logo: "TR", category: "Databases",     score: 58, trend: +22, activeCampaigns: 1, citations: 412,  status: "active",     color: "#4F46E5", since: "Apr 2026", mrr: "$1,800", lastSyncedAt: "2026-07-29T08:00:00Z", analyticsConnected: true },
  { id: "planetscale", name: "PlanetScale", logo: "PS", category: "Databases",     score: 73, trend: +5,  activeCampaigns: 2, citations: 934,  status: "active",     color: "#111111", since: "Jan 2026", mrr: "$3,600", lastSyncedAt: "2026-07-31T04:00:00Z", analyticsConnected: true },
  { id: "temporal",    name: "Temporal",    logo: "TM", category: "Infrastructure", score: 66, trend: +11, activeCampaigns: 1, citations: 556, status: "active",     color: "#FF6B35", since: "Mar 2026", mrr: "$2,600", lastSyncedAt: "2026-07-31T06:30:00Z", analyticsConnected: true },
  { id: "grafana",     name: "Grafana",     logo: "GF", category: "Infrastructure", score: 81, trend: +3,  activeCampaigns: 3, citations: 1456, status: "active",    color: "#F46800", since: "Dec 2025", mrr: "$5,200", lastSyncedAt: "2026-07-31T05:00:00Z", analyticsConnected: true },
  { id: "sentry",      name: "Sentry",      logo: "SE", category: "Dev tools",     score: 79, trend: +6,  activeCampaigns: 2, citations: 1289, status: "active",     color: "#362D59", since: "Jan 2026", mrr: "$4,600", lastSyncedAt: "2026-07-31T06:15:00Z", analyticsConnected: true },
  { id: "pulumi",      name: "Pulumi",      logo: "PL", category: "Infrastructure", score: 64, trend: +15, activeCampaigns: 2, citations: 634,  status: "active",    color: "#7B3FE4", since: "Feb 2026", mrr: "$2,800", lastSyncedAt: "2026-07-31T07:00:00Z", analyticsConnected: true },
  { id: "spacelift",   name: "Spacelift",   logo: "SP", category: "Infrastructure", score: 55, trend: +18, activeCampaigns: 1, citations: 345,  status: "active",    color: "#0F1115", since: "May 2026", mrr: "$1,600", lastSyncedAt: "2026-07-31T08:00:00Z", analyticsConnected: true },
  { id: "doppler",     name: "Doppler",     logo: "DP", category: "Dev tools",     score: 61, trend: +12, activeCampaigns: 1, citations: 489,  status: "active",     color: "#6366F1", since: "Apr 2026", mrr: "$2,100", lastSyncedAt: "2026-07-29T14:00:00Z", analyticsConnected: true },
  { id: "novu",        name: "Novu",        logo: "NV", category: "Dev tools",     score: 57, trend: +20, activeCampaigns: 1, citations: 378,  status: "active",     color: "#0D9373", since: "May 2026", mrr: "$1,700", lastSyncedAt: "2026-07-31T09:00:00Z", analyticsConnected: true },
  { id: "triggerdev",  name: "Trigger.dev", logo: "TD", category: "Dev tools",     score: 53, trend: +25, activeCampaigns: 1, citations: 312,  status: "active",     color: "#111111", since: "Jun 2026", mrr: "$1,400", lastSyncedAt: "2026-07-31T08:30:00Z", analyticsConnected: true },
  { id: "langsmith",   name: "LangSmith",   logo: "LS", category: "AI & agents",  score: 67, trend: +8,  activeCampaigns: 2, citations: 634,  status: "active",     color: "#10A37F", since: "Mar 2026", mrr: "$2,900", lastSyncedAt: "2026-07-31T07:15:00Z", analyticsConnected: true },
  { id: "modal",       name: "Modal",       logo: "ML", category: "Infrastructure", score: 59, trend: +16, activeCampaigns: 1, citations: 423,  status: "active",    color: "#6B7280", since: "May 2026", mrr: "$1,900", lastSyncedAt: "2026-07-31T09:00:00Z", analyticsConnected: true },
];

export const agencyCampaignsData: Campaign[] = [
  { id: 1,  client: "Coder",   name: "Cloud IDE Awareness Q3",        creators: ["Kelsey Hightower", "swyx"],    status: "active",   start: "Jun 1",  end: "Aug 31", citationLift: 34, budget: "$12,400", pieces: 6, contentType: "off-site" },
  { id: 2,  client: "Coder",   name: "Security & Compliance Push",    creators: ["Charity Majors"],              status: "active",   start: "Jul 15", end: "Sep 30", citationLift: 12, budget: "$6,200",  pieces: 3, contentType: "off-site" },
  { id: 9,  client: "Coder",   name: "Cloud IDE Documentation Hub",   creators: [],                              status: "active",   start: "Jul 1",  end: "Sep 30", citationLift: 18, budget: "$4,800",  pieces: 4, contentType: "on-site"  },
  { id: 3,  client: "Vercel",  name: "Edge Functions Launch",         creators: ["Theo Browne", "Nader Dabit"], status: "active",   start: "Jul 1",  end: "Aug 15", citationLift: 28, budget: "$18,500", pieces: 8, contentType: "off-site" },
  { id: 10, client: "Vercel",  name: "Next.js GEO Content Series",    creators: [],                              status: "active",   start: "Jun 15", end: "Aug 31", citationLift: 21, budget: "$5,200",  pieces: 5, contentType: "on-site"  },
  { id: 4,  client: "Linear",  name: "PM Tool Positioning H2",        creators: ["swyx"],                        status: "planning", start: "Aug 1",  end: "Oct 31", citationLift: 0,  budget: "$8,000",  pieces: 0, contentType: "off-site" },
  { id: 5,  client: "Resend",  name: "Developer Email APIs Summer",   creators: ["Nader Dabit", "Theo Browne"], status: "active",   start: "Jun 15", end: "Aug 31", citationLift: 19, budget: "$9,800",  pieces: 5, contentType: "off-site" },
  { id: 6,  client: "Clerk",   name: "Auth for Modern Apps",          creators: ["Lee Robinson"],                status: "planning", start: "Aug 15", end: "Nov 30", citationLift: 0,  budget: "$7,500",  pieces: 0, contentType: "off-site" },
  { id: 7,  client: "Upstash", name: "Serverless Redis Awareness",    creators: ["Kelsey Hightower"],            status: "active",   start: "Jul 1",  end: "Sep 30", citationLift: 22, budget: "$5,400",  pieces: 3, contentType: "off-site" },
  { id: 8,  client: "Linear",  name: "Linear API Developer Push",     creators: ["Lee Robinson", "swyx"],        status: "active",   start: "Jun 1",  end: "Aug 15", citationLift: 14, budget: "$6,900",  pieces: 4, contentType: "off-site" },
  { id: 11, client: "Resend",  name: "Email Dev Guides & Recipes",    creators: [],                              status: "active",   start: "Jul 1",  end: "Sep 30", citationLift: 11, budget: "$3,600",  pieces: 3, contentType: "on-site"  },
  { id: 12, client: "Upstash", name: "Serverless Architecture Docs",  creators: [],                              status: "planning", start: "Aug 1",  end: "Oct 31", citationLift: 0,  budget: "$2,900",  pieces: 0, contentType: "on-site"  },
];

export const agencyPipelineData: PipelineItem[] = [
  { id: 1,  title: "Remote Dev Environments: Why CDE Wins in 2026",      creator: "Kelsey Hightower", client: "Coder",   type: "Article",  stage: "published",     dueDate: "Jul 1",  publishDate: "Jul 8",  topics: ["Cloud IDE", "Remote Dev"],    paymentStatus: "released" },
  { id: 2,  title: "Security-First Dev Environments Explained",           creator: "Charity Majors",   client: "Coder",   type: "Article",  stage: "client_review", dueDate: "Jul 25", publishDate: "Aug 1",  topics: ["Security", "Compliance"],     paymentStatus: "unpaid"   },
  { id: 3,  title: "Building on the Edge with Vercel Functions",          creator: "Theo Browne",      client: "Vercel",  type: "Video",    stage: "client_review", dueDate: "Jul 22", publishDate: "Jul 30", topics: ["Edge", "Serverless"],         paymentStatus: "unpaid"   },
  { id: 4,  title: "AI-Assisted Coding Workflow on Coder",                creator: "swyx",             client: "Coder",   type: "Thread",   stage: "approved",      dueDate: "Jul 28", publishDate: "Aug 3",  topics: ["AI", "Cloud IDE"],            paymentStatus: "pending"  },
  { id: 5,  title: "Nader Reviews: Transactional Email with Resend",      creator: "Nader Dabit",      client: "Resend",  type: "Video",    stage: "in_draft",      dueDate: "Aug 5",  publishDate: "Aug 12", topics: ["Email", "Developer Tools"],   paymentStatus: "unpaid"   },
  { id: 6,  title: "Why My Team Switched to Vercel Edge Functions",       creator: "Nader Dabit",      client: "Vercel",  type: "Article",  stage: "brief",         dueDate: "Aug 10", publishDate: "Aug 18", topics: ["Edge", "Performance"],        paymentStatus: "unpaid"   },
  { id: 7,  title: "Debugging in Cloud Dev Environments",                 creator: "Liz Fong-Jones",   client: "Coder",   type: "Article",  stage: "in_draft",      dueDate: "Aug 12", publishDate: "Aug 20", topics: ["Debugging", "SRE"],           paymentStatus: "unpaid"   },
  { id: 8,  title: "Linear vs Jira: An Engineer's Perspective",           creator: "swyx",             client: "Linear",  type: "Thread",   stage: "brief",         dueDate: "Aug 20", publishDate: "Sep 1",  topics: ["Project Mgmt", "Productivity"],paymentStatus: "unpaid"   },
  { id: 9,  title: "Scaling to Zero with Upstash Redis",                  creator: "Kelsey Hightower", client: "Upstash", type: "Article",  stage: "approved",      dueDate: "Aug 8",  publishDate: "Aug 15", topics: ["Serverless", "Redis"],        paymentStatus: "pending"  },
  { id: 10, title: "Clerk Auth: The Developer Experience Deep Dive",      creator: "Lee Robinson",     client: "Clerk",   type: "Video",    stage: "brief",         dueDate: "Sep 1",  publishDate: "Sep 10", topics: ["Auth", "DX"],                 paymentStatus: "unpaid"   },
];

export type PaymentStatus = "unpaid" | "pending" | "released";

export type OnSiteStage =
  | "gap_identified" | "writer_assigned" | "outline" | "draft"
  | "tech_review" | "citation_check" | "client_review" | "published";

export const ON_SITE_STAGE_META: Record<OnSiteStage, { label: string; color: string; bg: string }> = {
  gap_identified:  { label: "Gap Identified",   color: "#8B5CF6", bg: "rgba(139,92,246,0.1)"  },
  writer_assigned: { label: "Writer Assigned",   color: "#F59E0B", bg: "rgba(245,158,11,0.1)"  },
  outline:         { label: "Outline",           color: "#3B82F6", bg: "rgba(59,130,246,0.1)"  },
  draft:           { label: "Draft",             color: "#F59E0B", bg: "rgba(245,158,11,0.1)"  },
  tech_review:     { label: "Tech Review",       color: "#10B981", bg: "rgba(16,185,129,0.1)"  },
  citation_check:  { label: "Citation Check",    color: "#6366F1", bg: "rgba(99,102,241,0.1)"  },
  client_review:   { label: "Client Review",     color: "#3B82F6", bg: "rgba(59,130,246,0.1)"  },
  published:       { label: "Published",         color: "#0F1115", bg: "rgba(198,242,78,0.15)" },
};

export interface OnSitePipelineItem {
  id: number; title: string; writer: string; client: string;
  type: "Landing Page" | "Guide" | "FAQ" | "Comparison" | "Blog Post";
  stage: OnSiteStage; dueDate: string; publishDate: string;
  topics: string[];
  citationChecklist: { schema: boolean; faqBlock: boolean; directAnswer: boolean };
  notes?: string;
}

export const agencyOnSitePipelineData: OnSitePipelineItem[] = [
  { id: 101, title: "Cloud IDE for AI Engineering Teams",              writer: "Priya Nair",   client: "Coder",   type: "Landing Page", stage: "citation_check",  dueDate: "Aug 5",  publishDate: "Aug 12", topics: ["Cloud IDE","AI Engineering"],  citationChecklist: { schema: true,  faqBlock: true,  directAnswer: false } },
  { id: 102, title: "Coder vs GitHub Codespaces: Developer Guide",     writer: "Marcus Cole",  client: "Coder",   type: "Comparison",   stage: "tech_review",     dueDate: "Aug 8",  publishDate: "Aug 18", topics: ["Comparison","Cloud IDE"],      citationChecklist: { schema: true,  faqBlock: false, directAnswer: false } },
  { id: 103, title: "AI Agent Governance in Cloud Dev Environments",   writer: "Priya Nair",   client: "Coder",   type: "Guide",        stage: "outline",         dueDate: "Aug 20", publishDate: "Sep 1",  topics: ["AI","Security"],               citationChecklist: { schema: false, faqBlock: false, directAnswer: false } },
  { id: 104, title: "Next.js + Vercel Edge Functions: Complete Guide", writer: "Jordan Kim",   client: "Vercel",  type: "Guide",        stage: "client_review",   dueDate: "Aug 2",  publishDate: "Aug 10", topics: ["Edge","Next.js"],              citationChecklist: { schema: true,  faqBlock: true,  directAnswer: true  } },
  { id: 105, title: "Edge Functions Performance FAQ",                  writer: "Marcus Cole",  client: "Vercel",  type: "FAQ",          stage: "published",       dueDate: "Jul 15", publishDate: "Jul 22", topics: ["Performance","Edge"],          citationChecklist: { schema: true,  faqBlock: true,  directAnswer: true  } },
  { id: 106, title: "Linear for Engineering Teams: Decision Guide",    writer: "Priya Nair",   client: "Linear",  type: "Guide",        stage: "gap_identified",  dueDate: "Sep 1",  publishDate: "Sep 15", topics: ["Project Mgmt","DX"],           citationChecklist: { schema: false, faqBlock: false, directAnswer: false } },
  { id: 107, title: "Resend vs SendGrid: Developer Comparison 2026",  writer: "Marcus Cole",  client: "Resend",  type: "Comparison",   stage: "draft",           dueDate: "Aug 15", publishDate: "Aug 25", topics: ["Email","Comparison"],          citationChecklist: { schema: true,  faqBlock: false, directAnswer: false } },
  { id: 108, title: "Serverless Redis Architecture Patterns",          writer: "Jordan Kim",   client: "Upstash", type: "Guide",        stage: "writer_assigned", dueDate: "Aug 25", publishDate: "Sep 5",  topics: ["Serverless","Redis"],          citationChecklist: { schema: false, faqBlock: false, directAnswer: false } },
];

export const PAYMENT_STATUS_META: Record<PaymentStatus, { label: string; color: string; bg: string }> = {
  unpaid:   { label: "Unpaid",   color: "#9CA3AF", bg: "rgba(156,163,175,0.1)" },
  pending:  { label: "Pending",  color: "#F59E0B", bg: "rgba(245,158,11,0.1)"  },
  released: { label: "Released", color: "#10B981", bg: "rgba(16,185,129,0.1)"  },
};

export const STAGE_META: Record<ContentStage, { label: string; color: string; bg: string }> = {
  brief:         { label: "Brief",         color: "#6B7280", bg: "rgba(107,114,128,0.1)"  },
  in_draft:      { label: "In Draft",      color: "#F59E0B", bg: "rgba(245,158,11,0.1)"   },
  client_review: { label: "Client Review", color: "#3B82F6", bg: "rgba(59,130,246,0.1)"   },
  approved:      { label: "Approved",      color: "#10B981", bg: "rgba(16,185,129,0.1)"   },
  scheduled:     { label: "Scheduled",     color: "#8B5CF6", bg: "rgba(139,92,246,0.1)"   },
  published:     { label: "Published",     color: "#0F1115", bg: "rgba(198,242,78,0.15)"  },
};
