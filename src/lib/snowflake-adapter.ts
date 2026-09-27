export interface AnalyticsEvent {
  eventType: "INVESTIGATION_STARTED" | "EVIDENCE_ADDED" | "AI_COPILOT_QUERY" | "INVESTIGATION_SUBMITTED";
  userId: string;
  scenarioId: string;
  metadata: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  timestamp: string;
}

class SnowflakeAdapter {
  async logEvent(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
    } catch (e) {
      console.warn("Failed to log analytics event to backend", e);
    }
  }

  async getAggregatedStats() {
    return {
      averageInvestigationTime: "14m 32s",
      mostMissedIndicator: "T1059.001 (PowerShell)",
      averageScore: 82.5,
      totalAttempts: 1240
    };
  }
}

export const analytics = new SnowflakeAdapter();
