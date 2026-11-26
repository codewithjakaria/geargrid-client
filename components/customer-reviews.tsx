import { Reveal } from '@/components/reveal';

const reviews = [
  {
    quote: 'The price and available quantity were easy to check before sending a booking request.',
    customer: 'Sample renter 01',
    role: 'Construction customer',
  },
  {
    quote: 'I could find camera equipment for the dates our production needed.',
    customer: 'Sample renter 02',
    role: 'Production team',
  },
  {
    quote: 'The booking steps and Stripe payment were clear from start to finish.',
    customer: 'Sample renter 03',
    role: 'Event organizer',
  },
  {
    quote: 'The categories made it simple to find equipment for our farm work.',
    customer: 'Sample renter 04',
    role: 'Agriculture customer',
  },
];

export function CustomerReviewsSection() {
  return (
    <section id="reviews" className="bg-[#0b1223] px-5 py-16 text-white sm:py-20 lg:px-16">
      <div className="mx-auto max-w-[1408px]">
        <Reveal className="mb-8 sm:mb-10">
          <p className="mb-3 text-sm font-semibold text-[#ffad00]">CUSTOMER REVIEWS</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Feedback from renters</h2>
          <p className="mt-3 text-sm leading-6 text-[#a0aec4] sm:text-base">
            Example reviews for the project preview.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {reviews.map((review, index) => (
            <Reveal key={review.customer} delay={index * 0.08} className="h-full">
              <article className="group h-full rounded-xl border border-[#202c42] bg-[#111a2e] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#ffad00]/50 sm:p-7">
                <p className="text-lg tracking-[0.2em] text-[#ff9d00]" aria-label="5 out of 5 stars">
                  ★★★★★
                </p>
                <blockquote className="mt-4 text-base leading-7 text-[#d5dcea]">
                  “{review.quote}”
                </blockquote>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#202c42] pt-4">
                  <div>
                    <p className="font-semibold">{review.customer}</p>
                    <p className="mt-1 text-sm text-[#a0aec4]">{review.role}</p>
                  </div>
                  <span className="rounded-full border border-[#34425a] px-3 py-1.5 text-xs text-[#a0aec4]">
                    Demo review
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
