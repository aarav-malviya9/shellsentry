import Link from "next/link";
import { ShieldAlert, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InvestigateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card h-14 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <span className="font-mono font-bold tracking-tight text-lg">ShellSentry</span>
          </Link>
          <div className="h-4 w-px bg-border mx-2" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">SOC Interface V2.4</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="text-xs font-mono text-primary flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
             </span>
             SYSTEM ONLINE
           </div>
           <Link href="/">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
           </Link>
        </div>
      </header>
      <main className="flex-1 overflow-hidden flex flex-col">
        {children}
      </main>
    </div>
  );
}
