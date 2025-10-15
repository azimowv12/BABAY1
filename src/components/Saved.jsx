import React from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Saved = ({ wishlist, setWishlist }) => {
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sevimlilar</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Sevimlilar ro‘yxati bo‘sh</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <div
              key={product}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition dark:bg-gray-800 dark:text-white"
            >
              <Link to={product}>
                <img
                  src={product.thumzbnail || "https://via.placeholder.com/150?text=No+Image"}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-3"
                />
                <h3 className="text-sm font-medium">{product.title}</h3>
              </Link>

              <p className="text-lg font-bold mt-2">${product.price}</p>

              <div className="flex items-center text-yellow-500 text-sm">
                <FaStar className="mr-1" /> {product.rating?.rate}
                <span className="ml-1 text-gray-500">
                  ({product.rating?.count})
                </span>
              </div>

              <button
                onClick={() => removeFromWishlist(product)}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-xl mt-3"
              >
                <FaTrash /> Olib tashlash
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
