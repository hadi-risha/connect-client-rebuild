import SessionForm from "../../components/session/SessionForm";
import { useDispatch } from "react-redux";
import { setSession } from "../../features/session/sessionSlice";
import { getImageKitAuthApi } from "../../api/imagekit.api";
import { uploadToImageKit } from "../../api/imagekit.upload";
import { createSessionApi } from "../../api/instructor.api";

export default function CreateSession() {
  const dispatch = useDispatch();

  return (
    <SessionForm
      mode="create"
      onSubmit={async ({ session, imageFile }) => {
        let coverPhoto;

        if (imageFile) {
          const auth = await getImageKitAuthApi();
          const uploaded = await uploadToImageKit(imageFile, auth.data);
          coverPhoto = { key: uploaded.fileId, url: uploaded.url };
        }

        const res = await createSessionApi({
          ...session,
          coverPhoto,
        });
        dispatch(setSession({ session: res.data.session })); 
      }}
    />
  );
}
