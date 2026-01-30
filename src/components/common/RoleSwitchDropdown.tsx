// common - Reusable UI used inside layouts
import { useState } from "react";
import { Role } from "../../constants/roles";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { performRoleSwitch } from "../../service/user.actions";
import BecomeInstructorModal from "../ui/BecomeInstructorModal";
import { showError, showSuccess } from "../../utils/toast";
import Modal from "../ui/Modal";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
}

interface InstructorPayload {
  role: "instructor";
  instructorProfile: {
    bio: string;
    expertise: string;
  };
  imageFile?: File;
  removePhoto?: boolean;
}

interface StudentPayload {
  role: "student";
}

type RoleSwitchPayload = InstructorPayload | StudentPayload;

const RoleSwitchDropdown = ({ onClose }: Props) => {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [showInstructorModal, setShowInstructorModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // const handleSwitch = async (payload) => {
  const handleSwitch = async (payload: RoleSwitchPayload) => {
    const res = await performRoleSwitch(dispatch, payload);

    if (!res.success) {
      showError("Failed to change role");
      return;
    }

    showSuccess("Role updated successfully 🎉");
    onClose();

    const redirectPath =
      res.role === Role.INSTRUCTOR
        ? "/instructor/profile"
        : "/student/profile";

    navigate(redirectPath, { replace: true });

    // hard refresh (when need a full reset)
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };


  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between px-4 py-2 border-b font-semibold">
        Switch Role
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>

      {/* change the option to dynamic later */}
      {user?.role === Role.STUDENT ? (
        <button
          onClick={() => setShowInstructorModal(true)}
          className="w-full px-4 py-2 text-left hover:bg-gray-100"
        >
          Become Instructor
        </button>
      ) : (
        <button
          onClick={() => setShowConfirmModal(true)}
          className="w-full px-4 py-2 text-left hover:bg-gray-100"
        >
          Switch to Student
        </button>
      )}

      <BecomeInstructorModal
        isOpen={showInstructorModal}
        onCancel={() => setShowInstructorModal(false)}
        onConfirm={handleSwitch}
      />

      <Modal
        isOpen={showConfirmModal}
        title="Switch role"
        description="Are you sure you want to switch back to Student?"
        confirmText="Yes, switch"
        cancelText="Cancel"
        onConfirm={async () => {
          setShowConfirmModal(false);
          await handleSwitch({ role: Role.STUDENT });
        }}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
};

export default RoleSwitchDropdown;

