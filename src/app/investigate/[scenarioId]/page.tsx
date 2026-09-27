import { scenarios } from "@/lib/scenarios";
import { notFound } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default function ScenarioPage({ params }: { params: { scenarioId: string } }) {
  const scenario = scenarios.find(s => s.id === params.scenarioId);
  
  if (!scenario) {
    notFound();
  }

  return <DashboardClient scenario={scenario} />;
}
