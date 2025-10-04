"use client";

import Image from "next/image";

type CardItem = {
  id: number;
  title: string;
  description: string[];
  price: string;
  image: string;
};


export default function ProductGrid({ products }: { products?: CardItem[] }) {
  console.log(products);
  return (
    <section className="bg-[#e9f4f7] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Пластиковые окна Melke от производителя в Москве
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products?.map((item, index) => {
            if (index === 0) {
              // First card special layout
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Left side text */}
                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                      <ul className="space-y-1 text-sm text-gray-700 mb-4">
                        {item.description.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                      <p className="font-semibold text-lg">{item.price}</p>
                    </div>
                  </div>
                  {/* Right side image */}
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            }

            if (index === 3) {
              // 4th card special layout (image first, then text)
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm flex flex-col"
                >
                  {/* Image on top */}
                  <div className="relative w-full h-36 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Text below */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                    <ul className="space-y-1 text-sm text-gray-700 mb-4">
                      {item.description.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                    <p className="font-semibold text-lg">{item.price}</p>
                  </div>
                </div>
              );
            }

            // Other cards normal layout
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm flex flex-col justify-between"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                  <ul className="space-y-1 text-sm text-gray-700 mb-4">
                    {item.description.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                  <p className="font-semibold text-lg">{item.price}</p>
                </div>
                <div className="relative w-full h-48 mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
