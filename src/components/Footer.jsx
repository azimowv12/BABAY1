import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 text-gray-700 font-sans">
      <div className="container mx-auto px-6 py-8 flex justify-between items-start gap-12 flex-wrap lg:flex-nowrap">
        {/* Chap tomondagi blok */}
        <div className="flex flex-col gap-2 w-full sm:w-auto text-center sm:text-left">
          <div className="text-xl font-bold text-blue-700">Market</div>
          <a href="tel:+998991994555" className="text-blue-700 hover:underline">
            +998 99 199 45 55
          </a>
          <a href="#" className="text-blue-700 hover:underline">
            Somewhere, Toshkent
          </a>
          <a
            href="mailto:market@gmail.com"
            className="text-blue-700 hover:underline"
          >
            market@gmail.com
          </a>
        </div>

        {/* Ma'lumot bo‘limi */}
        <div className="flex flex-col gap-2 w-full sm:w-auto text-center sm:text-left">
          <strong className="text-lg">Ma'lumot</strong>
          <a href="#" className="text-blue-700 hover:underline">
            Biz haqimizda
          </a>
          <a href="#" className="text-blue-700 hover:underline">
            Bo'sh ish o'rinlari
          </a>
          <a href="#" className="text-blue-700 hover:underline">
            Tovarlarni almashtirish va to'lovni qaytarish
          </a>
          <a href="#" className="text-blue-700 hover:underline">
            Yordam
          </a>
        </div>

        {/* Bonuslar bo‘limi */}
        <div className="flex flex-col gap-2 w-full sm:w-auto text-center sm:text-left">
          <strong className="text-lg">Bonuslar</strong>
          <a href="#" className="text-blue-700 hover:underline">
            Aksiyalar
          </a>
          <a href="#" className="text-blue-700 hover:underline">
            Servis markazlari
          </a>
        </div>
      </div>

      {/* Telefon versiyasi uchun pastki qism */}
      <div className="bg-neutral-200 text-center py-4 mt-6 text-sm">
        © 2025 Market. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
};

export default Footer;
