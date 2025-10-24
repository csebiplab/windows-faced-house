"use client";

import React, { useState } from "react";
import Image from "next/image";

// ✅ Utility: className combiner
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// ✅ Reusable Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

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

// ✅ Main Component
const tabs = [
  { id: "cool", label: "Cool Colours" },
  { id: "lamination", label: "Ламинация" },
];

const colors = [
  { id: "onix", label: "Onix", color: "#1A1A1A", image: "/assets/onix.png" },
  {
    id: "grafit",
    label: "Графит",
    color: "#333333",
    image: "/assets/grafit.png",
  },
  { id: "tabak", label: "Табак", color: "#5B3A29", image: "/assets/tabak.png" },
  {
    id: "sangria",
    label: "Сангрия",
    color: "#5C1A1A",
    image: "/assets/sangria.png",
  },
];

const WindowColorSelector = () => {
  const [activeTab, setActiveTab] = useState("cool");
  const [activeColor, setActiveColor] = useState("onix");

  return (
    <div className="bg-[#e8f1f4] ">
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-10 lg:px-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Выбери цвет своего окна <span className="text-gray-900">Melke</span>
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
        <div className="bg-white rounded-3xl shadow-sm flex flex-col lg:flex-row overflow-hidden">
          {/* Left Side Image */}
          <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6">
            <Image
              src="/melke-window.png"
              alt="Window"
              width={500}
              height={500}
              className="object-contain w-full h-auto max-w-md"
            />
          </div>

          {/* Right Side Text */}
          <div className="w-full lg:w-1/2 p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Окна в покрытии <br />
              <span className="text-gray-900">Cool Colours</span>
            </h3>

            <p className="text-gray-600 leading-relaxed mb-5 text-sm md:text-base">
              Melke Cool Colours — инновационное полимерное покрытие из
              современного композита с отражением инфракрасного излучения,
              спаянного с ПВХ-основой, которое делает профиль более прочным и
              устойчивым к царапинам и загрязнениям.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
              Доступно для систем:{" "}
              <strong>Melke Smart Ultra, Melke Evolution</strong>
            </p>

            <div className="flex items-center gap-3 mb-4">
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                20 600 ₽
              </p>
              <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                Выгода
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button className="bg-[#e91e63] hover:bg-[#d81b60] text-white rounded-full px-6">
                Заказать расчет
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-gray-400 px-6"
              >
                Подробнее
              </Button>
            </div>

            {/* Color Options */}
            <div className="flex flex-wrap gap-3">
              {colors.map((clr) => (
                <div
                  key={clr.id}
                  onClick={() => setActiveColor(clr.id)}
                  className={cn(
                    "cursor-pointer rounded-xl border-2 overflow-hidden transition-all",
                    activeColor === clr.id
                      ? "border-green-500"
                      : "border-transparent"
                  )}
                >
                  <div
                    className="w-20 h-16 md:w-24 md:h-20"
                    style={{ backgroundColor: clr.color }}
                  ></div>
                  <p className="text-center text-xs md:text-sm py-1">
                    {clr.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowColorSelector;
