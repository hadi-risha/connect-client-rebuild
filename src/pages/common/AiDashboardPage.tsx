import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import chat from "../../images/aiChat.png"
import analyzeImg from "../../images/aiImage.png";
import code from "../../images/aiCode.png";
import { aiChatApi } from "../../api/user.api";

const AiDashboardPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (text: string) => {
      try {
        const response = await aiChatApi(text)
        return response.data.result.chatId
      } catch (error) {
        console.log("error while creating new chat ", error);
      }
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/user/ai/dashboard/chats/${id}`); 
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    mutation.mutate(text);
  }; 

  return (
    <div className="h-[670px] flex flex-col items-center dashboardPage">
      <div className="flex-1 flex flex-col items-center justify-center w-1/2 gap-12 texts">
        <div className="-mt-20 flex items-center gap-5 opacity-20 logo">
          <h1
            className="text-4xl font-bold"
            style={{
              background: "linear-gradient(to right, #217bfe, #e55571)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text", // For Safari support
              color: "transparent",
            }}
          >
            CONNECT AI
          </h1>
        </div>

        <div className="w-full text-white flex items-center justify-between gap-12 options">
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-5 border border-[#555] rounded-2xl option">
            <img src={chat} alt="" className="w-10 h-10 object-cover" />
            <span>Create a New Chat</span>
          </div>
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-5 border border-[#555] rounded-2xl option">
            <img src={analyzeImg} alt="" className="w-10 h-10 object-cover" />
            <span>Analyze Images</span>
          </div>
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-5 border border-[#555] rounded-2xl option">
            <img src={code} alt="" className="w-10 h-10 object-cover" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>

      <div className="mb-4 mt-auto w-1/2 bg-[#2c2937] rounded-2xl flex formContainer">
        <form
          onSubmit={handleSubmit}
          className="p-3 w-full h-full flex items-center justify-between "
        >
          <input
            type="text"
            name="text"
            placeholder="Ask me anything..."
            className="flex-1 p-2 bg-[#2c2937] border-0 outline-none text-[#ececec] placeholder:text-[#6f6f6f] placeholder:text-sm"
          />
          <button className="p-2.5 mr-5 w-9 h-9 bg-[#605e68] rounded-full cursor-pointer flex items-center justify-center">
            <span className="text-[#2c2937] text-xl transform -rotate-90">
              ➔
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiDashboardPage;
