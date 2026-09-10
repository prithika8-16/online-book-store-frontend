
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ShoppingCart, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen size={42} />
              <span className="text-2xl font-bold">BookStore</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Discover Your Next
              <span className="text-yellow-300"> Great Read</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Explore our collection of books, find your favorites, and
              enjoy a simple and convenient online shopping experience.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/books"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Browse Books
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Why Choose BookStore?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <BookOpen size={28} />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Wide Collection
            </h3>

            <p className="text-gray-600">
              Explore books across different categories and discover
              something new to read.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <ShoppingCart size={28} />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Easy Shopping
            </h3>

            <p className="text-gray-600">
              Add your favorite books to the cart and place your order
              quickly and easily.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <ArrowRight size={28} />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Simple Experience
            </h3>

            <p className="text-gray-600">
              Enjoy a clean, responsive, and user-friendly bookstore
              experience on any device.
            </p>
          </div>

        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Find Your Next Book?
          </h2>

          <p className="text-gray-600 mb-7">
            Start exploring our collection today.
          </p>

          <Link
            to="/books"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore Books
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>
            © {new Date().getFullYear()} BookStore. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;