"use client";

import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

const cooperationMenu = [
  "Дилерская программа",
  "Франшиза",
  "Поставщикам",
  "Партнерство",
];

const CustomIcon = ({ size = 24, kind }: { size?: number; kind: string }) => {
  switch (kind) {
    case "whatsapp":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 25 24"
          fill="none"
        >
          <mask
            id="mask0_1_2331"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="25"
            height="24"
          >
            <path d="M24.3157 0H0.310059V24H24.3157V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_1_2331)">
            <path
              d="M12.3134 0C5.68355 0 0.310059 5.37349 0.310059 12.0024C0.310059 18.6284 5.68165 23.999 12.3067 23.999H12.3181C18.9441 23.999 24.3147 18.6275 24.3147 12.0024C24.3157 5.37349 18.9422 0 12.3134 0Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.4232 5.85596C9.1178 5.85596 6.43767 8.53609 6.43767 11.8415C6.43767 12.972 6.75176 14.0297 7.29668 14.9322L6.21631 18.144L9.53026 17.0836C10.3883 17.5574 11.3741 17.828 12.4232 17.828C15.7297 17.828 18.4088 15.148 18.4088 11.8425C18.4088 8.53704 15.7287 5.85596 12.4232 5.85596ZM12.4232 16.8244C11.411 16.8244 10.4687 16.5206 9.68163 16.0003L7.76685 16.6134L8.38935 14.7629C7.7924 13.9408 7.44048 12.9323 7.44048 11.8415C7.44048 9.09425 9.67596 6.85877 12.4232 6.85877C15.1705 6.85877 17.406 9.09425 17.406 11.8415C17.406 14.5889 15.1705 16.8244 12.4232 16.8244ZM15.2301 13.2019C15.0798 13.1196 14.3427 12.7223 14.2046 12.6655C14.0665 12.6097 13.9653 12.5804 13.8575 12.7289C13.7496 12.8774 13.4441 13.2104 13.3513 13.3098C13.2587 13.4082 13.1688 13.4177 13.0183 13.3354C12.8688 13.253 12.3825 13.0733 11.8178 12.5312C11.3788 12.1093 11.0912 11.5975 11.007 11.4414C10.9238 11.2853 11.007 11.2058 11.0855 11.132C11.1565 11.0658 11.2454 10.9589 11.3249 10.8728C11.4044 10.7867 11.4327 10.7243 11.4876 10.624C11.5425 10.5237 11.5207 10.4338 11.4848 10.3563C11.4498 10.2787 11.1716 9.51524 11.0562 9.20494C10.9408 8.89464 10.8112 8.941 10.7223 8.93722C10.6334 8.93437 10.5321 8.91734 10.43 8.91356C10.3278 8.90977 10.1613 8.94195 10.0156 9.08952C9.8699 9.23711 9.46121 9.59187 9.43283 10.344C9.40445 11.0951 9.92476 11.8425 9.9976 11.9475C10.0705 12.0526 10.991 13.6816 12.5207 14.3524C14.0514 15.0221 14.0589 14.8177 14.34 14.8026C14.6209 14.7875 15.2576 14.4668 15.3985 14.1149C15.5395 13.7629 15.5509 13.4574 15.5149 13.3921C15.4789 13.3268 15.3787 13.2842 15.2292 13.2029L15.2301 13.2019Z"
              fill="white"
            />
          </g>
        </svg>
      );

    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 25 24"
          fill="none"
        >
          <mask
            id="mask0_1_2340"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="25"
            height="24"
          >
            <path d="M24.3216 0H0.315918V24H24.3216V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_1_2340)">
            <path
              d="M12.3192 0C5.68941 0 0.315918 5.37349 0.315918 12.0024C0.315918 18.6284 5.68751 23.999 12.3126 23.999H12.324C18.95 23.999 24.3206 18.6275 24.3206 12.0024C24.3216 5.37349 18.9481 0 12.3192 0Z"
              fill="black"
            />
            <path
              d="M17.3381 7.08674L5.93742 11.4035C5.31399 11.5833 5.33386 12.1991 5.79458 12.3476L8.65066 13.2389L9.74333 16.5896C9.87578 16.9567 9.98457 17.0948 10.2116 17.0977C10.45 17.1006 10.5418 17.0135 10.7887 16.795C11.0791 16.5226 11.52 16.0939 12.2182 15.4157L15.1897 17.6114C15.7364 17.9132 16.131 17.7571 16.2672 17.1034L18.13 7.88899C18.3295 7.08864 17.8594 6.8493 17.3362 7.08674H17.3381ZM9.10002 13.0345L15.5946 8.95989C15.9143 8.74515 16.0146 8.98449 15.8708 9.15006L10.4812 13.9985L10.205 16.4184L9.10002 13.0345Z"
              fill="white"
            />
          </g>
        </svg>
      );
  }
};

const MiddleNav = () => {
  return (
    <div className="pb-3">
      <div className="mx-auto">
        <div className="flex items-center justify-between">
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
            <div className="hidden lg:block border-l border-[#B6C4C8] px-2 2x:px-3 3xl:px-4 5xl:px-5">
              <p className="text-[11px] text-black font-bold">
                Производитель №1 в России <br /> Основан в 2002 году
              </p>
            </div>
          </div>

          {/* Center - Services and Calculator */}
          <div className="flex items-center space-x-4">
            <div className="relative group hidden lg:block">
              <button className="flex items-center space-x-2 px-4 py-2 border-2 border-[#2C3245] rounded-[10px] hover:bg-gray-50 transition-colors">
                <span className="text-gray-800 font-medium">
                  Сотрудничество
                </span>
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

            <button className="hidden lg:block px-4 py-2 border-2 border-primary text-primary font-medium rounded-[10px] hover:bg-green-50 transition-colors">
              Калькулятор
            </button>

            {/* Custom icons (used twice) */}
            <div className="flex items-center space-x-2 border-none lg:border-r border-[#B6C4C8] px-2 2x:px-3 3xl:px-4 5xl:px-5">
              {["whatsapp", "telegram"].map((itm, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  <CustomIcon size={24} kind={itm} />
                </div>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Phone number */}
            <div className="text-right">
              <div className="text-xl font-bold text-gray-800">
                8 930 965 4568
              </div>
              <div className="text-sm text-gray-600">
                Москва с 9:00 до 21:00
              </div>
            </div>

            {/* Call button */}
            <button className="cursor-pointer px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary transition-colors">
              Заказать звонок
            </button>
          </div>

          <div className="block lg:hidden">
            <Menu className="w-6 h-6" />
            <X />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleNav;
