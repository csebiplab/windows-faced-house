"use client";

import Image from "next/image";

type Step = {
  id: number;
  text: string;
  image: string;
};

type Props = {
  steps: Step[];
  title: string;
  descriptionTop: string;
  descriptionBottom: string;
  footerTitle: string;
  footerDescription: string;
};

// const steps: Step[] = [
//   {
//     id: 1,
//     text: "Консультация специалиста по выбору ПВХ-окон и расчет предварительной стоимости.",
//     image: "/assets/windowInstallationImage1.png",
//   },
//   {
//     id: 2,
//     text: "Выезд замерщика для проведения точных измерений на объекте.",
//     image: "/assets/windowInstallationImage2.png",
//   },
//   {
//     id: 3,
//     text: "Разработка индивидуального проекта, составление сметы, подписание договора.",
//     image: "/assets/windowInstallationImage3.png",
//   },
//   {
//     id: 4,
//     text: "Изготовление стеклопакетов на производстве с учетом точных размеров.",
//     image: "/assets/windowInstallationImage4.png",
//   },
//   {
//     id: 5,
//     text: "Транспортировка готовых изделий и их подъем на нужный этаж.",
//     image: "/assets/windowInstallationImage5.png",
//   },
//   {
//     id: 6,
//     text: "Демонтаж старых окон и подготовка проема для монтажа.",
//     image: "/assets/windowInstallationImage6.png",
//   },
//   {
//     id: 7,
//     text: "Установка новых конструкций, настройка фурнитуры для корректной работы.",
//     image: "/assets/windowInstallationImage7.png",
//   },
//   {
//     id: 8,
//     text: "Монтаж подоконников, откосов, отливов и москитных сеток.",
//     image: "/assets/windowInstallationImage8.png",
//   },
//   {
//     id: 9,
//     text: "Уборка рабочей зоны и вывоз строительного мусора.",
//     image: "/assets/windowInstallationImage9.png",
//   },
// ];

export default function WindowInstallation({
  steps,
  title,
  descriptionTop,
  descriptionBottom,
  footerTitle,
  footerDescription,
}: Props) {
  return (
    <section className="bg-[#e9f3f6] py-12 px-4 flex justify-center">
      <div className="max-w-7xl bg-white p-5 md:p-10 rounded-2xl shadow-md">
        {/* Header */}
        <h2 className="text-center text-2xl font-bold mb-6">
          {/* Установка пластиковых окон */}
          {title}
        </h2>

        {/* Intro text */}
        <p className="text-gray-700 text-left mb-10">
          {/* Оформляя заказ по изготовлению и монтажу стеклопакетов в одной и той
          же компании, вы значительно упрощаете процесс и избавляете себя от
          необходимости контролировать работу разных подрядчиков. Так вы можете
          быть уверены, что установка пройдет максимально точно с учетом
          особенностей выбранных оконных конструкций. Наши специалисты проведут
          монтажные работы на высоком уровне, тщательно проверят
          функциональность всех элементов. Поскольку мы являемся
          производителями, каждый этап сопровождается контролем качества. Мы
          уверены в нашей продукции и услугах — предоставляем гарантию на окна
          сроком до 25 лет. */}
          {descriptionTop}
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`bg-white w-[315px] md:w-[355px] h-auto flex flex-col mx-auto 
                ${index === 0 ? "flex" : "hidden md:flex"}`}
            >
              {/* Top Image */}
              <div className="w-full h-[90px] md:h-[100px] relative">
                <Image
                  src={step.image}
                  alt={`step-${step.id}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Text */}
              <div className="p-3">
                <p className="text-base text-gray-700">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Outro Text */}
        <p className="text-lg mt-6">
          {/* Такой комплексный подход гарантирует качественную работу,
          долговечность и надежность ваших окон. */}
          {descriptionBottom}
        </p>

        {/* Price Section */}
        <div className="mt-10 text-left">
          <div className="h-1 w-20 bg-green-500 rounded mb-3"></div>
          <p className="text-2xl font-bold mb-1">
            {/* Стоимость установки */}
            {footerTitle}
          </p>
          <p className="text-5xl font-bold">
            {/* от 11 570 ₽/м² */}
            {footerDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
