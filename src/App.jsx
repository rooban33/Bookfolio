import { useState, useEffect } from 'react';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';
import AddBookModal from './components/AddBookModal/AddBookModal';
import { bookAPI } from './services/api';
import './App.css';

export default function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filter, setFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books from backend on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookAPI.getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load books. Please make sure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (book) => {
    setSelectedBook(book);
    setCurrentPage("details");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSelectedBook(null);
  };

  const handleAddBook = async (newBook) => {
    try {
      const createdBook = await bookAPI.createBook(newBook);
      setBooks([...books, createdBook]);
      setShowAddForm(false);
    } catch (err) {
      alert('Failed to add book. Please try again.');
      console.error(err);
    }
  };

  const handleUpdateBook = async (updatedBook) => {
    try {
      const updated = await bookAPI.updateBook(updatedBook.id, updatedBook);
      setBooks(books.map(b => b.id === updated.id ? updated : b));
      setSelectedBook(updated);
    } catch (err) {
      alert('Failed to update book. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    
    try {
      await bookAPI.deleteBook(bookId);
      setBooks(books.filter(b => b.id !== bookId));
      setCurrentPage("home");
      setSelectedBook(null);
    } catch (err) {
      alert('Failed to delete book. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        Loading books...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#f87171' }}>Error</h2>
        <p style={{ marginBottom: '1.5rem' }}>{error}</p>
        <button 
          onClick={fetchBooks}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#a855f7',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (currentPage === "details" && selectedBook) {
    return (
      <BookDetails
        book={selectedBook}
        onBack={handleBackToHome}
        onUpdate={handleUpdateBook}
        onDelete={handleDeleteBook}
      />
    );
  }

  return (
    <>
      <BookList
        books={books}
        filter={filter}
        onFilterChange={setFilter}
        onBookClick={handleRowClick}
        onAddClick={() => setShowAddForm(true)}
      />
      {showAddForm && (
        <AddBookModal
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddBook}
        />
      )}
    </>
  );
}