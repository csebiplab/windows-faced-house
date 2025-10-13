"use client";
import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: "text" | "number" | "textarea" | "select" | "checkbox";
  value: any;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  options?: { label: string; value: string }[];
  placeholder?: string;
  required?: boolean;
  // For checkbox: optional extra input triggered when checked
  extraInput?: {
    label: string;
    name: string;
    type: "text" | "number" | "textarea";
    placeholder?: string;
  };
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  options,
  placeholder,
  required = true,
  extraInput,
}) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange(e);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>

      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full h-32 border rounded-md p-2"
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full h-12 border rounded-md p-2"
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "checkbox" ? (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={handleCheckboxChange}
            className="h-4 w-4"
          />
          <span>{placeholder || label}</span>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full h-12 border rounded-md p-2"
        />
      )}

      {/* Render extra input if checkbox is checked */}
      {type === "checkbox" && extraInput && checked && (
        <div className="mt-2">
          <InputField {...extraInput} value={value} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default InputField;
