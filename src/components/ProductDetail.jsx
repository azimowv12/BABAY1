import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaArrowLeft, FaShoppingCart } from "react-icons/fa";

export default function ProductDetail({ cart, setCart }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.log("Xato:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const toggleCart = (id) => {
        setCart((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    if (loading) return <p className="text-center py-6">⏳ Yuklanmoqda...</p>;
    if (!product) return <p className="text-center py-6 text-red-500">Mahsulot topilmadi</p>;

    return (
        <section className="bg-gray-50 py-10 px-6 flex flex-col md:flex-row gap-10  dark:bg-gray-900 ">
            <div className="flex-1 flex justify-center">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-72 md:w-96 object-contain"
                />
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-2xl font-bold mb-3  dark:text-white ">{product.title}</h1>

                <div className="flex items-center text-yellow-500 text-sm mb-3  dark:text-white">
                    <FaStar className="mr-1" /> {product.rating?.rate}
                    <span className="ml-1 text-gray-500  dark:text-white">
                        ({product.rating?.count} ta sharh)
                    </span>
                </div>

                <p className="text-gray-700 mb-4  dark:text-white">{product.description}</p>

                <p className="text-3xl font-bold mb-6  dark:text-white">${product.price}</p>

                <button
                    onClick={() => toggleCart(product.id)}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition mb-4"
                >
                    <FaShoppingCart />
                    {cart.includes(product.id) ? "Savatdan olib tashlash" : "Savatga qo‘shish"}
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                    <FaArrowLeft /> Orqaga qaytish
                </button>
            </div>
        </section>
    );
}
