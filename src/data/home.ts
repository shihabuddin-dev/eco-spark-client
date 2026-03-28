import {
  Lightbulb,
  ShieldCheck,
  Zap,
  Workflow,
  Users,
  Shield,
  BarChart3,
  Lock,
  UserPlus,
  Globe,
  TrendingUp,
} from "lucide-react";

export const howItWorksData = [
  { step: "01", title: "Submit Your Idea", desc: "Design intelligent proposals with modular details.", icon: Lightbulb },
  { step: "02", title: "Community Review", desc: "Chain reviews, triggers, and decisions to automate selection.", icon: ShieldCheck },
  { step: "03", title: "Real-world Impact", desc: "Run projects efficiently with automatic tracking.", icon: Zap },
];

export const coreFeaturesData = [
  { icon: Workflow, title: "Intelligent Workflows", desc: "Automate your idea review and selection processes with custom rules." },
  { icon: Users, title: "Community Driven", desc: "Harness the power of crowdsourced feedback and decentralized voting." },
  { icon: Shield, title: "Verified Impact", desc: "Every project goes through rigorous checks to ensure real-world ecological impact." },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Track CO2 reduction, community engagement, and project success rates live." },
  { icon: Lock, title: "Secure & Transparent", desc: "Built on a secure architecture ensuring data privacy and transparent voting." },
  { icon: Zap, title: "Instant Funding", desc: "Connect impactful ideas directly with donors and automated payment rails." },
];

export const testimonialsData = [
  { name: "John Doe", role: "Environmental Engineer", text: "EcoSpark helped us collect global ideas and launch our solar initiative in days instead of months. The platform is incredibly solid.", handle: "@johndoe" },
  { name: "Jane Smith", role: "Community Organizer", text: "The simplicity is what impressed me most. We were able to gather funding and start making a real impact immediately.", handle: "@janesmith" },
  { name: "Bob Johnson", role: "Sustainability Lead", text: "Reliable, scalable, and wonderfully designed. EcoSpark feels perfectly tuned for real-world environmental action.", handle: "@bobjohnson" },
  { name: "Alice Chen", role: "Policy Advisor", text: "The quality of the proposals and the strict verification process gave us the confidence to back these projects at a governmental level.", handle: "@alicechen" },
  { name: "Marcus Wright", role: "Green Tech Founder", text: "We found our first 500 beta testers through EcoSpark. The community here is engaged, passionate, and incredibly supportive.", handle: "@marcusw" },
  { name: "Elena Rodriguez", role: "Non-profit Director", text: "Tracking our carbon footprint reduction has never been easier. The real-time analytics dashboard is a game-changer for reporting.", handle: "@elenaprojects" },
];

export const pricingPlansData = [
  { name: "Starter", price: "Free", desc: "Explore EcoSpark and share your first ideas.", popular: false, features: ["Submit up to 3 ideas", "Community voting access", "Basic impact stats", "Standard support"] },
  { name: "Pro", price: "$15", desc: "Best for dedicated individuals and small teams.", popular: true, features: ["Unlimited idea submissions", "Priority community review", "Advanced impact analytics", "Direct creator messaging", "Priority email support"] },
  { name: "Enterprise", price: "Custom", desc: "For large organizations and NGOs.", popular: false, features: ["Custom workflow builder", "Dedicated project manager", "API & webhook access", "Custom branding", "SLA & compliance support"] },
];

export const impactStatsData = [
  { label: "Ideas Shared", value: 12, suffix: "k+", icon: Lightbulb },
  { label: "Community", value: 50, suffix: "k+", icon: UserPlus },
  { label: "CO2 Reduced", value: 85, suffix: "k", icon: Globe },
  { label: "Success Rate", value: 94, suffix: "%", icon: TrendingUp },
];
