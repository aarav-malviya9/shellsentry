"use client";

import { useState } from "react";
import { Scenario } from "@/lib/types";
import { aiProvider } from "@/lib/ai-provider";
import { BrainCircuit, Loader2, Sparkles, Send, HelpCircle, FileCheck, CheckCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AICopilot({ scenario, investigationState }: { scenario: Scenario, investigationState: any }) {
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string, provider?: string}[]>([
    { role: 'ai', content: `Hello Investigator. I am your AI Copilot for Incident ${scenario.id}. How can I assist you with analyzing the evidence?` }
  ]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleAction = async (type: "explain" | "hint" | "analyze" | "validate") => {
    setLoading(true);
    let userMsg = "";
    if (type === "explain") userMsg = "Can you explain the currently selected evidence?";
    if (type === "hint") userMsg = "I need a hint on where to look next.";
    if (type === "validate") userMsg = "Validate my current hypothesis.";
    
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);

    const response = await aiProvider.generateResponse({ type, context: investigationState });
    
    setMessages(prev => [...prev, { role: 'ai', content: response.content, provider: response.provider }]);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const query = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setLoading(true);

    const response = await aiProvider.generateResponse({ type: "analyze", context: investigationState, query });
    setMessages(prev => [...prev, { role: 'ai', content: response.content, provider: response.provider }]);
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-card/30">
      <div className="h-14 border-b border-border flex items-center px-4 justify-between bg-card/80 shrink-0">
        <div className="flex items-center gap-2 font-bold text-sm">
          <BrainCircuit className="h-5 w-5 text-primary" />
          AI Copilot
        </div>
        <div className="text-[10px] uppercase font-mono px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20 flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> Powered by Gemma
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[90%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-primary/20 text-foreground border border-primary/30' : 'bg-muted/50 border border-border text-muted-foreground'}`}>
                {msg.content}
              </div>
              {msg.provider && (
                <div className="text-[10px] text-muted-foreground mt-1 ml-1 font-mono flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-primary" /> {msg.provider}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/20 rounded-lg w-32">
              <Loader2 className="h-4 w-4 animate-spin text-primary" /> Analyzing...
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-card/50">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={() => handleAction('explain')} className="text-xs font-mono" disabled={loading}>
            <HelpCircle className="h-3 w-3 mr-1" /> Explain Evidence
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction('hint')} className="text-xs font-mono" disabled={loading}>
            <Sparkles className="h-3 w-3 mr-1" /> Request Hint
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction('validate')} className="text-xs font-mono col-span-2" disabled={loading}>
            <FileCheck className="h-3 w-3 mr-1" /> Validate Hypothesis
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the copilot..."
            className="text-sm bg-background/50 border-border"
            disabled={loading}
          />
          <Button type="submit" size="icon" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
