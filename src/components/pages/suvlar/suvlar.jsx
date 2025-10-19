import { useEffect, useState } from "react";
import { FaHeart, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Suvlar({
    wishlist = [],
    setWishlist = () => { },
    cart = [],
    setCart = () => { },
    searchTerm = "",
}) {
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerRow = 3;
    const rowsPerPage = 4;
    const perPage = itemsPerRow * rowsPerPage;

    useEffect(() => {
        setDrinks([
            // --- Oddiy ichimliklar ---
            { id: 1, title: "Кока-Кола", desc: "Газланган ichimlik", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 2, title: "Фанта", desc: "Апельсинli gazli ichimlik", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 3, title: "Сок", desc: "Tabiiy mevali sharbat", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 4, title: "Кофе черный", desc: "Issiq qora kofe", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 5, title: "Кофе 3в1", desc: "Sutli, shakarli aralashma", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 6, title: "Вода газ", desc: "Gazlangan suv", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 7, title: "Вода без газа", desc: "Oddiy toza suv", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },

            // --- Коктейли ---
            { id: 8, title: "Мохито классик", desc: "Limon, yalpiz, soda bilan", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 9, title: "Мохито клубника", desc: "Klubnichali muzli kokteyl", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 10, title: "Мохито апельсин", desc: "Apelsinli yalpizli ichimlik", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 11, title: "Пина Колада", desc: "Ananas va kokosli kokteyl", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 12, title: "Голубая лагуна", desc: "Ko‘k rangli tropik ichimlik", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 13, title: "Сейлд Романс", desc: "Muzli ekzotik kokteyl", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },

            // --- Лимонадлар ---
            { id: 14, title: "Лимонад классический", desc: "Limonli sovuq ichimlik", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 15, title: "Лимонад апельсиновый", desc: "Apelsinli limonad", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 16, title: "Лимонад красная ягода", desc: "Qizil mevalardan limonad", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 17, title: "Лимонад тархун", desc: "Tarkhunli gazlangan ichimlik", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 18, title: "Лимонад вишневый", desc: "Olchali limonad", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },

            // --- Милкшейклар ---
            { id: 19, title: "Милкшейк клубничный", desc: "Sovuq klubnichali milkshake", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 20, title: "Милкшейк шоколадный", desc: "Shokoladli milkshake", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 21, title: "Милкшейк банановый", desc: "Banandan tayyorlangan", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 22, title: "Милкшейк малиновый", desc: "Malinali milkshake", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 23, title: "Милкшейк ванильный", desc: "Soddaligi bilan yoqimli", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },

            // --- Чайлар ---
            { id: 24, title: "Чай зелёный", desc: "Tabiiy yashil choy", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 25, title: "Чай чёрный", desc: "Kuchli qora choy", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 26, title: "Чай с лимоном", desc: "Limonli issiq choy", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 27, title: "Чай яблочный", desc: "Olmali choy", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 28, title: "Чай имбирный", desc: "Imbirli, vitaminli choy", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 29, title: "Чай гранатовый", desc: "Anorli choy", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
            { id: 30, title: "Чай бобай", desc: "Xushbo‘y maxsus choy", price:"10000", thumbnail: "https://w7.pngwing.com/pngs/200/675/png-transparent-brand-food-water-refreshing-drink-food-logo-refreshing-drink.png" },
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
            // Use unique itemId for each drink (id only)
            const itemId = `${product.id}`;
            const exists = prevSafe.find((p) => p.itemId === itemId);
            const price = product.price ?? 0;
            if (exists) {
                return prevSafe.map((p) =>
                    p.itemId === itemId ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }
            return [...prevSafe, { ...product, itemId, price, quantity: 1 }];
        });
    };

    const q = (searchTerm || "").toLowerCase().trim();
    const filtered = drinks.filter((p) => (p.title || "").toLowerCase().includes(q));

    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const currentDrinks = filtered.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

    if (loading) return <p className="text-center py-6">⏳ Yuklanmoqda...</p>;

    return (
        <section className="bg-gray-50 py-8 px-4 dark:bg-gray-900 dark:text-white">
            <h2 className="text-2xl font-bold mb-6">Ichimliklar</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentDrinks.length > 0 ? (
                    currentDrinks.map((product) => {
                        const isWish = wishlist.includes(product.id);
                        return (
                            <div key={product.id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition dark:bg-gray-900 dark:text-white">
                                <Link >
                                    <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-3 rounded-xl" />
                                    <h3 className="text-sm font-medium">{product.title}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.desc}</p>
                                </Link>

                                <div className="flex justify-end mt-2">
                                    <button onClick={() => toggleWishlist(product)}>
                                        <FaHeart className={`text-2xl transition ${isWish ? "text-red-500" : "text-gray-400"}`} />
                                    </button>
                                </div>

                                <div className="mt-4 flex justify-between items-center border p-2 rounded-xl">

                                    <span className="text-lg font-semibold">💧 Narx:{product.price}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                                    >
                                        <FaPlus />
                                    </button>
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-xl border ${page === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}