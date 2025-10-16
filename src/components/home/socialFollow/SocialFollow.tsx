import { FaVk, FaYoutube } from "react-icons/fa";

export default function SocialFollow() {
  return (
    <section className="bg-[#e9f2f4] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Следите за новостями компании «Пластика окон»
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* VK Card */}
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm w-full md:w-[420px] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#4c75a3]/10 text-[#4c75a3] p-3 rounded-full">
                <FaVk size={24} />
              </div>
              <span className="font-semibold text-base md:text-lg">
                Наши новости в VK
              </span>
            </div>
            <button className="bg-[#7ad02a] hover:bg-[#6ac124] text-white text-sm font-medium px-5 py-2 rounded-md transition">
              Подписаться
            </button>
          </div>

          {/* YouTube Card */}
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm w-full md:w-[420px] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#ff0000]/10 text-[#ff0000] p-3 rounded-full">
                <FaYoutube size={24} />
              </div>
              <span className="font-semibold text-base md:text-lg">
                Наши новости в YouTube
              </span>
            </div>
            <button className="bg-[#7ad02a] hover:bg-[#6ac124] text-white text-sm font-medium px-5 py-2 rounded-md transition">
              Подписаться
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
