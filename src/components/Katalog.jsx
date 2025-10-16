import React from "react";
import {
  GiPresent,
  GiLipstick,
  GiKitchenTap,
  GiWashingMachine,
  GiLaptop,
  GiSmartphone,
  GiPocketWatch,
} from "react-icons/gi";
import { FaCarAlt, FaTv } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PIZZA from "../assets/shaurma.jpg";



const categories = [
  {
    id: 1,
    key: "Shaurma",
    img: "https://sun9-76.userapi.com/impg/UuK0ndtOA608MsGOkjOW-PDawmA4rH-kvLgaJg/9g9ixRr4IGo.jpg?size=604x427&quality=96&sign=9395a75b96fe6d4bdeedd565ebe1e8b5&type=album",

  },
  {
    id: 2,
    key: "Burger",
    img: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg",


  },
  {
    id: 3,
    key: "HOT-DOG",
    img: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
  },
  {
    id: 4,
    key: "Detskiy Menu",
    img: "https://img-api.yumapos.ru/image/crop/original/d9a64953-9e5e-6bed-4152-45b75cc32f86.png",
  },
  {
    id: 5,
    key: "PIZZA",
    img: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
  },
  {
    id: 6,
    key: "Suvlar",
   img: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png",
  },
];

export default function CatalogGrid({ place, table }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    if (id === 1) {

      navigate("/shaurma", {
        state: { place, table },
      });
    } else if (id === 2) {

      navigate("/burger", {
        state: { place, table },
      });
    } else if (id === 3) {

      navigate("/xoddog", {
        state: { place, table },
      });
    } else if (id === 4) {

      navigate("/detskiy", {
        state: { place, table },
      });
    } else if (id === 5) {

      navigate("/pitsa", {
        state: { place, table },
      });
    } else if (id === 6) {

      navigate("/suvlar", {
        state: { place, table },
      });
    } else {
      console.log(`Kategoriya ${id} bosildi`);
    }
  };

  return (
    <div className="bg-gray-50 py-8 md:py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800 dark:text-white"> MENU
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-white rounded-xl shadow-md p-4 md:p-6 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 cursor-pointer border border-gray-200"
              role="button"
              aria-label={t(category.key)}
            >
              <div className="mb-3 md:mb-4">
                {category.img ? (
                  <img
                    src={category.img}
                    alt={t(category.key)}
                    className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-full shadow"
                  />
                ) : (
                  category.icon
                )}
              </div>
              <h3 className="text-center font-semibold text-sm md:text-base lg:text-lg text-gray-700 line-clamp-2">
                {t(category.key)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
