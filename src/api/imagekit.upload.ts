import { config } from "../config";

export const uploadToImageKit = async (
  file: File,
  auth: {
    signature: string;
    expire: number;
    token: string;
    publicKey: string;
  }
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("publicKey", config.imageKit.publicKey);
  formData.append("signature", auth.signature);
  formData.append("expire", auth.expire.toString());
  formData.append("token", auth.token);
  formData.append("folder", "/profile-pictures");

  // console.log("sending form data to image kit:");
  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key} ${value}\n`)
  // }

  const res = await fetch(
    "https://upload.imagekit.io/api/v1/files/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    console.log("Image upload failed ",res)
    throw new Error("Image upload failed");
  }

  return res.json(); 
};
