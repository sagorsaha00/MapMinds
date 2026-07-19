import Link from 'next/link';
import Image from 'next/image';
import { Trip } from '@/types';

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="card flex flex-col overflow-hidden h-full">
      <div className="relative w-full h-48">
        <Image
          src={trip.images[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'}
          alt={trip.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {trip.category}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-lg text-neutral-900 mb-1 line-clamp-1">{trip.title}</h3>
        <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{trip.shortDescription}</p>
        <div className="flex items-center gap-3 text-sm text-neutral-600 mb-4">
          <span>📍 {trip.location.city}, {trip.location.country}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-primary">${trip.price}</span>
            <span className="text-xs text-neutral-500"> / {trip.duration}d</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-accent-dark">
            ⭐ {trip.rating.toFixed(1)}
          </div>
        </div>
        <Link href={`/trips/${trip._id}`} className="btn-primary text-center mt-4 w-full">
          View Details
        </Link>
      </div>
    </div>
  );
}
