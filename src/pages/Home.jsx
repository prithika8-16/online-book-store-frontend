import React from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    ShoppingCart,
    ArrowRight,
    Star,
    Truck,
    ShieldCheck,
    Headphones
} from "lucide-react";

function Home() {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* ================= HERO SECTION ================= */}

            <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white">
                <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        {/* Hero Content */}

                        <div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <BookOpen size={32} />
                                </div>

                                <span className="text-xl font-semibold">
                                    BookStore
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                                Find Your Next
                                <span className="text-yellow-300">
                                    {" "}Great Read
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8 max-w-xl">
                                Discover amazing books, explore different categories,
                                and bring your favorite stories home with our simple
                                and convenient online bookstore.
                            </p>

                            <div className="flex flex-wrap gap-4">

                                <Link
                                    to="/books"
                                    className="inline-flex items-center gap-2 bg-white text-blue-700 px-7 py-3.5 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition"
                                >
                                    Browse Books
                                    <ArrowRight size={20} />
                                </Link>

                                <Link
                                    to="/register"
                                    className="inline-flex items-center gap-2 border border-white/70 px-7 py-3.5 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
                                >
                                    Get Started
                                </Link>

                            </div>

                        </div>


                        {/* Hero Visual */}

                        <div className="hidden md:flex justify-center">

                            <div className="relative">

                                <div className="w-72 h-80 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 flex items-center justify-center">

                                    <BookOpen
                                        size={150}
                                        strokeWidth={1}
                                        className="text-white/80"
                                    />

                                </div>

                                <div className="absolute -bottom-5 -left-8 bg-white text-gray-800 rounded-xl shadow-xl px-5 py-4">

                                    <div className="flex items-center gap-2">
                                        <Star
                                            size={20}
                                            className="text-yellow-500 fill-yellow-500"
                                        />

                                        <div>
                                            <p className="font-bold">
                                                Great Reads
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                For every reader
                                            </p>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* ================= CATEGORIES ================= */}

            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="text-center mb-10">

                    <p className="text-blue-600 font-semibold mb-2">
                        EXPLORE
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Explore Our Collection
                    </h2>

                    <p className="text-gray-600 mt-3">
                        Find books that match your interests.
                    </p>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Category 1 */}

                    <Link
                        to="/books"
                        className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition"
                    >
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <BookOpen size={25} />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800">
                            Programming
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Learn Java, Python, Spring Boot and more.
                        </p>
                    </Link>


                    {/* Category 2 */}

                    <Link
                        to="/books"
                        className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition"
                    >
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                            <BookOpen size={25} />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800">
                            Technology
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Explore modern technology and innovation.
                        </p>
                    </Link>


                    {/* Category 3 */}

                    <Link
                        to="/books"
                        className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition"
                    >
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                            <BookOpen size={25} />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800">
                            Education
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Improve your knowledge and skills.
                        </p>
                    </Link>


                    {/* Category 4 */}

                    <Link
                        to="/books"
                        className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition"
                    >
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                            <BookOpen size={25} />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800">
                            Fiction
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Escape into stories and imagination.
                        </p>
                    </Link>

                </div>

            </section>


            {/* ================= WHY BOOKSTORE ================= */}

            <section className="bg-white border-y">

                <div className="max-w-7xl mx-auto px-6 py-16">

                    <div className="text-center mb-12">

                        <p className="text-blue-600 font-semibold mb-2">
                            WHY BOOKSTORE
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Everything You Need in One Place
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="text-center">

                            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-5">
                                <Truck size={30} />
                            </div>

                            <h3 className="text-xl font-semibold mb-3">
                                Easy Ordering
                            </h3>

                            <p className="text-gray-600">
                                Add your favorite books to your cart and
                                place your order in just a few clicks.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-5">
                                <ShieldCheck size={30} />
                            </div>

                            <h3 className="text-xl font-semibold mb-3">
                                Secure Shopping
                            </h3>

                            <p className="text-gray-600">
                                Your account and shopping experience are
                                protected with secure authentication.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-5">
                                <Headphones size={30} />
                            </div>

                            <h3 className="text-xl font-semibold mb-3">
                                Simple Experience
                            </h3>

                            <p className="text-gray-600">
                                Enjoy a clean, responsive and user-friendly
                                bookstore experience.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="bg-gradient-to-r from-blue-600 to-indigo-700">

                <div className="max-w-4xl mx-auto px-6 py-16 text-center text-white">

                    <ShoppingCart
                        size={42}
                        className="mx-auto mb-5"
                    />

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Find Your Next Book?
                    </h2>

                    <p className="text-blue-100 text-lg mb-8">
                        Start exploring our collection and discover your
                        next favorite book.
                    </p>

                    <Link
                        to="/books"
                        className="inline-flex items-center gap-2 bg-white text-blue-700 px-7 py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Explore Books
                        <ArrowRight size={20} />
                    </Link>

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="bg-gray-900 text-gray-400">

                <div className="max-w-7xl mx-auto px-6 py-8">

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                        <div className="flex items-center gap-2 text-white">
                            <BookOpen size={24} />

                            <span className="font-semibold text-lg">
                                BookStore
                            </span>
                        </div>

                        <p className="text-sm">
                            © {new Date().getFullYear()} BookStore. All rights reserved.
                        </p>

                    </div>

                </div>

            </footer>

        </div>
    );
}

export default Home;