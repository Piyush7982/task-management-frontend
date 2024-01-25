import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoLogoGitlab } from "react-icons/io5";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let navbarClasses = [
    "w-screen",
    "sm:h-[13vh]",
    "flex",
    "justify-between",
    "items-center",
    "sticky",
    "top-0",
    "left-0",
    "right-0",
    "transition-all",
    "delay-100",
    "bg-slate-900",
    "text-white",
    "z-50",
  ];
  if (isScrolled) {
    navbarClasses.push("opacity-90");
  }

  return (
    <div className={navbarClasses.join(" ")}>
      <div className="w-2/12 items-center ml-10  ">
        <IoLogoGitlab size={35} className="" />
      </div>
      <div className="flex justify-evenly  h-4/6 w-3/12">
        <NavLink
          to="/"
          replace={true}
          className={({ isActive }) => {
            return isActive
              ? "px-4  h-12 flex flex-col items-center justify-center tracking-wide bg-green-500 text-white   text-lg  font-semibold rounded-xl "
              : "px-4  h-12 flex flex-col items-center justify-center tracking-wide hover:scale-105 text-lg hover:bg-green-500 hover:text-white font-semibold rounded-xl transition-all delay-100";
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => {
            return isActive
              ? "px-4  h-12 flex flex-col items-center justify-center tracking-wide bg-green-500 text-white   text-lg  font-semibold rounded-xl "
              : "px-4  h-12 flex flex-col items-center justify-center tracking-wide hover:scale-105 text-lg hover:bg-green-500 hover:text-white font-semibold rounded-xl transition-all delay-100";
          }}
        >
          About Us
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => {
            return isActive
              ? "px-4  h-12 flex flex-col items-center justify-center tracking-wide bg-green-500 text-white   text-lg  font-semibold rounded-xl "
              : "px-4  h-12 flex flex-col items-center justify-center tracking-wide hover:scale-105 text-lg hover:bg-green-500 hover:text-white font-semibold rounded-xl transition-all delay-100";
          }}
        >
          Contact Us
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
