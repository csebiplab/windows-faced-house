"use client";
import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: "text" | "number" | "textarea" | "select";
  value: any;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  options?: { label: string; value: string }[];
  placeholder?: string;
  required?: boolean;
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
}) => {
  return (
    <div>
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
    </div>
  );
};

export default InputField;
