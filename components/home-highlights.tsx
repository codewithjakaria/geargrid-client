import { Reveal } from '@/components/reveal';

const highlights = [
  { value: '6', label: 'Equipment categories' },
  { value: '3', label: 'Rental periods: daily, weekly, monthly' },
  { value: '3', label: 'Steps to complete a booking' },
  { value: 'Stripe', label: 'Secure online checkout' },
];

export function HomeHighlightsSection() {
  return (
    <section className="border-y border-[#202c42] bg-[#0b1020] px-5 py-8 text-white lg:px-16">
      <div className="mx-auto grid max-w-[1408px] grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-10">
        {highlights.map((highlight, index) => (
          <Reveal key={highlight.label} delay={index * 0.08}>
            <article className="transition-transform duration-300 hover:-translate-y-1">
              <p className="font-mono text-2xl font-bold text-white sm:text-3xl">
                {highlight.value}
              </p>
              <p className="mt-2 max-w-52 text-xs leading-5 text-[#a0aec4] sm:text-sm">
                {highlight.label}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
