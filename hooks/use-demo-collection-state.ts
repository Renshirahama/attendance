"use client";

import { useEffect, useMemo, useState } from "react";

type DemoCollectionOptions = {
  readonly loadingMs?: number;
  readonly errorMessage?: string;
};

type DemoCollectionState<T> = {
  readonly items: readonly T[];
  readonly isLoading: boolean;
  readonly isEmpty: boolean;
  readonly error: string | null;
};

export function useDemoCollectionState<T>(
  items: readonly T[],
  options: DemoCollectionOptions = {},
): DemoCollectionState<T> {
  const { loadingMs = 700, errorMessage = "データの読み込みに失敗しました" } =
    options;
  const [isLoading, setIsLoading] = useState(true);
  const [forcedState, setForcedState] = useState<string | null>(null);
  const [hasResolvedSearch, setHasResolvedSearch] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIsLoading(false);
    }, loadingMs);

    return () => window.clearTimeout(timerId);
  }, [loadingMs]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setForcedState(searchParams.get("state"));
    setHasResolvedSearch(true);
  }, []);

  return useMemo(() => {
    if (!hasResolvedSearch || forcedState === "loading") {
      return {
        items: [],
        isLoading: true,
        isEmpty: false,
        error: null,
      };
    }

    if (forcedState === "error") {
      return {
        items: [],
        isLoading: false,
        isEmpty: false,
        error: errorMessage,
      };
    }

    if (forcedState === "empty") {
      return {
        items: [],
        isLoading: false,
        isEmpty: true,
        error: null,
      };
    }

    if (isLoading) {
      return {
        items: [],
        isLoading: true,
        isEmpty: false,
        error: null,
      };
    }

    const resolvedItems = items;

    return {
      items: resolvedItems,
      isLoading: false,
      isEmpty: resolvedItems.length === 0,
      error: null,
    };
  }, [errorMessage, forcedState, hasResolvedSearch, isLoading, items]);
}
