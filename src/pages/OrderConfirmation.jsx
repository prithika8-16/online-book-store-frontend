import { useNavigate } from "react-router-dom";
import {
    CheckCircle,
    Package,
    ShoppingBag,
    ClipboardList,
    CalendarDays,
    IndianRupee,
    ArrowRight,
    BookOpen,
    ShieldCheck
} from "lucide-react";

function OrderConfirmation() {
    const navigate = useNavigate();

    let orders = [];

    try {
        const storedOrders = localStorage.getItem("lastOrders");

        if (storedOrders) {
            const parsedOrders = JSON.parse(storedOrders);

            if (Array.isArray(parsedOrders)) {
                orders = parsedOrders;
            }
        }
    } catch (error) {
        console.error("Unable to read order data:", error);
    }

    const totalAmount = orders.reduce(
        (sum, order) => sum + Number(order.totalAmount || 0),
        0
    );

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Success Hero */}
            <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <div className="max-w-5xl mx-auto px-6 py-12 text-center">

                    <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle size={52} />
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Order Confirmed!
                    </h1>

                    <p className="text-green-50 text-lg mt-3">
                        Thank you for your purchase 🎉
                    </p>

                    <p className="text-green-100 mt-2">
                        Your order has been successfully placed.
                    </p>

                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

                {orders.length === 0 ? (

                    /* No Order Details */
                    <div className="bg-white rounded-3xl shadow-sm border p-10 text-center">

                        <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                            <Package size={40} />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            Your order was placed successfully
                        </h2>

                        <p className="text-gray-500 mt-3 max-w-md mx-auto">
                            Your order details are available in your My Orders section.
                        </p>

                        <button
                            onClick={() => navigate("/my-orders")}
                            className="mt-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition flex items-center gap-2 mx-auto"
                        >
                            <ClipboardList size={19} />
                            View My Orders
                            <ArrowRight size={18} />
                        </button>

                    </div>

                ) : (

                    <>
                        {/* Confirmation Summary */}
                        <div className="bg-white rounded-3xl shadow-sm border p-6 sm:p-8">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                                <div className="flex items-center gap-4">

                                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                                        <ShoppingBag size={28} />
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Thank You!
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            Your order is now being processed.
                                        </p>
                                    </div>

                                </div>

                                <div className="text-left sm:text-right">

                                    <p className="text-sm text-gray-500">
                                        Total Paid
                                    </p>

                                    <p className="text-2xl font-bold text-green-600">
                                        ₹{totalAmount.toFixed(2)}
                                    </p>

                                </div>

                            </div>

                            {/* Status */}
                            <div className="mt-7 bg-green-50 border border-green-200 rounded-2xl p-5">

                                <div className="flex items-start gap-4">

                                    <CheckCircle
                                        size={24}
                                        className="text-green-600 mt-0.5 flex-shrink-0"
                                    />

                                    <div>
                                        <p className="font-bold text-green-800">
                                            Order successfully placed
                                        </p>

                                        <p className="text-sm text-green-700 mt-1">
                                            We have received your order and it is being processed.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Orders */}
                        <div className="mt-8">

                            <div className="flex items-center gap-3 mb-5">

                                <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                    <Package size={22} />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Order Details
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Your recently placed order
                                    </p>
                                </div>

                            </div>

                            <div className="space-y-5">

                                {orders.map((order) => (

                                    <div
                                        key={order.id}
                                        className="bg-white rounded-2xl shadow-sm border p-6 sm:p-7"
                                    >

                                        {/* Order Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">

                                            <div>

                                                <p className="text-xs uppercase font-semibold text-gray-400">
                                                    Order Number
                                                </p>

                                                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                                    #{order.id}
                                                </h3>

                                            </div>

                                            <span className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                                                <CheckCircle size={16} />
                                                {order.status || "PLACED"}
                                            </span>

                                        </div>

                                        {/* Order Info */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                                            <div className="bg-gray-50 rounded-xl p-5">

                                                <div className="flex items-center gap-2 text-gray-500">

                                                    <IndianRupee size={18} />

                                                    <span className="text-sm">
                                                        Total Amount
                                                    </span>

                                                </div>

                                                <p className="text-2xl font-bold text-green-600 mt-2">
                                                    ₹{Number(order.totalAmount || 0).toFixed(2)}
                                                </p>

                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-5">

                                                <div className="flex items-center gap-2 text-gray-500">

                                                    <CalendarDays size={18} />

                                                    <span className="text-sm">
                                                        Order Date
                                                    </span>

                                                </div>

                                                <p className="font-semibold text-gray-800 mt-2">

                                                    {order.orderDate
                                                        ? new Date(order.orderDate).toLocaleString()
                                                        : "N/A"}

                                                </p>

                                            </div>

                                        </div>

                                        {/* Processing */}
                                        <div className="mt-6 border border-blue-100 bg-blue-50 rounded-xl p-5">

                                            <div className="flex items-start gap-3">

                                                <Package
                                                    size={22}
                                                    className="text-blue-600 mt-0.5 flex-shrink-0"
                                                />

                                                <div>

                                                    <p className="font-semibold text-blue-800">
                                                        Your order is being processed
                                                    </p>

                                                    <p className="text-sm text-blue-600 mt-1">
                                                        You can view your complete order history from My Orders.
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* Security / Trust */}
                        <div className="mt-8 bg-white rounded-2xl border p-5">

                            <div className="flex items-center justify-center gap-3 text-gray-500">

                                <ShieldCheck
                                    size={21}
                                    className="text-green-600"
                                />

                                <p className="text-sm">
                                    Your order information is securely stored.
                                </p>

                            </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

                            <button
                                onClick={() => navigate("/books")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                            >
                                <BookOpen size={19} />
                                Continue Shopping
                            </button>

                            <button
                                onClick={() => navigate("/my-orders")}
                                className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold px-7 py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                            >
                                <ClipboardList size={19} />
                                View My Orders
                            </button>

                        </div>

                    </>
                )}

                {/* Footer */}
                <div className="text-center mt-10">

                    <p className="text-sm text-gray-400">
                        Thank you for shopping with BookStore ❤️
                    </p>

                </div>

            </div>
        </div>
    );
}

export default OrderConfirmation;