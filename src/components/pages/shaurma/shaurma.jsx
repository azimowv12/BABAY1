import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaHeart, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Shaurma({
    wishlist = [],
    setWishlist = () => { },
    cart = [],
    setCart = () => { },
    searchTerm = ""
}) {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeProductId, setActiveProductId] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const itemsPerRow = 3;
    const rowsPerPage = 4;
    const perPage = itemsPerRow * rowsPerPage;

    useEffect(() => {
        setPost([
            {
                id: 1,
                title: "Шаурма Бабай",
                price: { small: 40000, large: 45000 },
                thumbnail: "https://sun9-76.userapi.com/impg/UuK0ndtOA608MsGOkjOW-PDawmA4rH-kvLgaJg/9g9ixRr4IGo.jpg?size=604x427&quality=96&sign=9395a75b96fe6d4bdeedd565ebe1e8b5&type=album",
                desc: "тушеная говядина, томатный соус, сыр, зелень",
            },
            {
                id: 2,
                title: "Тандир лаваш (тушеная)",
                price: { small: 43000, large: 47000 },
                thumbnail: "https://sun9-76.userapi.com/impg/UuK0ndtOA608MsGOkjOW-PDawmA4rH-kvLgaJg/9g9ixRr4IGo.jpg?size=604x427&quality=96&sign=9395a75b96fe6d4bdeedd565ebe1e8b5&type=album",
                desc: "тушеная говядина, сыр, томатный соус, зелень, яйцо, кунжут",
            },
            {
                id: 3,
                title: "Тандир лаваш (куриный)",
                price: { small: 39000, large: 43000 },
                thumbnail: "https://sun9-76.userapi.com/impg/UuK0ndtOA608MsGOkjOW-PDawmA4rH-kvLgaJg/9g9ixRr4IGo.jpg?size=604x427&quality=96&sign=9395a75b96fe6d4bdeedd565ebe1e8b5&type=album",
                desc: "куриное филе, помидоры, соус цезар, сыр",
            },
            {
                id: 4,
                title: "Шаурма по-арабский",
                price: { small: 33000, large: 36000 },
                thumbnail: "https://sun9-76.userapi.com/impg/UuK0ndtOA608MsGOkjOW-PDawmA4rH-kvLgaJg/9g9ixRr4IGo.jpg?size=604x427&quality=96&sign=9395a75b96fe6d4bdeedd565ebe1e8b5&type=album",
                desc: "куриное филе, арабский соус, помидоры, огурец, салат",
            },
            {
                id: 5,
                title: "Московская шаурма",
                price: { small: 33000, large: 36000 },
                thumbnail: "https://sun9-76.userapi.com/impg/UuK0ndtOA608MsGOkjOW-PDawmA4rH-kvLgaJg/9g9ixRr4IGo.jpg?size=604x427&quality=96&sign=9395a75b96fe6d4bdeedd565ebe1e8b5&type=album",
                desc: "томатный соус, куриное филе, капуста, морковь",
            },
            {
                id: 6,
                title: "Классическая шаурма",
                price: { small: 34000, large: 40000 },
                thumbnail: "https://sun9-76.userapi.com/impg/UuK0ndtOA608MsGOkjOW-PDawmA4rH-kvLgaJg/9g9ixRr4IGo.jpg?size=604x427&quality=96&sign=9395a75b96fe6d4bdeedd565ebe1e8b5&type=album",
                desc: "томатный соус, мясо говяжий, помидоры, огурцы",
            },
            {
                id: 7,
                title: "Шаурма от Шефа",
                price: { small: 38000, large: 43000 },
                thumbnail: "https://sun9-76.userapi.com/impg/UuK0ndtOA608MsGOkjOW-PDawmA4rH-kvLgaJg/9g9ixRr4IGo.jpg?size=604x427&quality=96&sign=9395a75b96fe6d4bdeedd565ebe1e8b5&type=album",
                desc: "томатный соус, мясо говяжий, сыр, фирменный соус",
            },
            {
                id: 8,
                title: "Шаурма Биф-Бур",
                price: { small: 36000, large: 40000 },
                thumbnail: "https://sun9-76.userapi.com/impg/UuK0ndtOA608MsGOkjOW-PDawmA4rH-kvLgaJg/9g9ixRr4IGo.jpg?size=604x427&quality=96&sign=9395a75b96fe6d4bdeedd565ebe1e8b5&type=album",
                desc: "томатный соус, чесночный соус, мясо говяжий, картофельные чипсы",
            },
            {
                id: 9,
                title: "Шаурма Цезар",
                price: { small: 33000, large: 38000 },
                thumbnail: "https://sun9-76.userapi.com/impg/UuK0ndtOA608MsGOkjOW-PDawmA4rH-kvLgaJg/9g9ixRr4IGo.jpg?size=604x427&quality=96&sign=9395a75b96fe6d4bdeedd565ebe1e8b5&type=album",
                desc: "куриное филе, соус цезар, помидоры, листья салата",
            },
            {
                id: 10,
                title: "Тандир лаваш",
                price: { small: 40000, large: 45000 },
                thumbnail: "https://sun9-76.userapi.com/impg/UuK0ndtOA608MsGOkjOW-PDawmA4rH-kvLgaJg/9g9ixRr4IGo.jpg?size=604x427&quality=96&sign=9395a75b96fe6d4bdeedd565ebe1e8b5&type=album",
                desc: "томатный соус, чесночный соус, мясо говяжий, картофельные чипсы, помидоры, кунжут, яйцо",
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

    const addToCart = (product, size) => {
        setCart((prev) => {
            const prevSafe = Array.isArray(prev) ? prev : [];
            const actualSize = size || "small";
            const itemId = `${product.id}-${actualSize}`;
            const exists = prevSafe.find((p) => p.itemId === itemId);

            const smallPrice = product?.price?.small ?? product?.price ?? 0;
            const largePrice = product?.price?.large ?? product?.price ?? 0;
            const price = actualSize === "small" ? smallPrice : largePrice;

            if (exists) {
                return prevSafe.map((p) =>
                    p.itemId === itemId ? { ...p, quantity: (p.quantity || 1) + quantity } : p
                );
            }
            return [...prevSafe, { ...product, itemId, size: actualSize, price, quantity }];
        });

        setActiveProductId(null);
    };

    const q = (searchTerm || "").toLowerCase().trim();
    const filteredProducts = post.filter((p) => (p.title || "").toLowerCase().includes(q));

    useEffect(() => {
        setCurrentPage(1);
    }, [q, post.length]);

    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));

    const increaseQuantity = () => setQuantity((q) => q + 1);
    const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    if (loading) return <p className="text-center py-6">⏳ Yuklanmoqda...</p>;

    return (
        <section className="bg-gray-50 py-8 px-4 dark:bg-gray-900 dark:text-white">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 transition shadow-md"
                >
                    <FaArrowLeft />
                    Orqaga
                </button>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Shaurma</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentProducts.map((product) => {
                    const isWish = wishlist.includes(product.id);
                    const isActive = activeProductId === product.id;
                    const smallPrice = product?.price?.small ?? product.price ?? 0;
                    const largePrice = product?.price?.large ?? product.price ?? 0;

                    return (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col hover:shadow-md transition dark:bg-gray-800 dark:border-gray-700"
                        >
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded-lg mb-3"
                            />
                            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{product.desc}</p>

                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center text-yellow-500">
                                    <FaStar className="mr-1" />
                                    <span>4.8 (432)</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xl font-bold block">
                                        {smallPrice.toLocaleString()} so‘m
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        katta: {largePrice.toLocaleString()} so‘m
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => toggleWishlist(product)}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                            >
                                <FaHeart className={`text-xl ${isWish ? "text-red-500" : "text-gray-400"}`} />
                            </button>

                            {isActive ? (
                                <div className="mt-4 border rounded-md p-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold">O‘lchamni tanlang:</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => addToCart(product, "small")}
                                                className="px-3 py-1 bg-yellow-700 hover:bg-yellow-800 text-white rounded-md"
                                            >
                                                Small
                                            </button>
                                            <button
                                                onClick={() => addToCart(product, "large")}
                                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                                            >
                                                Large
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={decreaseQuantity}
                                                className="px-3 py-2 text-lg font-bold hover:bg-gray-100 rounded-md"
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="text-lg font-semibold">{quantity}</span>
                                            <button
                                                onClick={increaseQuantity}
                                                className="px-3 py-2 text-lg font-bold hover:bg-gray-100 rounded-md"
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => addToCart(product, "small")}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                                        >
                                            Qo‘shish
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        setActiveProductId(product.id);
                                        setQuantity(1);
                                    }}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium mt-3"
                                >
                                    Hoziroq xarid qilish
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

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
