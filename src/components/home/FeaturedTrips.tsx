'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchTrips } from '@/lib/trips';
import TripCard from '@/components/TripCard';
import TripCardSkeleton from '@/components/TripCardSkeleton';

export default function FeaturedTrips() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['trips', 'featured'],
    queryFn: () => fetchTrips({ sort: 'rating', limit: 4, page: 1 }),
  });

  return (
    <section className="bg-white py-24 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">Editor&apos;s Pick</span>
            <h2 className="text-4xl font-display font-medium text-neutral-900 tracking-tight">Featured trips</h2>
            <p className="text-neutral-500 font-medium mt-1">Top-rated destinations picked by our community.</p>
          </div>
          <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 border-b-2 border-neutral-900 pb-1 hover:text-neutral-600 hover:border-neutral-400 transition-colors shrink-0">
            View all destinations →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading && Array.from({ length: 4 }).map((_, i) => <TripCardSkeleton key={i} />)}

          {isError && (
            <div className="col-span-full bg-red-50/50 border border-red-200/60 rounded-3xl p-12 text-center text-red-600 font-medium">
              Couldn&apos;t load featured trips right now. Please check back soon.
            </div>
          )}

          {data?.trips.length === 0 && !isLoading && (
            <div className="col-span-full bg-neutral-50 border border-neutral-200/60 rounded-3xl p-12 text-center text-neutral-500 font-medium">
              No trips available yet. Check back soon as we add new destinations.
            </div>
          )}

          {data?.trips.map((trip) => <TripCard key={trip._id} trip={trip} />)}
        </div>
      </div>
    </section>
  );
}