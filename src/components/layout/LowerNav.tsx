const LowerNav = () => {
  const navItems = [
    "Окна Meike",
    "Балконы и лоджии",
    "Коттеджи и дачи",
    "Двери",
    "Алюминиевые конструкции",
    "Акции",
  ];

  return (
    <div className="hidden lg:block">
      <div className="mx-auto">
        <ul className="flex items-center justify-between">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 whitespace-nowrap"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LowerNav;
