import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaHeart, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
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

    const itemsPerRow = 3;
    const rowsPerPage = 4;
    const perPage = itemsPerRow * rowsPerPage;

    useEffect(() => {
        setPost([
            // === NEW PIZZAS ===
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

            // === BABAY FOOD PIZZAS ===
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
            const itemId = size ? `${product.id}-${size}` : `${product.id}`;
            const exists = prevSafe.find((p) => p.itemId === itemId);

            const smallPrice = product?.price?.small ?? product?.price ?? 0;
            const largePrice = product?.price?.large ?? product?.price ?? 0;

            if (exists) return prevSafe;

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
