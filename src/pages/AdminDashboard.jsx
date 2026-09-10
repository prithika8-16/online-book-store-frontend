
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "",
        author: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        stock: ""
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            navigate("/login");
            return;
        }

        if (user.role !== "ADMIN") {
            alert("Access denied. Admin only.");
            navigate("/books");
            return;
        }

        fetchBooks();

    }, []);

    const fetchBooks = async () => {

        try {

            const response = await api.get("/admin/books");

            setBooks(response.data);

        } catch (error) {

            console.error(error);
            setError("Unable to load books");

        } finally {

            setLoading(false);
        }
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const bookData = {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock)
            };

            if (editingId) {

                await api.put(
                    `/admin/books/${editingId}`,
                    bookData
                );

                alert("Book updated successfully");

            } else {

                await api.post(
                    "/admin/books",
                    bookData
                );

                alert("Book added successfully");
            }

            resetForm();
            fetchBooks();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to save book"
            );
        }
    };

    const editBook = (book) => {

        setEditingId(book.id);

        setForm({
            title: book.title || "",
            author: book.author || "",
            description: book.description || "",
            price: book.price || "",
            category: book.category || "",
            imageUrl: book.imageUrl || "",
            stock: book.stock || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const deleteBook = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/admin/books/${id}`);

            alert("Book deleted successfully");

            fetchBooks();

        } catch (error) {

    console.error("DELETE BOOK ERROR:", error);

    console.error(
        "STATUS:",
        error.response?.status
    );

    console.error(
        "DATA:",
        error.response?.data
    );

    alert(
        error.response?.data?.message ||
        error.response?.data ||
        "Unable to delete book"
    );
}
    };

    const resetForm = () => {

        setEditingId(null);

        setForm({
            title: "",
            author: "",
            description: "",
            price: "",
            category: "",
            imageUrl: "",
            stock: ""
        });
    };

    if (loading) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Loading admin dashboard...
                </h2>
            </div>
        );
    }

    if (error) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-red-600">
                    {error}
                </h2>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="mb-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>

                            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                                Administration
                            </p>

                            <h1 className="text-4xl font-bold text-gray-800 mt-1">
                                Admin Dashboard
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Manage your bookstore inventory.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-5 py-4">

                            <p className="text-sm text-gray-500">
                                Total Books
                            </p>

                            <p className="text-2xl font-bold text-blue-600">
                                {books.length}
                            </p>

                        </div>

                    </div>

                </div>


                {/* Add / Edit Book */}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">

                    <div className="flex items-center justify-between mb-6">

                        <div>

                            <h2 className="text-2xl font-bold text-gray-800">

                                {editingId
                                    ? "Edit Book"
                                    : "Add New Book"}

                            </h2>

                            <p className="text-gray-500 text-sm mt-1">

                                {editingId
                                    ? "Update the selected book details."
                                    : "Add a new book to your inventory."}

                            </p>

                        </div>

                        <div className="text-3xl">
                            📚
                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Title */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Book Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Enter book title"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />

                            </div>


                            {/* Author */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Author
                                </label>

                                <input
                                    type="text"
                                    name="author"
                                    value={form.author}
                                    onChange={handleChange}
                                    placeholder="Enter author name"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />

                            </div>


                            {/* Category */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Programming"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />

                            </div>


                            {/* Price */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    min="0"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />

                            </div>


                            {/* Stock */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    name="stock"
                                    value={form.stock}
                                    onChange={handleChange}
                                    placeholder="Available quantity"
                                    min="0"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />

                            </div>


                            {/* Image URL */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Image URL
                                </label>

                                <input
                                    type="text"
                                    name="imageUrl"
                                    value={form.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />

                            </div>


                            {/* Description */}

                            <div className="md:col-span-2">

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Enter book description"
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                />

                            </div>

                        </div>


                        {/* Buttons */}

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
                            >

                                {editingId
                                    ? "Update Book"
                                    : "Add Book"}

                            </button>


                            {editingId && (

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl transition"
                                >
                                    Cancel Edit
                                </button>

                            )}

                        </div>

                    </form>

                </div>


                {/* Book Management */}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

                    <div className="flex items-center justify-between mb-6">

                        <div>

                            <h2 className="text-2xl font-bold text-gray-800">
                                Book Management
                            </h2>

                            <p className="text-gray-500 text-sm mt-1">
                                View and manage all books.
                            </p>

                        </div>

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {books.length} Books
                        </span>

                    </div>


                    {books.length === 0 ? (

                        <div className="text-center py-12">

                            <div className="text-5xl mb-4">
                                📚
                            </div>

                            <h3 className="text-xl font-semibold text-gray-700">
                                No books available
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Add your first book using the form above.
                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {books.map((book) => (

                                <div
                                    key={book.id}
                                    className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition bg-white"
                                >

                                    {/* Image */}

                                    <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">

                                        {book.imageUrl ? (

                                            <img
                                                src={book.imageUrl}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />

                                        ) : (

                                            <span className="text-5xl">
                                                📚
                                            </span>

                                        )}

                                    </div>


                                    {/* Details */}

                                    <div className="p-5">

                                        <div className="flex justify-between items-start gap-3">

                                            <h3 className="text-xl font-bold text-gray-800">
                                                {book.title}
                                            </h3>

                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
                                                #{book.id}
                                            </span>

                                        </div>


                                        <p className="text-gray-500 mt-1">
                                            by {book.author}
                                        </p>


                                        <p className="text-sm text-blue-600 font-semibold mt-3">
                                            {book.category}
                                        </p>


                                        <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                                            {book.description || "No description available."}
                                        </p>


                                        <div className="flex items-center justify-between mt-5">

                                            <span className="text-xl font-bold text-green-600">
                                                ₹{book.price}
                                            </span>

                                            <span
                                                className={
                                                    book.stock > 0
                                                        ? "text-sm font-semibold text-green-600"
                                                        : "text-sm font-semibold text-red-600"
                                                }
                                            >
                                                {book.stock > 0
                                                    ? `${book.stock} in stock`
                                                    : "Out of stock"}
                                            </span>

                                        </div>


                                        {/* Actions */}

                                        <div className="flex gap-3 mt-5">

                                            <button
                                                onClick={() => editBook(book)}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition"
                                            >
                                                ✏️ Edit
                                            </button>

                                            <button
                                                onClick={() => deleteBook(book.id)}
                                                className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2.5 rounded-xl transition"
                                            >
                                                🗑️ Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;
