// common actions for both students and instructor - (component -> action -> api -> axios)
import type { AppDispatch } from "../app/store";
import { switchRoleApi, type SwitchRolePayload } from "../api/user.api";
import { setUser } from "../features/user/userSlice";
import { getImageKitAuthApi } from "../api/imagekit.api";
import { uploadToImageKit } from "../api/imagekit.upload";
import { setAuth } from "../features/auth/authSlice";

export const performRoleSwitch = async ( dispatch: AppDispatch, payload: SwitchRolePayload & { imageFile?: File }) => {
  try {
    let finalPayload: SwitchRolePayload = payload;

    // upload image if provided
    if (payload.imageFile) {
      const authRes = await getImageKitAuthApi();
      const uploaded = await uploadToImageKit(
        payload.imageFile,
        authRes.data
      );

      const { imageFile, ...rest } = payload;
      console.log(imageFile)

      finalPayload = {
        ...rest,
        photo: {
          key: uploaded.fileId,
          url: uploaded.url,
        },
      };
    } else {
      const { imageFile, ...rest } = payload;
      console.log(imageFile)
      finalPayload = rest;
    }

    const res = await switchRoleApi(finalPayload);
    dispatch(
      setAuth({
        accessToken: res.data.accessToken,
        user: res.data.user,
        isAuthenticated: true
      })
    );

    // set user profile
    dispatch(
      setUser({
        user: res.data.user,
      })
    );

    // return role for redirect
    return {
      success: true,
      role: res.data.user.role,
    };
  } catch (error) {
    return { success: false, error };
  }
};
