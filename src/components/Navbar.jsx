import { useState } from "react";
import {
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { FaBars, FaTimes } from "react-icons/fa";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLanguageChange = (e) => i18n.changeLanguage(e.target.value);

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

  // 🔹 BABAY FOOD bosilganda hammasini tozalash
  const handleResetAll = () => {
    localStorage.clear();
    setSearch("");
    setMenuOpen(false);

    toast.success("Maʼlumotlar tozalandi ✅", {
      duration: 2000,
      position: "top-center",
      style: {
        background: "#2563eb",
        color: "white",
        fontWeight: "500",
      },
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md h-16 flex items-center z-50 transition-colors duration-300">
      <Toaster />
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* 🔹 Logo va nomi */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleResetAll}
        >
          <img src={logo} alt="Logo" className="w-10" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            BABAY FOOD
          </span>
        </div>

        {/* 🔹 Qidiruv */}
        <div className="flex-1 mx-4">
          <div className="relative w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder={t("search.placeholder")}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* 🔹 Desktop Iconlar */}
        <div className="hidden md:flex items-center space-x-6">
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

          <select
            onChange={handleLanguageChange}
            value={i18n.language}
            className="border rounded p-1 dark:text-white"
          >
            <option value="uz">O'zbekcha</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* 🔹 Mobile menyu tugmasi */}
        <div className="md:hidden">
          {menuOpen ? (
            <FaTimes
              className="text-2xl text-gray-800 dark:text-white cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <FaBars
              className="text-2xl text-gray-800 dark:text-white cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {/* 🔹 Mobile menyu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md px-4 py-4 space-y-4">
          <div className="flex items-center justify-around">
            <Link to="/saved" onClick={() => setMenuOpen(false)}>
              <HeartIcon className="h-7 w-7 text-gray-600 dark:text-gray-300" />
            </Link>
            <Link to="/korzinka" onClick={() => setMenuOpen(false)}>
              <ShoppingCartIcon className="h-7 w-7 text-gray-600 dark:text-gray-300" />
            </Link>
            <button onClick={toggleDarkMode}>
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-800" />
              )}
            </button>
            <select
              onChange={handleLanguageChange}
              value={i18n.language}
              className="border rounded p-1 dark:text-white"
            >
              <option value="uz">O'zbekcha</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
