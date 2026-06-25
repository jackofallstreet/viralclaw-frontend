import Nav from "@/components/nav";
import Ticker from "@/components/ticker";
import Hero from "@/components/hero";
import IntelligenceSection from "@/components/intelligence-section";
import HowItWorks from "@/components/how-it-works";
import AgentSwarm from "@/components/agent-swarm";
import Belief from "@/components/belief";
import Pricing from "@/components/pricing";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <Ticker />
      <main>
        <Hero />
        <hr className="h-px bg-[var(--border)] border-0" />
        <IntelligenceSection />
        <hr className="h-px bg-[var(--border)] border-0" />
        <HowItWorks />
        <hr className="h-px bg-[var(--border)] border-0" />
        <AgentSwarm />
        <Belief />
        <hr className="h-px bg-[var(--border)] border-0" />
        <Pricing />
        <hr className="h-px bg-[var(--border)] border-0" />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
