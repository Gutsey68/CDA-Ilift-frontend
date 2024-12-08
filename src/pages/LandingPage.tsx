import FeaturesSection from '../components/landing/FeaturesSection';
import HeroSection from '../components/landing/HeroSection';
import ScreenShotHero from '../components/landing/ScreenShotHero';
import { Spacing } from '../components/ui/Spacing';

function LandingPage() {
  return (
    <>
      <Spacing size="md" />
      <HeroSection />
      <Spacing size="sm" />
      <ScreenShotHero />
      <Spacing size="xl" />
      <FeaturesSection />
      <Spacing size="md" />
    </>
  );
}
export default LandingPage;
