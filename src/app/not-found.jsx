'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 tracking-tight">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
        Page Not Found
      </h2>
      <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white font-medium shadow-sm transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium border border-gray-200 dark:border-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
}
