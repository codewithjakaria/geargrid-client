import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#20283a] bg-[#0b1020] text-white">
      <div className="mx-auto flex max-w-[1536px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-4 lg:px-16">
        <Link href="/" className="flex items-center gap-3" aria-label="GearGrid home">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#ff9d00] text-[#0b1020]">
            <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
              <path d="M5 5h12v5H10v7H5zM13 13h14v14H13zM20 5h7v7h-5V10h-2z" />
            </svg>
          </span>
          <span className="text-2xl font-bold tracking-tight">GearGrid</span>
        </Link>

        <nav className="order-3 flex w-full items-center justify-center gap-6 overflow-x-auto whitespace-nowrap text-sm text-[#c7cfdd] md:order-none md:w-auto md:gap-7 lg:text-base">
          <Link href="/#home" className="border-b-2 border-[#ff9d00] py-2 text-[#ffb000]">
            Home
          </Link>
          <Link href="/#equipment" className="transition-colors hover:text-[#ffb000]">
            All Equipment
          </Link>
          <Link href="/#how-it-works" className="transition-colors hover:text-[#ffb000]">
            How It Works
          </Link>
          <Link href="/#about" className="transition-colors hover:text-[#ffb000]">
            About Us
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-[#ffb000]">
            Contact Us
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4 md:ml-0 md:gap-6">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-[#20283a] text-[#d6deea]" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="4" />
              <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </svg>
          </span>
          <Link href="/register" className="text-sm text-[#d6deea] hover:text-[#ffb000] lg:text-base">
            Register
          </Link>
          <Link href="/login" className="rounded-xl bg-[#ff9d00] px-5 py-3 text-sm font-semibold text-[#111827] hover:bg-[#ffb52e] lg:text-base">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
