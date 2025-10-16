"use client";

import Image from "next/image";

export default function InstallmentOffer() {
  // ✅ Steps array
  const steps = [
    {
      id: 1,
      title: "Оформите заявку",
      desc: "И дождитесь подтверждения от банка-партнера. Ваш менеджер поможет с оформлением.",
    },
    {
      id: 2,
      title: "Внесите предоплату",
      desc: "От 20% от суммы договора. Остаток суммы вносите равными долями в течение 6 месяцев.",
    },
    {
      id: 3,
      title: "Наслаждайтесь комфортом",
      desc: "С новым остеклением от Пластики ОКОН. Все проценты по рассрочке мы оплатим за вас.",
    },
  ];

  return (
    <section className="bg-[#EAF3F5] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-extrabold text-[#001f2e] mb-8">
          Пластиковые окна в рассрочку
        </h2>

        {/* Banner Section */}
        <div className="bg-[#111] text-white rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between">
          {/* Left Text Section */}
          <div className="p-8 md:p-12 flex-1">
            <h3 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Переплата
            </h3>
            <p className="text-lg sm:text-xl font-semibold text-[#39BDF5] mb-2">
              6 мес. <span className="text-white">рассрочка</span>
            </p>
            <p className="text-lg sm:text-xl font-semibold text-[#39BDF5] mb-4">
              20% <span className="text-white">первый взнос</span>
            </p>
            <p className="text-xs text-gray-400 max-w-xs">
              Оплачивайте первоначальный взнос от 20% (наличными или картой) в день
              заключения договора. Выплачивайте остаток равными частями в течение 6 месяцев.
              Без комиссий и переплат.
            </p>
          </div>

          {/* Right Image Section */}
          <div className="w-full md:w-[45%] relative h-56 sm:h-72 md:h-80">
            <Image
              src="/assets/installment-window.png" // replace with your actual image
              alt="Window Installment"
              fill
              className="object-cover md:object-contain"
            />
          </div>
        </div>

        {/* Steps Section (Dynamic) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 bg-white text-left">
          {steps.map((step) => (
            <div
              key={step.id}
              className="p-6 flex flex-col"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[#6EDC3A] text-white text-xl font-bold rounded-lg mb-4">
                {step.id}
              </div>
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
