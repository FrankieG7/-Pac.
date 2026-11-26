"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0D0B0F] text-white flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-4">
          <h2 className="text-xl font-bold">Application Error</h2>
          <p className="text-sm text-gray-400">
            {error.message || "A critical application error occurred."}
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-2xl bg-[#6272FF] hover:opacity-90 text-white text-sm font-semibold"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
