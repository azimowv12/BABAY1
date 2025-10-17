import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaHeart, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Xoddog({
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
                title: "Хаггу",
                desc: "Булка, соус, мясо говядины, салат, помидоры, сыр, картошка фри.",
                price: { small: 43000, large: 43000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 2,
                title: "Донер",
                desc: "Сочная говядина, соус, мясо говядины, лаваш, овощи, картошка фри.",
                price: { small: 35000, large: 38000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 3,
                title: "Клаб Сэндвич",
                desc: "Куриное филе, овощи, помидор, сыр, салат, соус, картошка фри.",
                price: { small: 40000, large: 40000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 4,
                title: "Араб Кебаб",
                desc: "Лаваш, говядина, овощи, соус, картошка фри.",
                price: { small: 37000, large: 42000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 5,
                title: "Бабай Кебаб",
                desc: "Тушеная говядина, булка, томат, овощи, соус.",
                price: { small: 38000, large: 38000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 6,
                title: "Хот-Дог Чимчи",
                desc: "Булка, сосиска, корейская морковка (кимчи), кетчуп, майонез.",
                price: { small: 16000, large: 18000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 7,
                title: "Хот-Дог Канада",
                desc: "Булка, канадская сосиска, кетчуп, майонез, салат айсберг, огурец.",
                price: { small: 21000, large: 23000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 8,
                title: "Хот-Дог Сырный",
                desc: "Булка, сосиска, сырный соус, кетчуп, майонез, огурцы.",
                price: { small: 23000, large: 25000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 9,
                title: "Хот-Дог Классик",
                desc: "Булка, классическая сосиска, кетчуп, майонез, листья салата.",
                price: { small: 22000, large: 25000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 10,
                title: "Хот-Дог с Грибами",
                desc: "Булка, сосиска, соус, грибы, кетчуп, майонез, сыр.",
                price: { small: 25000, large: 29000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 11,
                title: "Хот-Дог Чили",
                desc: "Булка, сосиска, соус техас, айсберг, томаты, соус чили.",
                price: { small: 28000, large: 28000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 12,
                title: "Лонгер Мантяр",
                desc: "Булка, грибной соус, айсберг, куриное филе, помидор, перец халапеньо.",
                price: { small: 33000, large: 33000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 13,
                title: "Лонгер Чиз",
                desc: "Булка, сладкий соус, айсберг, помидор, огурцы, сыр брушетта, куриное филе.",
                price: { small: 34000, large: 34000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
            {
                id: 14,
                title: "Лонгер Чили",
                desc: "Булка, куриное филе, соус техас, айсберг, салат микс, сладкий чили.",
                price: { small: 28000, large: 28000 },
                thumbnail: "https://i.pinimg.com/550x/00/ee/8c/00ee8c8f9dcf4d3b1e8587e508b7dc3a.jpg",
            },
        ]);
        setLoading(false);
    }, []);

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const prevSafe = Array.isArray(prev) ? prev : [];
            const exists = prevSafe.includes(product.id);
            return exists
                ? prevSafe.filter((w) => w !== product.id)
                : [...prevSafe, product.id];
        });
    };

    const addToCart = (product, size) => {
        setCart((prev) => {
            const prevSafe = Array.isArray(prev) ? prev : [];
            const itemId = size ? `${product.id}-${size}` : `${product.id}`;
            const exists = prevSafe.find((p) => p.itemId === itemId);

            const smallPrice = product?.price?.small ?? product?.price ?? 0;
            const largePrice = product?.price?.large ?? product?.price ?? 0;

            if (exists) {
                // Agar bor bo'lsa, miqdorini oshiramiz
                return prevSafe.map((p) =>
                    p.itemId === itemId ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }

            const item = {
                ...product,
                itemId,
                size: size || null,
                price:
                    size === "small"
                        ? smallPrice
                        : size === "large"
                            ? largePrice
                            : product?.price ?? 0,
                quantity: 1,
            };
            return [...prevSafe, item];
        });
    };

    const q = (searchTerm || "").toString().toLowerCase().trim();
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
            <h2 className="text-2xl font-bold mb-6">Mahsulotlar</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => {
                        const thumbnail =
                            product?.thumbnail ||
                            "https://via.placeholder.com/300x200?text=No+Image";
                        const title = product?.title || "No title";
                        const ratingRate = product?.rating?.rate ?? "-";
                        const ratingCount = product?.rating?.count ?? 0;

                        const smallPrice = product?.price?.small ?? product?.price ?? 0;
                        const largePrice = product?.price?.large ?? product?.price ?? 0;

                        const isWish = Array.isArray(wishlist)
                            ? wishlist.includes(product.id)
                            : false;

                        return (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition dark:bg-gray-900 dark:text-white"
                            >
                                <Link >
                                    <img
                                        src={thumbnail}
                                        alt={title}
                                        className="w-full h-48 object-contain mb-3"
                                        loading="lazy"
                                    />
                                    <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                                        {title}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                                        {product.desc}
                                    </p>
                                </Link>

                                <div className="flex items-center text-yellow-500 text-sm mt-1">
                                    <FaStar className="mr-1" /> {ratingRate}
                                    <span className="ml-1 text-gray-500">
                                        ({ratingCount})
                                    </span>
                                </div>

                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() => toggleWishlist(product)}
                                        aria-label="wishlist"
                                    >
                                        <FaHeart
                                            className={`text-2xl transition ${isWish
                                                    ? "text-red-500"
                                                    : "text-gray-400"
                                                }`}
                                        />
                                    </button>
                                </div>

                                <div className="mt-4 flex flex-col gap-2">
                                    <div className="flex justify-between items-center border p-2 rounded-xl">
                                        <span className="text-lg font-semibold">
                                            Small: {smallPrice} so'm
                                        </span>
                                        <button
                                            onClick={() => addToCart(product, "small")}
                                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                                            aria-label="add-small"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center border p-2 rounded-xl">
                                        <span className="text-lg font-semibold">
                                            Large: {largePrice} so'm
                                        </span>
                                        <button
                                            onClick={() => addToCart(product, "large")}
                                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                                            aria-label="add-large"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500">Hech narsa topilmadi.</p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
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
                        )
                    )}
                </div>
            )}
        </section>
    );
}
