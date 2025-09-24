"use client";

import { useState } from "react";

interface CreateHeroSectionFormProps {
  kind: string;
  page: string;
}

const CreateHeroSectionForm = ({ kind, page }: CreateHeroSectionFormProps) => {
  const [sections, setSections] = useState([
    { id: Date.now(), state: "Unpublished" },
  ]);

  const addSection = () => {
    setSections([...sections, { id: Date.now(), state: "Unpublished" }]);
  };

  const removeSection = (id: number) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const updateState = (id: number, newState: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, state: newState } : s))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with sections:", sections);
    // TODO: collect input values from refs/state if needed
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
          key={section.id}
          className="flex gap-4 w-full border rounded-lg p-4 bg-white shadow-sm relative"
        >
          {/* Delete button (top-right corner) */}
          <button
            type="button"
            onClick={() => removeSection(section.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg"
          >
            ×
          </button>

          <div className="w-full space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Button Name
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter Button Name"
                  className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter Description"
                className="w-full rounded-md border px-3 py-2 text-sm h-28 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Image
              </label>
              <div className="border-2 border-dashed border-purple-400 rounded-md flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-purple-50">
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
                  Drop files here or click to upload.
                </p>
              </div>
            </div>
          </div>

          {/* State Selector */}
          <div className="flex justify-end">
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select
                value={section.state}
                onChange={(e) => updateState(section.id, e.target.value)}
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

      {/* Add More Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addSection}
          className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Add More
        </button>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full py-3 rounded-md bg-green-600 text-white text-lg font-medium hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateHeroSectionForm;
