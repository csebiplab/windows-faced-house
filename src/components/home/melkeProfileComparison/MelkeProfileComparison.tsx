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
};

const profiles: Profile[] = [
  {
    id: 1,
    title: "Melke Centum",
    description: "Идеально для больших коттеджей",
    image: "/assets/windowSelectionImage1.png",
    specs: {
      width: "80/100 мм",
      thickness: "до 50 мм",
      chambers: "6/7/6",
      thermal: "1.23 м²°С/Вт",
      sound: "55 дБ",
      class: "А+",
      price: "15 490 ₽",
    },
    colors: ["#dedede", "#c0a46b", "#5b2e00", "#3a3a3a"],
    seals: ["#000", "#fff", "#ccc"],
  },
  {
    id: 2,
    title: "Melke Wide",
    description: "Идеально для стильных загородных коттеджей",
    image: "/assets/windowSelectionImage2.png",
    specs: {
      width: "80/95 мм",
      thickness: "до 42 мм",
      chambers: "5/6/5",
      thermal: "1.12 м²°С/Вт",
      sound: "55 дБ",
      class: "А+",
      price: "14 090 ₽",
    },
    colors: ["#dedede", "#c0a46b", "#5b2e00", "#3a3a3a"],
    seals: ["#000", "#fff", "#ccc"],
  },
  {
    id: 3,
    title: "Melke Evolution",
    description: "Для просторной лоджии и панорамного остекления",
    image: "/assets/windowSelectionImage3.png",
    specs: {
      width: "70/70 мм",
      thickness: "до 40 мм",
      chambers: "5/5/5",
      thermal: "1.06 м²°С/Вт",
      sound: "35 дБ",
      class: "А+",
      price: "10 390 ₽",
    },
    colors: ["#dedede", "#3a3a3a"],
    seals: ["#000", "#fff"],
  },
  {
    id: 4,
    title: "Melke Smart Ultra",
    description: "Идеально для остекления квартир и загородных домов",
    image: "/assets/windowSelectionImage4.png",
    specs: {
      width: "65/65 мм",
      thickness: "до 36 мм",
      chambers: "4/4/4",
      thermal: "0.92 м²°С/Вт",
      sound: "33 дБ",
      class: "А+",
      price: "9 790 ₽",
    },
    colors: ["#dedede", "#3a3a3a"],
    seals: ["#000", "#fff"],
  },
  {
    id: 5,
    title: "Melke Lite 70",
    description: "Идеально для квартиры в шумном районе",
    image: "/assets/windowSelectionImage5.png",
    specs: {
      width: "70/70 мм",
      thickness: "до 40 мм",
      chambers: "4/4/5",
      thermal: "0.76 м²°С/Вт",
      sound: "34 дБ",
      class: "А+",
      price: "10 090 ₽",
    },
    colors: ["#dedede"],
    seals: ["#000", "#fff"],
  },
  {
    id: 6,
    title: "Melke Lite 60",
    description: "Идеально и недорого в тихом районе",
    image: "/assets/windowSelectionImage6.png",
    specs: {
      width: "60/60 мм",
      thickness: "до 32 мм",
      chambers: "3/3/4",
      thermal: "0.73 м²°С/Вт",
      sound: "32 дБ",
      class: "А+",
      price: "9 490 ₽",
    },
    colors: ["#dedede"],
    seals: ["#000", "#fff"],
  },
];

export default function MelkeProfileComparison() {
  return (
    <section className="bg-[#eaf3f6] py-12 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-[#0b132b] mb-10">
        Сравнение профилей Melke
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 max-w-[1550px] mx-auto">
        {profiles.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full h-36">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-[#0b132b] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {item.description}
                </p>

                <ul className="text-sm space-y-1 mb-4">
                  <li>Монтажная ширина: {item.specs.width}</li>
                  <li>Стеклопакет: {item.specs.thickness}</li>
                  <li>Воздушные камеры: {item.specs.chambers}</li>
                  <li>Теплозащита: {item.specs.thermal}</li>
                  <li>Шумоизоляция: {item.specs.sound}</li>
                  <li>Класс системы: {item.specs.class}</li>
                </ul>

                <div className="flex items-center gap-2 mb-2">
                  {item.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {item.seals.map((s, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: s }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 flex flex-col items-center">
              <p className="font-bold text-[#0b132b] mb-3">
                {item.specs.price}
              </p>
              <button className="bg-[#7eff00] hover:bg-[#6be000] text-[#0b132b] font-semibold py-2 px-5 rounded-lg transition-all">
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
