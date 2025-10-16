import Image from "next/image";
import { FaVk, FaYoutube } from "react-icons/fa";
import { MdLocationOn, MdAccessTime, MdPhone, MdEmail } from "react-icons/md";

// --- FOOTER DATA ---
const footerLinks = [
  {
    title: "Пластиковые окна",
    links: [
      "Okna Melke",
      "Melke Comfort",
      "Melke Vida",
      "Melke Evolution",
      "Melke Smart Ultra",
      "Melke Life 70",
      "Melke Life 80",
    ],
  },
  {
    title: "Остекление и двери",
    links: [
      "Остекление домов",
      "Веранды и террасы",
      "Дачные дома",
      "Окна для коттеджей",
      "Пластиковые двери",
      "Балконные двери",
    ],
  },
  {
    title: "Аксессуары и услуги",
    links: [
      "Подоконники Melke",
      "Москитные сетки",
      "Ручки",
      "Ламинация",
      "Витражи",
      "Декоративная раскладка",
      "Доставка и монтаж",
    ],
  },
  {
    title: "О компании",
    links: [
      "Акции",
      "Производство",
      "Отзывы клиентов",
      "Сертификаты качества",
      "Контакты",
      "Оплата и рассрочка",
      "Вакансии",
    ],
  },
];

const bottomLinks = [
  "Политика конфиденциальности",
  "Оферта «Пластика Окон»",
  "Оферта «Яндекс.Сделка»",
  "СОУТ",
  "Карта сайта",
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-800">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-6 px-4 gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Пластика Окон"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <MdAccessTime className="text-green-600 text-lg" />
            <span>Время работы: с 9:00 до 21:00</span>
          </div>
          <div className="flex items-center gap-2">
            <MdPhone className="text-green-600 text-lg" />
            <span>8 800 955 4658</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="text-green-600 text-lg" />
            <span>info@plastikanok.ru</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-green-600 text-lg" />
            <span>Ясеневая 12, Москва</span>
          </div>
        </div>

        {/* Icons + Button */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-700 hover:text-green-600">
            <FaVk size={22} />
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            <FaYoutube size={22} />
          </a>
          <button className="bg-[#7ad02a] hover:bg-[#6ac124] text-white px-5 py-2 rounded-md text-sm transition">
            Заказать звонок
          </button>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Middle Links Section - 4 Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4 py-10 text-sm">
        {footerLinks.map((column) => (
          <div key={column.title}>
            <h3 className="font-semibold mb-2">{column.title}</h3>
            <ul className="space-y-1 text-gray-600">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-green-600 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="border-gray-200" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-gray-500">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-center sm:text-left">
            {bottomLinks.map((item) => (
              <span key={item} className="hover:text-green-600 cursor-pointer">
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/rating-stars.png"
              alt="Рейтинг компании"
              width={80}
              height={20}
            />
            <span>5.0 ⭐</span>
          </div>
        </div>

        <p className="text-center mt-4 text-gray-400 text-[13px] leading-snug">
          ООО «Пластика Окон» — производитель оконных и дверных конструкций из
          пластика и алюминия. 2007–2025
        </p>
      </div>
    </footer>
  );
}
