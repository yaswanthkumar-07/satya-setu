import Hero from '../components/home/Hero';
import MissionSection from '../components/home/MissionSection';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedReports from '../components/home/FeaturedReports';
import HistoricalPreview from '../components/home/HistoricalPreview';
import PlatformStats from '../components/home/PlatformStats';
import CallToAction from '../components/home/CallToAction';

export default function Home() {
  return (
    <>
      <Hero />
      <MissionSection />
      <HowItWorks />
      <FeaturedReports />
      <HistoricalPreview />
      <PlatformStats />
      <CallToAction />
    </>
  );
}