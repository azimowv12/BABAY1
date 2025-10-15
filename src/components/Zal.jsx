"use client";
import React, { useState, useEffect } from "react";
import CatalogGrid from "./Katalog";

export default function ZalMenu() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setcart] = useState([]);

  const places = [
    { id: 1, label: "Zal" },
    { id: 2, label: "Padval" },
    { id: 3, label: "Detskiy zal" },
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
      <div className="flex flex-wrap gap-5 justify-center items-center bg-gray-50 p-6 ">
        {places.map((p) => (
          <button
            key={p.id}
            onClick={() => handlePlaceSelect(p)}
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-md text-lg font-semibold hover:bg-blue-700 hover:scale-105 transition"
          >
            {p.label}
          </button>
        ))}
      </div>
    );
  }

  if (selectedPlace && !selectedTable) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 p-6 gap-8">
        <h2 className="text-2xl font-bold text-gray-700">
          {selectedPlace.label} uchun stol tanlang:
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {tables.map((num) => (
            <button
              key={num}
              onClick={() => handleTableSelect(num)}
              className="bg-blue-600 text-white rounded-xl shadow-md p-4 text-xl font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSelectedPlace(null)}
          className="mt-6 px-5 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Orqaga
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">
          {selectedPlace.label} – Stol {selectedTable}
        </h2>
        <button
          onClick={() => setSelectedTable(null)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          Orqaga
        </button>
      </div>

      <CatalogGrid
        cart={cart}
        setcart={setcart}
        place={selectedPlace.label}
        table={selectedTable}
      />
    </div>
  );
}
