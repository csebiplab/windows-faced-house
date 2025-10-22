"use client";
import ImageUpload from "@/components/ui/inputs/ImageUpload";
import InputField from "@/components/ui/inputs/InputField";
import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useImageUpload } from "@/hooks/useImageUpload";

type ProductForm = {
  serial: number;
  title?: string;
  type?: string;
  items?: string;
  description?: string;
  priceFrom?: string;
  priceUnit?: string;
  imageUrl?: string | string[];
  category?: string;
  label?: string;
  tag?: string;
  airChambers?: string;
  frameSashWidth?: string;
  thermalProtection?: string;
  buttonText?: string;
};

const blankProduct: ProductForm = {
  serial: 0,
  title: "",
  type: "windows",
  items: "",
  description: "",
  priceFrom: "",
  priceUnit: "₽/м²",
  imageUrl: "",
  category: "budget",
  label: "",
  tag: "",
  airChambers: "",
  frameSashWidth: "",
  thermalProtection: "",
  buttonText: "Request a quote",
};

export const AddProductComp = () => {
  const [forms, setForms] = useState<ProductForm[]>([
    { ...blankProduct, serial: 1 },
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
    setForms((prev) => [...prev, { ...blankProduct, serial: prev.length + 1 }]);
  };

  const removeForm = (index: number) => {
    setForms((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((form, idx) => ({ ...form, serial: idx + 1 }))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forms),
      });
      if (res.ok) {
        toast.success("Form submitted successfully!");
        setForms([{ ...blankProduct, serial: 1 }]);
        setResetKey((prev) => prev + 1);
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
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

          <h3 className="font-medium text-gray-700">Product {index + 1}</h3>

          {/* Basic fields */}
          <InputField
            label="Title"
            name="title"
            value={form.title}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter product title"
          />

          <InputField
            label="Type"
            name="type"
            type="select"
            value={form.type}
            onChange={(e) => handleChange(index, e)}
            options={[
              { label: "Windows", value: "windows" },
              { label: "Aluminum", value: "aluminum" },
              { label: "Cottages", value: "cottages" },
              { label: "Balconies", value: "balconies" },
              { label: "Doors", value: "doors" },
            ]}
          />

          {/* New category select */}
          <InputField
            label="Category"
            name="category"
            type="select"
            value={form.category}
            onChange={(e) => handleChange(index, e)}
            options={[
              { label: "Budget", value: "budget" },
              { label: "Comfort", value: "comfort" },
              { label: "Premium", value: "premium" },
            ]}
          />

          {/* New optional fields */}
          <InputField
            label="Label"
            name="label"
            value={form.label}
            onChange={(e) => handleChange(index, e)}
            placeholder='e.g. "ECO"'
          />

          <InputField
            label="Tag"
            name="tag"
            value={form.tag}
            onChange={(e) => handleChange(index, e)}
            placeholder='e.g. "The warmest", "Best price", "More light", "Bestseller", "New product'
          />

          <InputField
            label="Air Chambers"
            name="airChambers"
            value={form.airChambers}
            onChange={(e) => handleChange(index, e)}
            placeholder='e.g. "6/7 pcs."'
          />

          <InputField
            label="Frame/Sash Width"
            name="frameSashWidth"
            value={form.frameSashWidth}
            onChange={(e) => handleChange(index, e)}
            placeholder='e.g. "80/100 mm"'
          />

          <InputField
            label="Thermal Protection"
            name="thermalProtection"
            value={form.thermalProtection}
            onChange={(e) => handleChange(index, e)}
            placeholder='e.g. "1.23"'
          />

          <InputField
            label="Button Text"
            name="buttonText"
            value={form.buttonText}
            onChange={(e) => handleChange(index, e)}
            placeholder='e.g. "Request a quote"'
          />

          {/* Other existing fields */}
          <InputField
            label="Items"
            name="items"
            value={form.items}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter items"
          />

          <InputField
            label="Description"
            name="description"
            type="textarea"
            value={form.description}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter description"
          />

          <InputField
            label="Price From"
            name="priceFrom"
            type="number"
            value={form.priceFrom}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter price"
          />

          <InputField
            label="Price Unit"
            name="priceUnit"
            value={form.priceUnit}
            onChange={(e) => handleChange(index, e)}
          />

          <ImageUpload
            onConfirm={(files) => handleImageConfirm(index, files)}
            onFileChange={() => onFileChange(index)}
            disabled={!!form?.imageUrl?.length}
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
