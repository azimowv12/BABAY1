import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaHeart, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function PIZZA({
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

    const navigate = useNavigate();

    useEffect(() => {
        setPost([
            {
                id: 1,
                title: "Пицца Цезарь",
                desc: "Тесто, цезарь соус, куриное филе, айсберг, помидор, пармезан, гренки, сыр.",
                price: { small: 33000, large: 66000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 2,
                title: "Пицца Тушёнка",
                desc: "Тесто, соус пронто, шампиньоны, болгарский перец, помидор, тушёнка, укроп, сыр.",
                price: { small: 44000, large: 88000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 3,
                title: "Пицца Курица-Грибы New",
                desc: "Тесто, цезарь соус, шампиньоны, куриное бедро, помидор, сыр.",
                price: { small: 32000, large: 63000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 4,
                title: "Пицца Техас",
                desc: "Тесто, соус пронто, красный лук, охотничья сосиска, шампиньоны, говяжий фарш, сыр.",
                price: { small: 40000, large: 72000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 5,
                title: "Пицца Пепперони",
                desc: "Соус пронто, пепперони, орегано, сыр моцарелла.",
                price: { small: 55000, large: 82000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 6,
                title: "Пицца по Деревенски",
                desc: "Соус пронто, колбаса копчёная, помидор, перец болгарский, говяжий фарш, сыр моцарелла, зелень.",
                price: { small: 55000, large: 85000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 7,
                title: "Пицца Четыре Сыра",
                desc: "Соус пронто, сыр чеддер, сыр фета, сыр пармезан, сыр моцарелла, орехи.",
                price: { small: 58000, large: 90000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 8,
                title: "Пицца Охотка",
                desc: "Соус пронто, охотничья сосиска, куриное филе, лук зелёный.",
                price: { small: 52000, large: 74000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 9,
                title: "Пицца Овощной",
                desc: "Соус пронто, помидор, грибы, перец болгарский, маслины, огурцы маринованные, зелень.",
                price: { small: 43000, large: 60000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 10,
                title: "Пицца Домашняя",
                desc: "Соус пронто, сосиска, помидор, говяжий фарш, сыр моцарелла.",
                price: { small: 55000, large: 80000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 11,
                title: "Пицца Домашняя Mix",
                desc: "Соус пронто, сосиска, помидор, мясо говяжий, говяжий фарш, сыр моцарелла, зелень.",
                price: { small: 60000, large: 90000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 12,
                title: "Пицца Курица с Грибами",
                desc: "Соус цезарь, куриное филе, помидор, грибы, сыр моцарелла.",
                price: { small: 53000, large: 72000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 13,
                title: "Пицца Комбо",
                desc: "Соус пронто, грибы, маслины, помидор, куриное филе, мясо говядины, охотничья сосиска, колбаса говяжья, колбаса куриная, сыр моцарелла.",
                price: { small: 58000, large: 90000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 14,
                title: "Пицца Мясо с Овощами",
                desc: "Соус пронто, мясо говяжий, перец болгарский, грибы, маслины, помидор, сыр моцарелла.",
                price: { small: 58000, large: 84000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 15,
                title: "Пицца Мясной",
                desc: "Соус пронто, помидор, мясо говяжий, сыр моцарелла.",
                price: { small: 65000, large: 90000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
            },
            {
                id: 16,
                title: "Пицца Бабай",
                desc: "Соус пронто, грибы, помидор, ветчина, охотничья сосиска, колбаса говяжий, колбаса куриный, двойной сыр моцарелла.",
                price: { small: 60000, large: 92000 },
                thumbnail: "https://i.ytimg.com/vi/nyRj6evjf04/maxresdefault.jpg",
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
            const actualSize = size || "small";
            const itemId = `${product.id}-${actualSize}`;
            const exists = prevSafe.find((p) => p.itemId === itemId);
            const smallPrice = product?.price?.small ?? product?.price ?? 0;
            const largePrice = product?.price?.large ?? product?.price ?? 0;
            const price = actualSize === "small" ? smallPrice : largePrice;

            if (exists) {
                return prevSafe.map((p) =>
                    p.itemId === itemId ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }
            return [...prevSafe, { ...product, itemId, size: actualSize, price, quantity: 1 }];
        });
    };

    const increaseQuantity = () => setQuantity((q) => q + 1);
    const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

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
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 transition shadow-md"
                >
                    <FaArrowLeft />
                    Orqaga
                </button>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pitsa</h2>
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
