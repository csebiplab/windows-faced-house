"use client";

import Image from "next/image";
import React from "react";

/*
const items = [
  {
    icon: <Factory size={40} className="text-lime-500" />,
    image: "/assets/whyWorkWithUsImage1.png",
    text: "> 30 000м² производственных площадей",
  },
  {
    icon: <Package size={40} className="text-lime-500" />,
    image: "/assets/whyWorkWithUsImage2.png",
    text: "> 5 000 изделий в сутки",
  },
  {
    icon: <Handshake size={40} className="text-lime-500" />,
    image: "/assets/whyWorkWithUsImage3.png",
    text: "> 3 000 партнёров по России",
  },
  {
    icon: <Users size={40} className="text-lime-500" />,
    image: "/assets/whyWorkWithUsImage4.png",
    text: "> 1 500 сотрудников",
  },
  {
    icon: <Building2 size={40} className="text-lime-500" />,
    image: "/assets/whyWorkWithUsImage5.png",
    text: "> 1 000 000м² остеклённых объектов",
  },
  {
    icon: <Leaf size={40} className="text-lime-500" />,
    image: "/assets/whyWorkWithUsImage6.png",
    text: "Экологичное производство",
  },
];
*/

const WhyWorkWithUs = ({ items, title }: { items: any[]; title: string }) => {
  return (
    <section className="bg-[#f0f8fa] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#001B29] mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative rounded-xl overflow-hidden group shadow-md ${
                index === 0 || index === 4 ? "sm:col-span-2" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.text}
                width={600}
                height={400}
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end items-start p-6">
                <div className="flex flex-col items-start gap-3">
                  {item.icon}
                  <p className="text-white font-semibold text-lg leading-snug">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
