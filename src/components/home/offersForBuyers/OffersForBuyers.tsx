"use client";

import Image from "next/image";
import Link from "next/link";

type OfferCard = {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  image?: string;
  isGreen?: boolean;
};

export default function OffersForBuyers() {
  const cards: OfferCard[] = [
    {
      id: 1,
      title: "Калькулятор",
      description:
        "Оконный калькулятор — удобный инструмент для того, чтобы быстро и легко оценить примерную стоимость пластикового окна самостоятельно, не прибегая к консультации менеджера.",
      buttonText: "Рассчитать стоимость",
      href: "#",
      image: "/assets/calculator.png",
    },
    {
      id: 2,
      title: "Сотрудничество",
      description:
        "Стать надёжным партнёром, бесперебойным качественным поставщиком, предлагать конкурентоспособные цены, помогающие зарабатывать — вот миссия Компании, которую мы поддерживаем уже третий десяток лет.",
      buttonText: "Начать сотрудничество",
      href: "#",
    },
    {
      id: 3,
      title: "Статьи",
      description:
        "Хотите узнать больше полезной информации? Ознакомьтесь с нашими статьями.",
      buttonText: "Читать",
      href: "#",
      isGreen: true,
    },
    {
      id: 4,
      title: "Помощь в выборе",
      description:
        "Не можете определиться с нужным решением? Пройдите простой онлайн-тест и мы подберём лучшие варианты.",
      buttonText: "Пройти тест",
      href: "#",
    },
  ];

  return (
    <section className="bg-[#EAF3F5] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#001f2e] text-center mb-10">
          Предложения для покупателей
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${
                card.isGreen ? "bg-[#6EDC3A] text-white" : "bg-white text-black"
              } rounded-2xl shadow-sm p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md`}
            >
              {/* Card Content */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      card.isGreen ? "text-white" : "text-[#001f2e]"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      card.isGreen ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className={`inline-block font-semibold text-sm px-5 py-2 rounded-md transition-colors ${
                      card.isGreen
                        ? "bg-white text-[#6EDC3A] hover:bg-gray-100"
                        : "bg-[#6EDC3A] text-white hover:bg-[#59b52f]"
                    }`}
                  >
                    {card.buttonText}
                  </Link>
                </div>

                {/* Optional Image */}
                {card.image && (
                  <div className="relative w-full sm:w-[120px] h-[100px] sm:h-[140px] flex-shrink-0">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
