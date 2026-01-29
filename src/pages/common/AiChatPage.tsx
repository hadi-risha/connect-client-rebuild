import "../../css/aiChatPage.css"
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import NewPrompt from "../../components/common/AiNewPrompt";
import { getAiChatApi } from "../../api/user.api";
import {config} from "../../config/index";


const AiChatPage = () => {
  const { id: chatId } = useParams<{ id: string }>();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    enabled: !!chatId,
    queryFn: async () => {
      try {
        const response = await getAiChatApi(chatId)
        return response.data.chat; // return the data from the response
      } catch (err) {
        throw new Error(err.message || "Failed to fetch data");
      }
    },
  });

  return (
    <div className="text-white aiChatPage">
      <div className="wrapper">
        <div className="chat">

          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            :
            data?.history?.map((message, i) => (
              <div key={i}>
                {message.img && (
                  <IKImage
                    urlEndpoint={config.imageKit.endPoint}
                    path={message.img}
                    height="300"
                    width="400"
                    transformation={[{ height: 300, width: 400 }]}
                    loading="lazy"
                    lqip={{ active: true, quality: 20 }}
                  />
                )}

                <div className={message.role === "user" ? "message user" : "message"}>
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              </div>
            ))

              }

          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default AiChatPage;
