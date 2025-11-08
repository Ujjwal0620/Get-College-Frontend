import React, { useRef } from "react";
import {
  Home,
  UserPlus,
  ClipboardList,
  Newspaper,
  PenLine,
  Plane,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const cities = [
  { name: "Delhi", img: "https://cdn-icons-png.flaticon.com/512/8911/8911964.png" },
  { name: "Mumbai", img: "https://cdn-icons-png.flaticon.com/512/8911/8911977.png" },
  { name: "Pune", img: "https://cdn-icons-png.flaticon.com/512/8911/8911981.png" },
  { name: "Kolkata", img: "https://cdn-icons-png.flaticon.com/512/8911/8911954.png" },
  { name: "Chennai", img: "https://cdn-icons-png.flaticon.com/512/8911/8911950.png" },
  { name: "Ahmedabad", img: "https://cdn-icons-png.flaticon.com/512/8911/8911960.png" },
  { name: "Bangalore", img: "https://cdn-icons-png.flaticon.com/512/8911/8911968.png" },
];

const navItems = [
  { icon: <Home className="w-5 h-5 md:w-6 md:h-6" />, label: "Find Colleges" },
  { icon: <UserPlus className="w-5 h-5 md:w-6 md:h-6" />, label: "Get Admission" },
  { icon: <ClipboardList className="w-5 h-5 md:w-6 md:h-6" />, label: "Explore Exams" },
  { icon: <Newspaper className="w-5 h-5 md:w-6 md:h-6" />, label: "Latest News" },
  { icon: <PenLine className="w-5 h-5 md:w-6 md:h-6" />, label: "Write a Review" },
  { icon: <Plane className="w-5 h-5 md:w-6 md:h-6" />, label: "Study Abroad" },
];

const Zolf = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-gray-800  flex flex-col">
      {/* --- Navbar --- */}
      <nav className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 py-5 border-b bg-[#f9fbfd] shadow-sm">
        {navItems.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-all duration-300"
          >
            <div className="mb-1">{item.icon}</div>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* --- Top Cities Section --- */}
      <section className="flex flex-col items-center justify-start w-full bg-white pt-10 pb-0 px-6 md:px-10">
        <div className="w-full max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0a2540] mb-8">
            Top Cities
          </h2>

          <div className="relative flex items-center">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute -left-2 sm:-left-4 md:-left-6 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 z-10 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Scrollable Row */}
            <div
              ref={scrollRef}
              className="flex gap-6 md:gap-8 w-full overflow-x-auto scroll-smooth scrollbar-hide px-8 md:px-12 py-4"
            >
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center flex-shrink-0 w-32 h-36 sm:w-36 sm:h-40 md:w-40 md:h-44 border border-gray-200 rounded-lg bg-white hover:shadow-md hover:border-gray-300 transition-all duration-300"
                >
                  <img
                    src={city.img}
                    alt={city.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                  />
                  <p className="mt-3 text-gray-800 font-medium text-sm sm:text-base">
                    {city.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute -right-2 sm:-right-4 md:-right-6 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 z-10 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6 mb-0">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition ${
                  i === 2 ? "bg-gray-800" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Zolf;
