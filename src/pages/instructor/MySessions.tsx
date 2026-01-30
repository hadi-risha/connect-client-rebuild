import SessionCard from "../../components/session/SessionCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import EmptyState from "../../components/ui/EmptyState";
import { Archive, Edit, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { getMySessionsApi, toggleSessionArchiveApi } from "../../api/instructor.api";
import { setSessions } from "../../features/sessions/sessionsSlice";
import { useSessionList, type SortOption } from "../../hooks/useSessionList";
import Pagination from "../../components/ui/Pagination";
import { showError, showSuccess } from "../../utils/toast";
import Modal from "../../components/ui/Modal";

const MySessions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(s => s.sessions.list);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  useEffect(() => {
    getMySessionsApi().then(res =>
      dispatch(setSessions(res.data.sessions))
    );
  }, [dispatch]);

  const list = useSessionList({ sessions });

  const handleEditSession = (sessionId: string) => {
    navigate(`/instructor/edit-session/${sessionId}`);
  };

  const handleArchiveClick = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setIsArchiveModalOpen(true);
  };

  const confirmArchiveSession = async () => {
    if (!selectedSessionId) return;

    try {
      await toggleSessionArchiveApi(selectedSessionId, true);
      dispatch(
        setSessions(
          sessions.filter(s => s._id !== selectedSessionId)
        )
      );

      showSuccess("Session archived successfully");
    } catch (error) {
      console.log("Failed to archive session", error)
      showError("Failed to archive session");
    } finally {
      setIsArchiveModalOpen(false);
      setSelectedSessionId(null);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">
        My Sessions
      </h1>

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

                secondaryAction={{
                  icon: <Edit size={20} />,
                  title: "Edit session",
                  onClick: () => s._id && handleEditSession(s._id)

                }}

                extraAction={{
                  icon: <Archive size={20} />,
                  title: "Archive session",
                  onClick: () => s._id && handleArchiveClick(s._id)
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

      <Modal
        isOpen={isArchiveModalOpen}
        title="Archive Session"
        description="Are you sure you want to archive this session? You can restore it later from Archived Sessions."
        confirmText="Archive"
        cancelText="Cancel"
        onConfirm={confirmArchiveSession}
        onCancel={() => {
          setIsArchiveModalOpen(false);
          setSelectedSessionId(null);
        }}
      />
    </div>
  );
};

export default MySessions;
