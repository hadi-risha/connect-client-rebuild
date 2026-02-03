import { Link } from "react-router-dom";
import "../../css/aiChatList.css" 
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getUserAiChatsApi, rateAiApi } from "../../api/user.api";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../../utils/toast";
import AiRatingModal from "../ui/AiRatingModal";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AiChatList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id: activeChatId } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      try {
        const response = await getUserAiChatsApi();
        return response.data.userChats;
        
      } catch (err: unknown) {
        if (err instanceof Error) {
          throw new Error(err.message || "Failed to fetch data");
        }
        throw new Error("Failed to fetch data"); // fallback for non-Error objects
      }
    },
  });

  const submitAiRating = async (rating: number) => {
    try {
      await rateAiApi(rating)
      showSuccess("Thanks for your feedback");
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message || "Failed to submit rating");
      }
      throw new Error("Failed to submit rating");
    }
  };

  return (
    <div className="pl-10 pr-4 h-[650px] text-white flex flex-col aichatList">
      
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center justify-center cursor-pointer mb-6
                 w-10 h-10 rounded-full
                 bg-gray-600 hover:bg-gray-700
                 text-white
                 shadow-md transition"
      aria-label="Go back"
    >
      <ArrowLeft size={20} strokeWidth={2} />
    </button>
    <span className="font-semibold text-xs mb-2.5 title">DASHBOARD</span>
    <Link to="/user/ai/dashboard">Create a new Chat</Link>
    <button onClick={() => setIsModalOpen(true)} className="-ml-26 cursor-pointer">
      How Was Your AI Interaction?
    </button>

    <hr className="border-0 h-0.5 bg-gray-300 opacity-10 rounded-lg my-5" />
    <span className="font-semibold text-xs mb-2.5 title">RECENT CHATS</span>

    <div className="list">
      {isPending && <span>Loading...</span>}

      {error && <span>Something went wrong!</span>}

      {!isPending && !error && data?.length === 0 && (
        <div className="empty-state">
          <p>No recent chats yet</p>
        </div>
      )}

      {!isPending &&
      !error &&
      data?.length > 0 &&
      [...data] 
        .sort((a, b) => {
          const dateA = new Date(a.updatedAt || a.createdAt).getTime();
          const dateB = new Date(b.updatedAt || b.createdAt).getTime();
          return dateB - dateA; 
        })
        .map((chat) => (
          <Link
            key={chat._id}
            to={`/user/ai/dashboard/chats/${chat._id}`}
            className={`block px-3 py-2 rounded-lg transition ${
              activeChatId === chat._id
                ? "bg-white/20 font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            {chat.title}
          </Link>
        ))}
    </div>

    {/* rating modal */}
    <AiRatingModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={submitAiRating}
    />
    </div>
  );
};

export default AiChatList;
