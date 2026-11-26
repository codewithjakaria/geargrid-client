'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type FavoriteListResponse = {
  favorites: Array<{
    equipment: {
      _id: string;
    };
  }>;
};

type ApiMessage = {
  message?: string;
};

type FavoriteButtonProps = {
  equipmentId: string;
};

export function FavoriteButton({ equipmentId }: FavoriteButtonProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadFavoriteStatus() {
      const token = localStorage.getItem('geargridToken');
      if (!token) return;

      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

      try {
        const response = await fetch(`${apiUrl}/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });

        if (!response.ok) return;

        const result: FavoriteListResponse = await response.json();
        const saved = result.favorites.some(
          (favorite) => favorite.equipment._id === equipmentId,
        );
        setIsFavorite(saved);
      } catch {
        // The button can still add a favorite if this first check fails.
      }
    }

    void loadFavoriteStatus();
  }, [equipmentId]);

  async function toggleFavorite() {
    const token = localStorage.getItem('geargridToken');

    if (!token) {
      router.replace('/login');
      return;
    }

    setMessage('');
    setError('');
    setIsSaving(true);

    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      let response: Response;

      if (isFavorite) {
        response = await fetch(`${apiUrl}/favorites/${equipmentId}`, {
          method: 'DELETE',
          headers,
        });
      } else {
        response = await fetch(`${apiUrl}/favorites`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ equipmentId }),
        });
      }

      const result: ApiMessage = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('geargridToken');
        router.replace('/login');
        return;
      }

      if (!response.ok) {
        setError(result.message || 'Could not update your favorites.');
        setIsSaving(false);
        return;
      }

      setIsFavorite(!isFavorite);
      setMessage(result.message || 'Your favorites were updated.');
      setIsSaving(false);
    } catch {
      setError('Could not connect to GearGrid. Check that the server is running.');
      setIsSaving(false);
    }
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={toggleFavorite}
        disabled={isSaving}
        aria-pressed={isFavorite}
        className="rounded-lg border border-[#ffad00] px-4 py-2.5 text-sm font-semibold text-[#ffad00] transition-colors hover:bg-[#ffad00]/10 disabled:cursor-wait disabled:opacity-70"
      >
        {isSaving
          ? 'Updating favorites...'
          : isFavorite
            ? '♥ Remove from favorites'
            : '♡ Add to favorites'}
      </button>
      {message && <p role="status" className="mt-3 text-sm text-emerald-300">{message}</p>}
      {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
    </div>
  );
}
