'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FavoriteButton } from '@/components/favorite-button';

type Equipment = {
  _id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  rentalPrice: number;
  rentalType: string;
  availableQuantity: number;
  condition?: string;
  brand?: string;
  model?: string;
  image: string;
  terms?: string;
  owner?: {
    name?: string;
    email?: string;
  };
};

type ApiMessage = {
  message?: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function EquipmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEquipment() {
      const token = localStorage.getItem('geargridToken');

      if (!token) {
        router.replace('/login');
        return;
      }

      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

      try {
        const response = await fetch(`${apiUrl}/equipment/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });

        if (response.status === 401) {
          localStorage.removeItem('geargridToken');
          router.replace('/login');
          return;
        }

        if (!response.ok) {
          const result: ApiMessage = await response.json();
          setError(result.message || 'This equipment could not be found.');
          setIsLoading(false);
          return;
        }

        const item: Equipment = await response.json();
        setEquipment(item);
        setIsLoading(false);
      } catch {
        setError('Could not connect to GearGrid. Check that the server is running.');
        setIsLoading(false);
      }
    }

    void loadEquipment();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <main className="min-h-[70vh] bg-[#0b1020] px-5 py-16 text-white lg:px-16">
        <div className="mx-auto max-w-[1200px] animate-pulse rounded-2xl border border-[#202c42] bg-[#111a2e] p-8 text-[#a0aec4]">
          Loading equipment details...
        </div>
      </main>
    );
  }

  if (error || !equipment) {
    return (
      <main className="min-h-[70vh] bg-[#0b1020] px-5 py-16 text-white lg:px-16">
        <section className="mx-auto max-w-[1200px] rounded-2xl border border-[#202c42] bg-[#111a2e] p-8">
          <h1 className="text-2xl font-bold">Equipment details unavailable</h1>
          <p className="mt-3 text-sm text-[#a0aec4]">{error || 'This equipment could not be found.'}</p>
          <Link href="/equipment" className="mt-6 inline-block font-semibold text-[#ffad00] hover:text-[#ffc04d]">
            ← Back to all equipment
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#0b1020] px-5 py-12 text-white sm:py-16 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <Link href="/equipment" className="mb-6 inline-block text-sm text-[#a0aec4] hover:text-white">
          ← Back to all equipment
        </Link>

        <section className="grid gap-8 lg:grid-cols-2">
          <div
            role="img"
            aria-label={equipment.name}
            className="min-h-[320px] rounded-2xl border border-[#202c42] bg-[#111a2e] bg-cover bg-center"
            style={{ backgroundImage: `url("${equipment.image}")` }}
          />

          <div className="rounded-2xl border border-[#202c42] bg-[#111a2e] p-6 sm:p-8">
            <p className="text-sm font-semibold text-[#ffad00]">{equipment.category}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{equipment.name}</h1>
            <p className="mt-4 text-2xl font-semibold">
              {formatPrice(equipment.rentalPrice)}
              <span className="ml-2 text-sm font-normal text-[#a0aec4]">/ {equipment.rentalType.toLowerCase()}</span>
            </p>
            <FavoriteButton equipmentId={equipment._id} />
            <p className="mt-5 leading-7 text-[#c7cfdd]">{equipment.description}</p>

            <dl className="mt-7 grid grid-cols-2 gap-5 border-t border-[#202c42] pt-6 text-sm">
              <div>
                <dt className="text-[#8391a8]">Location</dt>
                <dd className="mt-1 font-medium">{equipment.location}</dd>
              </div>
              <div>
                <dt className="text-[#8391a8]">Available quantity</dt>
                <dd className="mt-1 font-medium">{equipment.availableQuantity}</dd>
              </div>
              {equipment.condition && (
                <div>
                  <dt className="text-[#8391a8]">Condition</dt>
                  <dd className="mt-1 font-medium">{equipment.condition}</dd>
                </div>
              )}
              {equipment.brand && (
                <div>
                  <dt className="text-[#8391a8]">Brand</dt>
                  <dd className="mt-1 font-medium">{equipment.brand}</dd>
                </div>
              )}
              {equipment.model && (
                <div>
                  <dt className="text-[#8391a8]">Model</dt>
                  <dd className="mt-1 font-medium">{equipment.model}</dd>
                </div>
              )}
            </dl>

            {equipment.terms && (
              <div className="mt-7 border-t border-[#202c42] pt-6">
                <h2 className="font-semibold">Rental terms</h2>
                <p className="mt-2 text-sm leading-6 text-[#a0aec4]">{equipment.terms}</p>
              </div>
            )}

            {equipment.owner && (
              <div className="mt-7 border-t border-[#202c42] pt-6">
                <h2 className="font-semibold">Equipment owner</h2>
                <p className="mt-2 text-sm text-[#a0aec4]">
                  {equipment.owner.name || 'GearGrid owner'}
                  {equipment.owner.email ? ` · ${equipment.owner.email}` : ''}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
