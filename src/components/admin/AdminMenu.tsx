import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import { showSuccess, showError } from "../../utils/toast";
import { performLogout } from "../../service/auth.actions";
import { useAppSelector } from "../../hooks/redux";
import UnisexAvatar from "../../icons/UnisexAvatar";

const AdminMenu = () => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const displayName = user?.name?.split(" ")[0] || "User";
  const displayImage = user?.profilePicture?.url

  // close on outside click + ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setShowLogoutModal(false);
      }
    };

    if (open || showLogoutModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, showLogoutModal]);

  const onLogoutConfirm = async () => {
    setShowLogoutModal(false);
    setOpen(false);

    const result = await performLogout(dispatch);

    if (result.success) {
      showSuccess("Logged out successfully");
    } else {
      showError("Session ended");
    }
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      <div ref={menuRef} className="relative">
        {/* trigger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          
          {displayImage ? (
            <img
              src={displayImage}
              className="w-8 h-8 rounded-full border border-blue-400"
              alt="Profile"
            />
          ) : (
            <UnisexAvatar size={40} />
          ) }

          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-medium text-white">
                {displayName}
            </span>

            <span
                className={`text-[11px] font-semibold uppercase tracking-wide ${
                user?.role === "instructor"
                    ? "text-blue-400"
                    : "text-green-400"
                }`}
            >
                Admin
            </span>
          </div>

          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded-md shadow-lg overflow-hidden z-40">
            <button
              onClick={() => {
                setOpen(false);
                setShowLogoutModal(true);
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* logout modal */}
      <Modal
        isOpen={showLogoutModal}
        title="Logout confirmation"
        description="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={onLogoutConfirm}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default AdminMenu;


