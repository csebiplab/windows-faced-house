"use client";

import { Download } from "lucide-react";

const faqs = [
  "Как долго изготавливаются окна?",
  "Каким способом оплаты можно воспользоваться?",
  "Можно ли отказаться от замера, если известны размеры окна?",
  "Кто осуществляет подъём окон?",
  "Где можно увидеть образцы ваших окон?",
  "Какие дополнительные услуги предоставляет ваша компания?",
  "Можно ли выполнить полную отделку балкона?",
  "Что такое французские окна?",
  "Сколько прослужат пластиковые окна?",
  "Производится ли установка пластиковых окон зимой?",
  "Легко ли ремонтировать окна?",
  "Почему цены у других компаний ниже?",
];

export default function FAQSection() {
  return (
    <section className="bg-[#e9f4f7] py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-[#0d1c2e] mb-10">
          Часто задаваемые вопросы об остеклении
        </h2>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {faqs.map((question, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer px-6 py-6"
            >
              {/* Question Text */}
              <p className="text-[#0d1c2e] font-medium leading-snug pr-10">
                {question}
              </p>

              {/* Download Button */}
              <button
                className="absolute bottom-3 right-3 bg-[#90d12d] hover:bg-[#7bb425] transition-colors duration-200 
                p-2 rounded-md flex items-center justify-center shadow-sm"
              >
                <Download className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
