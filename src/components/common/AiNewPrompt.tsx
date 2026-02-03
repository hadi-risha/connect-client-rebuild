import { useEffect, useRef, useState } from "react";
import "../../css/aiNewPrompt.css";
import { IKImage } from "imagekitio-react";
import Markdown from "react-markdown";
import { aiChatUpdateApi } from "../../api/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import arrow from "../../images/aiArrow.png";
import { config } from "../../config";
import { callGeminiSdk } from "../../lib/geminiSdk";

type MessageRole = "user" | "model";

interface ChatPart {
  text: string;
}

interface ChatMessage {
  role: MessageRole;
  parts: ChatPart[];
  img?: string;
}

export interface Chat {
  _id: string;
  history: ChatMessage[];
}

interface ImageState {
  isLoading: boolean;
  error: string;
  dbData: {
    filePath?: string;
  };
  aiData: unknown;
}

type MutationPayload = {
  question?: string;
  answer: string;
  img?: string;
};


type NewPromptProps = {
  data?: Chat; // keep flexible — history, _id etc are dynamic
};

const NewPrompt = ({ data }: NewPromptProps) => {
  const endRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const queryClient = useQueryClient();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState<ImageState>({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    });

  const [isGenerating, setIsGenerating] = useState(false);

  // scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, data]);

  // save AI response
  const mutation = useMutation<unknown, Error, MutationPayload>({
    mutationFn: async ({ question, answer, img }) => {
      if (!data?._id) throw new Error("Chat not ready");

      return aiChatUpdateApi(
        data._id,
        question,
        answer,
        img
      );
    },
    onSuccess: () => {
      if (!data?._id) return;

      queryClient.invalidateQueries({ queryKey: ["chat", data._id] });
      formRef.current?.reset();
      setQuestion("");
      setAnswer("");
      setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
    },
  });


  const add = async (text: string, isInitial: boolean) => {
    if (!isInitial) setQuestion(text);
    setAnswer("");
    setIsGenerating(true);

    try {
      const messages: { role: MessageRole; text: string }[] = [
        ...(data?.history ?? []).map((m) => ({
          role: m.role as MessageRole,
          text: m.parts[0]?.text ?? "",
        })),
        { role: "user", text },
      ];

      const result = (await callGeminiSdk({ messages })) ?? "";
      setAnswer(result);

      await mutation.mutateAsync({
        question: isInitial ? undefined : text, 
        answer: result,
        img: img.dbData.filePath,
      });
    } catch (err) {
      console.error("Gemini error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isGenerating) return; 

    const form = e.currentTarget;
    const input = form.elements.namedItem("text") as HTMLInputElement | null;
    const text = input?.value.trim() ?? "";
    
    if (!text) return;
    add(text, false);
  };


  // AUTO AI REPLY FOR FIRST MESSAGE (RUN ONCE)
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current && data?.history?.length === 1) {
      const firstMsg = data.history[0].parts[0]?.text;
      if (!firstMsg) return;
      add(firstMsg, true);  
      hasRun.current = true;
    }
  }, [data]);

  return (
    <>
      {img.isLoading && <div>Loading...</div>}

      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={config.imageKit.endPoint}
          path={img?.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}

      {question && <div className="message user">{question}</div>}
      {isGenerating && (
        <div className="message ai loading">
          <span className="dot">●</span>
          <span className="dot">●</span>
          <span className="dot">●</span>
        </div>
      )}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}

      <div ref={endRef} />

      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <input type="file" hidden />

        <input
          type="text"
          name="text"
          placeholder="Ask anything..."
          disabled={isGenerating}
          className={isGenerating ? "disabledInput" : ""}
        />

        <button type="submit" disabled={isGenerating}>
          <img src={arrow} alt="send" />
        </button>
      </form>

    </>
  );
};

export default NewPrompt;
