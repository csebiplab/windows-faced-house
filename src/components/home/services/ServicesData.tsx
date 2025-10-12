"use client";

import Image from "next/image";

type Service = {
  id: number;
  title: string;
  price: string;
  image: string;
};

// const services: Service[] = [
//   {
//     id: 1,
//     title: "Монтаж окон",
//     price: "от 2 900 ₽/м²",
//     image: "/assets/servicesImage1.png",
//   },
//   {
//     id: 2,
//     title: "Замер окон",
//     price: "БЕСПЛАТНО",
//     image: "/assets/servicesImage2.png",
//   },
//   {
//     id: 3,
//     title: "Доставка окон",
//     price: "от 1 500 ₽",
//     image: "/assets/servicesImage3.png",
//   },
//   {
//     id: 4,
//     title: "Замена окон в новостройках",
//     price: "от 11 570 ₽/м²",
//     image: "/assets/servicesImage4.png",
//   },
//   {
//     id: 5,
//     title: "Вывоз мусора",
//     price: "от 2 030 ₽",
//     image: "/assets/servicesImage5.png",
//   },
// ];

export default function ServicesData({
  items,
  title,
}: {
  items: Service[];
  title: string;
}) {
  return (
    <section className="bg-[#EAF5F7] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
          {title}
        </h2>

        {/* First row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {items.slice(0, 3).map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-40 md:h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text + Button */}
              <div className="flex justify-between items-end p-4">
                <div>
                  <h3 className="text-base md:text-lg font-medium">
                    {item.title}
                  </h3>
                  <p className="font-bold text-gray-900">{item.price}</p>
                </div>
                <button className="bg-[#C6F35E] rounded-md p-2 hover:bg-lime-400 transition">
                  →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Second row: 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.slice(3).map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-48 md:h-56">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text + Button */}
              <div className="flex justify-between items-end p-4">
                <div>
                  <h3 className="text-base md:text-lg font-medium">
                    {item.title}
                  </h3>
                  <p className="font-bold text-gray-900">{item.price}</p>
                </div>
                <button className="bg-[#C6F35E] rounded-md p-2 hover:bg-lime-400 transition">
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
