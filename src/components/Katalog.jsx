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
    key: "categories.1",
    icon: (
      <GiLipstick className="w-10 h-10 md:w-14 md:h-14 text-pink-600 ring-2 ring-pink-400" />
    ),
  },
  {
    id: 3,
    key: "categories.2",
    icon: <GiKitchenTap className="w-10 h-10 md:w-14 md:h-14 text-green-600" />,
  },
  {
    id: 4,
    key: "categories.3",
    icon: (
      <GiWashingMachine className="w-10 h-10 md:w-14 md:h-14 text-gray-600" />
    ),
  },
  {
    id: 5,
    key: "categories.4",
    icon: <GiLaptop className="w-10 h-10 md:w-14 md:h-14 text-purple-600" />,
  },
  {
    id: 6,
    key: "categories.5",
    icon: <FaTv className="w-10 h-10 md:w-14 md:h-14 text-red-600" />,
  },
  {
    id: 7,
    key: "categories.6",
    icon: <GiSmartphone className="w-10 h-10 md:w-14 md:h-14 text-indigo-600" />,
  },
  {
    id: 8,
    key: "categories.7",
    icon: <FaCarAlt className="w-10 h-10 md:w-14 md:h-14 text-yellow-600" />,
  },
  {
    id: 9,
    key: "categories.8",
    icon: <BsGearFill className="w-10 h-10 md:w-14 md:h-14 text-orange-600" />,
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
    } else {
      console.log(`Kategoriya ${id} bosildi`);
    }
  };

  return (
    <div className="bg-gray-50 py-8 md:py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800 dark:text-white">
          {t("catalogTitle")}
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
