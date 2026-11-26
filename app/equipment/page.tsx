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

export default async function EquipmentPage({ searchParams }: PageProps<'/equipment'>) {
  const params = await searchParams;
  const searchValue = Array.isArray(params.search) ? params.search[0] : params.search;
  const categoryValue = Array.isArray(params.category) ? params.category[0] : params.category;
  const search = searchValue?.trim() || '';
  const category = categoryValue?.trim() || '';

  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
  const equipmentQuery = new URLSearchParams({ sort: 'newest' });

  if (search) {
    equipmentQuery.set('search', search);
  }

  if (category) {
    equipmentQuery.set('category', category);
  }

  let equipment: Equipment[] = [];
  let hasError = false;

  try {
    const response = await fetch(`${apiUrl}/equipment?${equipmentQuery.toString()}`, {
      cache: 'no-store',
    });

    if (response.ok) {
      equipment = await response.json();
    } else {
      hasError = true;
    }
  } catch {
    hasError = true;
  }

  return (
    <main className="min-h-[70vh] bg-[#0b1020] px-5 py-14 text-white sm:py-16 lg:px-16">
      <section className="mx-auto max-w-[1408px]">
        <Reveal className="mb-8 sm:mb-10">
          <p className="mb-3 text-sm font-semibold text-[#ffad00]">GEARGRID CATALOG</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All Equipment</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#a0aec4] sm:text-base">
            Browse approved equipment listings and choose the gear your project needs.
          </p>
        </Reveal>

        <form action="/equipment" method="GET" className="mb-8 flex max-w-4xl flex-col gap-3 sm:flex-row">
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Search equipment, category, or location"
            className="min-w-0 flex-1 rounded-lg border border-[#34425a] bg-[#111a2e] px-4 py-3 text-sm text-white outline-none placeholder:text-[#8290a8] focus:border-[#ffad00]"
          />
          <select
            name="category"
            defaultValue={category}
            aria-label="Filter by category"
            className="rounded-lg border border-[#34425a] bg-[#111a2e] px-4 py-3 text-sm text-white outline-none focus:border-[#ffad00]"
          >
            <option value="">All categories</option>
            <option value="Construction">Construction</option>
            <option value="Photography">Photography</option>
            <option value="Transport">Transport</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Electronics">Electronics</option>
            <option value="Event">Event</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-[#ff9d00] px-5 py-3 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#ffb52e]"
          >
            Search
          </button>
          {(search || category) && (
            <Link href="/equipment" className="self-center text-sm text-[#a0aec4] hover:text-white">
              Clear
            </Link>
          )}
        </form>

        {hasError ? (
          <div className="rounded-xl border border-[#202c42] bg-[#111a2e] p-6">
            <h2 className="text-lg font-semibold">Equipment could not be loaded</h2>
            <p className="mt-2 text-sm text-[#a0aec4]">
              Please check that the GearGrid server is running, then refresh this page.
            </p>
          </div>
        ) : equipment.length > 0 ? (
          <>
            <p className="mb-5 text-sm text-[#a0aec4]">
              {equipment.length} {equipment.length === 1 ? 'listing' : 'listings'} found
              {search ? ` for “${search}”` : ''}
              {category ? ` in ${category}` : ''}
              {!search && !category ? ' in the approved catalog' : ''}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {equipment.map((item) => (
                <Reveal key={item._id} className="h-full">
                  <article className="h-full overflow-hidden rounded-2xl border border-[#202c42] bg-[#111a2e]">
                    <Link
                      href={`/equipment/${item._id}`}
                      aria-label={`View ${item.name}`}
                      className="relative flex h-56 items-end bg-cover bg-center p-4"
                      style={{
                        backgroundImage: `linear-gradient(180deg, transparent 45%, rgba(8, 14, 28, 0.8)), url("${item.image}")`,
                      }}
                    >
                      <span className="rounded-full bg-[#0b1223]/90 px-3 py-2 text-xs font-semibold">
                        {item.availableQuantity > 0 ? 'Available now' : 'Currently booked'}
                      </span>
                    </Link>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-4 text-xs text-[#a0aec4]">
                        <span>{item.category}</span>
                        <span className="truncate">{item.location}</span>
                      </div>
                      <h2 className="mt-3 min-h-14 text-lg font-semibold leading-7">
                        <Link href={`/equipment/${item._id}`} className="hover:text-[#ffb000]">
                          {item.name}
                        </Link>
                      </h2>
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
          </>
        ) : (
          <div className="rounded-xl border border-[#202c42] bg-[#111a2e] p-6">
            <h2 className="text-lg font-semibold">
              {search || category ? 'No matching equipment found' : 'No approved equipment yet'}
            </h2>
            <p className="mt-2 text-sm text-[#a0aec4]">
              {search || category
                ? 'Try changing or clearing your search filters.'
                : 'Approved listings will appear here when they are ready to rent.'}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
