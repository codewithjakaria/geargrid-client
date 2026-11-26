import { Reveal } from '@/components/reveal';

const benefits = [
  {
    title: 'Admin-reviewed listings',
    description: 'Equipment listings are reviewed before they appear in the public catalog.',
  },
  {
    title: 'Clear rental prices',
    description: 'See the daily, weekly, or monthly price before you send a booking request.',
  },
  {
    title: 'Flexible rental dates',
    description: 'Choose the dates and quantity that fit the needs of your project.',
  },
  {
    title: 'Stripe Checkout',
    description: 'Complete payment through Stripe Checkout and view booking updates in your account.',
  },
];

export function WhyGearGridSection() {
  return (
    <section id="about" className="bg-[#0b1020] px-5 py-16 text-white sm:py-20 lg:px-16">
      <div className="mx-auto grid max-w-[1408px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <p className="mb-3 text-sm font-semibold text-[#ffad00]">BUILT FOR YOUR WORK</p>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Why teams choose GearGrid
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#a0aec4] sm:text-base">
            Find equipment, understand the price, and manage your rental from one place.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.1}>
              <article className="group flex gap-3 transition-transform duration-300 hover:translate-x-1">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#ffad00] text-sm text-[#ffad00] transition-colors group-hover:bg-[#ffad00] group-hover:text-[#111827]" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <h3 className="text-base font-semibold sm:text-lg">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#a0aec4]">
                    {benefit.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
