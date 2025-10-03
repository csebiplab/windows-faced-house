"use client";
import React, { useRef, useState } from "react";

interface ImageUploadProps {
  onConfirm: (file: File) => void;
  onFileChange?: () => void;
  disabled: boolean;
  uploading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onConfirm,
  onFileChange,
  disabled,
  uploading,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (newFile: File) => {
    setFile(newFile);
    setPreview(URL.createObjectURL(newFile));
    onFileChange?.();
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Upload Image</label>

      {/* Drop zone */}
      <div
        className="h-[40vh] border-2 border-dashed border-purple-400 rounded-md flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-purple-50"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
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

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) handleFileSelect(selectedFile);
        }}
      />

      {/* Preview + Confirm */}
      {preview && (
        <div className="mt-3 flex flex-col items-center gap-2">
          <img
            src={preview}
            alt="Uploaded preview"
            className="h-20 w-auto object-contain rounded-md"
          />
          <button
            type="button"
            onClick={() => {
              if (file) {
                onConfirm(file);
              }
            }}
            disabled={disabled || uploading}
            className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Confirm"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
