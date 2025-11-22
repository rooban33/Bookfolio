import { useState } from 'react';
import { X, Image } from 'lucide-react';
import { categories } from '../../data/initialBooks';
import './AddBookModal.css';

export default function AddBookModal({ onClose, onAdd }) {
  const [newBook, setNewBook] = useState({ 
    name: "", 
    author: "", 
    category: "Fiction", 
    date: "", 
    image: null, // Changed to null for File object
    notes: "" 
  });
  const [imagePreview, setImagePreview] = useState("");

  const handleSubmit = () => {
    if (!newBook.name || !newBook.author || !newBook.date) return;
    onAdd(newBook);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the actual File object for backend upload
      setNewBook({ ...newBook, image: file });
      
      // Create preview URL for display
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Add New Book</h2>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Book Name *</label>
          <input
            type="text"
            value={newBook.name}
            onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
            className="form-input"
            placeholder="Enter book name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Author *</label>
          <input
            type="text"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="form-input"
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            value={newBook.category}
            onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
            className="form-select"
          >
            {categories.filter(c => c !== "All").map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Date Read *</label>
          <input
            type="date"
            value={newBook.date}
            onChange={(e) => setNewBook({ ...newBook, date: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Cover Image</label>
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
          <label className="file-upload-label">
            <Image size={20} />
            {newBook.image ? newBook.image.name : "Upload image"}
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">Notes</label>
          <textarea
            value={newBook.notes}
            onChange={(e) => setNewBook({ ...newBook, notes: e.target.value })}
            rows={3}
            className="form-textarea"
            placeholder="Your thoughts about the book..."
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!newBook.name || !newBook.author || !newBook.date}
          className="submit-button"
        >
          Add Book
        </button>
      </div>
    </div>
  );
}