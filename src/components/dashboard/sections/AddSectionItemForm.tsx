"use client";
import InputField from "@/components/ui/inputs/InputField";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Option = {
  label: string;
  value: string;
};

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
  const [sectionTitle, setSectionTitle] = useState("");
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/options-with-label-and-value?optFor=${query}`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data: any = await res.json();
        setOptions(data?.data ?? []);
      } catch (err) {
        console.error("Failed to fetch options:", err);
        setOptions([]);
      }
    };

    loadData();
  }, [query]);

  const handleSelect = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const value = e.target.value;
    const option = options.find((o) => o.value === value);

    if (option && !selectedItems.some((p) => p.value === option.value)) {
      setSelectedItems((prev) => [...prev, option]);
    }
  };

  const removeSelected = (value: string) => {
    setSelectedItems((prev) => prev.filter((p) => p.value !== value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!page || !kind) {
      toast.error("Page and Kind are required!");
      return;
    }

    if (!sectionTitle.trim()) {
      toast.error("Section title is required!");
      return;
    }

    if (selectedItems.length === 0) {
      toast.error("Please select at least one item!");
      return;
    }

    const payload = {
      page,
      kind,
      title: sectionTitle,
      items: selectedItems.map((p) => p.value),
    };

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/sections`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save section");

      toast.success("Section saved successfully!");
      setSectionTitle("");
      setSelectedItems([]);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Section Title"
        name="title"
        value={sectionTitle}
        onChange={(e) => setSectionTitle(e.target.value)}
        placeholder="Enter Section title"
      />

      {/* Single select for adding products */}
      <InputField
        label={`Choose ${itemLabel}`}
        name="product"
        type="select"
        value=""
        onChange={handleSelect}
        options={[{ label: `Select a ${itemLabel}`, value: "" }, ...options]}
        required={false}
      />

      {/* Show selected products */}
      {selectedItems.length > 0 && (
        <div className="mt-3 space-y-1">
          <p className="font-semibold text-base">Selected Items:</p>
          <ul className="list-disc list-inside text-gray-700">
            {selectedItems.map((item) => (
              <li key={item.value} className="flex items-center gap-2">
                {item.label}
                <button
                  type="button"
                  onClick={() => removeSelected(item.value)}
                  className="text-red-500 text-sm hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit button */}
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
