import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaHeart, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Burger({
    wishlist = [],
    setWishlist = () => { },
    cart = [],
    setCart = () => { },
    searchTerm = ""
}) {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerRow = 3;
    const rowsPerPage = 4;
    const perPage = itemsPerRow * rowsPerPage;

    useEffect(() => {
        setPost([
            {
                id: 1,
                title: "Бургер Чикен",
                price: 34000,
                thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg",
                desc: "Булка, куриный котлет, соус ранч, огурец, салат, помидоры, сыр чеддер"
            },
            {
                id: 2,
                title: "Бургер Чикен Кинг",
                price: 40000,
                thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg",
                desc: "Булка, куриный котлет, соус чесночный, сыр, айсберг, помидоры"
            },
            {
                id: 3,
                title: "Шеф Бургер",
                price: 54000,
               thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg",
                desc: "Булка, говяжий котлет, лук, помидоры, фирменный соус, листья салата"
            },
            {
                id: 4,
                title: "Бургер New York",
                price: 40000,
             thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg",
                desc: "Булка, сыр чеддер, лук красный, котлет, кетчуп Heinz"
            },
            {
                id: 5,
                title: "Гамбургер",
                price: 34000,
                thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg",
                desc: "Булка, говяжий котлет, лук, сыр, соус, огурец"
            },
            {
                id: 6,
                title: "Чизбургер",
                price: 36000,
               thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg",
                desc: "Булка, котлет, сыр, кетчуп Heinz, помидоры, огурцы"
            },
            {
                id: 7,
                title: "Бургер Грибной",
                price: 32000,
                thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg",
                desc: "Булка, соус айсберг, куриное филе, кетчуп Heinz, сладкий лук"
            },
            {
                id: 8,
                title: "Бургер Чикен Чиз",
                price: 29000,
                thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg",
                desc: "Булка, куриное филе, айсберг, соус пикс, сырный соус, сыр чеддер"
            },
            {
                id: 9,
                title: "Бургер Чикен Классик",
                price: 32000,
              thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg",
                desc: "Булка, сладкий соус, айсберг, куриное филе, помидоры, кетчуп Heinz, сыр чеддер"
            },
        ]);
        setLoading(false);
    }, []);

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const prevSafe = Array.isArray(prev) ? prev : [];
            const exists = prevSafe.includes(product.id);
            return exists ? prevSafe.filter((w) => w !== product.id) : [...prevSafe, product.id];
        });
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const prevSafe = Array.isArray(prev) ? prev : [];
            const exists = prevSafe.find((p) => p.id === product.id);
            if (exists) {
                // Agar bor bo'lsa, miqdorini oshiramiz
                return prevSafe.map((p) =>
                    p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }
            // Agar yo'q bo'lsa, yangi qo'shamiz
            return [...prevSafe, { ...product, quantity: 1 }];
        });
    };

    const q = (searchTerm || "").toLowerCase().trim();
    const filteredProducts = post.filter((p) =>
        (p.title || "").toLowerCase().includes(q)
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [q, post.length]);

    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));

    if (loading) return <p className="text-center py-6">⏳ Yuklanmoqda...</p>;

    return (
        <section className="bg-gray-50 py-8 px-4 dark:bg-gray-900 dark:text-white">
            <h2 className="text-2xl font-bold mb-6">Burgerlar</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => {
                        const thumbnail = product?.thumbnail || "https://via.placeholder.com/300x200?text=No+Image";
                        const title = product?.title || "No title";
                        const isWish = Array.isArray(wishlist) ? wishlist.includes(product.id) : false;

                        return (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition dark:bg-gray-900 dark:text-white"
                            >
                                <Link>
                                    <img
                                        src={thumbnail}
                                        alt={title}
                                        className="w-full h-48 object-contain mb-3"
                                        loading="lazy"
                                    />
                                    <h3 className="text-sm font-medium text-gray-800 dark:text-white">{title}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">{product.desc}</p>
                                </Link>

                                {/* ❤️ Wishlist */}
                                <div className="flex justify-end mt-2">
                                    <button onClick={() => toggleWishlist(product)} aria-label="wishlist">
                                        <FaHeart
                                            className={`text-2xl transition ${isWish ? "text-red-500" : "text-gray-400"}`}
                                        />
                                    </button>
                                </div>

                                {/* 💰 Narx */}
                                <div className="mt-4 flex justify-between items-center border p-2 rounded-xl">
                                    <span className="text-lg font-semibold">{product.price} so'm</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                                        aria-label="add"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500">Heч narsa topilmadi.</p>
                )}
            </div>

            {/* 🔢 Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-xl border ${page === currentPage
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}
