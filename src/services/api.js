const API_BASE_URL = 'https://bookfolio-backend.onrender.com/api';

export const bookAPI = {
  // Get all books
  getAllBooks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      if (!response.ok) throw new Error('Failed to fetch books');
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Get single book
  getBook: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`);
      if (!response.ok) throw new Error('Failed to fetch book');
      return await response.json();
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error;
    }
  },

  // Create new book
  createBook: async (bookData) => {
    try {
      const formData = new FormData();
      
      formData.append('name', bookData.name);
      formData.append('author', bookData.author);
      formData.append('category', bookData.category);
      formData.append('date', bookData.date);
      formData.append('notes', bookData.notes || '');
      
      // If image is a File object, append it
      if (bookData.image && bookData.image instanceof File) {
        formData.append('image', bookData.image);
      }

      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to create book');
      return await response.json();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  },

  // Update book
  updateBook: async (id, bookData) => {
    try {
      const formData = new FormData();
      
      if (bookData.name) formData.append('name', bookData.name);
      if (bookData.author) formData.append('author', bookData.author);
      if (bookData.category) formData.append('category', bookData.category);
      if (bookData.date) formData.append('date', bookData.date);
      if (bookData.notes !== undefined) formData.append('notes', bookData.notes);
      
      // If image is a File object, append it
      if (bookData.image && bookData.image instanceof File) {
        formData.append('image', bookData.image);
      }

      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to update book');
      return await response.json();
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  },

  // Delete book
  deleteBook: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete book');
      return await response.json();
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  },

  // Get image URL
  getImageURL: (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `https://bookfolio-backend.onrender.com${imagePath}`;
  }
};