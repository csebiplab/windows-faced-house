"use client";

import Image from "next/image";

type Profile = {
  id: number;
  title: string;
  description: string;
  image: string;
  specs: {
    width: string;
    thickness: string;
    chambers: string;
    thermal: string;
    sound: string;
    class: string;
    price: string;
  };
  colors: string[];
  seals: string[];
  badge?: string;
  badgeColor?: string;
};

const profiles: Profile[] = [
  {
    id: 1,
    title: "Melke Centum",
    description: "Идеально для больших коттеджей",
    image: "/assets/windowSelectionImage1.png",
    specs: {
      width: "80/100",
      thickness: "до 50",
      chambers: "6/7/6",
      thermal: "1.23",
      sound: "55",
      class: "A+",
      price: "15 490 ₽",
    },
    colors: ["#dedede", "#c0a46b", "#5b2e00", "#3a3a3a"],
    seals: ["#000", "#fff", "#ccc"],
    badge: "Семейный выбор",
  },
  {
    id: 2,
    title: "Melke Wide",
    description: "Идеально для стильных загородных коттеджей",
    image: "/assets/windowSelectionImage2.png",
    specs: {
      width: "80/95",
      thickness: "до 42",
      chambers: "5/6/5",
      thermal: "1.12",
      sound: "55",
      class: "A+",
      price: "14 090 ₽",
    },
    colors: ["#dedede", "#c0a46b", "#5b2e00", "#3a3a3a"],
    seals: ["#000", "#fff", "#ccc"],
    badge: "Большие семьи",
  },
];

export default function MelkeProfileComparison() {
  return (
    <section className="bg-[#eaf3f6] py-12 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-[#0b132b] mb-10">
        Сравнение профилей Melke
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 max-w-[1600px] mx-auto">
        {profiles.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            {/* Image & Badge */}
            <div className="relative h-40">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              {item.badge && (
                <div
                  className="bg-[#2C3245] absolute -bottom-2 left-3 text-xs text-white font-semibold px-3 py-1 rounded-md"
                  // style={{ backgroundColor: item.badgeColor }}
                >
                  {item.badge}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-4">
              <h3 className="text-lg font-bold text-[#0b132b] mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>

              {/* Specs Grid */}
              <div className="divide-y divide-gray-100 mb-5">
                <SpecItem
                  value={item.specs.width}
                  label="Монтажная ширина, мм"
                />
                <SpecItem
                  value={item.specs.thickness}
                  label="Стеклопакет, мм"
                />
                <SpecItem
                  value={item.specs.chambers}
                  label="Воздушные камеры"
                  hasTooltip
                />
                <SpecItem
                  value={item.specs.thermal}
                  label="Теплозащита, м²°С/Вт"
                />
                <SpecItem value={item.specs.sound} label="Шумоизоляция, дБ" />
                <SpecItem value={item.specs.class} label="Класс системы" />
              </div>

              {/* Colors */}
              <ColorSection title="Цвет массы профиля" colors={item.colors} />
              <ColorSection title="Цвет уплотнителя" colors={item.seals} />
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-4 text-center">
              <p className="text-lg font-semibold text-[#0b132b] mb-3">
                {item.specs.price}
              </p>
              <button className="w-full bg-[#7eff00] hover:bg-[#6be000] text-[#0b132b] font-semibold py-2 rounded-lg transition">
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Subcomponents ---------------- */

function SpecItem({
  value,
  label,
  hasTooltip = false,
}: {
  value: string;
  label: string;
  hasTooltip?: boolean;
}) {
  return (
    <div className="py-3">
      <div className="flex items-center gap-1 font-bold text-[#0b132b] text-lg">
        {value}
        {hasTooltip && (
          <span className="text-white text-[10px] font-bold bg-red-500 w-4 h-4 flex justify-center rounded-full cursor-pointer">
            ?
          </span>
        )}
      </div>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
}

function ColorSection({ title, colors }: { title: string; colors: string[] }) {
  return (
    <div className="mb-3">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <div className="flex">
        {colors.map((c, i) => (
          <span
            key={i}
            className="w-5 h-5 rounded-full border border-gray-300"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}
