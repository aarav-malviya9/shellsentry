"use client";

import { useState } from "react";
import { Scenario, Evidence } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Terminal, ShieldAlert, Cpu, Network, FileText, Lock, Globe, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder components - will build these next
import TimelineView from "./components/TimelineView";
import EvidenceViewer from "./components/EvidenceViewer";
import InvestigationGraph from "./components/InvestigationGraph";
import AICopilot from "./components/AICopilot";

import ReportModal from "./components/ReportModal";

export default function DashboardClient({ scenario }: { scenario: Scenario }) {
  const [activeTab, setActiveTab] = useState("timeline");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [investigationState, setInvestigationState] = useState({
    selectedEvidence: [] as string[],
    hypotheses: []
  });

  const handleAddEvidence = (id: string) => {
    if (!investigationState.selectedEvidence.includes(id)) {
      setInvestigationState(prev => ({
        ...prev,
        selectedEvidence: [...prev.selectedEvidence, id]
      }));
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-border bg-card/50 flex flex-col p-4 gap-6 shrink-0">
        <div>
          <div className="text-xs text-muted-foreground uppercase font-mono tracking-wider mb-2">Active Incident</div>
          <h2 className="text-lg font-bold leading-tight mb-2">{scenario.title}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="destructive" className="font-mono text-xs">CRITICAL</Badge>
            <Badge variant="outline" className="font-mono text-xs border-primary/50 text-primary">
              <Cpu className="h-3 w-3 mr-1" /> {scenario.affectedAsset}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{scenario.description}</p>
        </div>

        <div>
          <div className="text-xs text-muted-foreground uppercase font-mono tracking-wider mb-2">Investigation Progress</div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-1">
            <div className="h-full bg-primary" style={{ width: `${(investigationState.selectedEvidence.length / scenario.evidence.length) * 100}%` }} />
          </div>
          <div className="text-xs text-right text-muted-foreground font-mono">
            {investigationState.selectedEvidence.length} / {scenario.evidence.length} Evidence Found
          </div>
        </div>

        <div className="flex-1" />

        <div className="border border-primary/20 bg-primary/5 p-3 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2 text-primary text-sm font-bold">
            <ShieldAlert className="h-4 w-4" />
            Mission Brief
          </div>
          <p className="text-xs text-muted-foreground">Find the root cause, map the attacker's path, and submit a remediation report.</p>
        </div>

        <Button 
          className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
          onClick={() => setIsReportOpen(true)}
        >
          Submit Conclusion
        </Button>
      </div>

      <ReportModal 
        scenario={scenario} 
        investigationState={investigationState} 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background/50">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="h-14 border-b border-border flex items-center px-4 bg-card shrink-0">
            <TabsList className="bg-transparent h-full gap-4">
              <TabsTrigger value="timeline" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-b-2 border-primary rounded-none h-full font-mono text-xs uppercase tracking-wider">
                <Activity className="h-4 w-4 mr-2" /> Timeline
              </TabsTrigger>
              <TabsTrigger value="evidence" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-b-2 border-primary rounded-none h-full font-mono text-xs uppercase tracking-wider">
                <Search className="h-4 w-4 mr-2" /> Evidence
              </TabsTrigger>
              <TabsTrigger value="graph" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-b-2 border-primary rounded-none h-full font-mono text-xs uppercase tracking-wider">
                <Network className="h-4 w-4 mr-2" /> Attack Graph
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-hidden relative">
            <TabsContent value="timeline" className="h-full m-0 data-[state=active]:flex flex-col">
              <TimelineView scenario={scenario} onAddEvidence={handleAddEvidence} />
            </TabsContent>
            <TabsContent value="evidence" className="h-full m-0 data-[state=active]:flex flex-col">
              <EvidenceViewer scenario={scenario} onAddEvidence={handleAddEvidence} investigationState={investigationState} />
            </TabsContent>
            <TabsContent value="graph" className="h-full m-0 data-[state=active]:flex flex-col">
              <InvestigationGraph scenario={scenario} investigationState={investigationState} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* AI Copilot Right Sidebar */}
      <div className="w-80 border-l border-border bg-card/80 shrink-0 flex flex-col">
        <AICopilot scenario={scenario} investigationState={investigationState} />
      </div>
    </div>
  );
}
