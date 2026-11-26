import Link from 'next/link';
import { Reveal } from '@/components/reveal';

type Equipment = {
  _id: string;
  name: string;
  category: string;
  location: string;
  rentalPrice: number;
  rentalType: string;
  availableQuantity: number;
  image: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(price);
}

export async function FeaturedEquipmentSection() {
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
  let equipment: Equipment[] = [];

  try {
    const response = await fetch(`${apiUrl}/equipment?limit=6&sort=newest`, {
      cache: 'no-store',
    });

    if (response.ok) {
      equipment = await response.json();
    }
  } catch {
    equipment = [];
  }

  return (
    <section id="equipment" className="bg-[#0b1020] px-5 py-16 text-white sm:py-20 lg:px-16">
      <div className="mx-auto max-w-[1408px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-10">
          <div>
            <p className="mb-3 text-sm font-semibold text-[#ffad00]">READY WHEN YOU ARE</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Equipment</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#a0aec4] sm:text-base">
              Browse the latest approved equipment listings, ready for your next project.
            </p>
          </div>
          <Link href="/equipment" className="font-semibold text-[#ffad00] hover:text-[#ffc04d]">
            View all equipment <span aria-hidden="true">→</span>
          </Link>
        </div>

        {equipment.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {equipment.map((item, index) => (
              <Reveal key={item._id} delay={index * 0.06} className="h-full">
                <article className="h-full overflow-hidden rounded-2xl border border-[#202c42] bg-[#111a2e]">
                  <Link
                    href={`/equipment/${item._id}`}
                    aria-label={`View ${item.name}`}
                    className="relative flex h-56 items-end bg-cover bg-center p-4"
                    style={{
                      backgroundImage: `linear-gradient(180deg, transparent 45%, rgba(8, 14, 28, 0.8)), url("${item.image}")`,
                    }}
                  >
                    <span className="rounded-full bg-[#0b1223]/90 px-3 py-2 text-xs font-semibold text-white">
                      {item.availableQuantity > 0 ? 'Available now' : 'Currently booked'}
                    </span>
                  </Link>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4 text-xs text-[#a0aec4]">
                      <span>{item.category}</span>
                      <span className="truncate">{item.location}</span>
                    </div>
                    <h3 className="mt-3 min-h-14 text-lg font-semibold leading-7">
                      <Link href={`/equipment/${item._id}`} className="hover:text-[#ffb000]">
                        {item.name}
                      </Link>
                    </h3>
                    <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#202c42] pt-4">
                      <p className="m-0 font-mono text-xl font-semibold">
                        {formatPrice(item.rentalPrice)}
                        <span className="ml-2 text-xs font-normal text-[#a0aec4]">
                          / {item.rentalType.toLowerCase()}
                        </span>
                      </p>
                      <Link
                        href={`/equipment/${item._id}`}
                        className="rounded-lg bg-[#ff9d00] px-4 py-2.5 text-sm font-semibold text-[#111827] hover:bg-[#ffb52e]"
                      >
                        Details <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#202c42] bg-[#111a2e] p-6 sm:p-8">
            <h3 className="text-lg font-semibold">No approved equipment yet</h3>
            <p className="mt-2 text-sm leading-6 text-[#a0aec4]">
              Approved listings will appear here when they are ready to rent.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
