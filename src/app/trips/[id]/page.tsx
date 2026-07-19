'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchTripById } from '@/lib/trips';
import TripCard from '@/components/TripCard';

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params.id as string;

  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // ১. ট্রিপ ডাটা ফেচিং
  const { data, isLoading, isError } = useQuery({
    queryKey: ['trip', id],
    queryFn: () => fetchTripById(id),
    enabled: !!id,
  });


  const [userId, setUserId] = useState<string>('');

  console.log("Current state userId:", userId);

  useEffect(() => {
    const userDataString: string | null = localStorage.getItem('MapMinds_user');
    console.log("Raw localStorage data:", userDataString);

    if (userDataString) {
      try {
        const currentUser = JSON.parse(userDataString);
        console.log("Parsed currentUser:", currentUser);

        if (currentUser && currentUser.id) {

          setUserId(currentUser.id);
        }
      } catch (err) {
        console.error('Error parsing user data from localStorage:', err);
      }
    }
  }, []);


  const bookingMutation = useMutation({
    mutationFn: async (tripId: string) => {
      const response = await fetch(`https://mapminds-backend-sandy.vercel.app/api/trips?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tripId }),
      });

      if (!response.ok) {
        // যদি ইউজার লগইন না থাকে, ব্যাকএন্ড ৪০০ বা ৪০১ দিতে পারে
        if (response.status === 401) {
          throw new Error('Please login to book this trip');
        }
        throw new Error('Failed to complete the booking. Try again.');
      }

      return response.json();
    },
    onSuccess: () => {
      setIsModalOpen(false);
      // রিকোয়ারমেন্টের ৯ নম্বর পয়েন্ট অনুযায়ী বুকিং ম্যানেজ করার পেজে রিডাইরেক্ট হবে
      router.push('/items/manage');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error: any) => {
      setBookingError(error.message || 'Something went wrong');
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-stone/5">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-md text-neutral-800"></span>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-stone/5">
        <div className="text-center p-8 bg-white border border-neutral-200/60 rounded-[2rem] max-w-sm shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">⚠️ Trip not found</p>
          <Link href="/explore" className="text-xs font-bold uppercase tracking-widest bg-black text-white px-5 py-3 rounded-xl hover:bg-neutral-800 transition-colors">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const { trip, related } = data;
  const images = trip.images && trip.images.length > 0 ? trip.images : ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200'];

  const handleConfirmBooking = () => {
    setBookingError(null);
    bookingMutation.mutate(trip._id || id);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-12 font-body antialiased bg-stone/10 min-h-screen">

      {/* শীর্ষ হেডার ও মেটা ট্যাগ */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black text-white">
            {trip.category}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-600 border border-neutral-200/50">
            ⭐ {trip.rating.toFixed(1)} Rating
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-semibold text-neutral-900 tracking-tighter mb-2 max-w-4xl leading-tight">
          {trip.title}
        </h1>
        <p className="text-neutral-500 text-sm md:text-base font-medium flex items-center gap-1.5">
          <span>📍 {trip.location.city}, {trip.location.country}</span>
          <span className="text-neutral-300">•</span>
          <span>{trip.duration} Days Experience</span>
        </p>
      </div>

      {/* প্রিমিয়াম মোজাইক ইমেজ গ্যালারি গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="md:col-span-3 relative aspect-[16/10] md:h-[480px] rounded-[2.5rem] overflow-hidden shadow-sm border border-neutral-200/40 bg-neutral-100">
          <Image src={images[activeImage]} alt={trip.title} fill priority className="object-cover transition-all duration-500" />
        </div>

        <div className="grid grid-cols-4 md:grid-cols-1 gap-3 md:max-h-[480px] overflow-y-auto pr-1">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActiveImage(i)}
              className={`relative aspect-square md:h-auto md:w-full rounded-2xl overflow-hidden border-2 transition-all duration-200 bg-neutral-50 ${activeImage === i ? 'border-black scale-[0.97] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
            >
              <Image src={img} alt={`${trip.title} thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* মেইন কন্টেন্ট বডি ও বুকিং সাইডবার */}
      <div className="grid lg:grid-cols-3 gap-10 items-start">

        {/* কন্টেন্ট এলাকা */}
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.01)] rounded-[2.5rem] p-6 md:p-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Overview</h2>
            <p className="text-neutral-700 text-sm md:text-base font-medium leading-relaxed whitespace-pre-line">
              {trip.fullDescription}
            </p>
          </section>

          {trip.itinerary && trip.itinerary.length > 0 && (
            <section className="bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.01)] rounded-[2.5rem] p-6 md:p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Planned Itinerary</h2>
              <div className="space-y-4">
                {trip.itinerary.map((day) => (
                  <div key={day.day} className="collapse collapse-plus bg-neutral-50/60 border border-neutral-200/60 rounded-2xl transition-all">
                    <input type="checkbox" defaultChecked={day.day === 1} />
                    <div className="collapse-title text-sm md:text-base font-bold text-neutral-900 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white uppercase tracking-wider">
                        D{day.day}
                      </span>
                      {day.title}
                    </div>
                    <div className="collapse-content">
                      <p className="text-xs md:text-sm text-neutral-600 font-medium leading-relaxed pt-2 pl-10 border-l border-neutral-200">
                        {day.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ডানদিকের স্টিকি বুকিং সিস্টেম উইজেট */}
        <aside className="lg:sticky lg:top-28">
          <div className="bg-white border border-neutral-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-6 md:p-8 space-y-6">

            <div>
              <div className="text-4xl font-semibold font-display tracking-tight text-neutral-950">
                ${trip.price}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-1.5">
                per person · total {trip.duration} days
              </p>
            </div>

            <div className="border-t border-neutral-100 my-4" />

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Key Information</h3>
              <ul className="text-xs font-bold uppercase tracking-wider text-neutral-600 space-y-3.5">
                <li className="flex justify-between items-center bg-neutral-50/80 px-4 py-2.5 rounded-xl border border-neutral-200/30">
                  <span className="text-neutral-400">🌍 Destination</span>
                  <span className="text-neutral-900">{trip.destination || trip.location.country}</span>
                </li>
                <li className="flex justify-between items-center bg-neutral-50/80 px-4 py-2.5 rounded-xl border border-neutral-200/30">
                  <span className="text-neutral-400">📅 Duration</span>
                  <span className="text-neutral-900">{trip.duration} Days</span>
                </li>
              </ul>
            </div>

            {/* বুকিং ও এআই কাস্টমাইজেশন অ্যাকশন এরিয়া */}
            <div className="pt-2 space-y-3">
              {/* মেইন বুকিং বাটন */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-2xl py-4 transition-colors shadow-md"
              >
                Book This Journey
              </button>

              {/* সেকেন্ডারি এআই বাটন */}
              <Link
                href="/assistant"
                className="group w-full flex items-center justify-center gap-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border border-neutral-200/80 text-xs font-bold uppercase tracking-widest rounded-2xl py-3.5 transition-colors"
              >
                Customize with AI Assistant
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-neutral-400">↗</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* ৪. রিয়েল-টাইম ইন্টারেক্টিভ বুকিং কনফার্মেশন মডাল (DaisyUI) */}
      {isModalOpen && (
        <div className="modal modal-open backdrop-blur-xs bg-black/40 flex items-center justify-center z-50 fixed inset-0">
          <div className="modal-box bg-white max-w-md rounded-[2rem] p-8 border border-neutral-200/60 relative shadow-2xl animate-fade-in">
            <h3 className="font-display font-semibold text-xl text-neutral-950 mb-2">Confirm Your Booking</h3>
            <p className="text-sm text-neutral-500 mb-6">
              You are processing a reservation request for <span className="text-neutral-900 font-bold">"{trip.title}"</span>.
            </p>

            {/* বুকিং সামারি কার্ড */}
            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/50 mb-6 space-y-2 text-xs font-bold uppercase tracking-wider text-neutral-600">
              <div className="flex justify-between">
                <span className="text-neutral-400">Package Cost:</span>
                <span className="text-neutral-900">${trip.price} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Duration:</span>
                <span className="text-neutral-900">{trip.duration} Days</span>
              </div>
            </div>

            {/* এরর মেসেজ হ্যান্ডলার */}
            {bookingError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium rounded-xl p-3 mb-4">
                ❌ {bookingError}
              </div>
            )}

            {/* মডাল অ্যাকশন বাটনসমূহ */}
            <div className="modal-action flex gap-3 mt-0">
              <button
                disabled={bookingMutation.isPending}
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-widest rounded-xl py-3.5 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={bookingMutation.isPending}
                onClick={handleConfirmBooking}
                className="flex-1 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl py-3.5 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {bookingMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Processing...
                  </>
                ) : (
                  'Confirm & Pay'
                )}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}