"use client";

import { useImageUpload } from "@/hooks/useImageUpload";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface CreateHeroSectionFormProps {
  kind: string;
  page: string;
}

interface Section {
  sectionId: number;
  state: string;
  title: string;
  buttonName: string;
  description: string;
  image: string;
  file?: File;
  imgUrl?: string;
  uploading?: boolean;
}

interface Payload {
  page: string;
  kind: string;
  sectionContent: Omit<Section, "file" | "uploading" | "image">[];
}

const emptyInitialSection = [
  {
    sectionId: Math.floor(Date.now() + Math.random() * 1000),
    state: "Unpublished",
    title: "",
    buttonName: "",
    description: "",
    image: "",
    imgUrl: "",
  },
];

const CreateHeroSectionForm = ({ kind, page }: CreateHeroSectionFormProps) => {
  const fileInputsRef = useRef<Record<number, HTMLInputElement | null>>({});
  const { uploadImage } = useImageUpload();
  const [sections, setSections] = useState<Section[]>([
    {
      sectionId: Math.floor(Date.now() + Math.random() * 1000),
      state: "Unpublished",
      title: "",
      buttonName: "",
      description: "",
      image: "",
      imgUrl: "",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateSectionField = (
    sectionId: number,
    field: keyof Section,
    value: string | File | boolean | undefined
  ) => {
    setSections((prev) =>
      prev.map((s) =>
        s.sectionId === sectionId
          ? field === "file"
            ? {
                ...s,
                file: value as File,
                image: URL.createObjectURL(value as File),
              }
            : { ...s, [field]: value }
          : s
      )
    );
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        sectionId: Math.floor(Date.now() + Math.random() * 1000),
        state: "Unpublished",
        title: "",
        buttonName: "",
        description: "",
        image: "",
        imgUrl: "",
      },
    ]);
  };

  const removeSection = (sectionId: number) => {
    setSections((prev) => prev.filter((s) => s.sectionId !== sectionId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Payload = {
      page,
      kind,
      sectionContent: [],
    };
    const preparePayload = sections.map(
      ({ file, image, uploading, ...rest }) => rest
    );
    payload["sectionContent"] = preparePayload;

    if (
      payload.sectionContent.some(
        (section) =>
          !section.title ||
          !section.buttonName ||
          !section.description ||
          !section.imgUrl
      )
    ) {
      return toast.error("All fields are required!");
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/sections", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Form submitted successfully!");
        setSections(emptyInitialSection);
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

  // Confirm and upload image
  const handleConfirmImage = async (section: Section) => {
    if (!section.file) return toast.error("Please select a file first!");

    updateSectionField(section.sectionId, "uploading", true);
    const uploadedUrl = await uploadImage(section.file);
    if (uploadedUrl) {
      updateSectionField(section.sectionId, "imgUrl", uploadedUrl);
      updateSectionField(section.sectionId, "file", section.file);
    }
    updateSectionField(section.sectionId, "uploading", false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm"
    >
      <h2 className="text-lg font-semibold mb-4">
        Create <span className="text-primary">{kind.toUpperCase()}</span>{" "}
        Section For <span className="text-primary">{page.toUpperCase()}</span>{" "}
        Page
      </h2>

      {sections.map((section) => (
        <div
          key={section.sectionId}
          className="flex gap-4 w-full border rounded-lg p-4 bg-white shadow-sm relative"
        >
          {/* Delete button */}
          <button
            type="button"
            onClick={() => removeSection(section.sectionId)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg"
          >
            X
          </button>

          <div className="w-full space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                value={section.title}
                onChange={(e) =>
                  updateSectionField(section.sectionId, "title", e.target.value)
                }
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Button Name
              </label>
              <input
                type="text"
                placeholder="Enter Button Name"
                value={section.buttonName}
                onChange={(e) =>
                  updateSectionField(
                    section.sectionId,
                    "buttonName",
                    e.target.value
                  )
                }
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter Description"
                value={section.description}
                onChange={(e) =>
                  updateSectionField(
                    section.sectionId,
                    "description",
                    e.target.value
                  )
                }
                className="w-full rounded-md border px-3 py-2 text-sm h-28 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Image
              </label>
              <div
                className="border-2 border-dashed border-purple-400 rounded-md flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-purple-50"
                onClick={() =>
                  fileInputsRef.current[section.sectionId]?.click()
                }
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files.length > 0) {
                    updateSectionField(
                      section.sectionId,
                      "file",
                      e.dataTransfer.files[0]
                    );
                  }
                }}
              >
                <svg
                  className="w-10 h-10 text-purple-500 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16V4m0 12l-4-4m4 4l4-4M4 16h16"
                  />
                </svg>
                <p className="text-gray-500 text-sm">
                  Drop Image here or click to upload.
                </p>
              </div>

              <input
                ref={(el) => {
                  fileInputsRef.current[section.sectionId] = el;
                }}
                id={`file-input-${section.sectionId}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) updateSectionField(section.sectionId, "file", file);
                }}
              />

              {section.image && (
                <div className="mt-3 flex flex-col items-center gap-2">
                  <img
                    src={section.image ?? section.imgUrl}
                    alt="Uploaded"
                    className="h-20 w-auto object-contain rounded-md"
                  />
                  {/* Confirm button */}
                  <button
                    type="button"
                    onClick={() => handleConfirmImage(section)}
                    disabled={section.uploading || !!section.imgUrl}
                    className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {section.uploading ? "Uploading..." : "Confirm"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* State Selector */}
          <div className="flex justify-end">
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select
                value={section.state}
                onChange={(e) =>
                  updateSectionField(section.sectionId, "state", e.target.value)
                }
                className={`px-4 py-2 rounded-md text-white font-medium ${
                  section.state === "Unpublished"
                    ? "bg-red-600"
                    : "bg-green-600"
                }`}
              >
                <option value="Unpublished">Unpublished</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      {/* Add More */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addSection}
          className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Add More
        </button>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="cursor-pointer w-full py-3 rounded-md bg-green-600 text-white text-lg font-medium hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CreateHeroSectionForm;
