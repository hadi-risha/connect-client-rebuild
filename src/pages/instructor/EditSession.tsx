import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SessionForm from "../../components/session/SessionForm";
import { useDispatch, useSelector } from "react-redux";
import { setSession, setLoading } from "../../features/session/sessionSlice";
import type { RootState } from "../../app/store";
import { getImageKitAuthApi } from "../../api/imagekit.api";
import { uploadToImageKit } from "../../api/imagekit.upload";
import { getSessionApi, updateSessionApi } from "../../api/instructor.api";

export default function EditSession() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current } = useSelector((s: RootState) => s.session);

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      const res = await getSessionApi(id!);
      dispatch(setSession({ session: res.data.session }));
      dispatch(setLoading(false));
    })();
  }, [id]);

  if (!current) return null;

  return (
    <SessionForm
      mode="edit"
      initialData={current}
      onSubmit={async ({ session, imageFile, imageRemoved }) => {
        let coverPhoto = current.coverPhoto;
        const shouldDeleteOldImage = imageRemoved || !!imageFile;

        if (imageFile) {
          const auth = await getImageKitAuthApi();
          const uploaded = await uploadToImageKit(imageFile, auth.data);
          coverPhoto = { key: uploaded.fileId, url: uploaded.url };
        }

        if (imageRemoved) {
          coverPhoto = undefined;
        }

        const res = await updateSessionApi(current._id!, {
          ...session,
          coverPhoto,
          ...(shouldDeleteOldImage && { imageRemoved: true }),
        });

        dispatch(setSession({ session: res.data.session }));
      }}
    />
  );
}
