"use client";

import { useState } from "react";
import Image from "next/image";

export default function DownloadCatalog() {
  const [phone, setPhone] = useState("");

  return (
    <section className="bg-[#eef4f6] flex justify-center items-center py-16 px-4">
      <div className="bg-[#5a5e5e] rounded-[20px] w-full max-w-6xl px-8 md:px-12 py-10 md:py-12 text-white">
        {/* Header */}
        <h2 className="text-[26px] md:text-[32px] font-semibold leading-tight mb-2">
          Скачайте каталог <br className="hidden md:block" />
          вариантов остекления
        </h2>
        <p className="text-sm md:text-base text-gray-200 mb-8">
          С примерами и ценами + прайс-лист на услуги
        </p>

        {/* WhatsApp Info */}
        <div className="flex items-center gap-2 mb-3">
          <Image
            src="/assets/downloadCatalogLogo.png"
            alt="whatsapp"
            width={22}
            height={22}
            className="inline-block"
          />
          <span className="text-sm md:text-base">Вышлем на WhatsApp</span>
        </div>

        {/* Phone Input */}
        <div className="mb-8">
          <label
            htmlFor="phone"
            className="block text-xs text-gray-300 mb-2"
          >
            Ваш телефон*
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full max-w-[340px] p-3 rounded-md text-black text-sm outline-none focus:ring-2 focus:ring-[#6ed231]"
          />
        </div>

        {/* Button + Checkbox */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button className="bg-[#6ed231] hover:bg-[#62c02c] transition-all text-black text-sm font-semibold px-6 py-3 rounded-md w-full sm:w-auto">
            Запросить каталог
          </button>

          <label className="flex items-start gap-2 text-[11px] leading-tight text-gray-300">
            <input
              type="checkbox"
              className="accent-[#6ed231] mt-[2px] cursor-pointer"
            />
            <span>Даю согласие на обработку персональных данных</span>
          </label>
        </div>
      </div>
    </section>
  );
}
