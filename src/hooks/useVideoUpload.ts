import { useState } from "react";
import { toast } from "react-toastify";

type UploadOptions = {
  maxSize?: number; // in MB
  allowedTypes?: string[];
};

export const useVideoUpload = (
  options: UploadOptions = {
    maxSize: 50, // default 50MB
    allowedTypes: ["video/mp4", "video/webm", "video/ogg", "video/mpeg"],
  }
) => {
  const [uploading, setUploading] = useState(false);

  const validateFile = (file: File): boolean => {
    if (!file) {
      toast.error("No video selected!");
      return false;
    }

    const maxBytes = (options.maxSize ?? 50) * 1024 * 1024; // MB → bytes
    if (file.size > maxBytes) {
      toast.error(`Video exceeds ${options.maxSize}MB limit.`);
      return false;
    }

    if (!(options.allowedTypes ?? []).includes(file.type)) {
      toast.error(
        `Invalid video format. Allowed: ${options.allowedTypes?.join(", ")}`
      );
      return false;
    }

    return true;
  };

  const uploadVideo = async (file: File): Promise<string | null> => {
    if (!validateFile(file)) return null;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file); // generic name

      const res = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Video upload failed");

      const data: { url?: string } = await res.json();
      if (data?.url) {
        toast.success("Video uploaded successfully!");
        return data.url;
      } else {
        toast.error("Failed to upload video!");
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

  return { uploadVideo, uploading };
};
