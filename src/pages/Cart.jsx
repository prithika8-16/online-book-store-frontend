import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    BookOpen,
    ArrowLeft
} from "lucide-react";
import api from "../services/api";

function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                navigate("/login");
                return;
            }

            const response = await api.get(`/cart/${user.id}`);

            console.log("CART RESPONSE:", response.data);

            setCart(response.data);

        } catch (error) {

            console.error(error);
            setError("Unable to load cart");

        } finally {

            setLoading(false);
        }
    };


    const updateQuantity = async (cartItemId, quantity) => {

        if (quantity < 1) {
            return;
        }

        try {

            await api.put(`/cart/item/${cartItemId}`, null, {
                params: {
                    quantity: quantity
                }
            });

            fetchCart();

        } catch (error) {

            console.error(error);
            alert("Unable to update quantity");
        }
    };


    const removeItem = async (cartItemId) => {

        try {

            await api.delete(`/cart/item/${cartItemId}`);

            fetchCart();

        } catch (error) {

            console.error(error);
            alert("Unable to remove item");
        }
    };


    if (loading) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <ShoppingCart
                        size={45}
                        className="mx-auto text-blue-600 mb-4"
                    />

                    <h2 className="text-xl font-semibold text-gray-700">
                        Loading your cart...
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Please wait a moment.
                    </p>

                </div>

            </div>
        );
    }


    if (error) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

                <div className="bg-white rounded-2xl shadow-md p-10 text-center">

                    <ShoppingCart
                        size={50}
                        className="mx-auto text-red-400 mb-5"
                    />

                    <h2 className="text-xl font-semibold text-red-600">
                        {error}
                    </h2>

                    <button
                        onClick={fetchCart}
                        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    if (!cart || !cart.items || cart.items.length === 0) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

                <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-md w-full">

                    <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">

                        <ShoppingCart size={38} />

                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-3">
                        Your Cart is Empty
                    </h1>

                    <p className="text-gray-500 mb-7">
                        Looks like you haven't added any books yet.
                        Start exploring our collection.
                    </p>

                    <button
                        onClick={() => navigate("/books")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                    >
                        <BookOpen size={20} />
                        Browse Books
                    </button>

                </div>

            </div>
        );
    }


    const total = cart.items.reduce(
        (sum, item) =>
            sum + item.book.price * item.quantity,
        0
    );


    const totalItems = cart.items.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );


    return (

        <div className="min-h-screen bg-gray-50">

            {/* ================= HEADER ================= */}

            <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

                <div className="max-w-7xl mx-auto px-6 py-10">

                    <div className="flex items-center gap-3 mb-3">

                        <ShoppingCart size={32} />

                        <span className="text-lg font-semibold">
                            Shopping Cart
                        </span>

                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold">
                        Review Your Cart
                    </h1>

                    <p className="text-blue-100 mt-2">
                        Check your selected books before placing your order.
                    </p>

                </div>

            </section>


            {/* ================= CONTENT ================= */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                    {/* ================= CART ITEMS ================= */}

                    <div className="lg:col-span-2">

                        <div className="bg-white rounded-2xl shadow-sm border p-5 sm:p-7">

                            <div className="flex items-center justify-between mb-7">

                                <div>

                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Cart Items
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-1">
                                        {totalItems}{" "}
                                        {totalItems === 1
                                            ? "item"
                                            : "items"}{" "}
                                        in your cart
                                    </p>

                                </div>

                                <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">

                                    <ShoppingCart size={22} />

                                </div>

                            </div>


                            <div className="space-y-7">

                                {cart.items.map((item) => (

                                    <div
                                        key={item.id}
                                        className="border-b border-gray-200 pb-7 last:border-b-0 last:pb-0"
                                    >

                                        <div className="flex flex-col sm:flex-row gap-5">


                                            {/* BOOK IMAGE */}

                                            <div className="w-full sm:w-32 h-44 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">

                                                {item.book.imageUrl ? (

                                                    <img
                                                        src={item.book.imageUrl}
                                                        alt={item.book.title}
                                                        className="w-full h-full object-cover"
                                                    />

                                                ) : (

                                                    <div className="w-full h-full flex items-center justify-center">

                                                        <BookOpen
                                                            size={55}
                                                            className="text-gray-300"
                                                        />

                                                    </div>

                                                )}

                                            </div>


                                            {/* DETAILS */}

                                            <div className="flex-1">

                                                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">

                                                    <div>

                                                        <h3 className="text-xl font-bold text-gray-800">
                                                            {item.book.title}
                                                        </h3>

                                                        <p className="text-gray-500 mt-1">
                                                            by {item.book.author}
                                                        </p>

                                                        <span className="inline-block mt-2 text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                                            {item.book.category || "General"}
                                                        </span>

                                                    </div>

                                                    <div className="text-left sm:text-right">

                                                        <p className="text-xs text-gray-400 uppercase font-semibold">
                                                            Price
                                                        </p>

                                                        <p className="text-xl font-bold text-gray-800">
                                                            ₹{Number(item.book.price).toFixed(2)}
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* QUANTITY */}

                                                <div className="flex flex-wrap items-center justify-between gap-5 mt-6">

                                                    <div>

                                                        <p className="text-xs text-gray-500 mb-2">
                                                            Quantity
                                                        </p>

                                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">

                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.id,
                                                                        item.quantity - 1
                                                                    )
                                                                }
                                                                disabled={item.quantity <= 1}
                                                                className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                                            >
                                                                <Minus size={16} />
                                                            </button>

                                                            <span className="w-12 text-center font-semibold text-gray-800">
                                                                {item.quantity}
                                                            </span>

                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.id,
                                                                        item.quantity + 1
                                                                    )
                                                                }
                                                                className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition"
                                                            >
                                                                <Plus size={16} />
                                                            </button>

                                                        </div>

                                                    </div>


                                                    {/* ITEM TOTAL */}

                                                    <div className="text-left sm:text-right">

                                                        <p className="text-xs text-gray-400 uppercase font-semibold">
                                                            Item Total
                                                        </p>

                                                        <p className="text-xl font-bold text-green-600">
                                                            ₹{(
                                                                item.book.price *
                                                                item.quantity
                                                            ).toFixed(2)}
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* REMOVE */}

                                                <button
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="mt-5 text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2 transition"
                                                >

                                                    <Trash2 size={17} />

                                                    Remove from cart

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* CONTINUE SHOPPING */}

                        <button
                            onClick={() => navigate("/books")}
                            className="mt-5 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            Continue Shopping
                        </button>

                    </div>


                    {/* ================= ORDER SUMMARY ================= */}

                    <div>

                        <div className="bg-white rounded-2xl shadow-sm border p-6 lg:sticky lg:top-24">

                            <h2 className="text-2xl font-bold text-gray-800 mb-7">
                                Order Summary
                            </h2>


                            <div className="space-y-5">

                                <div className="flex justify-between text-gray-600">

                                    <span>
                                        Total Items
                                    </span>

                                    <span className="font-semibold text-gray-800">
                                        {totalItems}
                                    </span>

                                </div>


                                <div className="flex justify-between text-gray-600">

                                    <span>
                                        Subtotal
                                    </span>

                                    <span className="font-semibold text-gray-800">
                                        ₹{total.toFixed(2)}
                                    </span>

                                </div>


                                <div className="flex justify-between text-gray-600">

                                    <span>
                                        Delivery
                                    </span>

                                    <span className="text-green-600 font-semibold">
                                        FREE
                                    </span>

                                </div>


                                <div className="border-t border-gray-200 pt-5">

                                    <div className="flex justify-between items-center">

                                        <span className="text-xl font-bold text-gray-800">
                                            Total
                                        </span>

                                        <span className="text-2xl font-bold text-green-600">
                                            ₹{total.toFixed(2)}
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* CHECKOUT */}

                            <button
                                onClick={() => navigate("/checkout")}
                                className="w-full mt-7 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                            >

                                Proceed to Checkout

                                <ArrowRight size={19} />

                            </button>


                            <div className="mt-5 text-center">

                                <p className="text-xs text-gray-400">
                                    Secure and convenient checkout
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Cart;