"use client";

import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const posthog = usePostHog();

  useEffect(() => {
    // Capture the error in PostHog
    if (posthog) {
      posthog.capture("$exception", {
        $exception_type: error.name,
        $exception_message: error.message,
        $exception_stack_trace_raw: error.stack,
        $exception_handled: false,
      });
    }
  }, [error, posthog]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-white dark:bg-zinc-950 rounded-lg border border-red-200 dark:border-red-900/50">
      <div className="p-3 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-full mb-4">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">Something went wrong!</h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">
        An unexpected error occurred. We've logged this issue in PostHog and are looking into it.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-medium text-sm"
      >
        Try again
      </button>
    </div>
  );
}
