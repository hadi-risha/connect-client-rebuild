import { Layers, RotateCcw } from "lucide-react";
import SessionCard from "../../components/session/SessionCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import EmptyState from "../../components/ui/EmptyState";
import { getMyArchivedSessionsApi, toggleSessionArchiveApi } from "../../api/instructor.api";
import { useEffect, useState } from "react";
import { setSessions } from "../../features/sessions/sessionsSlice";
import { useSessionList } from "../../hooks/useSessionList";
import Pagination from "../../components/ui/Pagination";
import { showError, showSuccess } from "../../utils/toast";
import Modal from "../../components/ui/Modal";

const ArchivedSessions = () => {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(s => s.sessions.list);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    
  useEffect(() => {
    getMyArchivedSessionsApi().then(res =>
      dispatch(setSessions(res.data.sessions))
    );
  }, [dispatch]);

  const list = useSessionList({ sessions });
  
  const handleRestoreClick = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setIsRestoreModalOpen(true);
  };

  const confirmRestoreSession = async () => {
    if (!selectedSessionId) return;

    try {
      await toggleSessionArchiveApi(selectedSessionId, false);
      dispatch(
        setSessions(
          sessions.filter(s => s._id !== selectedSessionId)
        )
      );

      showSuccess("Session restored successfully");
    } catch (error) {
      console.log("err in restore session", error);
      showError("Failed to restore session");
    } finally {
      setIsRestoreModalOpen(false);
      setSelectedSessionId(null);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">
        Archived Sessions
      </h1>

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
                extraAction={{
                  icon: <RotateCcw size={20} />,
                  title: "Restore session",
                  onClick: () => s._id && handleRestoreClick(s._id)
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
        isOpen={isRestoreModalOpen}
        title="Restore Session"
        description="Are you sure you want to restore this session? It will be moved back to My Sessions."
        confirmText="Restore"
        cancelText="Cancel"
        onConfirm={confirmRestoreSession}
        onCancel={() => {
          setIsRestoreModalOpen(false);
          setSelectedSessionId(null);
        }}
      />
    </div>
  );
};

export default ArchivedSessions;
