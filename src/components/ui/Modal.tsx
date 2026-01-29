import React from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  children?: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title = "Confirmation",
  description,
  confirmText = "OK",
  cancelText,
  onConfirm,
  onCancel,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#051e30] rounded-lg w-[90%] max-w-md p-6 shadow-xl">
        <h2 className="text-white text-lg font-semibold mb-2">
          {title}
        </h2>

        {description && (
          <p className="text-gray-300 text-sm mb-6">
            {description}
          </p>
        )}

        {/* optional body */}
        {children && (
          <div className="mb-6">
            {children}
          </div>
        )}

        <div className="flex justify-end gap-3">
          {/* render cancel button only if cancelText exists */}
          {cancelText && onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md text-gray-300 border border-gray-500 hover:bg-gray-700 cursor-pointer"
            >
              {cancelText}
            </button>
          )}


          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
