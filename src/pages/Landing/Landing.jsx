
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';

import HeroSection from './sections/HeroSection';
import StatsStrip from './sections/StatsStrip';
import AboutSection from './sections/AboutSection';
import FeaturesGrid from './sections/FeaturesGrid';
import HowItWorks from './sections/HowItWorks';
import CtaSection from './sections/CtaSection';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <PublicNavbar />

      <main className="flex-1">
        <HeroSection />
        <StatsStrip />
        <AboutSection />
        <FeaturesGrid />
        <HowItWorks />
        <CtaSection />
      </main>

      <PublicFooter />
    </div>
  );
}