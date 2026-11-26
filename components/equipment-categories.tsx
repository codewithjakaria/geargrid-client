import Link from 'next/link';
import { Reveal } from '@/components/reveal';

const categories = [
  {
    number: '01',
    title: 'Construction Equipment',
    description: 'Excavators, loaders, and tools for building and site work.',
    filter: 'Construction',
  },
  {
    number: '02',
    title: 'Photography Equipment',
    description: 'Cameras, lenses, and production gear for your next shoot.',
    filter: 'Photography',
  },
  {
    number: '03',
    title: 'Vehicles & Transportation',
    description: 'Vans, trucks, and transport equipment for the job.',
    filter: 'Transport',
  },
  {
    number: '04',
    title: 'Agriculture Equipment',
    description: 'Tractors and field equipment for farm work.',
    filter: 'Agriculture',
  },
  {
    number: '05',
    title: 'Electronics',
    description: 'Power, diagnostics, and electronics for work sites.',
    filter: 'Electronics',
  },
  {
    number: '06',
    title: 'Event Equipment',
    description: 'Sound, lighting, and staging gear for events.',
    filter: 'Event',
  },
];

export function EquipmentCategoriesSection() {
  return (
    <section id="categories" className="bg-[#0b1020] px-5 py-16 text-white sm:py-20 lg:px-16">
      <div className="mx-auto max-w-[1408px]">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Equipment Categories</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#a0aec4] sm:text-base">
              Find the kind of equipment your project needs.
            </p>
          </div>
          <Link href="/equipment" className="font-semibold text-[#ffad00] hover:text-[#ffc04d]">
            View full catalog <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.number} delay={index * 0.06} className="h-full">
              <Link
                href={`/equipment?category=${category.filter}`}
                className="group flex h-full items-start gap-4 rounded-xl border border-[#202c42] bg-[#111a2e] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#ffad00]/60 hover:bg-[#141f35] sm:p-6"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#ffad00]/15 font-mono text-sm font-bold text-[#ffad00] transition-colors group-hover:bg-[#ffad00] group-hover:text-[#111827]">
                  {category.number}
                </span>
                <span>
                  <span className="block text-lg font-semibold">{category.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-[#a0aec4]">
                    {category.description}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
