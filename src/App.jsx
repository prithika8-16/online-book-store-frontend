import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* Home Page */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* Authentication */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Books */}
                <Route
                    path="/books"
                    element={<Books />}
                />

                {/* Cart */}
                <Route
                    path="/cart"
                    element={<Cart />}
                />

                {/* Checkout */}
                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                {/* Order Confirmation */}
                <Route
                    path="/order-confirmation"
                    element={<OrderConfirmation />}
                />

                {/* My Orders */}
                <Route
                    path="/my-orders"
                    element={<MyOrders />}
                />

                {/* Admin */}
                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;