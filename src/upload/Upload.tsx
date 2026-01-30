// import { IKContext, IKUpload } from "imagekitio-react";
// import { useRef } from "react";
// import { Image as ImageIcon } from "lucide-react"; 
// import {config} from "../config/index";
// import { getImageKitAuthApi } from "../api/imagekit.api";

// const urlEndpoint = config.imageKit.endPoint;
// const publicKey = config.imageKit.publicKey ;

// const authenticator = async () => {
//   try {
//     const response = await getImageKitAuthApi() //get imagekit auth from backend
//     console.log("response in uploads", response);

//     // Check for successful status code
//     if (response.status !== 200) {
//       throw new Error(
//         `Request failed with status ${response.status}: ${response.statusText}`
//       );
//     }
//     const { signature, expire, token } = response.data;
//     return { signature, expire, token };
//   } catch (error) {
//     throw new Error(`Authentication request failed: ${error.message}`);
//   }
// };

// const Upload = ({ setImg }) => {
//   const ikUploadRef = useRef(null);

//   const onError = (err) => {
//     console.log("Error in image upload:- ", err);
//   };

//   const onSuccess = (res) => {
//     console.log("Success in image upload:-", res);
//     setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
//   };

//   const onUploadProgress = (progress) => {
//     console.log("Progress in image upload:-", progress);
//   };

//   const onUploadStart = (evt) => {
//     const file = evt.target.files[0];

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImg((prev) => ({ ...prev, isLoading: true,aiData: {  
//           inlineData: {
//             data: reader.result.split(",")[1],
//             mimeType: file.type,
//           },
//         },
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <IKContext
//       urlEndpoint={urlEndpoint}
//       publicKey={publicKey}
//       authenticator={authenticator}
//     >
//       <IKUpload
//         fileName="test-upload.png"
//         onError={onError}
//         onSuccess={onSuccess}
//         useUniqueFileName={true}
//         onUploadProgress={onUploadProgress}
//         onUploadStart={onUploadStart}
//         style={{ display: "none" }}
//         ref={ikUploadRef}
//       />
//       {
//         <label
//           onClick={() => ikUploadRef.current.click()}
//           className="flex flex-col items-center justify-center gap-1 w-20 h-20 border-2 border-dashed border-gray-500 rounded cursor-pointer hover:border-gray-300"
//         >
//           <ImageIcon className="w-8 h-8 text-gray-400" />
//           <span className="text-sm text-gray-400">Upload</span>
//         </label>

//       }
//     </IKContext>
//   );
// };

// export default Upload;
