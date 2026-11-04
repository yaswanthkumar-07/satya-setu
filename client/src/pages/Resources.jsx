import ResourcesHero from '../components/resources/ResourcesHero';
import ChannelFinder from '../components/resources/ChannelFinder';
import ChannelGrid from '../components/resources/ChannelGrid';
import HelplineList from '../components/resources/HelplineList';
import RightsGuidance from '../components/resources/RightsGuidance';

export default function Resources() {
  return (
    <>
      <ResourcesHero />
      <ChannelFinder />
      <ChannelGrid />
      <HelplineList />
      <RightsGuidance />
    </>
  );
}