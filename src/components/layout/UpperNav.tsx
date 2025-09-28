import { ChevronDown, Heart } from "lucide-react";

const navItems = [
  {
    label: "О нас",
    width: "w-48",
    links: ["История компании", "Наша команда", "Сертификаты", "Награды"],
  },
  {
    label: "Услуги",
    width: "w-56",
    links: [
      "Проектирование",
      "Строительство домов",
      "Ремонт и отделка",
      "Консультации",
      "Техническое обслуживание",
    ],
  },
  {
    label: "Сопутствующая продукция",
    width: "w-52",
    links: [
      "Строительные материалы",
      "Инструменты",
      "Оборудование",
      "Декоративные элементы",
      "Фурнитура",
    ],
  },
  { label: "Контакты" },
  { label: "Оплатить заказ" },
];

const Dropdown = ({ label, links, width }: any) => (
  <div className="relative group">
    <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-600">
      <span className="text-gray-800 font-medium">{label}</span>
      {links && <ChevronDown className="w-[20px] h-[20px] text-gray-600" />}
    </div>
    {links && (
      <div
        className={`absolute top-full left-0 mt-2 ${width} bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
      >
        <div className="py-2">
          {links.map((link: string, idx: number) => (
            <a
              key={idx}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    )}
  </div>
);

const UpperNav = () => {
  return (
    <div className="py-3 hidden lg:block">
      <div className="mx-auto">
        <div className="flex items-center space-x-8">
          {navItems.map((item, idx) => (
            <Dropdown key={idx} {...item} />
          ))}

          <div className="cursor-pointer flex">
            <span className="text-primary font-medium">Mos</span>
            <span className="font-medium">Build</span>
            <span className="text-primary ont-medium">2025</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-red-600">
            <Heart className="w-[20px] h-[20px] text-red-500 fill-current" />
            <span className="text-gray-800 font-medium">Хочу работать!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperNav;
