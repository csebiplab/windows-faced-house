"use client";
import React, { useRef, useState, useEffect } from "react";

interface ImageUploadProps {
  onConfirm: (files: File[] | File) => void;
  onFileChange?: () => void;
  disabled?: boolean;
  uploading?: boolean;
  value?: string | string[] | null;
  resetKey?: string | number;
  allowMultiple?: boolean;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onConfirm,
  onFileChange,
  disabled = false,
  uploading = false,
  resetKey,
  allowMultiple = false,
  label,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Reset when parent resets
  useEffect(() => {
    setFiles([]);
    setPreviews([]);
  }, [resetKey]);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      previews.forEach((p) => {
        if (p.startsWith("blob:")) URL.revokeObjectURL(p);
      });
    };
  }, [previews]);

  const handleFilesSelect = (selectedFiles: FileList) => {
    const newFiles = Array.from(selectedFiles);
    const updatedFiles = allowMultiple ? [...files, ...newFiles] : newFiles;
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    const updatedPreviews = allowMultiple
      ? [...previews, ...newPreviews]
      : newPreviews;

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onFileChange?.();
  };

  const confirmUpload = () => {
    onConfirm(allowMultiple ? files : files[0]);
  };

  const removeFile = (index: number) => {
    const previewToRemove = previews[index];
    if (previewToRemove.startsWith("blob:"))
      URL.revokeObjectURL(previewToRemove);

    const newFiles = [...files];
    const newPreviews = [...previews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setFiles(newFiles);
    setPreviews(newPreviews);
    onFileChange?.();
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      {label && (
        <label className="block font-medium text-gray-700 mb-1">{label}</label>
      )}

      {/* Upload Box */}
      <div
        className={`h-[40vh] border-2 border-dashed rounded-md flex flex-col items-center justify-center p-6 cursor-pointer transition
        ${disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-purple-50"}`}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled)
            e.currentTarget.classList.add("border-purple-500", "bg-purple-50");
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove("border-purple-500", "bg-purple-50");
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("border-purple-500", "bg-purple-50");
          if (!disabled && e.dataTransfer.files.length > 0) {
            handleFilesSelect(e.dataTransfer.files);
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
        <p className="text-gray-500 text-sm text-center">
          Drop image{allowMultiple ? "s" : ""} here or click to upload
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={allowMultiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFilesSelect(e.target.files);
        }}
      />

      {/* Previews */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center">
          {previews.map((p, i) => (
            <div key={i} className="relative">
              <img
                src={p}
                alt="Preview"
                className="max-h-40 object-contain rounded-md border"
              />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      {previews.length > 0 && (
        <div className="flex justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={confirmUpload}
            disabled={disabled || uploading}
            className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Confirm"}
          </button>
          <button
            type="button"
            onClick={() => {
              previews.forEach(
                (p) => p.startsWith("blob:") && URL.revokeObjectURL(p)
              );
              setPreviews([]);
              setFiles([]);
              onFileChange?.();
            }}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Remove All
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
