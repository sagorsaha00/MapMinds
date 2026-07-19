export default function TripCardSkeleton() {
  return (
    <div className="card overflow-hidden h-full animate-pulse">
      <div className="w-full h-48 bg-neutral-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-neutral-200 rounded w-3/4" />
        <div className="h-4 bg-neutral-200 rounded w-full" />
        <div className="h-4 bg-neutral-200 rounded w-2/3" />
        <div className="h-10 bg-neutral-200 rounded mt-4" />
      </div>
    </div>
  );
}
