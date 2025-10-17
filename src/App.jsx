import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/contact";
import Hero from "./components/HeroSwiper";
import Saved from "./components/Saved";
import Korzinka from "./components/Korzinka";
import ZalMenu from "./components/Zal";
import Shaurma from "./components/pages/shaurma/shaurma";
import Burger from "./components/pages/burger/burger";
import XodDog from "./components/pages/xoddog/xoddog";
import Xoddog from "./components/pages/xoddog/xoddog";
import DetskiyMenu from "./components/pages/detskiy/detskiyCombo";
import PIZZA from "./components/pages/pitsa/pitsa";
import Suvlar from "./components/pages/suvlar/suvlar";

export default function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load cart from localStorage on app start
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved cart", e);
      }
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cart]);

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen flex flex-col pb-10 dark:bg-gray-900">
        <Navbar
          wishlistCount={wishlist.length}
          cartCount={cart.length}
          onSearch={setSearchTerm}
        />

        <div className="max-w-7xl mx-auto mt-40">
          <Routes>
            {/* 🏠 Bosh sahifa */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <div className="pt-16">
                    <ZalMenu />
                  </div>
                  <Contact />
                  <Footer />
                </>
              }
            />

            {/* ❤️ Saqlanganlar */}
            <Route path="/saved" element={<Saved wishlist={wishlist} />} />

            {/* 🛒 Savatcha */}
            <Route
              path="/korzinka"
              element={<Korzinka cart={cart} setCart={setCart} />}
            />

            {/* 🌯 Shaurma sahifasi */}
            <Route
              path="/shaurma"
              element={
                <Shaurma
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  cart={cart}
                  setCart={setCart}
                  searchTerm={searchTerm}
                />
              }
            />
            <Route
              path="/burger"
              element={
                <Burger
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  cart={cart}
                  setCart={setCart}
                  searchTerm={searchTerm}
                />
              }
            />
            <Route
              path="/xoddog"
              element={
                <Xoddog
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  cart={cart}
                  setCart={setCart}
                  searchTerm={searchTerm}
                />
              }
            />
            <Route
              path="/detskiy"
              element={
                <DetskiyMenu
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  cart={cart}
                  setCart={setCart}
                  searchTerm={searchTerm}
                />
              }
            />
            <Route
              path="/pitsa"
              element={
                <PIZZA
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  cart={cart}
                  setCart={setCart}
                  searchTerm={searchTerm}
                />
              }
            />
            <Route
              path="/suvlar"
              element={
                <Suvlar
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  cart={cart}
                  setCart={setCart}
                  searchTerm={searchTerm}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
