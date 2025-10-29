"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import InputField from "@/components/ui/inputs/InputField";
import ImageUpload from "@/components/ui/inputs/ImageUpload";
import { useImageUpload } from "@/hooks/useImageUpload";

interface CreateHeroSectionFormProps {
  kind: string;
  page: string;
}

interface InstallmentStep {
  stepNumber: number;
  title: string;
  description: string;
}

interface IInstallment {
  mainTitle: string;
  highlightTitle: string;
  duration: string;
  firstPayment: string;
  note: string;
  imageUrl: string | string[];
}

const blankForm = {
  mainTitle: "",
  highlightTitle: "",
  duration: "",
  firstPayment: "",
  note: "",
  imageUrl: "",
};

const CreateWindowInstallmentPlanSection = ({
  kind,
  page,
}: CreateHeroSectionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<IInstallment>(blankForm);

  const [steps, setSteps] = useState<InstallmentStep[]>([
    { stepNumber: 1, title: "", description: "" },
  ]);
  const { uploadImage, uploading } = useImageUpload();
  const [resetKey, setResetKey] = useState(0);

  const handleChange = useCallback(
    (field: keyof typeof form, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleStepChange = useCallback(
    (index: number, field: keyof InstallmentStep, value: string) => {
      setSteps((prev) =>
        prev.map((step, i) =>
          i === index ? { ...step, [field]: value } : step
        )
      );
    },
    []
  );

  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      { stepNumber: prev.length + 1, title: "", description: "" },
    ]);
  };

  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!page || !kind) return toast.error("Page and Kind are required!");
    if (!form.mainTitle.trim()) return toast.error("Main title is required!");
    if (!form.highlightTitle.trim())
      return toast.error("Highlight title is required!");
    if (!form.note.trim()) return toast.error("Note is required!");
    if (steps.length === 0) return toast.error("Please add at least one step!");
    for (const step of steps) {
      if (!step.title.trim() || !step.description.trim())
        return toast.error("Each step needs a title and description!");
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      page,
      kind,
      mainTitle: form.mainTitle,
      highlightTitle: form.highlightTitle,
      duration: form.duration,
      firstPayment: form.firstPayment,
      note: form.note,
      imageUrl: form.imageUrl,
      steps,
    };

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/sections`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save section");

      toast.success("Installment Plan Section saved successfully!");
      setForm(blankForm);
      setSteps([{ stepNumber: 1, title: "", description: "" }]);
      setResetKey((prev) => prev + 1);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
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

    if (uploadedUrls?.length) {
      setForm((prev) => ({
        ...prev,
        imageUrl: uploadedUrls.length === 1 ? uploadedUrls?.[0] : uploadedUrls,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        Create Installment Plan Section
      </h2>

      <InputField
        label="Main Title"
        name="mainTitle"
        value={form.mainTitle}
        onChange={(e) => handleChange("mainTitle", e.target.value)}
        placeholder="Пластиковые окна в рассрочку"
      />

      <InputField
        label="Highlight Title"
        name="highlightTitle"
        value={form.highlightTitle}
        onChange={(e) => handleChange("highlightTitle", e.target.value)}
        placeholder="Переплата"
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Duration"
          name="duration"
          value={form.duration}
          onChange={(e) => handleChange("duration", e.target.value)}
          placeholder="6 мес."
        />
        <InputField
          label="First Payment"
          name="firstPayment"
          value={form.firstPayment}
          onChange={(e) => handleChange("firstPayment", e.target.value)}
          placeholder="20%"
        />
      </div>

      <InputField
        label="Note"
        name="note"
        type="textarea"
        value={form.note}
        onChange={(e) => handleChange("note", e.target.value)}
        placeholder="Оплачивайте первоначальный взнос от 20%..."
      />

      <ImageUpload
        onConfirm={(files) => handleImageConfirm(files)}
        disabled={!!form?.imageUrl?.length}
        uploading={uploading}
        resetKey={resetKey}
        allowMultiple={false}
      />

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Steps</h3>
        {steps.map((step, index) => (
          <div
            key={index}
            className="border p-3 rounded-md bg-gray-50 relative space-y-2"
          >
            <p className="font-semibold">Step {step.stepNumber}</p>
            <InputField
              label="Step Title"
              name={`title-${index}`}
              value={step.title}
              onChange={(e) => handleStepChange(index, "title", e.target.value)}
              placeholder="Enter step title"
            />
            <InputField
              label="Step Description"
              name={`description-${index}`}
              type="textarea"
              value={step.description}
              onChange={(e) =>
                handleStepChange(index, "description", e.target.value)
              }
              placeholder="Enter step description"
            />
            {steps.length > 1 && (
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addStep}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Step
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Save Section"}
      </button>
    </form>
  );
};

export default CreateWindowInstallmentPlanSection;
