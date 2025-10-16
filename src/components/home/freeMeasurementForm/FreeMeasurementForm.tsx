"use client";

import Image from "next/image";
import { useState } from "react";

export default function FreeMeasurementSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  return (
    <section className="w-full bg-[#EAF3F4] flex justify-center items-center py-10 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full">
        {/* Left Side - Window Image */}
        <div className="relative w-full md:w-[45%] flex justify-center md:justify-end">
          <Image
            src="/assets/window-sample.png" // <-- replace with your image path
            alt="Open Window"
            width={520}
            height={320}
            className="object-contain"
            priority
          />
        </div>

        {/* Right Side - Form */}
        <div className="relative bg-[#102C2D] rounded-xl md:rounded-l-none md:rounded-r-xl p-8 md:p-10 w-full md:w-[55%] text-white shadow-lg -mt-6 md:mt-0 md:-ml-6">
          <h2 className="text-2xl md:text-[22px] font-bold mb-6">
            Запишитесь на бесплатный замер
          </h2>

          <form className="flex flex-col gap-5">
            {/* Inputs Row */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full md:w-1/2 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />

              <input
                type="tel"
                placeholder="+7(123)456-78-90"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full md:w-1/2 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>

            {/* Checkbox + Label */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="accent-[#4CAF50] mt-[3px] w-4 h-4"
              />
              <label htmlFor="agree" className="leading-tight">
                Даю согласие на обработку{" "}
                <a href="#" className="underline text-[#4CAF50] hover:text-[#43a047]">
                  персональных данных
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-[#4CAF50] hover:bg-[#43a047] transition-all px-8 py-3 rounded-md font-semibold text-white shadow-md"
              >
                Записаться
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
