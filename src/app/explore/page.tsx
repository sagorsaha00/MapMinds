'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTrips } from '@/lib/trips';
import TripCard from '@/components/TripCard';
import TripCardSkeleton from '@/components/TripCardSkeleton';

const categories = ['All', 'Beach', 'Mountain', 'City', 'Adventure', 'Cultural', 'Wildlife'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['trips', { search, category, minPrice, maxPrice, sort, page }],
    queryFn: () =>
      fetchTrips({
        search: search || undefined,
        category: category !== 'All' ? category : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sort: sort !== 'newest' ? sort : undefined,
        page,
        limit: 8,
      }),
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-12 font-body antialiased bg-stone/20 min-h-screen">

      {/* ছবির মতো লাক্সারি সেকশন হেডার */}
      <div className="mb-12 max-w-xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-4 shadow-sm">
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tighter mb-3">
          Explore Trips
        </h1>
        <p className="text-neutral-500 text-sm md:text-base font-medium leading-relaxed">
          Search, filter, and sort through every tailor-made destination planned exclusively around your style.
        </p>
      </div>

      {/* প্রিমিয়াম ফিল্টার ও সার্চ কন্ট্রোল প্যানেল */}
      <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-6 mb-12 space-y-6">

        {/* টপ রো: সার্চ বার, প্রাইস ফিল্টার এবং সর্টিং ড্রপডাউন */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center">

          {/* সার্চ ইনপুট (5 Columns Spanned) */}
          <form onSubmit={handleSearchSubmit} className="lg:col-span-5 flex items-center bg-neutral-50 border border-neutral-200/70 rounded-full p-1.5 focus-within:border-neutral-900 transition-colors">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Where do you want to go?"
              className="flex-1 bg-transparent px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none w-full font-medium"
            />
            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-full px-6 py-2.5 transition-colors shadow-sm"
            >
              Search
            </button>
          </form>

          {/* প্রাইস রেঞ্জ (4 Columns Spanned) */}
          <div className="lg:col-span-4 flex items-center gap-2 bg-neutral-50 border border-neutral-200/70 rounded-full p-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 pl-3">Price</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
              placeholder="Min $"
              className="w-full bg-transparent px-2 py-1.5 text-sm text-neutral-800 font-semibold focus:outline-none placeholder:text-neutral-300 text-center border-r border-neutral-200/60"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
              placeholder="Max $"
              className="w-full bg-transparent px-2 py-1.5 text-sm text-neutral-800 font-semibold focus:outline-none placeholder:text-neutral-300 text-center"
            />
          </div>

          {/* সর্টিং অপশন (3 Columns Spanned) */}
          <div className="lg:col-span-3 bg-neutral-50 border border-neutral-200/70 rounded-full px-4 py-3 flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 shrink-0">Sort By</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-sm font-bold text-neutral-800 focus:outline-none w-full cursor-pointer appearance-none"
            >
              {sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {/* বটম রো: ছবির মতো প্রিমিয়াম ক্যাটাগরি পিলস (Pills Navigation) */}
        <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((c) => {
            const isActive = category === c;
            return (
              <button
                key={c}
                onClick={() => { setCategory(c); setPage(1); }}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all shrink-0 border ${isActive
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-md shadow-neutral-900/10'
                  : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-neutral-800'
                  }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* ট্রিপস গ্রিড লেআউট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
        {isLoading && Array.from({ length: 8 }).map((_, i) => <TripCardSkeleton key={i} />)}

        {isError && (
          <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-neutral-200/60">
            <p className="text-neutral-500 font-medium text-sm">
              Couldn&apos;t load trips. Please try again shortly.
            </p>
          </div>
        )}

        {!isLoading && data?.trips.length === 0 && (
          <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-neutral-200/60">
            <p className="text-neutral-500 font-medium text-sm">
              No trips match your filters. Try adjusting search or price range.
            </p>
          </div>
        )}

        {data?.trips.map((trip) => <TripCard key={trip._id} trip={trip} />)}
      </div>

      {/* প্রিমিয়াম ডিজাইনড পেজিনেশন */}
      {data && data.pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-6 pt-6 border-t border-neutral-200/60">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border border-neutral-200 bg-white text-neutral-700 disabled:opacity-40 disabled:hover:bg-white hover:bg-neutral-50 transition-colors shadow-sm"
          >
            ← Previous
          </button>

          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 bg-neutral-100 px-4 py-2 rounded-full">
            Page <span className="text-neutral-900">{data.pagination.page}</span> of {data.pagination.pages}
          </span>

          <button
            disabled={page === data.pagination.pages}
            onClick={() => setPage((p) => Math.min(data.pagination.pages, p + 1))}
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border border-neutral-200 bg-white text-neutral-700 disabled:opacity-40 disabled:hover:bg-white hover:bg-neutral-50 transition-colors shadow-sm"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}