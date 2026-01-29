import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { joinVideoCallApi } from "../../api/user.api";
import { config } from "../../config";
import { useAppSelector } from "../../hooks/redux";
import { ArrowLeft } from "lucide-react";

const ZegoVideoCall = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const zpRef = useRef<any>(null);
  const startedRef = useRef(false);
  const userName = useAppSelector((state) => state.user.user?.name);
  const [leftRoom, setLeftRoom] = useState(false);

  useEffect(() => {
    if (!bookingId || !userName) return;
    if (startedRef.current) return;

    startedRef.current = true;

    const init = async () => {
      try {
        const { data } = await joinVideoCallApi(bookingId);

        const kitToken =
          ZegoUIKitPrebuilt.generateKitTokenForTest(
            Number(config.zegoCloud.appId),
            config.zegoCloud.serverSecret,
            data.roomId,
            data.userId,
            userName
          );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpRef.current = zp;

        zp.joinRoom({
          container: containerRef.current!,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          showPreJoinView: true, // <-- show preview before joining
          showScreenSharingButton: true,
          preJoinViewConfig: {
            title: "Preview Your Video & Audio",
          },
          onLeaveRoom: () => {
            setLeftRoom(true); // When user leaves after joining
          },
        });

      } catch (err) {
        console.error(err);
        navigate("/unauthorized");
      }
    };

    init();

    return () => {
      zpRef.current?.destroy();
      zpRef.current = null;
      startedRef.current = false;
    };
  }, [bookingId, userName, navigate]);

  if (leftRoom) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          zIndex: 9999, // top of everything
        }}
        className="bg-[#1c1f2e]"

      >
        <button
          onClick={() => navigate(-1)}
          className="mb-20 px-7 py-2 text-white rounded-xl cursor-pointer text-lg hover:text-blue-500 flex items-center gap-2"
        ><ArrowLeft  /> Go Back
        </button>
      </div>
    );
  }

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ZegoVideoCall;
