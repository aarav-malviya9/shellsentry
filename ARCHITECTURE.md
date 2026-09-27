# ShellSentry Architecture

## System Diagram

```mermaid
flowchart TD
    Client[Next.js Client] --> API[Next.js API Routes]
    Client --> UI[Shadcn/UI Components]
    Client --> Graph[ReactFlow Engine]
    
    API --> AI[AI Provider Adapter]
    API --> Analytics[Snowflake Adapter]
    
    AI --> Gemma[Gemma API]
    AI --> MockAI[Mock Fallback Engine]
    
    Analytics --> Snowflake[(Snowflake Data Cloud)]
    Analytics --> MockDB[(Local Mock Store)]
    
    subgraph Frontend
    UI
    Graph
    end
    
    subgraph Data Models
    ScenarioEngine[Scenario Definitions]
    InvestigationState[Investigation Context]
    end
    
    Client -.-> ScenarioEngine
    Client -.-> InvestigationState
```

## AI/Gemma Usage
The AI Copilot utilizes the Gemma model via an abstraction layer (`ai-provider.ts`). It handles:
1. Translating complex Base64 encoded PowerShell into human-readable explanations.
2. Validating the user's current investigation graph against the ground-truth scenario definition.
3. Scoring the final incident report.

## Snowflake Usage
The `snowflake-adapter.ts` logs granular interaction events (e.g., `EVIDENCE_ADDED`, `AI_COPILOT_QUERY`) to build an analytics dashboard of how users learn, highlighting the most commonly missed MITRE ATT&CK techniques.
