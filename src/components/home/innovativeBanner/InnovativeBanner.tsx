"use client";

import { Play } from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: 1,
    icon: "A",
    title: "Профили класса A",
    text: "Толщина стенок профиля 3 мм даже в бюджетных сериях. Обеспечивает прочность и долговечность конструкции.",
  },
  {
    id: 2,
    icon: "🏭",
    title: "Технология CO-EX",
    text: "Двухкомпонентное экструзирование повышает устойчивость к УФ-лучам и температурным колебаниям.",
  },
  {
    id: 3,
    icon: "⚙️",
    title: "Фурнитура FUTURUSS",
    text: "Выдерживает до 20 000 циклов открывания/закрывания без потери функциональности.",
  },
  {
    id: 4,
    icon: "🔋",
    title: "Стеклопакеты Climatherm",
    text: "Сохраняют тепло лучше стандартных двухкамерных стеклопакетов.",
  },
  {
    id: 5,
    icon: "✨",
    title: "Глянцевая поверхность профиля",
    text: "Стойкость цвета сохраняется до 40 лет. Профили не желтеют и не покрываются трещинами.",
  },
  {
    id: 6,
    icon: "🛡️",
    title: "Гарантийные обязательства",
    text: "25 лет на профиль, 5 лет на монтажные работы, 3 года на фурнитуру. Все условия прописаны в договоре.",
  },
];

export default function InnovativeBanner() {
  return (
    <section className="bg-[#eaf3f6] py-10 px-4 flex flex-col items-center">
      {/* Banner */}
      <div className="relative w-full max-w-7xl rounded-2xl overflow-hidden group mb-10">
        <Image
          src="/assets/innovativeBannerImageBg.png"
          alt="Innovative Profiles"
          width={1200}
          height={400}
          className="object-cover w-full h-56 md:h-72 lg:h-80 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Text + Play Button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2">
            Инновационные профили Мелке
          </h2>
          <p className="text-sm md:text-base mb-4">
            Экологичная технология производства оконных профилей
          </p>
          <button className="bg-white text-black p-3 rounded-full shadow-lg hover:scale-105 transition">
            <Play className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {features.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col items-start"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-lime-500 text-white text-lg font-bold mb-4">
              {item.icon}
            </div>
            <h3 className="text-gray-800 font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-snug">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
