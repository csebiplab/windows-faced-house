"use client";

import React, { useRef, useState } from "react";

const ManufacturerWindows = ({ items, title }: any) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlayingIndex(index);
    } else {
      video.pause();
      setPlayingIndex(null);
    }
  };

  return (
    <section className="bg-[#f2fafc] py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-5xl font-bold mb-10">{title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any, index: number) => (
            <div key={index} className="text-left">
              <div
                className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => togglePlay(index)}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={item.url}
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
                {/* Overlay Play/Pause Button */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    playingIndex === index ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-lg font-bold leading-snug text-gray-800">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManufacturerWindows;
