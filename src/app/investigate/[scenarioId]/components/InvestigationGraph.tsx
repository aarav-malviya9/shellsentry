"use client";

import { useMemo } from 'react';
import ReactFlow, { Background, Controls, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { Scenario } from '@/lib/types';

export default function InvestigationGraph({ scenario, investigationState }: { scenario: Scenario, investigationState: any }) {
  const { nodes, edges } = useMemo(() => {
    const nds: Node[] = [];
    const eds: Edge[] = [];
    
    // Add nodes for selected evidence
    investigationState.selectedEvidence.forEach((evId: string, index: number) => {
      const evidence = scenario.evidence.find(e => e.id === evId);
      if (evidence) {
        nds.push({
          id: evId,
          data: { label: `${evidence.type}: ${evidence.source}` },
          position: { x: 50 + (index * 150), y: 150 + (index % 2 * 100) },
          style: { 
            background: 'hsl(var(--card))', 
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--primary))',
            borderRadius: '4px',
            padding: '10px',
            fontSize: '12px',
            fontFamily: 'monospace'
          }
        });
      }
    });

    // If there's an event connected to multiple evidences, link them up.
    scenario.events.forEach((event, i) => {
      const relatedAddedEvidence = event.evidenceIds.filter(id => investigationState.selectedEvidence.includes(id));
      if (relatedAddedEvidence.length > 0) {
        // Add event node
        const eventNodeId = `evt-${event.id}`;
        nds.push({
          id: eventNodeId,
          data: { label: event.type },
          position: { x: 250 + (i * 200), y: 50 },
          style: {
            background: 'hsl(var(--destructive)/0.2)',
            color: 'hsl(var(--destructive))',
            border: '1px solid hsl(var(--destructive))',
            borderRadius: '4px',
            padding: '10px',
            fontSize: '12px',
            fontWeight: 'bold'
          }
        });
        
        // Link evidence to event
        relatedAddedEvidence.forEach(evId => {
          eds.push({
            id: `e-${evId}-${eventNodeId}`,
            source: evId,
            target: eventNodeId,
            animated: true,
            style: { stroke: 'hsl(var(--primary))' }
          });
        });
      }
    });

    return { nodes: nds, edges: eds };
  }, [scenario, investigationState.selectedEvidence]);

  if (investigationState.selectedEvidence.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground font-mono text-sm">
        Add evidence to the investigation to build the attack graph.
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-full" style={{ background: 'hsl(var(--background))' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="hsl(var(--muted-foreground))" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
