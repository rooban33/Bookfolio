import { useState } from 'react';
import { ArrowLeft, Image, Calendar, User, Tag, Edit3, Save, Trash2 } from 'lucide-react';
import CategoryBadge from '../CategoryBadge/CategoryBadge';
import { bookAPI } from '../../services/api';
import './BookDetails.css';

export default function BookDetails({ book, onBack, onUpdate, onDelete }) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState(book.notes);

  const handleSaveNotes = () => {
    onUpdate({ ...book, notes: editedNotes });
    setIsEditingNotes(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Send the File object to be uploaded to backend
      onUpdate({ ...book, image: file });
    }
  };

  const handleDelete = () => {
    onDelete(book.id);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="details-header-actions">
          <button onClick={onBack} className="back-button">
            <ArrowLeft size={20} /> Back to Library
          </button>
          <button onClick={handleDelete} className="delete-button">
            <Trash2 size={18} /> Delete Book
          </button>
        </div>

        <div className="card">
          <div className="details-container">
            <div className="image-section">
              <div className="image-container">
                {book.image ? (
                  <img src={bookAPI.getImageURL(book.image)} alt={book.name} />
                ) : (
                  <label className="image-upload-label">
                    <Image size={48} />
                    <span className="upload-text">Add Cover Image</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
              {book.image && (
                <label className="change-image-button">
                  <Image size={16} /> Change Image
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            <div className="info-section">
              <div className="book-header">
                <CategoryBadge category={book.category} />
                <h1 className="book-title">{book.name}</h1>
                <div className="book-meta">
                  <div className="meta-item">
                    <User size={16} /> {book.author}
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} /> {book.date}
                  </div>
                </div>
              </div>

              <div className="notes-section">
                <div className="notes-header">
                  <h2 className="notes-title">
                    <Tag size={20} /> My Notes
                  </h2>
                  {!isEditingNotes ? (
                    <button onClick={() => setIsEditingNotes(true)} className="edit-button">
                      <Edit3 size={16} /> Edit
                    </button>
                  ) : (
                    <button onClick={handleSaveNotes} className="save-button">
                      <Save size={16} /> Save
                    </button>
                  )}
                </div>

                {isEditingNotes ? (
                  <textarea
                    value={editedNotes}
                    onChange={(e) => setEditedNotes(e.target.value)}
                    rows={8}
                    className="notes-textarea"
                    placeholder="Write your thoughts about the book..."
                  />
                ) : (
                  <div className="notes-display">
                    <p className="notes-text">
                      {book.notes || "No notes added yet. Click Edit to add your thoughts!"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}