
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            await api.post("/users/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            setMessage("Registration successful!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (err) {

            console.error("REGISTRATION ERROR:", err);

            if (err.response && err.response.data) {

                setError(
                    typeof err.response.data === "string"
                        ? err.response.data
                        : err.response.data?.message ||
                          "Registration failed"
                );

            } else {

                setError("Unable to connect to server");

            }

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-md">

                {/* Header */}

                <div className="text-center mb-8">

                    <div className="text-5xl mb-3">
                        📚
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Your Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Join our Online Bookstore today
                    </p>

                </div>


                {/* Register Card */}

                <div className="bg-white rounded-2xl shadow-xl p-8">

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Register
                    </h2>


                    <form onSubmit={handleSubmit}>

                        {/* Name */}

                        <div className="mb-5">

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>

                            <div className="relative">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    👤
                                </span>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />

                            </div>

                        </div>


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
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
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

                            <p className="text-xs text-gray-400 mt-2">
                                Choose a strong password for your account.
                            </p>

                        </div>


                        {/* Success Message */}

                        {message && (

                            <div className="mb-5 p-3 rounded-lg bg-green-50 text-green-600 text-sm font-medium">
                                {message}
                            </div>

                        )}


                        {/* Error Message */}

                        {error && (

                            <div className="mb-5 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
                                {error}
                            </div>

                        )}


                        {/* Register Button */}

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
                                ? "Creating Account..."
                                : "Create Account"}

                        </button>

                    </form>


                    {/* Login Link */}

                    <div className="text-center mt-6">

                        <p className="text-gray-500 text-sm">

                            Already have an account?

                            <Link
                                to="/login"
                                className="text-blue-600 font-semibold ml-1 hover:underline"
                            >
                                Login
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

export default Register;
