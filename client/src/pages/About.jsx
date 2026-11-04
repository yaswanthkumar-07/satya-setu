import { Mail } from 'lucide-react';
import AboutHero from '../components/about/AboutHero';
import MissionVision from '../components/about/MissionVision';
import HowWeWork from '../components/about/HowWeWork';
import TeamSection from '../components/about/TeamSection';
import ContactForm from '../components/about/ContactForm';
import FeedbackForm from '../components/about/FeedbackForm';
import DisclaimerSection from '../components/about/DisclaimerSection';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { CONTACT_EMAIL } from '../data/aboutData';
import { ENV } from '../utils/constants';
import { contactService } from '../services/contactService';

export default function About() {
  // In demo mode the forms simulate a send and say that nothing was transmitted.
  // With a live API they call the backend instead.
  const live = !ENV.USE_DEMO_DATA;

  return (
    <>
      <AboutHero />
      <MissionVision />
      <HowWeWork />
      <TeamSection />

      <section id="contact" className="scroll-mt-20 border-t border-line py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Get in touch"
              title="Contact and feedback"
              description="Found an error, have an idea, or want to collaborate? Write to us, or leave anonymous feedback."
            />
            {CONTACT_EMAIL && (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-electric hover:underline"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            )}
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <ContactForm onSubmit={live ? contactService.sendContact : undefined} />
            <FeedbackForm onSubmit={live ? contactService.sendFeedback : undefined} />
          </div>
        </div>
      </section>

      <DisclaimerSection />
    </>
  );
}