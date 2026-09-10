
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {

            const response = await api.post("/users/login", {
                email: email,
                password: password
            });

            // Save JWT token
            localStorage.setItem(
                "token",
                response.data.token
            );

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            setMessage("Login successful!");

            // Go to books page
            setTimeout(() => {
                navigate("/books");
            }, 500);

        } catch (error) {

            console.error("LOGIN ERROR:", error);

            if (error.response) {

                setMessage(
                    error.response.data?.message ||
                    "Invalid email or password"
                );

            } else {

                setMessage(
                    "Unable to connect to server"
                );
            }

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-md">

                {/* Logo / Heading */}

                <div className="text-center mb-8">

                    <div className="text-5xl mb-3">
                        📚
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your Online Bookstore account
                    </p>

                </div>


                {/* Login Card */}

                <div className="bg-white rounded-2xl shadow-xl p-8">

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Login
                    </h2>


                    <form onSubmit={handleLogin}>

                        {/* Email */}

                        <div className="mb-5">

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>

                            <div className="relative">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    ✉️
                                </span>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter your email"
                                    required
                                    className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div className="mb-6">

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    🔒
                                </span>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    required
                                    className="w-full border border-gray-300 rounded-xl pl-11 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>

                            </div>

                        </div>


                        {/* Message */}

                        {message && (

                            <div
                                className={
                                    message.includes("successful")
                                        ? "mb-5 p-3 rounded-lg bg-green-50 text-green-600 text-sm font-medium"
                                        : "mb-5 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium"
                                }
                            >
                                {message}
                            </div>

                        )}


                        {/* Login Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className={
                                loading
                                    ? "w-full bg-gray-400 text-white font-bold py-3 rounded-xl cursor-not-allowed"
                                    : "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-md"
                            }
                        >

                            {loading
                                ? "Logging in..."
                                : "Login"}

                        </button>

                    </form>


                    {/* Register */}

                    <div className="text-center mt-6">

                        <p className="text-gray-500 text-sm">

                            Don't have an account?

                            <Link
                                to="/register"
                                className="text-blue-600 font-semibold ml-1 hover:underline"
                            >
                                Create Account
                            </Link>

                        </p>

                    </div>

                </div>


                {/* Back to Books */}

                <div className="text-center mt-6">

                    <button
                        onClick={() => navigate("/books")}
                        className="text-gray-500 hover:text-blue-600 text-sm transition"
                    >
                        ← Continue browsing books
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Login;
