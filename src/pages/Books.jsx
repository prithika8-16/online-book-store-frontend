import { useEffect, useMemo, useState } from "react";
import { Search, ShoppingCart, BookOpen, SlidersHorizontal } from "lucide-react";
import api from "../services/api";

function Books() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {

            const response = await api.get("/books");

            setBooks(response.data);

        } catch (error) {

            console.error(error);
            setError("Unable to load books");

        } finally {

            setLoading(false);
        }
    };

    const addToCart = async (bookId) => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                alert("Please login first");
                return;
            }

            await api.post("/cart/add", null, {
                params: {
                    userId: user.id,
                    bookId: bookId,
                    quantity: 1
                }
            });

            alert("Book added to cart successfully!");

        } catch (error) {

            console.error(error);

            if (error.response) {

                alert(
                    error.response.data?.message ||
                    "Unable to add book to cart"
                );

            } else {

                alert("Unable to connect to server");
            }
        }
    };

    // Get unique categories
    const categories = useMemo(() => {

        const uniqueCategories = books
            .map((book) => book.category)
            .filter((category) => category);

        return ["All", ...new Set(uniqueCategories)];

    }, [books]);


    // Search + category filtering
    const filteredBooks = useMemo(() => {

        return books.filter((book) => {

            const searchText = search.toLowerCase();

            const matchesSearch =
                book.title?.toLowerCase().includes(searchText) ||
                book.author?.toLowerCase().includes(searchText) ||
                book.category?.toLowerCase().includes(searchText);

            const matchesCategory =
                category === "All" ||
                book.category === category;

            return matchesSearch && matchesCategory;
        });

    }, [books, search, category]);


    if (loading) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <BookOpen
                        size={45}
                        className="mx-auto text-blue-600 mb-4"
                    />

                    <h2 className="text-xl font-semibold text-gray-700">
                        Loading books...
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="bg-white rounded-2xl shadow-md p-10 text-center">

                    <h2 className="text-xl font-semibold text-red-600">
                        {error}
                    </h2>

                    <button
                        onClick={fetchBooks}
                        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-50">

            {/* ================= HEADER ================= */}

            <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

                <div className="max-w-7xl mx-auto px-6 py-12">

                    <div className="flex items-center gap-3 mb-3">

                        <BookOpen size={32} />

                        <span className="text-lg font-semibold">
                            Our Collection
                        </span>

                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold">
                        Discover Your Next Great Read
                    </h1>

                    <p className="text-blue-100 mt-3 max-w-2xl">
                        Explore our collection of books and find something
                        perfect for you.
                    </p>

                </div>

            </section>


            {/* ================= MAIN CONTENT ================= */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Search + Filter */}

                <div className="bg-white rounded-2xl shadow-sm border p-5 mb-10">

                    <div className="flex flex-col lg:flex-row gap-4">

                        {/* Search */}

                        <div className="relative flex-1">

                            <Search
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search by title, author or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                        </div>


                        {/* Category */}

                        <div className="relative lg:w-64">

                            <SlidersHorizontal
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            >

                                {categories.map((item) => (

                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>

                </div>


                {/* Section Header */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            Available Books
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            Find something you'll love to read.
                        </p>

                    </div>

                    <span className="text-sm font-medium text-gray-500">
                        {filteredBooks.length}{" "}
                        {filteredBooks.length === 1 ? "book" : "books"}
                    </span>

                </div>


                {/* ================= NO BOOKS ================= */}

                {books.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

                        <BookOpen
                            size={60}
                            className="mx-auto text-gray-300 mb-5"
                        />

                        <h2 className="text-2xl font-bold text-gray-800">
                            No Books Available
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Please check again later.
                        </p>

                    </div>

                ) : filteredBooks.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

                        <Search
                            size={55}
                            className="mx-auto text-gray-300 mb-5"
                        />

                        <h2 className="text-2xl font-bold text-gray-800">
                            No Books Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try changing your search or category.
                        </p>

                        <button
                            onClick={() => {
                                setSearch("");
                                setCategory("All");
                            }}
                            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold"
                        >
                            Clear Filters
                        </button>

                    </div>

                ) : (

                    /* ================= BOOK GRID ================= */

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

                        {filteredBooks.map((book) => (

                            <div
                                key={book.id}
                                className="bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                            >

                                {/* Image */}

                                <div className="h-64 bg-gray-100 overflow-hidden relative">

                                    {book.imageUrl ? (

                                        <img
                                            src={book.imageUrl}
                                            alt={book.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />

                                    ) : (

                                        <div className="w-full h-full flex items-center justify-center">

                                            <BookOpen
                                                size={75}
                                                className="text-gray-300"
                                            />

                                        </div>

                                    )}

                                    {/* Category Badge */}

                                    <div className="absolute top-4 left-4">

                                        <span className="bg-white/95 backdrop-blur-sm text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                            {book.category || "General"}
                                        </span>

                                    </div>

                                </div>


                                {/* Content */}

                                <div className="p-5 flex flex-col flex-1">

                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                                        {book.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm mt-1">
                                        by {book.author}
                                    </p>


                                    <p className="text-gray-600 text-sm mt-4 line-clamp-3 flex-1">
                                        {book.description ||
                                            "No description available."}
                                    </p>


                                    {/* Price + Stock */}

                                    <div className="flex items-end justify-between mt-5">

                                        <div>

                                            <p className="text-xs text-gray-400 uppercase font-semibold">
                                                Price
                                            </p>

                                            <p className="text-2xl font-bold text-gray-900">
                                                ₹{Number(book.price).toFixed(2)}
                                            </p>

                                        </div>


                                        <div className="text-right">

                                            <p className="text-xs text-gray-400 uppercase font-semibold">
                                                Availability
                                            </p>

                                            <p
                                                className={
                                                    book.stock > 0
                                                        ? "text-sm font-semibold text-green-600"
                                                        : "text-sm font-semibold text-red-600"
                                                }
                                            >
                                                {book.stock > 0
                                                    ? `${book.stock} available`
                                                    : "Out of Stock"}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Add To Cart */}

                                    <button
                                        disabled={book.stock <= 0}
                                        onClick={() => addToCart(book.id)}
                                        className={
                                            book.stock > 0
                                                ? "w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                                                : "w-full mt-5 bg-gray-200 text-gray-400 font-semibold py-3 rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                                        }
                                    >

                                        <ShoppingCart size={19} />

                                        {book.stock > 0
                                            ? "Add to Cart"
                                            : "Out of Stock"}

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Books;