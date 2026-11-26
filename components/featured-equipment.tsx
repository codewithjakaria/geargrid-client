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
  let items: Equipment[] = [];

  try {
    const response = await fetch(`${apiUrl}/equipment?limit=6&sort=newest`, { cache: 'no-store' });
    if (response.ok) items = await response.json();
  } catch {
    items = [];
  }

  return (
    <section className="section featured-section" id="featured">
      <div className="section-heading section-heading-row">
        <Reveal>
          <p className="eyebrow">READY WHEN YOU ARE</p>
          <h2>Good gear.<br /><em>Better projects.</em></h2>
        </Reveal>
        <Reveal delay={0.1} className="heading-side">
          <p>Explore carefully listed equipment from local owners, priced for the time you actually need it.</p>
          <Link className="text-link" href="/equipment">Browse all equipment <span aria-hidden="true">↗</span></Link>
        </Reveal>
      </div>

      {items.length > 0 ? (
        <div className="equipment-grid">
          {items.map((item, index) => (
            <Reveal key={item._id} delay={index * 0.06} className="equipment-card-wrap">
              <article className="equipment-card">
                <Link className="equipment-image" href={`/equipment/${item._id}`} aria-label={`View ${item.name}`} style={{ backgroundImage: `linear-gradient(180deg, transparent 54%, rgba(9, 31, 25, .38)), url("${item.image}")` }}>
                  <span className={item.availableQuantity > 0 ? 'availability available' : 'availability unavailable'}>
                    <span className="availability-dot" />
                    {item.availableQuantity > 0 ? 'Available now' : 'Currently booked'}
                  </span>
                </Link>
                <div className="equipment-info">
                  <div className="equipment-topline"><span>{item.category}</span><span>{item.location}</span></div>
                  <h3><Link href={`/equipment/${item._id}`}>{item.name}</Link></h3>
                  <div className="equipment-bottomline">
                    <span className="equipment-price">{formatPrice(item.rentalPrice)} <small>/ {item.rentalType?.toLowerCase()}</small></span>
                    <Link className="round-arrow" href={`/equipment/${item._id}`} aria-label={`View details for ${item.name}`}>↗</Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="empty-featured">
          <span className="empty-mark" aria-hidden="true">✳</span>
          <div><h3>New equipment is on its way.</h3><p>Approved listings will show up here as local owners add their gear.</p></div>
          <Link className="button button-light" href="/login">Become an owner <span aria-hidden="true">↗</span></Link>
        </div>
      )}
    </section>
  );
}
