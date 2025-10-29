"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

interface VideoReview {
  _id: string;
  name: string;
  videoUrl: string;
}

interface VideoReviewCarouselProps {
  reviews: VideoReview[];
  title?: string;
}

export default function VideoReviewCarousel({
  reviews,
  title,
}: VideoReviewCarouselProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    // Pause currently playing video
    if (playingIndex !== null && playingIndex !== index) {
      const prevVideo = videoRefs.current[playingIndex];
      prevVideo?.pause();
    }

    if (video.paused) {
      video.play();
      setPlayingIndex(index);
    } else {
      video.pause();
      setPlayingIndex(null);
    }
  };

  return (
    <div className="bg-[#f2fafc] py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {title && (
          <h2 className="text-2xl md:text-5xl font-bold mb-10">{title}</h2>
        )}

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          loop
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4.5 },
          }}
          className="pb-8"
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={item._id}>
              <div className="flex flex-col">
                <div
                  className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => togglePlay(index)}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.videoUrl}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    controls={playingIndex === index}
                  />
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
                  {item.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
