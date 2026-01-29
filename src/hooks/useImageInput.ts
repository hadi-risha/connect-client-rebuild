// image/file logic (preview, replace, keep existing, validate)
import { useEffect, useState } from "react";

interface ImageOptions {
  initialUrl?: string | null;
  required?: boolean;
  maxSizeMB?: number;
  allowedTypes?: string[];
}

export const useImageInput = ({
  initialUrl = null,
  required = false,
  maxSizeMB = 5,
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
}: ImageOptions) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl);
  const [error, setError] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);

  // validate image
  const validate = (): boolean => {
    if (required && !file && !preview) {
      setError("Image is required");
      return false;
    }
    setError(null);
    return true;
  };

  // select new image
  const selectImage = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid image type");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Image must be under ${maxSizeMB}MB`);
      return;
    }

    setFile(file);
    setPreview(URL.createObjectURL(file));
    setRemoved(false);
    setError(null);
  };

  // remove image
  const removeImage = () => {
    setFile(null);
    setPreview(null);
    setRemoved(true);
  };

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return {
    file,
    preview,
    error,
    removed,
    selectImage,
    removeImage,
    validate,
  };
};
