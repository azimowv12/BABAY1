import { useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaHeart, FaPlus, FaMinus } from "react-icons/fa";

export default function Xoddog({
    wishlist = [],
    setWishlist = () => { },
    cart = [],
    setCart = () => { },
    searchTerm = "",
}) {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeProductId, setActiveProductId] = useState(null);
    const [quantity, setQuantity] = useState(1);

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
                thumbnail:
                    "https://avatars.mds.yandex.net/get-eda/1473782/9bf2a3129bdce9c37e7d32b18016c840/M_height",
            },
            {
                id: 2,
                title: "Комбо Бургер",
                desc: "Булка, котлета, помидоры, маринованные огурцы, соус, картофель фри, кетчуп, стрипсы, сок.",
                price: 42000,
                thumbnail:
                    "https://cdn.pixabay.com/photo/2014/04/22/02/56/burger-329523_960_720.jpg",
            },
            {
                id: 3,
                title: "Комбо Донер Кюфта",
                desc: "Булка, кюфта, фирменный соус, помидоры, картофель фри, кетчуп, сок.",
                price: 40000,
                thumbnail:
                    "https://avatars.mds.yandex.net/i?id=58a385b1369e1470363007251814b078_l-6003349-images-thumbs&n=13",
            },
            {
                id: 4,
                title: "Комбо Хот Дог",
                desc: "Булка, сосиска, морковка по-корейски, помидоры, свежий огурец, кетчуп, майонез, картофель фри, стрипсы, сок.",
                price: 38000,
                thumbnail:
                    "https://avatars.mds.yandex.net/get-eda/3208959/a12ed467a5410ade9b72ff80ef0cc053/1440x1082",
            },
            {
                id: 5,
                title: "Комбо Пицца",
                desc: "Тесто, соус, маслины, помидоры, сосиски, сыр моцарелла, картофель фри, кетчуп, стрипсы, сок.",
                price: 37000,
                thumbnail:
                    "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
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

    const increaseQuantity = () => setQuantity((q) => q + 1);
    const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const addToCart = (product) => {
        setCart((prev) => {
            const prevSafe = Array.isArray(prev) ? prev : [];
            const exists = prevSafe.find((p) => p.id === product.id);
            if (exists) {
                return prevSafe.map((p) =>
                    p.id === product.id
                        ? { ...p, quantity: (p.quantity || 1) + quantity }
                        : p
                );
            }
            return [...prevSafe, { ...product, quantity }];
        });
        setActiveProductId(null);
        setQuantity(1);
    };

    const q = (searchTerm || "").toString().toLowerCase().trim();
    const filteredProducts = post.filter((p) =>
        (p.title || "").toLowerCase().includes(q)
    );

    if (loading) return <p className="text-center py-6">⏳ Yuklanmoqda...</p>;

    return (
        <section className="bg-gray-50 py-8 px-4 dark:bg-gray-900 dark:text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                    const isWish = wishlist.includes(product.id);
                    const isActive = activeProductId === product.id;

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
                                <span className="text-xl font-bold">
                                    {product.price.toLocaleString()} so‘m
                                </span>
                            </div>

                            <button
                                onClick={() => toggleWishlist(product)}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                            >
                                <FaHeart className={`text-xl ${isWish ? "text-red-500" : "text-gray-400"}`} />
                            </button>

                            {isActive ? (
                                <div className="flex items-center justify-between mt-4 border rounded-md">
                                    <button
                                        onClick={decreaseQuantity}
                                        className="px-4 py-2 text-lg font-bold hover:bg-gray-100"
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="text-lg font-semibold">{quantity}</span>
                                    <button
                                        onClick={increaseQuantity}
                                        className="px-4 py-2 text-lg font-bold hover:bg-gray-100"
                                    >
                                        <FaPlus />
                                    </button>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                                    >
                                        Qo‘shish
                                    </button>
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
        </section>
    );
}
