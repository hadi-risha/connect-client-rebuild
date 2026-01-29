import { useEffect, useState } from "react";
import { showInfo } from "../../utils/toast"; 

interface AiRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => Promise<void>;
}

const AiRatingModal = ({ isOpen, onClose, onSubmit }: AiRatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  //reset state whenever modal closes
  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      showInfo("Please select a rating");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(rating);
      onClose(); 
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Rate Your AI Interaction
        </h2>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-4xl transition cursor-pointer ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            type="button"
            className="px-4 py-2 rounded-full bg-gray-600 hover:bg-gray-500 text-white cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 rounded-full text-white cursor-pointer ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiRatingModal;
