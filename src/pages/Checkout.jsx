import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    CreditCard,
    ShieldCheck,
    Package,
    ArrowLeft,
    CheckCircle,
    Loader2,
    BookOpen
} from "lucide-react";
import api from "../services/api";

function Checkout() {
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
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

            console.log("CHECKOUT CART:", response.data);

            setCart(response.data);
        } catch (error) {
            console.error("CART ERROR:", error);
            setError("Unable to load checkout");
        } finally {
            setLoading(false);
        }
    };

    const placeOrder = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                navigate("/login");
                return;
            }

            if (!cart || !cart.items || cart.items.length === 0) {
                alert("Your cart is empty");
                return;
            }

            setPlacingOrder(true);

            const createdOrders = [];

            for (const item of cart.items) {
                const response = await api.post(
                    "/orders/place",
                    null,
                    {
                        params: {
                            userId: user.id,
                            bookId: item.book.id,
                            quantity: item.quantity
                        }
                    }
                );

                createdOrders.push(response.data);
            }

            localStorage.setItem(
                "lastOrders",
                JSON.stringify(createdOrders)
            );

            navigate("/order-confirmation");

        } catch (error) {
            console.error("ORDER ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to place order"
            );

        } finally {
            setPlacingOrder(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <Loader2
                        size={45}
                        className="mx-auto text-blue-600 animate-spin mb-4"
                    />
                    <h2 className="text-xl font-semibold text-gray-700">
                        Loading checkout...
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Preparing your order.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-md">
                    <ShoppingCart
                        size={50}
                        className="mx-auto text-red-400 mb-5"
                    />

                    <h2 className="text-xl font-semibold text-red-600">
                        {error}
                    </h2>

                    <button
                        onClick={fetchCart}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
                <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-md w-full">

                    <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                        <ShoppingCart size={38} />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-3">
                        Your Cart is Empty
                    </h1>

                    <p className="text-gray-500 mb-7">
                        Add some books before proceeding to checkout.
                    </p>

                    <button
                        onClick={() => navigate("/books")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                    >
                        Browse Books
                    </button>

                </div>
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, item) =>
            sum + Number(item.book.price) * item.quantity,
        0
    );

    const totalItems = cart.items.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
                <div className="max-w-7xl mx-auto px-6 py-10">

                    <div className="flex items-center gap-3 mb-3">
                        <CreditCard size={30} />
                        <span className="text-lg font-semibold">
                            Secure Checkout
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold">
                        Complete Your Order
                    </h1>

                    <p className="text-blue-100 mt-2">
                        Review your items and place your order.
                    </p>

                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Customer Information */}
                        <div className="bg-white rounded-2xl shadow-sm border p-6">

                            <div className="flex items-center gap-3 mb-6">

                                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Package size={22} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Customer Information
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Order will be placed for this account
                                    </p>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs uppercase font-semibold text-gray-400">
                                        Name
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1">
                                        {user?.name || "Customer"}
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs uppercase font-semibold text-gray-400">
                                        Email
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1 break-all">
                                        {user?.email || "Registered account"}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-sm border p-6">

                            <div className="flex items-center justify-between mb-7">

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Your Order
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-1">
                                        {totalItems}{" "}
                                        {totalItems === 1 ? "item" : "items"}
                                    </p>
                                </div>

                                <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                    <BookOpen size={22} />
                                </div>

                            </div>

                            <div className="space-y-6">

                                {cart.items.map((item) => (

                                    <div
                                        key={item.id}
                                        className="flex flex-col sm:flex-row gap-5 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                                    >

                                        {/* Image */}
                                        <div className="w-full sm:w-28 h-36 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">

                                            {item.book.imageUrl ? (
                                                <img
                                                    src={item.book.imageUrl}
                                                    alt={item.book.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <BookOpen
                                                        size={45}
                                                        className="text-gray-300"
                                                    />
                                                </div>
                                            )}

                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">

                                            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">

                                                <div>

                                                    <h3 className="text-xl font-bold text-gray-800">
                                                        {item.book.title}
                                                    </h3>

                                                    <p className="text-gray-500 mt-1">
                                                        by {item.book.author}
                                                    </p>

                                                    <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                                        {item.book.category || "General"}
                                                    </span>

                                                </div>

                                                <div className="sm:text-right">

                                                    <p className="text-xs uppercase font-semibold text-gray-400">
                                                        Item Total
                                                    </p>

                                                    <p className="text-xl font-bold text-green-600 mt-1">
                                                        ₹{(
                                                            Number(item.book.price) *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </p>

                                                </div>

                                            </div>

                                            <div className="flex flex-wrap gap-6 mt-5">

                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase font-semibold">
                                                        Price
                                                    </p>

                                                    <p className="font-semibold text-gray-800 mt-1">
                                                        ₹{Number(item.book.price).toFixed(2)}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase font-semibold">
                                                        Quantity
                                                    </p>

                                                    <p className="font-semibold text-gray-800 mt-1">
                                                        {item.quantity}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-2xl shadow-sm border p-6">

                            <div className="flex items-center gap-3">

                                <div className="w-11 h-11 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                    <CreditCard size={22} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Payment Method
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Payment is handled securely.
                                    </p>
                                </div>

                            </div>

                            <div className="mt-5 border border-green-200 bg-green-50 rounded-xl p-4 flex items-center gap-3">

                                <CheckCircle
                                    size={22}
                                    className="text-green-600 flex-shrink-0"
                                />

                                <div>
                                    <p className="font-semibold text-green-800">
                                        Pay on Order
                                    </p>

                                    <p className="text-sm text-green-700">
                                        Your order will be placed securely.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div>

                        <div className="bg-white rounded-2xl shadow-sm border p-6 lg:sticky lg:top-24">

                            <h2 className="text-2xl font-bold text-gray-800 mb-7">
                                Order Summary
                            </h2>

                            <div className="space-y-5">

                                <div className="flex justify-between text-gray-600">
                                    <span>Total Items</span>
                                    <span className="font-semibold text-gray-800">
                                        {totalItems}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-800">
                                        ₹{total.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
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

                            {/* Place Order */}
                            <button
                                onClick={placeOrder}
                                disabled={placingOrder}
                                className="w-full mt-7 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                            >

                                {placingOrder ? (
                                    <>
                                        <Loader2
                                            size={20}
                                            className="animate-spin"
                                        />
                                        Placing Order...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={20} />
                                        Place Order
                                    </>
                                )}

                            </button>

                            {/* Back */}
                            <button
                                onClick={() => navigate("/cart")}
                                disabled={placingOrder}
                                className="w-full mt-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <ArrowLeft size={18} />
                                Back to Cart
                            </button>

                            {/* Security */}
                            <div className="mt-6 pt-5 border-t border-gray-200">

                                <div className="flex items-center gap-3">

                                    <ShieldCheck
                                        size={22}
                                        className="text-green-600"
                                    />

                                    <div>
                                        <p className="text-sm font-semibold text-gray-700">
                                            Secure Checkout
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            Your order information is protected.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;