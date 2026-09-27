"use client";

import { Scenario } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";

export default function TimelineView({ scenario, onAddEvidence }: { scenario: Scenario, onAddEvidence: (id: string) => void }) {
  return (
    <div className="flex-1 p-6 overflow-hidden flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold font-mono text-primary flex items-center gap-2">
          <Clock className="h-5 w-5" /> Threat Timeline
        </h3>
        <div className="text-sm text-muted-foreground font-mono">
          {scenario.events.length} Events Detected
        </div>
      </div>
      
      <ScrollArea className="flex-1 pr-4">
        <div className="relative border-l border-primary/30 ml-4 pb-8">
          {scenario.events.map((event, index) => (
            <div key={event.id} className="mb-8 ml-6 relative group">
              <span className="absolute -left-8 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background ring-4 ring-background transition-colors group-hover:bg-primary" />
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                  <span className="text-primary font-bold">{event.timestamp}</span>
                  <span className="h-px w-4 bg-border" />
                  <span className="text-foreground">{event.type}</span>
                </div>
                
                <Card className="p-4 border-border/50 bg-card/50 hover:bg-card hover:border-primary/50 transition-all cursor-default">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-lg mb-1">{event.description}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Correlated Evidence: {event.evidenceIds.length} items
                      </p>
                    </div>
                    <AlertCircle className="h-5 w-5 text-destructive/70" />
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    {event.evidenceIds.map(evId => {
                      const evidence = scenario.evidence.find(e => e.id === evId);
                      if (!evidence) return null;
                      return (
                        <div key={evId} className="text-xs font-mono bg-muted/50 p-2 rounded flex justify-between items-center border border-transparent hover:border-border">
                          <span>[{evidence.type}] {evidence.source}</span>
                          <button 
                            onClick={() => onAddEvidence(evidence.id)}
                            className="text-primary hover:text-primary-foreground hover:bg-primary px-2 py-0.5 rounded transition-colors"
                          >
                            Add to Investigation
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
