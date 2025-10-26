"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Phone,
  ClipboardCheck,
  FileText,
  Truck,
  CheckSquare,
  Smile,
} from "lucide-react";

export default function FreeMeasurement() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  const features = [
    {
      icon: <Phone className="w-8 h-8" />,
      text: "Перезвоним и ответим на все вопросы",
    },
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      text: "Произведём замер и подготовим расчёт",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      text: "Оформим заказ. Возможна рассрочка 0%",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      text: "Изготовим, привезём и установим за 7 дней",
    },
    {
      icon: <CheckSquare className="w-8 h-8" />,
      text: "Дадим гарантию на окна — 25 лет",
    },
    {
      icon: <Smile className="w-8 h-8" />,
      text: "Пожелаем отличного настроения!",
    },
  ];

  return (
    <section className="w-full bg-[#F3F8FA] py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-stretch gap-8">
        {/* Left Image (40%) */}
        <div className="relative w-full lg:w-[40%] flex justify-center items-center">
          <Image
            src="/assets/window-sample.png" // replace with your image
            alt="Window"
            width={600}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Right Form Section (60%) */}
        <div className="relative w-full lg:w-[60%] rounded-2xl overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/assets/bg-city.jpg" // replace with your background
              alt="City"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0B2239]/80" />
          </div>

          {/* Form Content */}
          <div className="relative z-10 p-8 sm:p-10 text-white h-full flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
              Запишитесь на бесплатный замер
            </h2>

            <form className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 p-3 rounded-md text-black placeholder:text-gray-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 p-3 rounded-md text-black placeholder:text-gray-500 focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="w-4 h-4 accent-pink-500"
                />
                Даю согласие на обработку персональных данных
              </label>

              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 transition-all text-white font-semibold px-6 py-3 rounded-md"
              >
                Записаться
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="max-w-7xl mx-auto mt-14 px-4">
        <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-center">
          А мы с радостью для вас:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="flex justify-center mb-3 text-[#0B2239]">
                {item.icon}
              </div>
              <p className="text-sm text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
