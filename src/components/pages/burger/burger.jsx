import { useEffect, useState } from "react";
import { FaStar, FaHeart, FaPlus, FaMinus } from "react-icons/fa";

export default function Burger({
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

    useEffect(() => { setPost([{ id: 1, title: "Бургер Чикен", price: 34000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, куриный котлет, соус ранч, огурец, салат, помидоры, сыр чеддер", }, { id: 2, title: "Бургер Чикен Кинг", price: 40000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, куриный котлет, соус чесночный, сыр, айсберг, помидоры", }, { id: 3, title: "Бургер Гриль Брой", price: 54000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, говяжий котлет на гриле, сыр, айсберг, помидоры, листья салата", }, { id: 4, title: "Шеф Бургер", price: 54000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, говяжий котлет, лук, помидоры, фирменный соус, листья салата", }, { id: 5, title: "Бургер New York", price: 40000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, сыр чеддер, лук красный, котлет, кетчуп Heinz", }, { id: 6, title: "Бургер Бабай", price: 60000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, говяжий котлет x2, соус, сыр чеддер, айсберг, картофельные чипсы, фирменный соус", }, { id: 7, title: "Гамбургер", price: 34000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, говяжий котлет, лук, сыр, соус, огурец", }, { id: 8, title: "Чизбургер", price: 36000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, соус классик, говяжий котлет, маринованные огурцы, кетчуп Heinz, сыр чеддер", }, { id: 9, title: "Бургер Грибной", price: 32000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, соус айсберг, куриное филе, кетчуп Heinz, сладкий лук", }, { id: 10, title: "Бургер Чикен Чиз", price: 29000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, куриное филе, айсберг, соус пикс, сырный соус, сыр чеддер", }, { id: 11, title: "Чизбургер New", price: 32000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, кетчуп Heinz, сырный соус, говяжий котлет, сыр чеддер", }, { id: 12, title: "Бургер Чикен Классик", price: 32000, thumbnail: "https://i.pinimg.com/736x/ed/fa/d9/edfad98b139a2741ee52747916955dc1.jpg", desc: "Булка, сладкий соус, айсберг, куриное филе, помидоры, маринованные огурцы, кетчуп Heinz, сыр чеддер", },]); 
    setLoading(false); }, []);

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.includes(product.id);
            return exists ? prev.filter((id) => id !== product.id) : [...prev, product.id];
        });
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.id === product.id);
            if (exists) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: (p.quantity || 1) + quantity } : p
                );
            } else {
                return [...prev, { ...product, quantity }];
            }
        });
        setActiveProductId(null);
        setQuantity(1);
    };

    const increaseQuantity = () => setQuantity((q) => q + 1);
    const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    if (loading) return <p className="text-center py-6">⏳ Yuklanmoqda...</p>;

    return (
        <section className="bg-gray-50 py-8 px-4 dark:bg-gray-900 dark:text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {post.map((product) => {
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
                                    <span>4.7 (293)</span>
                                </div>
                                <span className="text-xl font-bold">
                                    {product.price.toLocaleString()} so'm
                                </span>
                            </div>

                            {/* Wishlist */}
                            <button
                                onClick={() => toggleWishlist(product)}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                            >
                                <FaHeart
                                    className={`text-xl ${isWish ? "text-red-500" : "text-gray-400"}`}
                                />
                            </button>

                            {/* Add to cart or quantity selector */}
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
