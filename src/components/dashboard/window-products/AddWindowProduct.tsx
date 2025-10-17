"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/inputs/InputField";
import ImageUpload from "@/components/ui/inputs/ImageUpload";
import { toast } from "react-toastify";
import { useImageUpload } from "@/hooks/useImageUpload";

interface Colour {
  name: string;
  hex?: string;
  twoSided?: boolean;
  inMass?: boolean;
}

const blankFormData = {
  title: "",
  windowType: "single",
  size: "",
  price: 0,
  discount: 0,
  ecoFriendly: false,
  description: "",
  profile: { brand: "", type: "standard", tag: "" },
  glassType: "single",
  coolColoursEnabled: false,
  colours: [] as Colour[],
  imageUrl: [] as string[],
};

export default function AddWindowProduct() {
  const [formData, setFormData] = useState(blankFormData);
  const { uploadImage, uploading } = useImageUpload();
  const [resetKey, setResetKey] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    if (name.startsWith("profile.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        profile: { ...prev.profile, [key]: value },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleColourChange = (index: number, field: string, value: any) => {
    const updatedColours = [...formData.colours];
    updatedColours[index] = { ...updatedColours[index], [field]: value };
    setFormData((prev) => ({ ...prev, colours: updatedColours }));
  };

  const addColour = () => {
    setFormData((prev) => ({
      ...prev,
      colours: [...prev.colours, { name: "" }],
    }));
  };

  const removeColour = (index: number) => {
    const updatedColours = [...formData.colours];
    updatedColours.splice(index, 1);
    setFormData((prev) => ({ ...prev, colours: updatedColours }));
  };

  const handleImageConfirm = async (files: File | File[]) => {
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
      setFormData((prev) => ({ ...prev, imageUrl: uploadedUrls }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // try {
    //   const res = await fetch("/api/window-products", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (res.ok) {
    //     toast.success("Product added successfully!");
    //     setFormData(blankFormData);
    //     setResetKey((prev) => prev + 1);
    //   } else {
    //     toast.error("Failed to add product!");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toast.error("Something went wrong!");
    // }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <InputField
          label="Window Type"
          name="windowType"
          type="select"
          value={formData.windowType}
          options={[
            { label: "Single", value: "single" },
            { label: "Double", value: "double" },
            { label: "Triple", value: "triple" },
            { label: "Balcony", value: "balcony" },
          ]}
          onChange={handleChange}
        />
        <InputField
          label="Size"
          name="size"
          value={formData.size}
          onChange={handleChange}
        />
        <InputField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
        <InputField
          label="Discount"
          name="discount"
          type="number"
          value={formData.discount}
          onChange={handleChange}
        />
        <InputField
          label="Eco Friendly"
          name="ecoFriendly"
          type="checkbox"
          value={formData.ecoFriendly}
          onChange={handleChange}
        />
        <InputField
          label="Description"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
        />

        <h3 className="font-semibold">Profile</h3>
        <InputField
          label="Brand"
          name="profile.brand"
          value={formData.profile.brand}
          onChange={handleChange}
          required={false}
        />
        <InputField
          label="Type"
          name="profile.type"
          type="select"
          value={formData.profile.type}
          options={[
            { label: "Standard", value: "standard" },
            { label: "Evolution", value: "evolution" },
          ]}
          onChange={handleChange}
        />
        <InputField
          label="Tag"
          name="profile.tag"
          value={formData.profile.tag}
          onChange={handleChange}
          required={false}
        />

        <InputField
          label="Glass Type"
          name="glassType"
          type="select"
          value={formData.glassType}
          options={[
            { label: "Single", value: "single" },
            { label: "Double", value: "double" },
          ]}
          onChange={handleChange}
        />
        <InputField
          label="Cool Colours Enabled"
          name="coolColoursEnabled"
          type="checkbox"
          value={formData.coolColoursEnabled}
          onChange={handleChange}
        />

        <div>
          <h3 className="font-semibold mb-2">Colours</h3>
          {formData.colours.map((colour, idx) => (
            <div key={idx} className="flex gap-2 items-center mb-2">
              <InputField
                label="Name"
                name={`colour-name-${idx}`}
                value={colour.name}
                onChange={(e) =>
                  handleColourChange(idx, "name", e.target.value)
                }
              />
              <InputField
                label="Hex"
                name={`colour-hex-${idx}`}
                value={colour.hex || ""}
                onChange={(e) => handleColourChange(idx, "hex", e.target.value)}
              />
              <InputField
                label="Two Sided"
                name={`colour-twoSided-${idx}`}
                type="checkbox"
                value={colour.twoSided || false}
                onChange={(e) =>
                  handleColourChange(
                    idx,
                    "twoSided",
                    (e.target as HTMLInputElement).checked
                  )
                }
              />
              <InputField
                label="In Mass"
                name={`colour-inMass-${idx}`}
                type="checkbox"
                value={colour.inMass || false}
                onChange={(e) =>
                  handleColourChange(
                    idx,
                    "inMass",
                    (e.target as HTMLInputElement).checked
                  )
                }
              />
              <button
                type="button"
                onClick={() => removeColour(idx)}
                className="px-2 py-1 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addColour}
            className="px-3 py-1 bg-blue-600 text-white rounded-md"
          >
            Add Colour
          </button>
        </div>

        <div>
          <ImageUpload
            onConfirm={handleImageConfirm}
            disabled={formData.imageUrl.length > 0}
            uploading={uploading}
            resetKey={resetKey}
            allowMultiple={true}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
