"use client";
import ImageUpload from "@/components/ui/inputs/ImageUpload";
import InputField from "@/components/ui/inputs/InputField";
import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useImageUpload } from "@/hooks/useImageUpload";

type ProductForm = {
  title: string;
  type: string;
  items: string;
  description: string;
  priceFrom: string;
  priceUnit: string;
  imageUrl: string;
};

const blankProduct: ProductForm = {
  title: "",
  type: "windows",
  items: "",
  description: "",
  priceFrom: "",
  priceUnit: "₽/м²",
  imageUrl: "",
};

export const AddProductComp = () => {
  const [forms, setForms] = useState<ProductForm[]>([blankProduct]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadImage, uploading } = useImageUpload();

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

  const handleImageConfirm = async (index: number, file: File) => {
    if (!file) return toast.error("Please select a file first!");

    const uploadedUrl = await uploadImage(file);

    if (uploadedUrl) {
      setForms((prev) => {
        const updated = [...prev];
        updated[index].imageUrl = uploadedUrl;
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
    setForms((prev) => [...prev, { ...blankProduct }]);
  };

  const removeForm = (index: number) => {
    setForms((prev) => prev.filter((_, i) => i !== index));
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
        setForms([blankProduct]);
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
      <h2 className="text-xl font-semibold mb-4">Add Products</h2>

      {forms.map((form, index) => (
        <div key={index} className="relative border rounded-lg p-4 space-y-4">
          {/* Remove button */}
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
            required={false}
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
            onConfirm={(file) => handleImageConfirm(index, file)}
            onFileChange={() => onFileChange(index)}
            disabled={form?.imageUrl?.length > 0}
            uploading={uploading}
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
