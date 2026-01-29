// use it for both users all sessions(Category filter, Sorting, pagination counts and data)
import { useMemo, useState } from "react";
import type { Session } from "../features/session/session.types";
import type { SessionCategory } from "../constants/sessionCategory";

export type SortOption =
  | "latest"
  | "priceLowHigh"
  | "priceHighLow";

interface Params {
  sessions: Session[];
  pageSize?: number;
}

export function useSessionList({ sessions, pageSize = 6 }: Params) {
  // filters
  const [category, setCategory] =
    useState<SessionCategory | "ALL">("ALL");

  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const [sort, setSort] = useState<SortOption>("latest");
  const [page, setPage] = useState(1);

  // reset everything
  const resetFilters = () => {
    setCategory("ALL");
    setMinPrice(null);
    setMaxPrice(null);
    setSort("latest");
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...sessions];

    // category
    if (category !== "ALL") {
      list = list.filter(s => s.category === category);
    }

    // price filters
    if (minPrice !== null) {
      list = list.filter(s => s.fees >= minPrice);
    }

    if (maxPrice !== null) {
      list = list.filter(s => s.fees <= maxPrice);
    }

    // sorting
    if (sort === "priceLowHigh") {
      list.sort((a, b) => a.fees - b.fees);
    }

    if (sort === "priceHighLow") {
      list.sort((a, b) => b.fees - a.fees);
    }

    if (sort === "latest") {
      list.reverse();
    }

    return list;
  }, [sessions, category, minPrice, maxPrice, sort]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  return {
    data: paginated,

    // states
    category,
    minPrice,
    maxPrice,
    sort,
    page,

    // setters
    setCategory,
    setMinPrice,
    setMaxPrice,
    setSort,
    setPage,

    // meta
    totalPages,
    totalCount: filtered.length,

    // utils
    resetFilters,
  };
}

