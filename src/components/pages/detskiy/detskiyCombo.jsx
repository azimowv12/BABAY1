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
                title: "Комбо Лаваш",
                desc: "Лаваш, говядина, помидоры, огурец, чесночный и томатный соус, картофель фри, кетчуп, стрипсы, сок.",
                price: 37000,
                thumbnail: "https://avatars.mds.yandex.net/get-eda/1473782/9bf2a3129bdce9c37e7d32b18016c840/M_height",
            },
            {
                id: 2,
                title: "Комбо Бургер",
                desc: "Булка, котлета, помидоры, маринованные огурцы, соус, картофель фри, кетчуп, стрипсы, сок.",
                price: 42000,
                thumbnail: "https://cdn.pixabay.com/photo/2014/04/22/02/56/burger-329523_960_720.jpg",
            },
            {
                id: 3,
                title: "Комбо Донер Кюфта",
                desc: "Булка, кюфта, фирменный соус, помидоры, картофель фри, кетчуп, сок.",
                price: 40000,
                thumbnail: "https://avatars.mds.yandex.net/i?id=58a385b1369e1470363007251814b078_l-6003349-images-thumbs&n=13",
            },
            {
                id: 4,
                title: "Комбо Хот Дог",
                desc: "Булка, сосиска, морковка по-корейски, помидоры, свежий огурец, кетчуп, майонез, картофель фри, стрипсы, сок.",
                price: 38000,
                thumbnail: "https://avatars.mds.yandex.net/get-eda/3208959/a12ed467a5410ade9b72ff80ef0cc053/1440x1082",
            },
            {
                id: 5,
                title: "Комбо Пицца",
                desc: "Тесто, соус, маслины, помидоры, сосиски, сыр моцарелла, картофель фри, кетчуп, стрипсы, сок.",
                price: 37000,
                thumbnail: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
            },
        ]);
        setLoading(false);
    }, []);

    // Agar parent setWishlist bilan boshqarilmasa ham ichki fallback ishlaydi
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
            // Always require size for combo (default to 'small' if not provided)
            const actualSize = size || 'small';
            const itemId = `${product.id}-${actualSize}`;
            const exists = prevSafe.find((p) => p.itemId === itemId);
            // Calculate price based on size
            const smallPrice = product?.price?.small ?? product?.price ?? product.price ?? 0;
            const largePrice = product?.price?.large ?? product?.price ?? product.price ?? 0;
            const price = actualSize === 'small' ? smallPrice : largePrice;
            if (exists) {
                return prevSafe.map((p) =>
                    p.itemId === itemId ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }
            return [...prevSafe, { ...product, itemId, size: actualSize, price, quantity: 1 }];
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
                        // Har bir product uchun xavfsiz qiymatlar
                        const thumbnail =
                            product?.thumbnail || "https://via.placeholder.com/300x200?text=No+Image";
                        const title = product?.title || "No title";
                        const ratingRate = product?.rating?.rate ?? "-";
                        const ratingCount = product?.rating?.count ?? 0;

                        // Narxlar: API formatiga moslashuv
                        const smallPrice = product?.price?.small ?? product?.price ?? 0;
                        const largePrice = product?.price?.large ?? product?.price ?? 0;

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

                                {/* ⭐ Reyting */}
                                <div className="flex items-center text-yellow-500 text-sm mt-1">
                                    <FaStar className="mr-1" /> {ratingRate}
                                    <span className="ml-1 text-gray-500">({ratingCount})</span>
                                </div>

                                {/* ❤️ Wishlist */}
                                <div className="flex justify-end mt-2">
                                    <button onClick={() => toggleWishlist(product)} aria-label="wishlist">
                                        <FaHeart
                                            className={`text-2xl transition ${isWish ? "text-red-500" : "text-gray-400"}`}
                                        />
                                    </button>
                                </div>

                                {/* 💰 Ikkita narx + + tugmasi */}
                                <div className="mt-4 flex flex-col gap-2">
                                    <div className="flex justify-between items-center border p-2 rounded-xl">
                                        <span className="text-lg font-semibold">Small: {smallPrice} so'm</span>
                                        <button
                                            onClick={() => addToCart(product, "small")}
                                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                                            aria-label="add-small"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center border p-2 rounded-xl">
                                        <span className="text-lg font-semibold">Large: {largePrice} so'm</span>
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

            {/* 🔢 Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-xl border ${page === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
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
