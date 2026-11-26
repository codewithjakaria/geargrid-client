import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { FeaturedEquipmentSection } from '@/components/featured-equipment';
import { EquipmentCategoriesSection } from '@/components/equipment-categories';
import { HowItWorksSection } from '@/components/how-it-works';
import { WhyGearGridSection } from '@/components/why-geargrid';
import { CustomerReviewsSection } from '@/components/customer-reviews';
import { HomeHighlightsSection } from '@/components/home-highlights';

export default function HomePage() {
  return (
    <main id="home" className="bg-[#0b1020] text-white">
      <section className="mx-auto grid max-w-[1536px] grid-cols-1 items-center gap-12 px-5 py-16 md:py-20 lg:grid-cols-2 lg:px-16 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold tracking-wide text-[#ffad00]">
            Commercial &amp; Creative Fleet Marketplace
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Industrial-grade gear ready when your project starts.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#c7cfdd] sm:text-lg">
            Find inspected equipment for construction, photography, transport,
            and events, with clear rental pricing and secure online booking.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/equipment"
              className="inline-flex min-h-14 items-center gap-4 rounded-xl bg-[#ff9d00] px-6 font-semibold text-[#111827] transition-colors hover:bg-[#ffb52e]"
            >
              Browse All Equipment <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex min-h-14 items-center rounded-xl border border-[#34425a] px-6 font-medium text-[#e3e9f2] transition-colors hover:bg-[#151f34]"
            >
              How GearGrid Works
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative min-h-[340px] overflow-hidden rounded-2xl border border-[#34425a] sm:min-h-[440px] lg:min-h-[500px]">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85"
            alt="Construction equipment at a worksite"
            fill
            preload
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080e1c]/80 via-transparent to-transparent" />
          <div className="absolute inset-x-6 bottom-5 flex items-center justify-between gap-4 text-sm sm:inset-x-8 sm:bottom-7">
            <span>Equipment for the work ahead</span>
            <span className="font-mono text-[#ffca3a]">READY TO RENT</span>
          </div>
        </Reveal>
      </section>
      <HomeHighlightsSection />
      <EquipmentCategoriesSection />
      <FeaturedEquipmentSection />
      <HowItWorksSection />
      <WhyGearGridSection />
      <CustomerReviewsSection />
    </main>
  );
}
