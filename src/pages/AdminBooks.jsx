import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminBooks() {

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
        fetchBooks();
    }, []);

    const fetchBooks = async () => {

        try {

            const response = await api.get("/admin/books");

            setBooks(response.data);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 403) {
                setError("Access denied. Admin account required.");
            } else {
                setError("Unable to load books.");
            }

        } finally {

            setLoading(false);
        }
    };

    const handleChange = (event) => {

        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const clearForm = () => {

        setForm({
            title: "",
            author: "",
            description: "",
            price: "",
            category: "",
            imageUrl: "",
            stock: ""
        });

        setEditingId(null);
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const bookData = {
                title: form.title,
                author: form.author,
                description: form.description,
                price: Number(form.price),
                category: form.category,
                imageUrl: form.imageUrl,
                stock: Number(form.stock)
            };

            if (editingId) {

                await api.put(
                    `/admin/books/${editingId}`,
                    bookData
                );

                alert("Book updated successfully.");

            } else {

                await api.post(
                    "/admin/books",
                    bookData
                );

                alert("Book added successfully.");
            }

            clearForm();
            fetchBooks();

        } catch (error) {

            console.error(error);

            if (error.response?.status === 403) {
                alert("Access denied. Please login with an ADMIN account.");
            } else {
                alert("Unable to save book.");
            }
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

        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(`/admin/books/${id}`);

            alert("Book deleted successfully.");

            fetchBooks();

        } catch (error) {

            console.error(error);

            if (error.response?.status === 403) {
                alert("Access denied. Admin account required.");
            } else {
                alert("Unable to delete book.");
            }
        }
    };

    if (loading) {
        return <h2 style={{ padding: "30px" }}>Loading books...</h2>;
    }

    if (error) {
        return (
            <div style={{ padding: "30px" }}>

                <h2>{error}</h2>

                <button onClick={() => navigate("/books")}>
                    Back to Store
                </button>

            </div>
        );
    }

    return (
        <div style={{
            padding: "30px",
            maxWidth: "1100px",
            margin: "auto"
        }}>

            <h1>Admin Book Management</h1>

            {/* BOOK FORM */}

            <div style={{
                border: "1px solid #ccc",
                padding: "25px",
                marginTop: "25px",
                marginBottom: "30px",
                borderRadius: "10px"
            }}>

                <h2>
                    {editingId ? "Edit Book" : "Add New Book"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Book Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={form.author}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        min="0"
                        required
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        value={form.imageUrl}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                        min="0"
                        required
                        style={inputStyle}
                    />

                    <button
                        type="submit"
                        style={buttonStyle}
                    >
                        {editingId ? "Update Book" : "Add Book"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={clearForm}
                            style={{
                                ...buttonStyle,
                                marginLeft: "10px"
                            }}
                        >
                            Cancel Edit
                        </button>
                    )}

                </form>

            </div>

            {/* BOOK LIST */}

            <h2>All Books</h2>

            {books.length === 0 ? (

                <p>No books available.</p>

            ) : (

                books.map((book) => (

                    <div
                        key={book.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            marginBottom: "15px",
                            borderRadius: "10px"
                        }}
                    >

                        <h3>{book.title}</h3>

                        <p>
                            <strong>Author:</strong> {book.author}
                        </p>

                        <p>
                            <strong>Category:</strong> {book.category}
                        </p>

                        <p>
                            <strong>Price:</strong> ₹{book.price}
                        </p>

                        <p>
                            <strong>Stock:</strong> {book.stock}
                        </p>

                        <p>
                            {book.description}
                        </p>

                        <button
                            onClick={() => editBook(book)}
                            style={buttonStyle}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => deleteBook(book.id)}
                            style={{
                                ...buttonStyle,
                                marginLeft: "10px"
                            }}
                        >
                            Delete
                        </button>

                    </div>

                ))
            )}

            <br />

            <button
                onClick={() => navigate("/admin")}
                style={buttonStyle}
            >
                Back to Dashboard
            </button>

        </div>
    );
}

const inputStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    boxSizing: "border-box"
};

const buttonStyle = {
    padding: "10px 18px",
    cursor: "pointer"
};

export default AdminBooks;