"use client";

import LowerNav from "./LowerNav";
import MiddleNav from "./MiddleNav";
import UpperNav from "./UpperNav";

const Navbar = () => {
  return (
    <header className="w-full p-x-320 bg-white shadow-sm mx-auto">
      <nav>
        <UpperNav />
        <MiddleNav />
        <LowerNav />
      </nav>
    </header>
  );
};

export default Navbar;
