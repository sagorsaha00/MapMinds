import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <div className="text-6xl mb-4">🧭</div>
      <h1 className="text-3xl font-bold text-neutral-900 mb-3">Looks like you&apos;ve wandered off the map</h1>
      <p className="text-neutral-600 mb-8">We couldn&apos;t find the page you were looking for.</p>
      <Link href="/" className="btn-primary inline-block">Back to home</Link>
    </div>
  );
}
