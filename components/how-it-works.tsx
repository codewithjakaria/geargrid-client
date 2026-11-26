import { Reveal } from '@/components/reveal';

const steps = [
  {
    number: '01',
    title: 'Find your equipment',
    description: 'Browse approved listings and choose the equipment that fits your project.',
  },
  {
    number: '02',
    title: 'Send a booking request',
    description: 'Choose your rental dates and quantity, then create your booking.',
  },
  {
    number: '03',
    title: 'Complete payment',
    description: 'Pay through Stripe Checkout and follow your booking from your account.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#0b1223] px-5 py-16 text-white sm:py-20 lg:px-16">
      <div className="mx-auto max-w-[1408px]">
        <Reveal className="mb-8 sm:mb-10">
          <p className="mb-3 text-sm font-semibold text-[#ffad00]">SIMPLE STEPS</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How GearGrid Works</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#a0aec4] sm:text-base">
            Go from finding the right gear to completing your booking in a few steps.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.12} className="h-full">
              <article className="group h-full rounded-xl border border-[#202c42] bg-[#111a2e] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#ffad00]/60 sm:p-7">
                <span className="font-mono text-sm font-bold text-[#ffad00]">{step.number}</span>
                <h3 className="mt-7 text-xl font-semibold transition-colors group-hover:text-[#ffb000]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#a0aec4]">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
