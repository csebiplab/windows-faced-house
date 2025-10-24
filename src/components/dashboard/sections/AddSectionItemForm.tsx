"use client";

import InputField from "@/components/ui/inputs/InputField";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type Option = { label: string; value: string };

export const AddSectionItemForm = ({
  kind,
  page,
  query = "services",
  itemLabel = "Product",
}: {
  kind: string;
  page: string;
  query?: string;
  itemLabel?: string;
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    sectionTitle: "",
    descriptionTop: "",
    descriptionBottom: "",
    footerTitle: "",
    footerDescription: "",
  });

  // Fetch options once per query
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/options-with-label-and-value?optFor=${query}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        console.log(data, "data");

        setOptions(data?.data ?? []);
      } catch (err) {
        console.error("Option fetch error:", err);
        toast.error("Failed to fetch options.");
        setOptions([]);
      }
    })();
  }, [query]);

  const handleChange = useCallback(
    (field: keyof typeof form, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      const option = options.find((o) => o.value === value);
      if (option && !selectedItems.some((p) => p.value === option.value)) {
        setSelectedItems((prev) => [...prev, option]);
      }
    },
    [options, selectedItems]
  );

  const removeSelected = useCallback((value: string) => {
    setSelectedItems((prev) => prev.filter((p) => p.value !== value));
  }, []);

  const validateForm = useCallback(() => {
    if (!page || !kind) return toast.error("Page and Kind are required!");
    if (!form.sectionTitle.trim())
      return toast.error("Section title is required!");
    if (selectedItems.length === 0)
      return toast.error(`Please select at least one ${itemLabel}!`);
    return true;
  }, [page, kind, form.sectionTitle, selectedItems, itemLabel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload: any = {
      page,
      kind,
      title: form.sectionTitle,
      items: selectedItems.map((p) => p.value),
    };

    if (kind === "WindowInstallationProcessSection") {
      Object.assign(payload, {
        descriptionTop: form.descriptionTop,
        descriptionBottom: form.descriptionBottom,
        footerTitle: form.footerTitle,
        footerDescription: form.footerDescription,
      });
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/sections`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save section");

      toast.success("Section saved successfully!");
      setForm({
        sectionTitle: "",
        descriptionTop: "",
        descriptionBottom: "",
        footerTitle: "",
        footerDescription: "",
      });
      setSelectedItems([]);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isWindowSection = useMemo(
    () => kind === "WindowInstallationProcessSection",
    [kind]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Section Title"
        name="title"
        value={form.sectionTitle}
        onChange={(e) => handleChange("sectionTitle", e.target.value)}
        placeholder="Enter section title"
        required={false}
      />

      {isWindowSection && (
        <InputField
          label="Description Top"
          name="descriptionTop"
          type="textarea"
          value={form.descriptionTop}
          onChange={(e) => handleChange("descriptionTop", e.target.value)}
          placeholder="Enter description"
        />
      )}

      <InputField
        label={`Choose ${itemLabel}`}
        name="product"
        type="select"
        value=""
        onChange={handleSelect}
        options={[{ label: `Select a ${itemLabel}`, value: "" }, ...options]}
        required={false}
      />

      {selectedItems.length > 0 && (
        <div className="mt-3 space-y-1">
          <p className="font-semibold text-base">Selected {itemLabel}s:</p>
          <ul className="list-disc list-inside text-gray-700">
            {selectedItems.map((item) => (
              <li key={item.value} className="flex items-center gap-2">
                {item.label}
                <button
                  type="button"
                  onClick={() => removeSelected(item.value)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isWindowSection && (
        <div className="space-y-4">
          <InputField
            label="Description Bottom"
            name="descriptionBottom"
            type="textarea"
            value={form.descriptionBottom}
            onChange={(e) => handleChange("descriptionBottom", e.target.value)}
            placeholder="Enter description"
          />
          <InputField
            label="Footer Title"
            name="footerTitle"
            value={form.footerTitle}
            onChange={(e) => handleChange("footerTitle", e.target.value)}
            placeholder="Enter footer title"
          />
          <InputField
            label="Footer Description"
            name="footerDescription"
            value={form.footerDescription}
            onChange={(e) => handleChange("footerDescription", e.target.value)}
            placeholder="Enter footer description"
          />
        </div>
      )}

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
