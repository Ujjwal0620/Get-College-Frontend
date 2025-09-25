import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  const images = [
    "https://www.sikshapedia.com/public/data/colleges/iit-delhi-new-delhi-delhi-ncr/iit-delhi-new-delhi-delhi-ncr-banner.webp",
    "https://paruluniversity.ac.in/app/images/post/blog/featured_image/894265Parul%20University%20Top%2050%20NIRF%20Ranking%20.png",
    "https://neurosurgeryaiims.org/extra-images/bannerm.jpg",
    "https://scontent.fpat3-1.fna.fbcdn.net/v/t39.30808-6/294262473_534856251749853_3324468620555309227_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=103&ccb=1-7&_nc_sid=2285d6&_nc_ohc=jVLQzSU2jq4Q7kNvwEXsyno&_nc_oc=AdlikW7yAhoAEYRUUnkdPrGTW1B9S0DewX_BzyXeQ6xKRNj3hGrvIhB9LzHSqTBjBfIPjwt9xa1JfrWLz8cD91v6&_nc_zt=23&_nc_ht=scontent.fpat3-1.fna&_nc_gid=wUGma2w8TsqaVplu9Z8lOw&oh=00_AfZacWoyVrg0hBMj1Cq2QyH6d-JYWggxcrqU8tqGDS3I3A&oe=68D3FFD4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4s per image
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[80vh] overflow-hidden">
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 sm:px-10 md:px-20 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-snug sm:leading-tight md:leading-tight">
          Start your college <br /> Discovery...
        </h1>
        <Link
          to="/more"
          className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium text-base sm:text-lg transition"
        >
          Explore colleges & universities →
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
