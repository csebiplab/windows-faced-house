"use client";

import React from "react";

type Item = {
  title: string;
  desc: string;
};

const technologyItems: Item[] = [
  {
    title: "Передовые технологии для современного дома",
    desc: "В производстве используются профильные системы Mline и прочное стекло Larta Glass. Профили Mline производятся по технологии COEX, или двойной экструзии. Конструкция сочетает в себе два ПВХ: первичный пластик формирует внешний слой, вторичный — внутренний. Такая комбинация увеличивает долговечность и устойчивость конструкции к износу.",
  },
  {
    title: "Разнообразие окон",
    desc: "В нашем каталоге представлено 6 видов оконных систем с различной глубиной монтажа, количеством камер, теплоизоляционными свойствами и стоимостью. Все модели, даже экономкласса, соответствуют классу А — имеют толщину внешней стенки 3 мм. Это обеспечивает надежность конструкции и отличную шумоизоляцию.",
  },
  {
    title: "Качество поверхности профилей: эстетика и долговечность",
    desc: "Внешний слой профиля представляет собой исключительно чистое окно из ПВХ, доктора титана и других компонентов, улучшающих его отражающие свойства. Низкое содержание микропылей (до 1%) делает поверхность плотной, устойчивой к ультрафиолету и загрязнениям. Это препятствует возникновению трещин и сохраняет безупречный внешний вид окон на долгие годы.",
  },
];

const TechnologySection = () => {
  // Function to split title by colon (if exists)
  const formatTitle = (title: string) => {
    const parts = title.split(":");
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}: <br />
          {parts[1].trim()}
        </>
      );
    }
    return title;
  };

  return (
    <section className="w-full bg-[#e9f3f6] py-12 md:py-20 flex justify-center">
      <div className="w-[92%] md:w-[80%] max-w-6xl space-y-12">
        {technologyItems.map((item, index) => (
          <div key={index}>
            <h2 className="text-2xl md:text-[44px] font-bold text-[#0b1b2b] mb-3 leading-snug text-center">
              {formatTitle(item.title)}
            </h2>
            <p className="text-[#0b1b2b]/80 leading-relaxed text-sm md:text-lg">
              {item.desc}
            </p>
            <div className="w-20 h-2 bg-[#7aff7a] rounded-full mt-3"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologySection;
