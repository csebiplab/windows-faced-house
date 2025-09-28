"use client";

import Image from "next/image";
import { ChevronDown, MessageCircle, Send } from "lucide-react";

const cooperationMenu = [
  "Дилерская программа",
  "Франшиза",
  "Поставщикам",
  "Партнерство",
];

const MiddleNav = () => {
  return (
    <div className="hidden lg:block">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Logo and company info */}
        <div className="flex items-center space-x-4">
          {/* Logo (responsive) */}
          <div className="flex items-center">
            {/* Large logo for lg+ */}
            <div className="hidden lg:block">
              <Image
                src="/brand-lg.png"
                alt="Brand Logo"
                width={61}
                height={61}
                className="rounded-lg"
                priority
              />
            </div>
            {/* Small logo for below lg */}
            <div className="block lg:hidden">
              <Image
                src="/brand-sm.png"
                alt="Brand Small Logo"
                width={49}
                height={49}
                className="rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Company description */}
          <div className="border-l border-[#B6C4C8] px-2 2x:px-3 3xl:px-4 5xl:px-5">
            <p className="text-[11px] text-black font-bold">
              Производитель №1 в России <br /> Основан в 2002 году
            </p>
          </div>
        </div>

        {/* Center - Services and Calculator */}
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 border-2 border-[#2C3245] rounded-[10px] hover:bg-gray-50 transition-colors">
              <span className="text-gray-800 font-medium">Сотрудничество</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
            {/* Dropdown menu */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                {cooperationMenu.map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <button className="px-4 py-2 border-2 border-primary text-primary font-medium rounded-[10px] hover:bg-green-50 transition-colors">
            Калькулятор
          </button>

          <div className="flex items-center space-x-2 border-r border-[#B6C4C8] px-2 2x:px-3 3xl:px-4 5xl:px-5">
            {[
              { icon: MessageCircle, label: "WhatsApp" },
              { icon: Send, label: "Telegram" },
            ].map(({ icon: Icon, label }, idx) => (
              <div
                key={idx}
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
                title={label}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Social icons, phone, and call button */}
        <div className="flex items-center space-x-4">
          {/* Social icons */}

          {/* Phone number */}
          <div className="text-right">
            <div className="text-xl font-bold text-gray-800">
              8 930 965 4568
            </div>
            <div className="text-sm text-gray-600">Москва с 9:00 до 21:00</div>
          </div>

          {/* Call button */}
          <button className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors">
            Заказать звонок
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiddleNav;
