import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAllSessionsApi } from "../../api/user.api";
import { setSessions } from "../../features/sessions/sessionsSlice";
import SessionCard from "../../components/session/SessionCard";
import EmptyState from "../../components/ui/EmptyState";
import { Layers } from "lucide-react";
import { useSessionList, type SortOption } from "../../hooks/useSessionList";
import SessionCategoryBar from "../../components/session/SessionCategoryBar";
import Pagination from "../../components/ui/Pagination";

export default function StudentSessions() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(s => s.sessions.list);

  useEffect(() => {
    getAllSessionsApi().then(res =>
      dispatch(setSessions(res.data.sessions))
    );
  }, [dispatch]);

  const list = useSessionList({ sessions });

  return (
    <div className="min-h-screen px-6 py-8">

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">
        {list.category === "ALL"
          ? "All Sessions"
          : list.category}
      </h1>

      {/* Category */}
      <SessionCategoryBar
        active={list.category}
        onChange={list.setCategory}
      />
      <div className="flex flex-wrap items-end gap-4 mb-6">
        {/* Sort */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">Sort</label>
          <select
            value={list.sort}
            onChange={e => list.setSort(e.target.value as SortOption)}
            className="input w-48 cursor-pointer"
          >
            <option value="latest">Latest</option>
            <option value="priceLowHigh">Price: Low → High</option>
            <option value="priceHighLow">Price: High → Low</option>
          </select>
        </div>

        {/* Min Price */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">Min Price</label>
          <input
            type="number"
            className="input w-32"
            value={list.minPrice ?? ""}
            onChange={e =>
              list.setMinPrice(e.target.value ? Number(e.target.value) : null)
            }
          />
        </div>

        {/* Max Price */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">Max Price</label>
          <input
            type="number"
            className="input w-32"
            value={list.maxPrice ?? ""}
            onChange={e =>
              list.setMaxPrice(e.target.value ? Number(e.target.value) : null)
            }
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={list.resetFilters}
          className="text-red-500 rounded px-3 py-1 border text-sm hover:bg-gray-100 cursor-pointer "
        >
          Reset
        </button>
      </div>

      {/* Content */}
      {list.data.length === 0 ? (
        <EmptyState
          icon={<Layers size={48} />}
          title="No sessions found"
          description="Try changing filters"
        />
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {list.data.map(s => (
              <SessionCard
                key={s._id}
                session={s}
                primaryAction={{
                  label: "View Details",
                  onClick: () =>
                    navigate(`/instructor/session/${s._id}`),
                }}
              />
            ))}
          </div>

          <div className="mt-20">
            <Pagination
            page={list.page}
            totalPages={list.totalPages}
            onChange={list.setPage}
          />
          </div>
        </>
      )}
    </div>
  );
}
