import { Link, useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    User,
    LogOut,
    BookOpen,
    Shield,
    Home
} from "lucide-react";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("lastOrders");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                {/* Logo */}

                <Link
                    to="/"
                    className="navbar-logo"
                >
                    <BookOpen size={28} />

                    <span>
                        BookStore
                    </span>
                </Link>


                {/* Navigation Links */}

                <div className="navbar-links">

                    <Link to="/">
                        <Home size={19} />
                        <span>Home</span>
                    </Link>


                    <Link to="/books">
                        <BookOpen size={19} />
                        <span>Books</span>
                    </Link>


                    {token && (
                        <Link
                            to="/cart"
                            className="cart-link"
                        >
                            <ShoppingCart size={20} />

                            <span>
                                Cart
                            </span>
                        </Link>
                    )}


                    {token && (
                        <Link to="/my-orders">
                            <span>Orders</span>
                        </Link>
                    )}


                    {user?.role === "ADMIN" && (
                        <Link
                            to="/admin"
                            className="admin-link"
                        >
                            <Shield size={19} />

                            <span>
                                Admin
                            </span>
                        </Link>
                    )}

                </div>


                {/* User Section */}

                <div className="navbar-user">

                    {token && user ? (

                        <>
                            <div className="user-info">

                                <User size={20} />

                                <span>
                                    {user.name}
                                </span>

                            </div>


                            <button
                                className="logout-btn"
                                onClick={logout}
                            >
                                <LogOut size={18} />

                                <span>
                                    Logout
                                </span>
                            </button>
                        </>

                    ) : (

                        <>
                            <Link
                                to="/login"
                                className="login-btn"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="register-btn"
                            >
                                Register
                            </Link>
                        </>

                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;