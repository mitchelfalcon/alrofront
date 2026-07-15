export interface ArchitectureNode {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // Lucide icon name
  salesforceMapping: string;
}

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "n1",
    title: "Intention Initialization Vector",
    shortDescription: "Audited capture of stateful events.",
    fullDescription: "We do not receive 'text', we receive a stateful event. Ensures that AI does not start a passive conversational flow, but an evaluation process for asynchronous action.",
    icon: "Target",
    salesforceMapping: "Event-Driven State / Apex Action Input",
  },
  {
    id: "n2",
    title: "Agentic Reasoning Engine (ToT)",
    shortDescription: "Deterministic tree of thoughts.",
    fullDescription: "Eliminates reliance on raw probabilistic models. Applies Tree of Thoughts (ToT) restricted by business rules, ensuring deterministic and auditable reasoning.",
    icon: "Brain",
    salesforceMapping: "Agentforce Platform Brain / LangGraph Logic",
  },
  {
    id: "n3",
    title: "Epistemological Data Anchoring",
    shortDescription: "Salesforce Data Cloud as absolute truth.",
    fullDescription: "The AI does not search for information at random. Ingests strict metadata from Salesforce Data Cloud to establish the customer's absolute truth before formulating any plan.",
    icon: "Database",
    salesforceMapping: "Salesforce Data Cloud / Metadata Engine",
  },
  {
    id: "n4",
    title: "Workslop Mitigation Protocols",
    shortDescription: "Destroys hallucinations before execution.",
    fullDescription: "Actively inspects the agent's plan to detect and destroy logical hallucinations ('vibe coding') before they reach the operational layer.",
    icon: "ShieldAlert",
    salesforceMapping: "Einstein Trust Layer / Guardrails",
  },
  {
    id: "n5",
    title: "AWU Execution Matrix",
    shortDescription: "Validated agentic work units.",
    fullDescription: "The agent does not 'use a tool'; it executes an Agentic Work Unit (AWU). Measurable action, with quantifiable ROI and results equivalent to an expert operator.",
    icon: "Activity",
    salesforceMapping: "Apex Actions / Flow Automation",
  },
  {
    id: "n6",
    title: "Functional Equivalence",
    shortDescription: "Mathematical validation of results.",
    fullDescription: "Before executing any AWU, validates that the result will be functionally equivalent to that of a human expert. Immunity to workslop.",
    icon: "CheckCircle2",
    salesforceMapping: "Expert-Level Output Validation",
  },
  {
    id: "n7",
    title: "Machine Unlearning < 100ms",
    shortDescription: "Selective GDPR/HIPAA obliteration.",
    fullDescription: "Erases data from trained models in < 100ms without full retraining. Instant compliance with differential privacy.",
    icon: "ZapOff",
    salesforceMapping: "Einstein Trust Layer / Privacy Differential",
  },
  {
    id: "n8",
    title: "HTC/AUQ Calibration",
    shortDescription: "Uncertainty quantification.",
    fullDescription: "Verifies empirical confidence of the model before execution. Rejects predictions with high uncertainty. 94% accuracy guaranteed.",
    icon: "BarChart3",
    salesforceMapping: "FARE Auditing / Confidence Calibration",
  },
];

export interface JourneyStep {
  phase: string;
  duration: string;
  items: {
    title: string;
    description: string;
    critical: boolean;
    techDetails: string;
  }[];
}

export const JOURNEY_MAP: JourneyStep[] = [
  {
    phase: "Initial Configuration",
    duration: "2-3 min",
    items: [
      {
        title: "Verify Salesforce",
        description: "Confirm connection to Salesforce Org and Data Cloud.",
        critical: true,
        techDetails: "API Version 60.0, OAuth 2.0 JWT Bearer Flow."
      },
      {
        title: "Load Data",
        description: "Import test dataset for use cases.",
        critical: false,
        techDetails: "Data Cloud Ingestion API, 5k records."
      },
      {
        title: "Initialize Engine",
        description: "Start the ToT engine and load business rules.",
        critical: true,
        techDetails: "Node.js cluster worker initialization."
      }
    ]
  },
  {
    phase: "Live Demonstration",
    duration: "8-10 min",
    items: [
      {
        title: "Loan Approval",
        description: "AWU execution for real-time financial evaluation.",
        critical: true,
        techDetails: "Intention Vector -> ToT -> Apex Action."
      },
      {
        title: "Personalized Recommendation",
        description: "Behavioral analysis and matching with Data Cloud catalog.",
        critical: true,
        techDetails: "Semantic Search via Vector Base."
      },
      {
        title: "Machine Unlearning",
        description: "Selective on-demand data deletion (GDPR).",
        critical: true,
        techDetails: "SISA Protocol implementation < 100ms."
      }
    ]
  },
  {
    phase: "Metrics and Validation",
    duration: "3-5 min",
    items: [
      {
        title: "Performance Dashboard",
        description: "Visualization of p95 latency and throughput.",
        critical: false,
        techDetails: "Real-time metrics via Prometheus/Grafana."
      },
      {
        title: "Workslop Immunity",
        description: "Noise injection test to validate mitigation.",
        critical: true,
        techDetails: "Hallucination score check audit log."
      }
    ]
  },
  {
    phase: "Q&A and Deep Dive",
    duration: "5-7 min",
    items: [
      {
        title: "Technical Questions",
        description: "Q&A session with the judges.",
        critical: false,
        techDetails: "Whiteboard architecture session."
      },
      {
        title: "Code Review",
        description: "Inspection of Apex/Node implementation if required.",
        critical: false,
        techDetails: "GitHub Repository Deep Dive."
      }
    ]
  }
];

export interface Requirement {
  category: string;
  items: {
    label: string;
    description: string;
    status: 'required' | 'recommended';
  }[];
}

export const REQUIREMENTS: Requirement[] = [
  {
    category: "Technical Infrastructure",
    items: [
      { label: "Salesforce Org", description: "Enterprise/Unlimited with Agentforce enabled.", status: 'required' },
      { label: "Data Cloud", description: "Configured and connected to external sources.", status: 'required' },
      { label: "Fiber Internet", description: "Stable, low-latency connection.", status: 'required' },
      { label: "Pro Laptop", description: "Minimum 16GB RAM for local development environment.", status: 'recommended' }
    ]
  },
  {
    category: "Software & Credentials",
    items: [
      { label: "ALRO Deployed", description: "Active instance on Cloud Run.", status: 'required' },
      { label: "Secrets .env", description: "GEMINI_API_KEY and SF_CLIENT_ID configured.", status: 'required' },
      { label: "Dashboard Ready", description: "Pre-loaded tabs in the browser.", status: 'recommended' }
    ]
  }
];

export const DEPLOYMENT_STEPS = [
  { phase: "Pre-Event", steps: ["Check connectivity", "Sync Data Cloud", "Dry run demo"] },
  { phase: "Event Day", steps: ["Verify secrets", "Clear cache", "Open all tabs"] },
  { phase: "During Demo", steps: ["Reset state", "Run AWU", "Show logs"] },
  { phase: "Post-Demo", steps: ["Export logs", "Follow up", "Close instance"] }
];
