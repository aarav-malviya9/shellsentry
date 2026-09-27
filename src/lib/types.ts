export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  affectedAsset: string;
  events: TimelineEvent[];
  evidence: Evidence[];
  attackTechniques: string[];
  learningObjectives: string[];
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  description: string;
  type: "Initial Access" | "Execution" | "Persistence" | "Discovery" | "C2" | "Impact" | "Credential Access";
  evidenceIds: string[];
}

export interface Evidence {
  id: string;
  timestamp: string;
  type: "Terminal" | "Network" | "Authentication" | "Process" | "File" | "DNS" | "HTTP" | "System";
  source: string;
  content: string;
  importance: "Low" | "Medium" | "High" | "Critical";
  mitreTactic?: string;
  relatedEvents?: string[];
}

export interface InvestigationState {
  selectedEvidence: string[];
  hypotheses: Hypothesis[];
  notes: string;
  finalConclusion?: string;
  score?: number;
}

export interface Hypothesis {
  id: string;
  evidenceIds: string[];
  description: string;
  status: "Testing" | "Supported" | "Refuted";
}
