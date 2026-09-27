export interface AIRequest {
  type: "explain" | "hint" | "analyze" | "validate" | "report";
  context: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  query?: string;
}

export interface AIResponse {
  content: string;
  confidence?: number;
  provider: string;
}

class AIProvider {
  async generateResponse(request: AIRequest): Promise<AIResponse> {
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
      
      if (!res.ok) {
        throw new Error(`API responded with status: ${res.status}`);
      }
      
      const data = await res.json();
      return {
        content: data.content,
        provider: data.provider
      };
    } catch (error) {
      console.error("AI Provider Error:", error);
      return {
        content: "Error: Could not reach the backend AI engine. Operating in degraded mode.",
        provider: "System Fallback"
      };
    }
  }
}

export const aiProvider = new AIProvider();
