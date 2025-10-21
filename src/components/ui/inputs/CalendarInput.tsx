"use client";

import React from "react";
import DatePicker from "react-datepicker";
// @ts-ignore: allow importing global CSS without explicit type declarations
import "react-datepicker/dist/react-datepicker.css";

interface CalendarInputProps {
  label?: string;
  name?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  required?: boolean;
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <DatePicker
        id={name}
        selected={value}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select date"
        className="w-full h-12 border rounded-md p-2"
      />
    </div>
  );
};

export default CalendarInput;
