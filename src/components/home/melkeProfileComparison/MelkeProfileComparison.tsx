"use client";

import Image from "next/image";
import { MelkeProfile } from "./MelkeProfiles";

export default function MelkeProfileComparison({
  profiles,
  title,
}: {
  profiles: MelkeProfile[];
  title?: string;
}) {
  if (!profiles?.length) {
    return (
      <section className="bg-[#eaf3f6] py-12 px-4 text-center text-gray-500">
        <p>No profiles available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="bg-[#eaf3f6] py-12 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-[#0b132b] mb-10">
        {title || "Сравнение профилей Melke"}
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
                  className={`absolute -bottom-2 left-3 text-xs text-white font-semibold px-3 py-1 rounded-md ${
                    item.badgeColor ? "" : "bg-[#2C3245]"
                  }`}
                  style={
                    item.badgeColor ? { backgroundColor: item.badgeColor } : {}
                  }
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
              {item.description && (
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              )}

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
              {item.colors?.length > 0 && (
                <ColorSection title="Цвет массы профиля" colors={item.colors} />
              )}
              {item.seals?.length > 0 && (
                <ColorSection title="Цвет уплотнителя" colors={item.seals} />
              )}
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
          <span className="text-white text-[10px] font-bold bg-red-500 w-4 h-4 flex justify-center items-center rounded-full cursor-pointer">
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
      <div className="flex gap-1">
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
