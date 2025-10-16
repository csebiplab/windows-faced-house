"use client";

import { FaArrowDown } from "react-icons/fa";

const ImportantParameters = () => {
  const parameters = [
    { title: "Особенности эксплуатации" },
    { title: "Внешний вид и стиль" },
    { title: "Ценовые факторы" },
    { title: "Дополнительные опции для комфорта" },
  ];

  return (
    <div className="bg-[#EFF6F8]">
      <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-20 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#001B2E] mb-3">
          Выбор пластиковых окон: важные параметры
        </h2>
        <p className="text-sm md:text-base text-gray-700 mb-12 max-w-2xl mx-auto">
          Чтобы получить максимальную пользу от установки ПВХ-окон, необходимо
          учитывать ключевые факторы:
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {parameters.map((item, index) => (
            <div
              key={index}
              className="bg-white flex items-center justify-between px-6 py-6 rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-gray-900 text-left text-sm md:text-base">
                {item.title}
              </p>
              <span className="bg-[#47B400] text-white p-2 rounded-full">
                <FaArrowDown size={14} />
              </span>
            </div>
          ))}
        </div>

        {/* Bottom green line */}
        <div className="h-1 w-16 bg-[#47B400] mt-10 rounded-full" />
      </div>
    </div>
  );
};

export default ImportantParameters;
