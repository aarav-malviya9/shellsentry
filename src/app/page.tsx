import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Terminal, BrainCircuit, Activity, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-y-auto">
      {/* Navbar */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">ShellSentry</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/investigate" className="hover:text-foreground transition-colors">Scenarios</Link>
            <Link href="#ai" className="hover:text-foreground transition-colors">AI Copilot</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/investigate/sc-001">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Demo Mode
              </Button>
            </Link>
            <Link href="/investigate">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                Start Investigation
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <Badge variant="outline" className="mb-6 border-primary/50 text-primary uppercase tracking-wider font-mono text-xs">
            HackShells Edition 2026
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Investigate attacks.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              Don't just read about them.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            ShellSentry turns cybersecurity education into realistic incident investigations powered by AI. Experience a production-grade SOC simulator.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/investigate">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all">
                Start Investigation <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/investigate/sc-001">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-border hover:bg-accent hover:text-accent-foreground">
                Explore Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mockup Preview Section */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-6xl relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none" />
          <div className="relative z-10 rounded-xl border border-border/50 bg-card shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px]">
             {/* Mock Sidebar */}
             <div className="w-64 border-r border-border/50 p-4 hidden md:flex flex-col gap-4 bg-muted/20">
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                <div className="space-y-2 mt-4">
                  {[1,2,3,4].map(i => <div key={i} className="h-8 w-full bg-muted/50 rounded animate-pulse" />)}
                </div>
             </div>
             {/* Mock Main Area */}
             <div className="flex-1 p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="h-8 w-48 bg-destructive/20 border border-destructive/50 rounded animate-pulse" />
                  <div className="h-8 w-32 bg-primary/20 rounded animate-pulse" />
                </div>
                <div className="flex-1 border border-border/50 rounded-lg bg-background p-4 relative overflow-hidden">
                  <div className="absolute top-4 left-4 h-12 w-12 rounded-full border-2 border-primary/50 flex items-center justify-center bg-primary/10">
                    <Terminal className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute top-10 left-16 w-32 h-[2px] bg-primary/30" />
                  <div className="absolute top-4 left-48 h-12 w-12 rounded-full border-2 border-destructive/50 flex items-center justify-center bg-destructive/10">
                    <Activity className="h-5 w-5 text-destructive" />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-muted/10 border-t border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-card border border-border">
              <Terminal className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Live Investigation</h3>
              <p className="text-muted-foreground">Interact with simulated terminal history, network logs, and process executions. Connect the dots to find the root cause.</p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <BrainCircuit className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Copilot Powered by Gemma</h3>
              <p className="text-muted-foreground">Don't just get answers. Get explanations, hints, and hypothesis validation from an intelligent security assistant.</p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <Activity className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Threat Timeline Mapping</h3>
              <p className="text-muted-foreground">Visually map out the attacker's path, mapping behaviors to the MITRE ATT&CK framework automatically.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-muted-foreground border-t border-border/50 text-sm">
        <p>Built for the 305 HackShells Edition September 2026. Powered by Gemma and Snowflake.</p>
      </footer>
    </div>
  );
}
