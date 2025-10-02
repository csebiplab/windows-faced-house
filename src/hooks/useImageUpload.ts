import { useState } from "react";
import { toast } from "react-toastify";

export const useImageUpload = () => {
  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) {
      toast.error("No file selected!");
      return null;
    }

    if (file.size > 0.3 * 1024 * 1024) {
      toast.error("Image size exceeds 300kb limit.");
      return null;
    }
    console.log(file.type);

    if (!["image/jpeg", "image/png", "image/webp","image/gif"].includes(file.type)) {
      toast.error("Invalid image format. Only JPEG, PNG, WEBP and GIF are allowed.");
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload-img", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Image upload failed");

      const data = await res.json();
      if (data?.url) {
        toast.success("Image uploaded successfully!");
        return `${data.url}`;
      } else {
        toast.error("Failed to upload image!");
        return null;
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Upload failed");
      return null;
    }
  };

  return { uploadImage };
};
