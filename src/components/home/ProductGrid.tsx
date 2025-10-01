"use client";

import Image from "next/image";

type CardItem = {
  id: number;
  title: string;
  description: string[];
  price: string;
  image: string;
};

const items: CardItem[] = [
  {
    id: 1,
    title: "ПЛАСТИКОВЫЕ ОКНА MELKE",
    description: [
      "Melke Centrum",
      "Melke Wide",
      "Melke Evolution",
      "Melke Smart Ultra",
      "Melke Like 70",
      "Melke Line 60",
      "Готовые окна",
      "Нестандартные окна",
      "В Подмосковье",
    ],
    price: "от 11 570 ₽/м²",
    image: "/assets/ProductGridImage1.png",
  },
  {
    id: 2,
    title: "КОТТЕДЖИ И ДАЧИ",
    description: [
      "Остекление коттеджей и домов",
      "Остекление беседок",
      "Дачное остекление",
    ],
    price: "от 12 354 ₽/м²",
    image: "/assets/ProductGridImage2.png",
  },
  {
    id: 3,
    title: "АЛЮМИНИЕВЫЕ КОНСТРУКЦИИ",
    description: [
      "Порталы",
      "Холодные системы",
      "Тёплые системы",
      "Фасадное остекление",
    ],
    price: "от 27 489 ₽/м²",
    image: "/assets/ProductGridImage3.png",
  },
  {
    id: 4,
    title: "БАЛКОНЫ И ЛОДЖИИ",
    description: [
      "Теплое остекление",
      "Холодное алюминиевое остекление",
      "Французское остекление",
      "Балконы с выносом",
      "Балконы с крышей",
      "Отделка балконов и лоджий",
      "Балконные блоки",
    ],
    price: "от 13 680 ₽/м²",
    image: "/assets/ProductGridImage4.png",
  },
  {
    id: 5,
    title: "ДВЕРИ",
    description: [
      "Входные двери",
      "Межкомнатные двери",
      "Раздвижные двери PSK портал",
      "Балконные двери",
    ],
    price: "от 13 560 ₽/м²",
    image: "/assets/ProductGridImage5.png",
  },
];

export default function ProductGrid() {
  return (
    <section className="bg-[#e9f4f7] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Пластиковые окна Melke от производителя в Москве
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            if (index === 0) {
              // First card special layout
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Left side text */}
                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                      <ul className="space-y-1 text-sm text-gray-700 mb-4">
                        {item.description.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                      <p className="font-semibold text-lg">{item.price}</p>
                    </div>
                  </div>
                  {/* Right side image */}
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            }

            if (index === 3) {
              // 4th card special layout (image first, then text)
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm flex flex-col"
                >
                  {/* Image on top */}
                  <div className="relative w-full h-36 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Text below */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                    <ul className="space-y-1 text-sm text-gray-700 mb-4">
                      {item.description.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                    <p className="font-semibold text-lg">{item.price}</p>
                  </div>
                </div>
              );
            }

            // Other cards normal layout
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm flex flex-col justify-between"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                  <ul className="space-y-1 text-sm text-gray-700 mb-4">
                    {item.description.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                  <p className="font-semibold text-lg">{item.price}</p>
                </div>
                <div className="relative w-full h-48 mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
