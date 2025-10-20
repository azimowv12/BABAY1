"use client";
import React, { useState, useEffect } from "react";
import CatalogGrid from "./Katalog";
import {
  FaChair,
  FaUtensils,
  FaChild,
  FaArrowLeft,
  FaTable,
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle
} from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";

export default function ZalMenu() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setCart] = useState([]);
  const [hoveredTable, setHoveredTable] = useState(null);

  const places = [
    {
      id: 1,
      label: "Asosiy Zal",
      description: "Asosiy restoran zali",
      icon: <IoRestaurant className="text-2xl" />,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      id: 2,
      label: "Padval",
      description: "Yopiq hovli",
      icon: <FaUtensils className="text-2xl" />,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      id: 3,
      label: "Bolalar Zali",
      description: "Bolalar uchun maxsus joy",
      icon: <FaChild className="text-2xl" />,
      color: "bg-purple-500 hover:bg-purple-600"
    },
  ];

  const tables = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    seats: Math.floor(Math.random() * 4) + 2, // 2-6 o'rin
    status: "bo'sh" // always available
  }));

  // 🔹 Oldin tanlangan joy va stolni yuklash
  useEffect(() => {
    const savedPlace = localStorage.getItem("selectedPlace");
    const savedTable = localStorage.getItem("selectedTable");
    // if (savedPlace) setSelectedPlace(JSON.parse(savedPlace));
    if (savedTable) setSelectedTable(Number(savedTable));
  }, []);

  // 🔹 JOY TANLANGANDA localStorage ga saqlash
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    localStorage.setItem("selectedPlace", JSON.stringify(place));
  };

  // 🔹 STOL TANLANGANDA localStorage ga saqlash
  const handleTableSelect = (table) => {
    setSelectedTable(table.id);
    localStorage.setItem("selectedTable", table.id);
  };

  // 🔹 Stol tanlash sahifasiga qaytish
  const handleBackToTables = () => {
    setSelectedTable(null);
    localStorage.removeItem("selectedTable");
  };

  // 🔹 Joy tanlash sahifasiga qaytish
  const handleBackToPlaces = () => {
    setSelectedPlace(null);
    setSelectedTable(null);
    localStorage.removeItem("selectedPlace");
    localStorage.removeItem("selectedTable");
  };

  // 🔹 Stol statusiga qarab rang
  const getTableColor = (table) => {
    if (table.status === "band") return "bg-red-400 cursor-not-allowed";
    if (hoveredTable === table.id) return "bg-blue-600";
    return "bg-green-500 hover:bg-green-600";
  };

  // Joy tanlash komponenti
  if (!selectedPlace) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <IoRestaurant className="text-4xl text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-800">Restoran Tizimi</h1>
            </div>
            <p className="text-gray-600 text-lg">Iltimos, joy tanlang</p>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {places.map((place) => (
              <div
                key={place.id}
                onClick={() => handlePlaceSelect(place)}
                className={`${place.color} text-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-white bg-opacity-20 rounded-full">
                    {place.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{place.label}</h3>
                  <p className="text-white text-opacity-90 text-sm">{place.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 text-gray-500">
            <p>Joyni tanlash uchun ustiga bosing</p>
          </div>
        </div>
      </div>
    );
  }

  // Stol tanlash komponenti
  if (selectedPlace && !selectedTable) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={handleBackToPlaces}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-gray-700 hover:bg-gray-100 transition shadow-md mr-4"
              >
                <FaArrowLeft />
                Orqaga
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {selectedPlace.icon}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{selectedPlace.label}</h1>
                  <p className="text-gray-600 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-red-500" />
                    {selectedPlace.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stol statistikasi */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-2xl font-bold text-blue-600">{tables.length}</div>
              <div className="text-gray-600 text-sm">Jami Stol</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-2xl font-bold text-green-600">
                {tables.filter(t => t.status === "bo'sh").length}
              </div>
              <div className="text-gray-600 text-sm">Bo'sh Stol</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-2xl font-bold text-red-600">
                {tables.filter(t => t.status === "band").length}
              </div>
              <div className="text-gray-600 text-sm">Band Stol</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-2xl font-bold text-purple-600">
                {tables.reduce((acc, table) => acc + table.seats, 0)}
              </div>
              <div className="text-gray-600 text-sm">Jami O'rin</div>
            </div>
          </div>

          {/* Stol tanlash */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Stol tanlang
            </h2>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  onMouseEnter={() => setHoveredTable(table.id)}
                  onMouseLeave={() => setHoveredTable(null)}
                  onClick={() => table.status === "bo'sh" && handleTableSelect(table)}
                  className={`${getTableColor(table)} text-white rounded-xl shadow-md p-4 text-center transform transition-all duration-300 cursor-pointer ${table.status === "bo'sh" ? "hover:scale-110" : ""
                    }`}
                >
                  <div className="flex flex-col items-center">
                    <FaTable className="text-2xl mb-2" />
                    <div className="font-bold text-lg">#{table.id}</div>
                    <div className="flex items-center gap-1 text-sm mt-1">
                      <FaUsers className="text-xs" />
                      {table.seats} kishi
                    </div>
                    {table.status === "band" && (
                      <div className="text-xs mt-1 bg-red-500 bg-opacity-50 px-2 py-1 rounded-full">
                        Band
                      </div>
                    )}
                    {table.status === "bo'sh" && hoveredTable === table.id && (
                      <div className="text-xs mt-1 bg-white bg-opacity-30 px-2 py-1 rounded-full flex items-center gap-1">
                        <FaCheckCircle />
                        Tanlash
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Bo'sh</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <span className="text-sm text-gray-600">Band</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Tanlangan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Katalog sahifasi
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-white rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                {selectedPlace.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedPlace.label} – Stol #{selectedTable}
                </h2>
                <p className="text-gray-600 text-sm flex items-center gap-1">
                  <FaTable className="text-green-500" />
                  {tables.find(t => t.id === selectedTable)?.seats} kishilik
                </p>
              </div>
            </div>
          </div>


          <div className="flex gap-3">
            <button
              onClick={handleBackToTables}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 transition shadow-md"
            >
              <FaArrowLeft />
              Stolni o'zgartirish
            </button>
            <button
              onClick={handleBackToPlaces}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 transition shadow-md"
            >
              <FaMapMarkerAlt />
              Joyni o'zgartirish
            </button>
          </div>
        </div>

        {/* Katalog */}
        <CatalogGrid
          cart={cart}
          setCart={setCart}
          place={selectedPlace.label}
          table={selectedTable}
        />
      </div>
    </div>
  );
}

