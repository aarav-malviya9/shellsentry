import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, Server, Users, AlertTriangle } from "lucide-react";
import { scenarios } from "@/lib/scenarios";

export default function InvestigationLab() {
  return (
    <div className="container mx-auto p-6 max-w-6xl mt-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" /> 
            Investigation Lab
          </h1>
          <p className="text-muted-foreground text-lg">Select an incident to begin your investigation.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="border-border/50 hover:border-primary/50 transition-colors bg-card hover:bg-card/80 flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant={scenario.difficulty === "Beginner" ? "secondary" : "destructive"}>
                  {scenario.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                  <Target className="h-3 w-3" /> {scenario.affectedAsset}
                </div>
              </div>
              <CardTitle className="text-xl">{scenario.title}</CardTitle>
              <CardDescription className="pt-2">{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-sm text-muted-foreground">
                <p className="mb-2 font-medium text-foreground">Learning Objectives:</p>
                <ul className="list-disc pl-4 space-y-1">
                  {scenario.learningObjectives.slice(0, 3).map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                  {scenario.learningObjectives.length > 3 && <li>...</li>}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/investigate/${scenario.id}`} className="w-full">
                <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 transition-all">
                  Launch Environment
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
