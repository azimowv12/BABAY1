"use client";
import React, { useState, useEffect } from "react";
import CatalogGrid from "./Katalog";

export default function ZalMenu() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setcart] = useState([]);

  const places = [
    { id: 1, label: "Zal", color: "from-purple-500 to-pink-500", icon: "🏛️" },
    { id: 2, label: "Padval", color: "from-blue-500 to-cyan-400", icon: "🌿" },
    { id: 3, label: "Detskiy zal", color: "from-green-500 to-emerald-400", icon: "🎠" },
  ];

  const tables = Array.from({ length: 10 }, (_, i) => i + 1);

  // 🔹 oldin tanlangan joy va stolni yuklash
  useEffect(() => {
    const savedPlace = localStorage.getItem("selectedPlace");
    const savedTable = localStorage.getItem("selectedTable");
    if (savedPlace) setSelectedPlace({ label: savedPlace });
    if (savedTable) setSelectedTable(Number(savedTable));
  }, []);

  // 🔹 JOY TANLANGANDA localStorage ga saqlash
  const handlePlaceSelect = (p) => {
    setSelectedPlace(p);
    localStorage.setItem("selectedPlace", p.label);
  };

  // 🔹 STOL TANLANGANDA localStorage ga saqlash
  const handleTableSelect = (num) => {
    setSelectedTable(num);
    localStorage.setItem("selectedTable", num);
  };

  if (!selectedPlace) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Restoran Tizimi
          </h1>
          <p className="text-gray-600 text-lg">Iltimos, joyni tanlang</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {places.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePlaceSelect(p)}
              className={`
                group relative overflow-hidden rounded-3xl p-8 text-white 
                bg-gradient-to-br ${p.color} 
                shadow-2xl shadow-gray-300/50 
                hover:shadow-xl hover:scale-105 
                transform transition-all duration-500 
                hover:rotate-1
              `}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {p.icon}
              </div>

              {/* Text */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{p.label}</h3>
                <p className="text-white/80 text-sm">Joyni tanlash</p>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Tanlangan joy avtomatik ravishda saqlanadi
          </p>
        </div>
      </div>
    );
  }

  if (selectedPlace && !selectedTable) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {selectedPlace.label} uchun stol tanlang
          </h2>
          <p className="text-gray-600">Stol raqamini tanlang</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-2xl">
          {tables.map((num) => (
            <button
              key={num}
              onClick={() => handleTableSelect(num)}
              className={`
                relative group aspect-square rounded-2xl 
                bg-gradient-to-br from-blue-500 to-purple-600 
                text-white font-bold text-xl
                shadow-lg shadow-blue-200
                hover:shadow-xl hover:shadow-purple-200
                hover:scale-110 hover:rotate-3
                transform transition-all duration-300
                overflow-hidden
              `}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              <span className="relative z-10">{num}</span>

              {/* Hover effect */}
              <div className="absolute inset-0 border-2 border-white/30 rounded-2xl scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>

        <button
          onClick={() => setSelectedPlace(null)}
          className="mt-8 px-8 py-3 rounded-xl bg-white/80 text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200 backdrop-blur-sm transition-all duration-300 font-semibold"
        >
          ← Orqaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {selectedPlace.label}
            </h2>
            <p className="text-gray-600 font-semibold">Stol #{selectedTable}</p>
          </div>

          <button
            onClick={() => setSelectedTable(null)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg border border-gray-300/50 transition-all duration-300 font-semibold min-w-[140px]"
          >
            ← Stolni o'zgartirish
          </button>
        </div>
      </div>

      {/* Catalog */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <CatalogGrid
          cart={cart}
          setcart={setcart}
          place={selectedPlace.label}
          table={selectedTable}
        />
      </div>
    </div>
  );
}