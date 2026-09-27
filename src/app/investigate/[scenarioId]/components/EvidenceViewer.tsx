"use client";

import { useState } from "react";
import { Scenario } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Search, Plus, Terminal } from "lucide-react";

export default function EvidenceViewer({ scenario, onAddEvidence, investigationState }: { scenario: Scenario, onAddEvidence: (id: string) => void, investigationState: any }) {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredEvidence = filter 
    ? scenario.evidence.filter(e => e.type === filter)
    : scenario.evidence;

  const types = Array.from(new Set(scenario.evidence.map(e => e.type)));

  return (
    <div className="flex-1 p-6 flex flex-col h-full overflow-hidden">
      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2 shrink-0">
        <Button 
          variant={filter === null ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter(null)}
          className="rounded-full font-mono text-xs"
        >
          All
        </Button>
        {types.map(type => (
          <Button 
            key={type}
            variant={filter === type ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter(type)}
            className="rounded-full font-mono text-xs"
          >
            {type}
          </Button>
        ))}
      </div>

      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="grid gap-4 pb-8">
          {filteredEvidence.map(evidence => {
            const isAdded = investigationState.selectedEvidence.includes(evidence.id);
            return (
              <Card key={evidence.id} className="border-border bg-card/40 hover:bg-card/80 transition-colors">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-mono">{evidence.type}</Badge>
                      <span className="text-xs text-muted-foreground font-mono">{evidence.timestamp}</span>
                      <span className="text-xs font-mono font-bold text-primary">{evidence.source}</span>
                    </div>
                    <Badge variant={evidence.importance === "Critical" ? "destructive" : evidence.importance === "High" ? "default" : "secondary"}>
                      {evidence.importance}
                    </Badge>
                  </div>
                  
                  <div className="bg-black/50 p-3 rounded-md border border-border/50 font-mono text-xs text-green-400 whitespace-pre-wrap overflow-x-auto mb-4">
                    {evidence.content}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {evidence.mitreTactic && <span className="mr-2">MITRE: {evidence.mitreTactic}</span>}
                    </div>
                    <Button 
                      size="sm" 
                      variant={isAdded ? "secondary" : "default"}
                      disabled={isAdded}
                      onClick={() => onAddEvidence(evidence.id)}
                      className="font-mono text-xs"
                    >
                      {isAdded ? "Added to Investigation" : <><Plus className="h-3 w-3 mr-1"/> Add Evidence</>}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
