import api from "./axios";

// backend auth call only if uploading a new image/replacing an existing image
export const getImageKitAuthApi = () =>
  api.get("/user/imagekit-auth");
