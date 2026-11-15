// src/pages/Landing/Landing.jsx
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';

import HeroSection from './sections/HeroSection';
import StatsStrip from './sections/StatsStrip';
import AboutSection from './sections/AboutSection';
import FeaturesGrid from './sections/FeaturesGrid';
import HowItWorks from './sections/HowItWorks';
import OutpatientTracker from './sections/OutpatientTracker';
import AudienceSection from './sections/AudienceSection';
import EligibilityForm from './sections/EligibilityForm';
import CtaSection from './sections/CtaSection';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <PublicNavbar />

      <main className="flex-1">
        <div id="home"><HeroSection /></div>
        <StatsStrip />
        <div id="about"><AboutSection /></div>
        <div id="features"><FeaturesGrid /></div>
        <div id="how-it-works"><HowItWorks /></div>
        <OutpatientTracker />
        <AudienceSection />
        <EligibilityForm />
        <CtaSection />
      </main>

      <PublicFooter />
    </div>
  );
}