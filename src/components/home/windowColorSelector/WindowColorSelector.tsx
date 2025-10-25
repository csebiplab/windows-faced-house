"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Utility for conditional class merging
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// 🟢 Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<string, string> = {
      default: "bg-green-500 text-white hover:bg-green-600",
      outline:
        "border border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-gray-900",
      ghost: "text-gray-700 hover:bg-gray-100",
    };

    const sizes: Record<string, string> = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-5 text-base",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// 🪟 Interfaces
interface ColorOption {
  id: string;
  label: string;
  color: string; // actual color code
  image: string; // image for that color
}

interface WindowItem {
  id: string;
  category: string;
  title: string;
  description: string;
  availableSystems?: string[];
  price: number;
  currency: string;
  badge?: string;
  priceNote?: string;
  colors: ColorOption[];
}

interface WindowColorSelectorProps {
  title: string;
  items: WindowItem[];
}

const tabs = [
  { id: "Cool Colours", label: "Cool Colours" },
  { id: "lamination", label: "Ламинация" },
];

// 🧠 Main Component
const WindowColorSelector: React.FC<WindowColorSelectorProps> = ({
  title,
  items,
}) => {
  const [activeTab, setActiveTab] = useState(items[0]?.category ?? "");
  const [activeColor, setActiveColor] = useState("");
  const [activeImg, setActiveImg] = useState("");

  const activeItem = items.find((i) => i.category === activeTab);

  // Reset color + image whenever the active tab changes
  useEffect(() => {
    if (activeItem?.colors?.length) {
      setActiveColor(activeItem.colors[0].id);
      setActiveImg(activeItem.colors[0].image);
    }
  }, [activeItem]);

  if (!activeItem) return null;

  const handleColorSelect = (id: string, image: string) => {
    setActiveColor(id);
    setActiveImg(image);
  };

  return (
    <section className="bg-[#e8f1f4]">
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-10 lg:px-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {title} <span className="text-gray-900">Melke</span>
          </h2>

          {/* Tabs */}
          <div className="mt-4 flex justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-sm flex flex-col lg:flex-row overflow-hidden transition-all duration-300">
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6">
            {activeImg && (
              <Image
                src={activeImg}
                alt={`${activeItem.title} window`}
                width={500}
                height={500}
                className="object-contain w-full h-auto max-w-md transition-transform duration-300"
              />
            )}
          </div>

          {/* Right Side - Details */}
          <div className="w-full lg:w-1/2 p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {activeItem.title}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-5 text-sm md:text-base">
              {activeItem.description}
            </p>

            {(activeItem.availableSystems?.length ?? 0) > 0 && (
              <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                Доступно для систем:{" "}
                <strong>{activeItem.availableSystems?.join(", ") ?? ""}</strong>
              </p>
            )}

            <div className="flex items-center gap-3 mb-4">
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                {activeItem.price} {activeItem.currency}
              </p>
              {activeItem.badge && (
                <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                  {activeItem.badge}
                </span>
              )}
            </div>

            {activeItem.priceNote && (
              <p className="text-xs text-gray-500 mb-4">
                {activeItem.priceNote}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button className="bg-[#e91e63] hover:bg-[#d81b60] text-white">
                Заказать расчет
              </Button>
              <Button variant="outline" className="border-gray-400">
                Подробнее
              </Button>
            </div>

            {/* Color Options */}
            <div className="flex flex-wrap gap-3">
              {activeItem.colors.map((clr) => (
                <div
                  key={clr.id}
                  onClick={() => handleColorSelect(clr.id, clr.image)}
                  className={cn(
                    "cursor-pointer rounded-xl border-2 overflow-hidden transition-all hover:scale-105",
                    activeColor === clr.id
                      ? "border-green-500"
                      : "border-transparent"
                  )}
                >
                  <div
                    className="w-20 h-16 md:w-24 md:h-20"
                    style={{ backgroundColor: clr.color }}
                  />
                  <p className="text-center text-xs md:text-sm py-1">
                    {clr.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WindowColorSelector;
