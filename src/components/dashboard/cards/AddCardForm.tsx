"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import ImageUpload from "@/components/ui/inputs/ImageUpload";
import InputField from "@/components/ui/inputs/InputField";
import VideoUpload from "@/components/ui/inputs/VideoUpload";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useVideoUpload } from "@/hooks/useVideoUpload";

const options = [
  { label: "Work With Us", value: "WorkWithUsCard" },
  {
    label: "Windows from the manufacturer",
    value: "WindowsFromManufacturerCard",
  },
  { label: "Our promotions", value: "OurPromotionsCard" },
] as const;

type CardType = (typeof options)[number]["value"];

type WindowsInstallationForm = {
  serial: number;
  title: string;
  icon?: string | string[];
  slug?: string;
  description?: string;
  url?: string | string[];
};

const blankStep: WindowsInstallationForm = {
  serial: 0,
  title: "",
  icon: "",
  slug: "",
  description: "",
  url: "",
};

export const AddCardForm = () => {
  const [forms, setForms] = useState<WindowsInstallationForm[]>([
    { ...blankStep, serial: 1 },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [selectedOption, setSelectedOption] =
    useState<CardType>("WorkWithUsCard");

  const { uploadImage, uploading } = useImageUpload();
  const { uploadVideo, uploading: videoUploading } = useVideoUpload();

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

  const handleFileUpload = async (
    index: number,
    field: "icon" | "url",
    files: File | File[],
    uploader: (file: File) => Promise<string | null>
  ) => {
    const filesArray = Array.isArray(files) ? files : [files];
    if (!filesArray.length) return toast.error("Please select a file first!");

    const uploadedUrls = (
      await Promise.all(filesArray.map((file) => uploader(file)))
    ).filter(Boolean) as string[];

    if (uploadedUrls.length) {
      setForms((prev) => {
        const updated = [...prev];
        updated[index][field] =
          uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls;
        return updated;
      });
    }
  };

  const handleImageConfirm = (
    index: number,
    field: "icon" | "url",
    files: File | File[]
  ) => handleFileUpload(index, field, files, uploadImage);

  const handleVideoConfirm = (
    index: number,
    field: "url",
    files: File | File[]
  ) => handleFileUpload(index, field, files, uploadVideo);

  const onFileChange = (index: number, field: "icon" | "url") => {
    setForms((prev) => {
      const updated = [...prev];
      updated[index][field] = "";
      return updated;
    });
  };

  const addMore = () =>
    setForms((prev) => [...prev, { ...blankStep, serial: prev.length + 1 }]);

  const removeForm = (index: number) =>
    setForms((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((form, idx) => ({ ...form, serial: idx + 1 }))
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      cardType: selectedOption,
      items: forms,
    };

    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Cards created successfully!");
        setForms([{ ...blankStep, serial: 1 }]);
        setResetKey((prev) => prev + 1);
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isWorkWithUs = selectedOption === "WorkWithUsCard";
  const isManufacturer = selectedOption === "WindowsFromManufacturerCard";
  const isPromotion = selectedOption === "OurPromotionsCard";

  return (
    <div>
      {/* Select Dropdown */}
      <div className="flex-1 mb-8 max-w-2xs">
        <label htmlFor="section-type" className="block font-medium mb-2">
          Select Card Type
        </label>
        <select
          id="section-type"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value as CardType)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Form */}
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

            <h3 className="font-semibold text-gray-700">Card {index + 1}</h3>

            <InputField
              label="Title"
              name="title"
              value={form.title}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter title"
            />

            {!isWorkWithUs && !isManufacturer && !isPromotion && (
              <InputField
                label="Slug"
                name="slug"
                value={form.slug}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter slug"
                required={false}
              />
            )}

            {isPromotion && (
              <InputField
                label="Description"
                name="description"
                type="textarea"
                value={form.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter description"
                required={false}
              />
            )}

            {/* Image Uploads */}
            {isWorkWithUs && (
              <ImageUpload
                label="Upload Icon"
                value={form.icon}
                onConfirm={(files) => handleImageConfirm(index, "icon", files)}
                onFileChange={() => onFileChange(index, "icon")}
                disabled={!!form.icon}
                uploading={uploading}
                allowMultiple={false}
                resetKey={resetKey}
              />
            )}

            {(isWorkWithUs || isPromotion) && (
              <ImageUpload
                label="Upload Image"
                value={form.url}
                onConfirm={(files) => handleImageConfirm(index, "url", files)}
                onFileChange={() => onFileChange(index, "url")}
                disabled={!!form.url}
                uploading={uploading}
                allowMultiple={false}
                resetKey={resetKey}
              />
            )}

            {/* Video Upload */}
            {isManufacturer && (
              <VideoUpload
                label="Upload Video"
                value={form.url}
                onConfirm={(files) => handleVideoConfirm(index, "url", files)}
                onFileChange={() => onFileChange(index, "url")}
                disabled={!!form.url}
                uploading={videoUploading}
                allowMultiple={false}
                resetKey={resetKey}
              />
            )}
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
    </div>
  );
};
