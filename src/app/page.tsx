import { Hero } from '@/components/home/Hero';
import { SignatureDishes } from '@/components/home/SignatureDishes';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { ChefSection } from '@/components/home/ChefSection';
import { OffersSection } from '@/components/home/OffersSection';
import { EventsTeaser } from '@/components/home/EventsTeaser';
import { ReviewsCarousel } from '@/components/reviews/ReviewsCarousel';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureDishes />
      <AboutTeaser />
      <ChefSection />
      <OffersSection />
      <EventsTeaser />
      <ReviewsCarousel />
      <CTASection />
    </>
  );
}
