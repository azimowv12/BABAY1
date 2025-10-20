import { useState } from "react";
import {
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import logo from "../assets/BABAY.jpg";

export default function Navbar({ wishlistCount, cartCount, onSearch }) {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
    onSearch?.(e.target.value);
  };

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      html.classList.add("dark");
      localStorage.theme = "dark";
    }
    setDarkMode(!darkMode);
  };

  const handleResetAll = () => {
    setSearch("");
    toast.success("Bosh sahifaga qaytildi ✅", {
      duration: 1500,
      position: "top-center",
      style: {
        background: "#2563eb",
        color: "white",
        fontWeight: "500",
      },
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md h-16 flex items-center z-50 transition-colors duration-300">
      <Toaster />
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* 🔹 Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleResetAll}
        >
          <img src={logo} alt="Logo" className="w-10" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            BABAY FOOD
          </span>
        </div>

    
    

        {/* 🔹 Ikonlar */}
        <div className="flex items-center space-x-6">
          <Link to="/saved" className="relative">
            <HeartIcon className="h-7 w-7 text-gray-600 dark:text-gray-300 cursor-pointer" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/korzinka" className="relative">
            <ShoppingCartIcon className="h-7 w-7 text-gray-600 dark:text-gray-300 cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
