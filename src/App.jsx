import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/contact";
import Hero from "./components/HeroSwiper";
import Saved from "./components/Saved";
import Korzinka from "./components/Korzinka";
import ZalMenu from "./components/Zal";
import Shaurma from "./components/pages/shaurma/shaurma";

export default function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
              element={<Korzinka cart={cart} setcart={setCart} />}
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}
