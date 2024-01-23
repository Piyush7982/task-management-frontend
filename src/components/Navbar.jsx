// function Navbar() {
//   return (
//     <div className="w-screen sm:h-[8vh] flex justify-between  items-center sticky top-0 left-0 right-0  ">
//       <div className=" w-2/12 text-center">Logo</div>
//       <div className="flex justify-evenly text-slate-800  h-4/6 w-3/12">
//         <button className="px-4 py-1 tracking-wide hover:scale-110 text-lg  hover:bg-green-500 hover:text-white font-semibold rounded-xl transition-all delay-100">
//           Login
//         </button>
//         <button className="px-4 py-1 tracking-wide hover:scale-110 text-lg  hover:bg-green-500 hover:text-white font-semibold rounded-xl transition-all delay-100">
//           Login
//         </button>
//         <button className="px-4 py-1 tracking-wide hover:scale-110  text-lg hover:bg-green-500 hover:text-white font-semibold rounded-xl transition-all delay-100">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
import React, { useState, useEffect } from "react";

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
    "sm:h-[10vh]",
    "flex",
    "justify-between",
    "items-center",
    "sticky",
    "top-0",
    "left-0",
    "right-0",
  ];
  if (isScrolled) {
    navbarClasses.push("bg-slate-900   text-white ");
  }

  return (
    <div className={navbarClasses.join(" ")}>
      <div className="w-2/12 text-center">Logo</div>
      <div className="flex justify-evenly  h-4/6 w-3/12">
        <button className="px-4 py-1 tracking-wide hover:scale-110 text-lg hover:bg-green-500 hover:text-white font-semibold rounded-xl transition-all delay-100">
          Login
        </button>
        <button className="px-4 py-1 tracking-wide hover:scale-110 text-lg hover:bg-green-500 hover:text-white font-semibold rounded-xl transition-all delay-100">
          Login
        </button>
        <button className="px-4 py-1 tracking-wide hover:scale-110 text-lg hover:bg-green-500 hover:text-white font-semibold rounded-xl transition-all delay-100">
          Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;
