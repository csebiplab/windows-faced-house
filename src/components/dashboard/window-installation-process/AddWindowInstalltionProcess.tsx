"use client";
import ImageUpload from "@/components/ui/inputs/ImageUpload";
import InputField from "@/components/ui/inputs/InputField";
import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useImageUpload } from "@/hooks/useImageUpload";

type WindowsInstallationForm = {
  serial: number;
  title: string;
  slug?: string;
  description?: string;
  imageUrl?: string | string[];
};

const blankStep: WindowsInstallationForm = {
  serial: 0,
  title: "",
  slug: "",
  description: "",
  imageUrl: "",
};

export const AddWindowInstallationProcess = () => {
  const [forms, setForms] = useState<WindowsInstallationForm[]>([
    { ...blankStep, serial: 1 },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadImage, uploading } = useImageUpload();
  const [resetKey, setResetKey] = useState(0);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForms((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleImageConfirm = async (index: number, files: File | File[]) => {
    if (!files || (Array.isArray(files) && files.length === 0)) {
      return toast.error("Please select a file first!");
    }

    const filesArray = Array.isArray(files) ? files : [files];

    const uploadedUrls: string[] = [];
    for (const file of filesArray) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) uploadedUrls.push(uploadedUrl);
    }

    if (uploadedUrls.length) {
      setForms((prev) => {
        const updated = [...prev];
        updated[index].imageUrl =
          uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls;
        return updated;
      });
    }
  };

  const onFileChange = (index: number) => {
    setForms((prev) => {
      const updated = [...prev];
      updated[index].imageUrl = "";
      return updated;
    });
  };

  const addMore = () => {
    setForms((prev) => [...prev, { ...blankStep, serial: prev.length + 1 }]);
  };

  const removeForm = (index: number) => {
    setForms((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((form, idx) => ({ ...form, serial: idx + 1 }))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/installation-process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forms),
      });

      if (res.ok) {
        toast.success("Installation steps created successfully!");
        setForms([{ ...blankStep, serial: 1 }]);
        setResetKey((prev) => prev + 1);
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto bg-white shadow-md rounded-lg p-6 space-y-8"
    >
      {forms.map((form, index) => (
        <div key={index} className="relative border rounded-lg p-4 space-y-4">
          {forms.length > 1 && (
            <button
              type="button"
              onClick={() => removeForm(index)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>
          )}

          <h3 className="font-semibold text-gray-700">
            Installation Step {index + 1}
          </h3>

          <InputField
            label="Title"
            name="title"
            value={form.title}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter step title"
          />

          <InputField
            label="Slug"
            name="slug"
            value={form.slug}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter slug (optional)"
            required={false}
          />

          <InputField
            label="Description"
            name="description"
            type="textarea"
            value={form.description}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter step description"
            required={false}
          />

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <ImageUpload
              value={form.imageUrl}
              onConfirm={(files) => handleImageConfirm(index, files)}
              onFileChange={() => onFileChange(index)}
              disabled={!!form.imageUrl}
              uploading={uploading}
              allowMultiple={false}
              resetKey={resetKey}
            />
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={addMore}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          + Add More
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit All"}
        </button>
      </div>
    </form>
  );
};
