import { useEffect, useState } from "react";
import { FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";

export default function Korzinka() {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Humo form holati
  const [cardNumber, setCardNumber] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");

  // 🔹 Joy va stol nomi
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  // ✅ LocalStorage dan yuklash (bir marta)
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }

    const place = localStorage.getItem("selectedPlace");
    const table = localStorage.getItem("selectedTable");
    if (place && table) {
      setSelectedPlace(place);
      setSelectedTable(table);
    }
  }, []);

  // ✅ LocalStorage ga yozish (har safar o‘zgarishda)
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // 🔹 Miqdorni o‘zgartirish
  const handleQuantityChange = (itemId, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.itemId === itemId
          ? {
              ...item,
              quantity:
                type === "plus"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // 🔹 Mahsulotni o‘chirish
  const handleRemove = (itemId) => {
    const updated = cart.filter((item) => item.itemId !== itemId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 🔹 Jami summa
  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  // 🔹 Karta raqamini formatlash
  const formatCardNumber = (val) =>
    val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();

  // 🔹 Humo to‘lovini tekshirish
  const handleHumoPay = (e) => {
    e.preventDefault();

    if (cardNumber.replace(/\s+/g, "").length < 16) {
      alert("Iltimos, to‘liq karta raqamini kiriting (16 raqam).");
      return;
    }
    if (!/^\d{3,4}$/.test(cardCode)) {
      alert("Iltimos, to‘g‘ri karta codi (CVV) kiriting.");
      return;
    }
    if (!expMonth || !expYear) {
      alert("Iltimos, amal qilish muddatini tanlang.");
      return;
    }

    alert("✅ To‘lov amalga oshirildi (demo). Rahmat!");
    setIsModalOpen(false);
    setCardNumber("");
    setCardCode("");
    setExpMonth("");
    setExpYear("");
  };

  // 🔹 Agar korzinka bo‘sh bo‘lsa
  if (!cart || cart.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold dark:text-white">Korzinka</h2>
        <p className="text-gray-500">Korzinka bo‘sh</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Sarlavha */}
      <h2 className="text-2xl font-bold mb-2 dark:text-white">🛒 Korzinka</h2>

      {/* Joy va stol */}
      <div className="text-center mb-6 dark:text-white">
        {selectedPlace && selectedTable ? (
          <p className="font-medium text-gray-700 dark:text-gray-300">
            🪑 Joy: <span className="font-semibold">{selectedPlace}</span> — Stol:{" "}
            <span className="font-semibold">{selectedTable}</span>
          </p>
        ) : (
          <p className="text-gray-500">Joy va stol tanlanmagan</p>
        )}
      </div>

      {/* Mahsulotlar ro‘yxati */}
      {cart.map((item) => (
        <div
          key={item.itemId}
          className="flex items-center justify-between bg-white dark:bg-gray-800 shadow rounded-xl p-4 mb-3"
        >
          <img
            src={
              item.thumbnail ||
              "https://via.placeholder.com/150?text=No+Image"
            }
            alt={item.title}
            className="w-16 h-16 object-contain"
          />

          <div className="flex-1 px-4">
            <h3 className="font-semibold text-sm mb-1 dark:text-white">
              {item.title}
            </h3>

            {item.size && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                O‘lcham:{" "}
                <span className="font-semibold capitalize">{item.size}</span>
              </p>
            )}

            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Narx: {(Number(item.price) * Number(item.quantity)).toFixed(2)} so'm
            </p>

            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleQuantityChange(item.itemId, "minus")}
                className="border p-1 rounded dark:text-white"
              >
                <FiMinus />
              </button>
              <span className="dark:text-white">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.itemId, "plus")}
                className="border p-1 rounded dark:text-white"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <button
            onClick={() => handleRemove(item.itemId)}
            className="text-red-500 hover:text-red-600"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ))}

      {/* Jami summa */}
      <div className="text-right font-bold text-lg mt-4 dark:text-white">
        Jami: {totalPrice.toFixed(2)} so'm
      </div>

      {/* Buyurtma berish tugmasi */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl mt-4 w-full shadow-md transition"
        onClick={() => setIsModalOpen(true)}
      >
        Buyurtma berish
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center">
          <div className="bg-white dark:bg-gray-900 w-full md:max-w-lg rounded-b-2xl shadow-lg p-6 fixed top-0 left-1/2 -translate-x-1/2 transition-transform duration-500 ease-out">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              <FiX size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Buyurtma berish
            </h2>

            <div className="space-y-4 dark:text-white">
              <div className="flex items-center justify-between font-semibold">
                <span>Umumiy summa:</span>
                <span>{totalPrice.toFixed(2)} so'm</span>
              </div>

              <h3>📞 +998 33 309 09 99 (BUXARA)</h3>
              <h3>📞 +998 52 525 99 99 (KOGON)</h3>
              <h3>📞 +998 99 747 49 99 (KOGON)</h3>

              <p className="font-bold">
                Shu nomerlarga aloqaga chiqsangiz buyurtma qilgan mahsulotingizni aytib olishingiz mumkin!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
