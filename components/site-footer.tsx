import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#20283a] bg-[#080e1c] px-5 py-10 text-white lg:px-16">
      <div className="mx-auto grid max-w-[1408px] gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="GearGrid home">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#ff9d00] font-bold text-[#111827]">
              G
            </span>
            <span className="text-xl font-bold">GearGrid</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#a0aec4]">
            Find equipment for construction, photography, transport, agriculture, and events.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Explore GearGrid</h2>
          <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-[#a0aec4]" aria-label="Footer navigation">
            <Link href="/#categories" className="hover:text-[#ffad00]">Equipment categories</Link>
            <Link href="/#equipment" className="hover:text-[#ffad00]">Featured equipment</Link>
            <Link href="/#how-it-works" className="hover:text-[#ffad00]">How it works</Link>
            <Link href="/#reviews" className="hover:text-[#ffad00]">Customer reviews</Link>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Get started</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#a0aec4]">
            Create an account to browse listings and request a rental.
          </p>
          <Link
            href="/register"
            className="mt-4 inline-flex rounded-lg bg-[#ff9d00] px-4 py-2.5 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#ffb52e]"
          >
            Register <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-[1408px] flex-col gap-2 border-t border-[#20283a] pt-5 text-xs text-[#8290a8] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 GearGrid</p>
        <p>Equipment rental for your next project.</p>
      </div>
    </footer>
  );
}
