import { useState } from 'react';
import { Book, Plus, ArrowUpDown } from 'lucide-react';
import CategoryBadge from '../CategoryBadge/CategoryBadge';
import { categories } from '../../data/initialBooks';
import { bookAPI } from '../../services/api';
import './BookList.css';
import shajith from './shajith.jpeg';

export default function BookList({ books, filter, onFilterChange, onBookClick, onAddClick }) {
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  const filteredBooks = filter === "All" ? books : books.filter(b => b.category === filter);

  // Sort books by date
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    if (sortOrder === 'asc') {
      return dateA - dateB; // Oldest first
    } else {
      return dateB - dateA; // Newest first
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="page-container">
      <div className="content-wrapper-medium">
        <div className="header">
          <div className="header-icon-profile">
            <img 
              src={shajith}
              alt="Shajith" 
              className="profile-image"
            />
          </div>
          <div className="header-content">
            <h1 className="header-title">Shajith's Bookfolio</h1>
            <p className="header-tagline">A log of what I read</p>
          </div>
        </div>

        <div className="controls">
          <div className="filters">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => onFilterChange(cat)}
                className={`filter-button ${filter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="right-controls">
            <button onClick={toggleSortOrder} className="sort-button">
              <ArrowUpDown size={16} />
              {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
            </button>
            <button onClick={onAddClick} className="add-button">
              <Plus size={16} /> Add Book
            </button>
          </div>
        </div>

        <div className="card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedBooks.map(book => (
                  <tr key={book.id} onClick={() => onBookClick(book)}>
                    <td>
                      <div className="table-book-cover">
                        {book.image ? (
                          <img src={bookAPI.getImageURL(book.image)} alt={book.name} />
                        ) : (
                          <div className="no-cover">
                            <Book size={20} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="book-name">{book.name}</td>
                    <td className="author-name">{book.author}</td>
                    <td>
                      <CategoryBadge category={book.category} />
                    </td>
                    <td className="date-cell">{book.date}</td>
                  </tr>
                ))}
                {sortedBooks.length === 0 && (
                  <tr>
                    <td colSpan={5} className="empty-state">
                      No books found in this category
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="hint-text">Click on a book to view details and notes</p>
      </div>
    </div>
  );
}