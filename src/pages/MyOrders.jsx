
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyOrders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                navigate("/login");
                return;
            }

            const response = await api.get(
                `/orders/user/${user.id}`
            );

            console.log("ORDERS RESPONSE:", response.data);
            console.log("ORDERS TYPE:", typeof response.data);

            let data = response.data;

            // If backend sends JSON as a string
            if (typeof data === "string") {

                try {

                    data = JSON.parse(data);

                } catch (parseError) {

                    console.error(
                        "JSON PARSE ERROR:",
                        parseError
                    );

                    setError("Invalid orders response");

                    return;
                }
            }

            if (Array.isArray(data)) {

                setOrders(data);

            } else {

                console.error(
                    "Unexpected orders response:",
                    data
                );

                setOrders([]);

                setError(
                    "Orders response is not a list"
                );
            }

        } catch (error) {

            console.error(
                "ORDERS ERROR:",
                error
            );

            setError(
                "Unable to load orders"
            );

        } finally {

            setLoading(false);
        }
    };


    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>

                    <h2 className="text-2xl font-semibold text-gray-700">
                        Loading your orders...
                    </h2>

                </div>

            </div>
        );
    }


    /* =========================
       ERROR
    ========================= */

    if (error) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

                <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-md w-full">

                    <div className="text-5xl mb-5">
                        ⚠️
                    </div>

                    <h2 className="text-xl font-semibold text-red-600">
                        {error}
                    </h2>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    /* =========================
       NO ORDERS
    ========================= */

    if (orders.length === 0) {

        return (
            <div className="min-h-screen bg-gray-50 px-6 py-12">

                <div className="max-w-4xl mx-auto">

                    <div className="bg-white rounded-3xl shadow-md p-10 sm:p-14 text-center">

                        <div className="text-7xl mb-6">
                            📦
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                            No Orders Yet
                        </h1>

                        <p className="text-gray-500 mt-3 max-w-md mx-auto">
                            You haven't placed any orders yet.
                            Start exploring our collection of books!
                        </p>

                        <button
                            onClick={() => navigate("/books")}
                            className="mt-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition duration-200 shadow-sm hover:shadow-md"
                        >
                            📚 Start Shopping
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    /* =========================
       ORDERS PAGE
    ========================= */

    return (

        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8 sm:py-10">

            <div className="max-w-5xl mx-auto">

                {/* =========================
                    HEADER
                ========================= */}

                <div className="mb-8">

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                        My Orders
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and track all your previous orders.
                    </p>

                </div>


                {/* =========================
                    ORDER COUNT
                ========================= */}

                <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 flex items-center justify-between">

                    <div>

                        <p className="text-sm text-gray-500">
                            Total Orders
                        </p>

                        <p className="text-2xl font-bold text-gray-800">
                            {orders.length}
                        </p>

                    </div>

                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                        📦
                    </div>

                </div>


                {/* =========================
                    ORDERS
                ========================= */}

                <div className="space-y-6">

                    {orders.map((order) => (

                        <div
                            key={order.id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden"
                        >

                            {/* =========================
                                ORDER HEADER
                            ========================= */}

                            <div className="p-5 sm:p-7 border-b border-gray-200">

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Order Number
                                        </p>

                                        <h2 className="text-2xl font-bold text-gray-800">
                                            #{order.id}
                                        </h2>

                                    </div>


                                    <div className="flex flex-col sm:items-end gap-2">

                                        <span
                                            className={
                                                order.status === "PLACED"
                                                    ? "inline-flex w-fit px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm"
                                                    : "inline-flex w-fit px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm"
                                            }
                                        >
                                            {order.status || "PLACED"}
                                        </span>

                                        <p className="text-sm text-gray-500">
                                            {order.orderDate
                                                ? new Date(
                                                    order.orderDate
                                                ).toLocaleString()
                                                : "Date unavailable"}
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* =========================
                                ORDER CONTENT
                            ========================= */}

                            <div className="p-5 sm:p-7">

                                <h3 className="text-xl font-bold text-gray-800 mb-5">
                                    Order Items
                                </h3>


                                {/* ITEMS */}

                                <div className="space-y-5">

                                    {order.items &&
                                        order.items.length > 0 ? (

                                        order.items.map((item) => (

                                            <div
                                                key={item.id}
                                                className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-xl"
                                            >

                                                {/* BOOK IMAGE */}

                                                <div className="w-full sm:w-20 h-28 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">

                                                    {item.book &&
                                                    item.book.imageUrl ? (

                                                        <img
                                                            src={
                                                                item.book.imageUrl
                                                            }
                                                            alt={
                                                                item.book.title
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />

                                                    ) : (

                                                        <span className="text-3xl">
                                                            📚
                                                        </span>

                                                    )}

                                                </div>


                                                {/* BOOK DETAILS */}

                                                <div className="flex-1">

                                                    <h4 className="text-lg font-bold text-gray-800">

                                                        {item.book
                                                            ? item.book.title
                                                            : "Book unavailable"}

                                                    </h4>


                                                    {item.book && (

                                                        <p className="text-gray-500 text-sm mt-1">
                                                            by {item.book.author}
                                                        </p>

                                                    )}


                                                    <div className="flex flex-wrap gap-5 mt-3">

                                                        <div>

                                                            <p className="text-xs text-gray-500">
                                                                Quantity
                                                            </p>

                                                            <p className="font-semibold text-gray-800">
                                                                {item.quantity}
                                                            </p>

                                                        </div>


                                                        <div>

                                                            <p className="text-xs text-gray-500">
                                                                Price
                                                            </p>

                                                            <p className="font-semibold text-gray-800">
                                                                ₹{item.price}
                                                            </p>

                                                        </div>


                                                        <div>

                                                            <p className="text-xs text-gray-500">
                                                                Item Total
                                                            </p>

                                                            <p className="font-semibold text-green-600">
                                                                ₹{item.price * item.quantity}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        ))

                                    ) : (

                                        <p className="text-gray-500">
                                            No items found for this order.
                                        </p>

                                    )}

                                </div>


                                {/* =========================
                                    ORDER TOTAL
                                ========================= */}

                                <div className="border-t border-gray-200 mt-6 pt-6">

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                        <div>

                                            <p className="text-sm text-gray-500">
                                                Order Total
                                            </p>

                                            <p className="text-2xl font-bold text-green-600">
                                                ₹{order.totalAmount}
                                            </p>

                                        </div>


                                        <div className="bg-green-50 px-4 py-3 rounded-xl">

                                            <p className="text-sm text-green-700 font-medium">
                                                ✓ Order placed successfully
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {/* =========================
                    CONTINUE SHOPPING
                ========================= */}

                <div className="text-center mt-10">

                    <button
                        onClick={() => navigate("/books")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition duration-200 shadow-sm hover:shadow-md"
                    >
                        📚 Continue Shopping
                    </button>

                </div>

            </div>

        </div>
    );
}

export default MyOrders;
