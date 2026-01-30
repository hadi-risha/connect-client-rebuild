import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import SessionCard from "../../components/session/SessionCard";
import EmptyState from "../../components/ui/EmptyState";
import Modal from "../../components/ui/Modal";
import { Heart } from "lucide-react";
import { toggleWishlistApi } from "../../api/student.api";
import { updateSession } from "../../features/sessions/sessionsSlice";
import { showError, showInfo } from "../../utils/toast";
import type { Session } from "../../features/session/session.types";
import { getErrorMessage } from "../../utils/getErrorMessage";

export default function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(s => s.sessions.list);
  const wishlistSessions = sessions.filter(s => s.isWishlisted);
  // const [selectedSession, setSelectedSession] = useState<any>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);

  const handleRemoveClick = (session: Session) => {
    setSelectedSession(session);
    setOpen(true);
  };

  const confirmRemove = async () => {
    if (!selectedSession) return;

    try {
      await toggleWishlistApi(selectedSession._id!);

      dispatch(
        updateSession({
          ...selectedSession,
          isWishlisted: false,
        })
      );
      showInfo("Removed from wishlist");
    } catch (err: unknown) {
      showError(getErrorMessage(err) || "Failed to remove from wishlist");
    } finally {
      setOpen(false);
      setSelectedSession(null);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {wishlistSessions.length === 0 ? (
        <EmptyState
          icon={<Heart size={48} />}
          title="Your wishlist is empty"
          description="Save sessions you like to find them later"
        />
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {wishlistSessions.map(s => (
            <SessionCard
              key={s._id}
              session={s}
              primaryAction={{
                label: "Book",
                onClick: () =>
                  navigate(`/student/session/book/${s._id}`),
              }}
              extraAction={{
                icon: (
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                ),
                title: "Remove from wishlist",
                onClick: () => handleRemoveClick(s),
              }}
            />
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={open}
        title="Remove from wishlist?"
        description="This session will be removed from your wishlist."
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={confirmRemove}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}
