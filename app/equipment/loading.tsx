export default function LoadingEquipment() {
  return (
    <main className="min-h-[70vh] bg-[#0b1020] px-5 py-14 text-white sm:py-16 lg:px-16">
      <section className="mx-auto max-w-[1408px] animate-pulse">
        <div className="mb-8 h-9 w-56 rounded bg-[#202c42]" />
        <div className="mb-10 h-12 max-w-2xl rounded bg-[#111a2e]" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((card) => (
            <div key={card} className="overflow-hidden rounded-2xl border border-[#202c42] bg-[#111a2e]">
              <div className="h-56 bg-[#202c42]" />
              <div className="space-y-4 p-5">
                <div className="h-4 w-1/3 rounded bg-[#202c42]" />
                <div className="h-6 w-3/4 rounded bg-[#202c42]" />
                <div className="h-10 rounded bg-[#202c42]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
