"use client";

import { useState } from "react";
import { Scenario } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, AlertTriangle, FileText, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ReportModal({ 
  scenario, 
  investigationState, 
  isOpen, 
  onClose 
}: { 
  scenario: Scenario, 
  investigationState: any, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  const [step, setStep] = useState<"write" | "scoring" | "report">("write");
  const [conclusion, setConclusion] = useState("");
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    setStep("scoring");
    // Simulate scoring delay
    setTimeout(() => {
      // Very basic scoring logic for demo
      let calculatedScore = 50; // base score
      const evidenceRatio = investigationState.selectedEvidence.length / scenario.evidence.length;
      calculatedScore += evidenceRatio * 30; // up to 30 points for evidence collection
      
      if (conclusion.length > 50) calculatedScore += 20; // detail points
      
      setScore(Math.min(Math.round(calculatedScore), 100));
      setTimeout(() => setStep("report"), 2000);
    }, 1500);
  };

  const getScoreColor = (s: number) => {
    if (s >= 90) return "text-green-500";
    if (s >= 70) return "text-yellow-500";
    return "text-destructive";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-card border-border sm:rounded-xl">
        {step === "write" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl font-mono">
                <AlertTriangle className="h-5 w-5 text-primary" /> Incident Conclusion
              </DialogTitle>
              <DialogDescription>
                Summarize your findings. What was the root cause? How did the attacker gain access? What data was compromised?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea 
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
                placeholder="The incident began when the user DEV-042 opened a malicious PDF attachment..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={conclusion.length < 10}>Submit Investigation</Button>
            </DialogFooter>
          </>
        )}

        {step === "scoring" && (
          <div className="py-12 flex flex-col items-center justify-center space-y-6">
            <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <h3 className="text-xl font-mono font-bold animate-pulse">Analyzing Investigation Quality...</h3>
            <p className="text-muted-foreground text-sm">Validating evidence, cross-referencing MITRE ATT&CK techniques, and scoring remediation.</p>
          </div>
        )}

        {step === "report" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl font-mono text-primary">
                <ShieldCheck className="h-6 w-6" /> Official Incident Report
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                <div>
                  <div className="text-sm text-muted-foreground font-mono uppercase">Investigation Score</div>
                  <div className={`text-5xl font-black ${getScoreColor(score)}`}>{score}<span className="text-2xl text-muted-foreground">/100</span></div>
                </div>
                <div className="space-y-2 w-48">
                  <div className="text-xs font-mono flex justify-between"><span>Evidence</span><span>{Math.round(score * 0.9)}/100</span></div>
                  <Progress value={score * 0.9} className="h-1" />
                  <div className="text-xs font-mono flex justify-between"><span>Root Cause</span><span>{Math.round(score)}/100</span></div>
                  <Progress value={score} className="h-1" />
                  <div className="text-xs font-mono flex justify-between"><span>Attribution</span><span>{Math.round(score * 0.8)}/100</span></div>
                  <Progress value={score * 0.8} className="h-1" />
                </div>
              </div>

              <div className="space-y-4">
                <section>
                  <h4 className="font-bold text-lg border-b border-border pb-1 mb-2">Executive Summary</h4>
                  <p className="text-sm text-muted-foreground">{conclusion}</p>
                </section>
                
                <section>
                  <h4 className="font-bold text-lg border-b border-border pb-1 mb-2">Learning Outcomes</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                    {scenario.learningObjectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-lg border-b border-border pb-1 mb-2">AI Assessment (Powered by Gemma)</h4>
                  <p className="text-sm text-muted-foreground bg-primary/10 p-3 rounded border border-primary/20">
                    Your analysis correctly identified the initial access vector (Phishing). However, you missed some of the persistence mechanisms established via the registry. In a real scenario, this would allow the attacker to return after a reboot. Review MITRE T1547.001 for more details.
                  </p>
                </section>
              </div>
            </div>
            <DialogFooter className="sm:justify-between border-t border-border pt-4">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button className="gap-2" onClick={() => window.print()}>
                <Download className="h-4 w-4" /> Export PDF
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
