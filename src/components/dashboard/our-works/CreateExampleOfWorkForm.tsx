"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import InputField from "@/components/ui/inputs/InputField";
import ImageUpload from "@/components/ui/inputs/ImageUpload";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ExampleOfWorkFormProps {
  page: string;
  kind: string;
}

interface ExampleOfWorkData {
  title: string;
  items: string[];
}

const blankForm: ExampleOfWorkData = {
  title: "",
  items: [],
};

const CreateExampleOfWorkForm = ({ page, kind }: ExampleOfWorkFormProps) => {
  const [form, setForm] = useState<ExampleOfWorkData>(blankForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const { uploadImage, uploading } = useImageUpload();

  const handleChange = useCallback(
    (field: keyof ExampleOfWorkData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleImageConfirm = async (files: File | File[]) => {
    if (!files || (Array.isArray(files) && files.length === 0)) {
      return toast.error("Please select files first!");
    }

    const filesArray = Array.isArray(files) ? files : [files];
    const uploadedUrls: string[] = [];

    for (const file of filesArray) {
      const url = await uploadImage(file);
      if (url) uploadedUrls.push(url);
    }

    if (uploadedUrls.length) {
      setForm((prev) => ({
        ...prev,
        items: [...prev.items, ...uploadedUrls],
      }));
    }
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!form.title.trim()) return toast.error("Title is required!");
    if (!form.items.length)
      return toast.error("Please upload at least one image!");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { page, kind, ...form };

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/sections", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save section");

      toast.success("Example of Work saved successfully!");
      setForm(blankForm);
      setResetKey((prev) => prev + 1);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Create Example of Work</h2>

      <InputField
        label="Title"
        name="title"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Enter title"
      />

      <ImageUpload
        onConfirm={handleImageConfirm}
        disabled={!!form.items?.length}
        uploading={uploading}
        resetKey={resetKey}
        allowMultiple={true}
      />

      {/* {form.items.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {form.items.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Example ${index}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )} */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Save Section"}
      </button>
    </form>
  );
};

export default CreateExampleOfWorkForm;
