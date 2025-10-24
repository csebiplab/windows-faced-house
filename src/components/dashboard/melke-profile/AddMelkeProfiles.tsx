"use client";
import ImageUpload from "@/components/ui/inputs/ImageUpload";
import InputField from "@/components/ui/inputs/InputField";
import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useImageUpload } from "@/hooks/useImageUpload";

type Specs = {
  width: string;
  thickness: string;
  chambers: string;
  thermal: string;
  sound: string;
  class: string;
  price: string;
};

type MelkeProfileForm = {
  serial: number;
  title: string;
  description?: string;
  image?: string;
  specs: Specs;
  colors: string[];
  seals: string[];
  badge?: string;
  badgeColor?: string;
};

const blankProfile: MelkeProfileForm = {
  serial: 1,
  title: "",
  description: "",
  image: "",
  specs: {
    width: "",
    thickness: "",
    chambers: "",
    thermal: "",
    sound: "",
    class: "",
    price: "",
  },
  colors: [],
  seals: [],
  badge: "",
  badgeColor: "",
};

export const AddMelkeProfiles = () => {
  const [forms, setForms] = useState<MelkeProfileForm[]>([blankProfile]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadImage, uploading } = useImageUpload();
  const [resetKey, setResetKey] = useState(0);

  // Handle field changes
  const handleChange = (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForms((prev) => {
      const updated = [...prev];
      // handle nested specs fields like specs.width
      if (name.startsWith("specs.")) {
        const key = name.split(".")[1] as keyof Specs;
        updated[index].specs[key] = value;
      } else {
        (updated[index] as any)[name] = value;
      }
      return updated;
    });
  };

  // Handle image uploads
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
        updated[index].image = uploadedUrls[0];
        return updated;
      });
    }
  };

  const onFileChange = (index: number) => {
    setForms((prev) => {
      const updated = [...prev];
      updated[index].image = "";
      return updated;
    });
  };

  const addMore = () => {
    setForms((prev) => [...prev, { ...blankProfile, serial: prev.length + 1 }]);
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
      const res = await fetch("/api/melke-profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forms),
      });

      if (res.ok) {
        toast.success("Melke profiles added successfully!");
        setForms([{ ...blankProfile, serial: 1 }]);
        setResetKey((prev) => prev + 1);
      } else {
        toast.error("Failed to submit profiles. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
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
            Melke Profile {index + 1}
          </h3>

          <InputField
            label="Title"
            name="title"
            value={form.title}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter profile title"
          />

          <InputField
            label="Description"
            name="description"
            type="textarea"
            value={form.description}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter description"
          />

          {/* Specs Section */}
          <div className="grid md:grid-cols-2 gap-4 border p-3 rounded-lg bg-gray-50">
            <h4 className="col-span-full text-sm font-semibold text-gray-700">
              Specs
            </h4>
            {(
              [
                ["specs.width", "Width (мм)"],
                ["specs.thickness", "Thickness (мм)"],
                ["specs.chambers", "Chambers"],
                ["specs.thermal", "Thermal (м²°С/Вт)"],
                ["specs.sound", "Sound (дБ)"],
                ["specs.class", "Class (A+)"],
                ["specs.price", "Price (₽)"],
              ] as const
            ).map(([key, label]) => (
              <InputField
                key={key}
                label={label}
                name={key}
                value={(form as any)[key.split(".")[0]][key.split(".")[1]]}
                onChange={(e) => handleChange(index, e)}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            ))}
          </div>

          {/* Colors */}
          <InputField
            label="Colors (comma separated hex codes)"
            name="colors"
            value={form.colors.join(", ")}
            onChange={(e) => {
              const colors = e.target.value
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean);
              setForms((prev) => {
                const updated = [...prev];
                updated[index].colors = colors;
                return updated;
              });
            }}
            placeholder="#dedede, #c0a46b, #5b2e00"
          />

          {/* Seals */}
          <InputField
            label="Seals (comma separated hex codes)"
            name="seals"
            value={form.seals.join(", ")}
            onChange={(e) => {
              const seals = e.target.value
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean);
              setForms((prev) => {
                const updated = [...prev];
                updated[index].seals = seals;
                return updated;
              });
            }}
            placeholder="#000, #fff, #ccc"
          />

          <InputField
            label="Badge"
            name="badge"
            value={form.badge}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g. Семейный выбор"
          />

          <InputField
            label="Badge Color"
            name="badgeColor"
            value={form.badgeColor}
            onChange={(e) => handleChange(index, e)}
            placeholder="Optional (e.g. #2C3245)"
          />

          <ImageUpload
            onConfirm={(files) => handleImageConfirm(index, files)}
            onFileChange={() => onFileChange(index)}
            disabled={!!form.image?.length}
            uploading={uploading}
            resetKey={resetKey}
          />
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
