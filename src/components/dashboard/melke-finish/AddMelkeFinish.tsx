"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import InputField from "@/components/ui/inputs/InputField";
import ImageUpload from "@/components/ui/inputs/ImageUpload";
import { useImageUpload } from "@/hooks/useImageUpload";

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type FormEvent = React.ChangeEvent<FormElement>;

type FinishOption = {
  name: string;
  url: string;
  colorCode: string;
};

type MelkeFinishForm = {
  serial: number;
  category: "Cool Colours" | "Lamination";
  title: string;
  subtitle: string;
  description?: string;
  availableSystems: string[];
  price: number;
  currency?: string;
  badge?: string;
  priceNote?: string;
  options: FinishOption[];
};

const blankFinish: MelkeFinishForm = {
  serial: 1,
  category: "Cool Colours",
  title: "",
  subtitle: "",
  description: "",
  availableSystems: [],
  price: 0,
  currency: "₽",
  badge: "",
  priceNote: "",
  options: [],
};

export const AddMelkeFinishes = () => {
  const [forms, setForms] = useState<MelkeFinishForm[]>([blankFinish]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadImage, uploading } = useImageUpload();
  const [resetKey, setResetKey] = useState(0);

  // Handle input changes
  const handleChange = (index: number, e: FormEvent) => {
    const { name, value } = e.target;
    setForms((prev) => {
      const updated = [...prev];
      (updated[index] as any)[name] = value;
      return updated;
    });
  };

  // Handle image upload
  const handleImageConfirm = async (
    index: number,
    files: File | File[],
    key: "url" | "logo" | `options.${number}.url`
  ) => {
    const filesArray = Array.isArray(files) ? files : [files];
    const uploadedUrls: string[] = [];

    for (const file of filesArray) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) uploadedUrls.push(uploadedUrl);
    }

    if (!uploadedUrls.length) return;

    setForms((prev) => {
      const updated = [...prev];
      if (key.startsWith("options.")) {
        const optionIndex = parseInt(key.split(".")[1]);
        updated[index].options[optionIndex].url = uploadedUrls[0];
      } else {
        (updated[index] as any)[key] = uploadedUrls[0];
      }
      return updated;
    });
  };

  // Add / remove forms
  const addMore = () => {
    setForms((prev) => [...prev, { ...blankFinish, serial: prev.length + 1 }]);
  };

  const removeForm = (index: number) => {
    setForms((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((f, i) => ({ ...f, serial: i + 1 }))
    );
  };

  // Manage available systems
  const handleSystemsChange = (index: number, e: FormEvent) => {
    const systems = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setForms((prev) => {
      const updated = [...prev];
      updated[index].availableSystems = systems;
      return updated;
    });
  };

  // Manage options (colours / laminations)
  const addOption = (index: number) => {
    setForms((prev) => {
      const updated = [...prev];
      updated[index].options.push({ name: "", url: "", colorCode: "" });
      return updated;
    });
  };

  const removeOption = (index: number, optIndex: number) => {
    setForms((prev) => {
      const updated = [...prev];
      updated[index].options.splice(optIndex, 1);
      return updated;
    });
  };

  const handleOptionChange = (
    formIndex: number,
    optIndex: number,
    e: FormEvent
  ) => {
    const { name, value } = e.target;
    setForms((prev) => {
      const updated = [...prev];
      updated[formIndex].options[optIndex][name as keyof FinishOption] = value;
      return updated;
    });
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/melke-finishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forms),
      });

      if (res.ok) {
        toast.success("Melke finishes added successfully!");
        setForms([{ ...blankFinish, serial: 1 }]);
        setResetKey((prev) => prev + 1);
      } else toast.error("Failed to submit. Please try again.");
    } catch (err) {
      console.error("Error submitting:", err);
      toast.error("Something went wrong.");
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

          <h3 className="font-medium text-gray-700">
            Melke Finish {index + 1}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={(e) => handleChange(index, e)}
              className="border rounded-md p-2 w-full"
            >
              <option value="Cool Colours">Cool Colours</option>
              <option value="Lamination">Lamination</option>
            </select>

            <InputField
              label="Title"
              name="title"
              value={form.title}
              onChange={(e) => handleChange(index, e)}
            />
            <InputField
              label="Subtitle"
              name="subtitle"
              value={form.subtitle}
              onChange={(e) => handleChange(index, e)}
            />
            <InputField
              label="Description"
              name="description"
              type="textarea"
              value={form.description}
              onChange={(e) => handleChange(index, e)}
            />
            <InputField
              label="Available Systems (comma separated)"
              name="availableSystems"
              value={form.availableSystems.join(", ")}
              onChange={(e) => handleSystemsChange(index, e)}
            />
            <InputField
              label="Price"
              name="price"
              type="number"
              value={form.price.toString()}
              onChange={(e) => handleChange(index, e)}
            />
            <InputField
              label="Currency"
              name="currency"
              value={form.currency || ""}
              onChange={(e) => handleChange(index, e)}
            />
            <InputField
              label="Badge"
              name="badge"
              value={form.badge}
              onChange={(e) => handleChange(index, e)}
            />
            <InputField
              label="Price Note"
              name="priceNote"
              value={form.priceNote}
              onChange={(e) => handleChange(index, e)}
            />
          </div>

          {/* Options */}
          <div className="border-t pt-4 space-y-3">
            {form.options.map((opt, optIndex) => (
              <div
                key={optIndex}
                className="p-3 border rounded-md bg-gray-50 relative"
              >
                <button
                  type="button"
                  onClick={() => removeOption(index, optIndex)}
                  className="absolute top-1 right-1 text-gray-400 hover:text-red-600"
                >
                  <X size={16} />
                </button>

                <InputField
                  label="Option Name"
                  name="name"
                  value={opt.name}
                  onChange={(e) => handleOptionChange(index, optIndex, e)}
                />

                <InputField
                  label="Option Color Code"
                  name="colorCode"
                  value={opt.colorCode}
                  onChange={(e) => handleOptionChange(index, optIndex, e)}
                />

                <ImageUpload
                  onConfirm={(files) =>
                    handleImageConfirm(index, files, `options.${optIndex}.url`)
                  }
                  onFileChange={() => {}}
                  disabled={!!opt.url}
                  uploading={uploading}
                  resetKey={resetKey}
                />
              </div>
            ))}

            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Options</h4>
              <button
                type="button"
                onClick={() => addOption(index)}
                className="text-sm bg-green-600 text-white px-3 py-1 rounded"
              >
                + Add Option
              </button>
            </div>
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
