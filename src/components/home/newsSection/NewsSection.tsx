"use client";

import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

interface NewsSectionProps {
  title: string;
  articles: NewsItem[];
}

export default function NewsSection({ title, articles }: NewsSectionProps) {
  return (
    <div className="bg-[#E8F4F8]">
      <div className="py-16 max-w-6xl mx-auto px-4 sm:px-8 lg:px-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-900">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden transition-transform hover:scale-[1.01]"
            >
              <div className="relative w-full h-48 bg-gray-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
