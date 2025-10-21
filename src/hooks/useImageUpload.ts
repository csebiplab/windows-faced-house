import { useState } from "react";
import { toast } from "react-toastify";

type UploadOptions = {
  maxSize?: number;
  allowedTypes?: string[];
};

export const useImageUpload = (
  options: UploadOptions = {
    maxSize: 300,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  }
) => {
  const [uploading, setUploading] = useState(false);

  const validateFile = (file: File): boolean => {
    if (!file) {
      toast.error("No file selected!");
      return false;
    }

    if (file.size > (options.maxSize ?? 300) * 1024) {
      toast.error(`Image size exceeds ${options.maxSize}kb limit.`);
      return false;
    }

    if (!(options.allowedTypes ?? []).includes(file.type)) {
      toast.error(
        `Invalid format. Allowed: ${options.allowedTypes?.join(", ")}`
      );
      return false;
    }

    return true;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!validateFile(file)) return null;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Image upload failed");

      const data: { url?: string } = await res.json();
      if (data?.url) {
        toast.success("Image uploaded successfully!");
        return data.url;
      } else {
        toast.error("Failed to upload image!");
        return null;
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Upload failed");
        console.error("Upload Error:", err);
      }
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};
