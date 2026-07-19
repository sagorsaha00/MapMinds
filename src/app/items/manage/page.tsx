'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchMyTrips, deleteTripById } from '@/lib/trips';

function ManageItemsContent() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);


  useEffect(() => {
    const userDataString = localStorage.getItem('MapMinds_user');
    if (!userDataString) {
      setLocalError('User session not found. Please log in again.');
      return;
    }
    try {
      const userData = JSON.parse(userDataString);
      if (userData.id) {
        setUserId(userData.id);
      } else {
        setLocalError('User ID missing from session.');
      }
    } catch (parseErr) {
      setLocalError('Invalid user session. Please log in again.');
    }
  }, []);

  // রিঅ্যাক্ট কুয়েরি দিয়ে ডাটা ফেচ করা (শুধুমাত্র userId পাওয়ার পর ট্র্রিগার হবে)
  const { data: trips, isLoading, isError } = useQuery({
    queryKey: ['trips', 'mine', userId],
    queryFn: () => fetchMyTrips(userId!),
    enabled: !!userId, // userId না পাওয়া পর্যন্ত কুয়েরি অফ থাকবে
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this trip? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await deleteTripById(id);
      queryClient.invalidateQueries({ queryKey: ['trips', 'mine', userId] });
    } catch (err) {
      alert('Failed to delete the trip.');
    } finally {
      setDeletingId(null);
    }
  };

  const chartData = (trips || []).map((t: any) => ({
    name: t.title.length > 15 ? `${t.title.slice(0, 15)}…` : t.title,
    price: t.price,
  }));

  if (localError) {
    return (
      <div className="min-h-screen bg-stone/20 flex items-center justify-center p-6">
        <div className="bg-white border border-neutral-200 p-8 rounded-[2rem] shadow-sm text-center max-w-sm">
          <p className="text-red-600 font-semibold mb-4">⚠️ {localError}</p>
          <Link href="/login" className="inline-block bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full px-6 py-3">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-16 font-body antialiased bg-stone/20 min-h-screen">

      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-3 shadow-sm">
            📊 Trip Analytics
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tighter mb-2">
            Manage your trips
          </h1>
          <p className="text-neutral-500 text-sm md:text-base font-medium">
            View, track expenses, and manage the itineraries you have shared.
          </p>
        </div>
        <Link
          href="/items/add"
          className="group inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-full px-6 py-4 transition-colors shadow-md whitespace-nowrap self-start sm:self-center"
        >
          Add New Trip <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
        </Link>
      </div>

      {isLoading && (
        <div className="bg-white border border-neutral-200/80 shadow-sm rounded-[2.5rem] p-12 text-center text-neutral-400 font-medium">
          Loading your custom itineraries...
        </div>
      )}

      {isError && (
        <div className="bg-white border border-red-100 shadow-sm rounded-[2.5rem] p-12 text-center text-red-500 font-medium">
          ⚠️ Couldn&apos;t load your trips. Please refresh or try again.
        </div>
      )}

      {!isLoading && trips?.length === 0 && (
        <div className="bg-white border border-neutral-200/80 shadow-sm rounded-[2.5rem] p-12 text-center text-neutral-500 font-medium">
          You haven&apos;t published any trips yet.{' '}
          <Link href="/items/add" className="text-black font-bold underline pl-1">Add your first trip</Link>
        </div>
      )}

      {trips && trips.length > 0 && (
        <div className="space-y-10">

          {/* 📊 লাক্সারি চার্ট কার্ড */}
          <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.01)] rounded-[2.5rem] p-6 md:p-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-6">Price comparison across your trips</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#737373', fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#737373', fontWeight: 500 }} tickFormatter={(v) => `$${v}`} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#000', borderRadius: '16px', border: 'none', padding: '10px 14px' }}
                  labelStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold', fontFamily: 'sans-serif' }}
                  itemStyle={{ color: '#a3a3a3', fontSize: '12px' }}
                  formatter={(value: number) => [`$${value}`, 'Price']}
                />
                <Bar dataKey="price" fill="#000000" radius={[10, 10, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 📋 মডার্ন ডেটা টেবিল */}
          <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.01)] rounded-[2.5rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-50/50">
                    <th className="px-6 py-4 font-bold">Trip Details</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold">Budget</th>
                    <th className="px-6 py-4 font-bold">Duration</th>
                    <th className="px-6 py-4 font-bold">Rating</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100/70">
                  {trips.map((trip: any) => (
                    <tr key={trip._id} className="hover:bg-neutral-50/30 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-semibold text-neutral-900 text-base tracking-tight">{trip.title}</div>
                        <div className="text-neutral-400 text-xs font-medium mt-0.5">{trip.location.city}, {trip.location.country}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800">
                          {trip.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-neutral-900">${trip.price}</td>
                      <td className="px-6 py-5 font-medium text-neutral-600">{trip.duration} Days</td>
                      <td className="px-6 py-5 font-bold text-amber-500">★ {trip.rating ? trip.rating.toFixed(1) : '5.0'}</td>
                      <td className="px-6 py-5 text-right whitespace-nowrap space-x-2">
                        <Link
                          href={`/trips/${trip._id}`}
                          className="inline-flex px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(trip._id)}
                          disabled={deletingId === trip._id}
                          className="inline-flex px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600 border border-red-100 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                        >
                          {deletingId === trip._id ? '...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}


export default function ManageItemsPage() {
  return <ManageItemsContent />;
}