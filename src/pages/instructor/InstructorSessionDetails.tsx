import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Archive, CalendarCheck } from "lucide-react";
import { getSessionByIdApi } from "../../api/user.api";
import { toggleSessionArchiveApi } from "../../api/instructor.api";
import { showError, showSuccess } from "../../utils/toast";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  clearSession,
  setLoading,
  setSession,
} from "../../features/session/sessionSlice";

import Modal from "../../components/ui/Modal";
import EmptyState from "../../components/ui/EmptyState";

const InstructorSessionDetails = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [archiving, setArchiving] = useState(false);

  const { current: session, loading } = useAppSelector(
    (state) => state.session
  );

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      dispatch(setLoading(true));
      try {
        const res = await getSessionByIdApi(sessionId);
        dispatch(setSession({ session: res.data.session }));
      } catch {
        showError("Failed to fetch session");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSession();

    return () => {
      dispatch(clearSession());
    };
  }, [dispatch, sessionId]);

  const handleEdit = () => {
    if (!session) return;
    navigate(`/instructor/edit-session/${session._id}`);
  };

  const handleArchive = async () => {
    if (!session) return;

    setArchiving(true);
    try {
      await toggleSessionArchiveApi(session._id, true);
      showSuccess("Session archived successfully");
      navigate(-1);
    } catch {
      showError("Failed to archive session");
    } finally {
      setArchiving(false);
      setShowArchiveModal(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!session) {
    return (
      <EmptyState
        icon={<CalendarCheck size={48} />}
        title="Session not found"
        description="This session may have been archived or deleted."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow p-6 space-y-6">

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            onClick={() => setShowArchiveModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
          >
            <Archive size={16} />
            Archive
          </button>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* IMAGE */}
          {session.coverPhoto?.url && (
            <div className="w-full h-[28rem] rounded-xl overflow-hidden">
              <img
                src={session.coverPhoto.url}
                alt={session.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* DETAILS */}
          <div className="flex flex-col h-full space-y-4">
            <h1 className="text-2xl font-semibold">
              {session.title}
            </h1>

            <p className="text-gray-600">
              {session.introduction}
            </p>

            <p className="text-gray-600">
              {session.description}
            </p>

            <div className="flex gap-6 text-sm text-gray-700">
              <p>
                <strong>Duration:</strong> {session.duration} mins
              </p>
              <p>
                <strong>Fees:</strong> ₹{session.fees}
              </p>
            </div>

            {session?.bulletPoints?.length > 0 && (
              <ul className="space-y-2">
                {session.bulletPoints.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-500">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto flex justify-center">
              <button
                onClick={() => navigate(-1)}
                className="cursor-pointer bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ARCHIVE CONFIRMATION MODAL */}
      <Modal
        isOpen={showArchiveModal}
        title="Archive Session"
        description="Are you sure you want to archive this session? You can restore it later from Archived Sessions."
        confirmText={archiving ? "Archiving..." : "Archive"}
        cancelText="Cancel"
        onConfirm={handleArchive}
        onCancel={() => setShowArchiveModal(false)}
      />
    </div>
  );
};

export default InstructorSessionDetails;
