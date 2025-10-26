"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import InputField from "@/components/ui/inputs/InputField";
import VideoUpload from "@/components/ui/inputs/VideoUpload";
import { useVideoUpload } from "@/hooks/useVideoUpload";

type ReviewType = "text" | "video";

interface ReviewFormData {
  type: ReviewType;
  name: string;
  rating: number;
  content?: string;
  videoUrl?: string;
}

const blankForm: ReviewFormData[] = [{ type: "text", name: "", rating: 5 }];

export default function AddReviewForm() {
  const { uploadVideo, uploading } = useVideoUpload();
  const [reviews, setReviews] = useState<ReviewFormData[]>(blankForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** ✅ Handle Input Changes */
  const handleChange = (
    index: number,
    field: keyof ReviewFormData,
    value: string | number
  ) => {
    const updated = [...reviews];
    (updated[index] as any)[field] = value;
    setReviews(updated);
  };

  /** ✅ Handle Video Upload */
  const handleVideoConfirm = async (index: number, files: File | File[]) => {
    const file = Array.isArray(files) ? files[0] : files;
    const url = await uploadVideo(file);
    if (url) handleChange(index, "videoUrl", url);
  };

  /** ✅ Add a new empty review form */
  const handleAddReview = () => {
    setReviews((prev) => [
      ...prev,
      { type: "text", name: "", rating: 5, content: "" },
    ]);
  };

  /** ✅ Submit all reviews at once */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = reviews.map((r) =>
        r.type === "text"
          ? { type: r.type, name: r.name, rating: r.rating, content: r.content }
          : {
              type: r.type,
              name: r.name,
              rating: r.rating,
              videoUrl: r.videoUrl,
            }
      );

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("✅ Reviews created successfully!");
        setReviews(blankForm);
      } else {
        toast.error("❌ Failed to create reviews");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 space-y-8"
    >
      {reviews.map((review, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 relative"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Review #{index + 1}</h3>
          </div>

          <InputField
            label="Select Review Type"
            name={`type-${index}`}
            type="select"
            value={review.type}
            onChange={(e) =>
              handleChange(index, "type", e.target.value as ReviewType)
            }
            options={[
              { label: "Text Review", value: "text" },
              { label: "Video Review", value: "video" },
            ]}
          />

          <InputField
            label="Name"
            name={`name-${index}`}
            value={review.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            placeholder="Enter reviewer name"
            required
          />

          <InputField
            label="Rating (1–5)"
            name={`rating-${index}`}
            type="number"
            value={review.rating}
            onChange={(e) =>
              handleChange(index, "rating", Number(e.target.value))
            }
          />

          {review.type === "text" ? (
            <InputField
              label="Review Content"
              name={`content-${index}`}
              type="textarea"
              value={review.content || ""}
              onChange={(e) => handleChange(index, "content", e.target.value)}
              placeholder="Write your review..."
              required
            />
          ) : (
            <VideoUpload
              label="Upload Review Video"
              value={review.videoUrl || ""}
              onConfirm={(files) => handleVideoConfirm(index, files)}
              onFileChange={() => handleChange(index, "videoUrl", "")}
              disabled={!!review.videoUrl}
              uploading={uploading}
              allowMultiple={false}
            />
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleAddReview}
          className="text-blue-600 hover:underline font-medium"
        >
          ➕ Add Another Review
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit All Reviews"}
        </button>
      </div>
    </form>
  );
}
