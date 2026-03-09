"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode, useEffect } from "react";

export function CSPostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_POSTHOG_KEY
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
        person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
        capture_pageview: false, // We handle this manually in PostHogPageView
        capture_pageleave: true, // Record page leaves
        autocapture: {
          css_selector_allowlist: ["[data-ph-capture]"], // Optional: restrict what autocapture grabs, or remove to capture all
        },
      });

      // Global error tracking for Next.js 14 Client Side errors that escape React
      window.addEventListener("error", (event) => {
        posthog.capture("$exception", {
          $exception_type: "WindowError",
          $exception_message: event.message,
          $exception_handled: false,
        });
      });

      window.addEventListener("unhandledrejection", (event) => {
        posthog.capture("$exception", {
          $exception_type: "UnhandledPromiseRejection",
          $exception_message: event.reason?.message || String(event.reason),
          $exception_handled: false,
        });
      });
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
