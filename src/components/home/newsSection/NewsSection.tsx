"use client";

import Image from "next/image";

export default function NewsSection() {
  const newsItems = [
    {
      id: 1,
      title: "Melke в Forbes",
      date: "01.12.2025",
      description:
        "Владимир Платонов и Melke в Forbes! Платформа для умного управления энергопотреблением...",
      image: "/images/news1.jpg",
    },
    {
      id: 2,
      title: "Продажи Melke Smart Ultra 65",
      date: "01.12.2025",
      description:
        "Платформа Melke объявляет о старте продаж инновационной модели Melke Smart Ultra 65...",
      image: "/images/news2.jpg",
    },
    {
      id: 3,
      title: "Melke Cool Colours уже в продаже",
      date: "12.12.2025",
      description:
        "Melke Cool Colours — революционное решение для интерьеров и фасадов. Новая серия...",
      image: "/images/news3.jpg",
    },
    {
      id: 4,
      title: "Закаленное стекло собственного производства",
      date: "9.12.2025",
      description:
        "В декабре 2025 года на площадке IT-Кластера Melke запущено собственное производство стекла...",
      image: "/images/news4.jpg",
    },
  ];

  return (
    <div className="bg-[#E8F4F8]">
        <div className="py-16 max-w-6xl mx-auto px-4 sm:px-8 lg:px-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-900">
        Наши новости
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden transition-transform hover:scale-[1.01]"
          >
            <div className="relative w-full h-48 bg-gray-900">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{item.date}</p>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
