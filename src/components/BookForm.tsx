import React, { useState } from 'react';
import { Book } from '../types';

interface BookFormProps {
  initialData?: Partial<Book>;
  onSubmit: (bookData: Omit<Book, 'id'>) => void;
  buttonText: string;
}

const BookForm: React.FC<BookFormProps> = ({ 
  initialData = {}, 
  onSubmit,
  buttonText
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    author: initialData.author || '',
    isbn: initialData.isbn || '',
    category: initialData.category || '',
    description: initialData.description || '',
    coverImage: initialData.coverImage || '',
    publishedYear: initialData.publishedYear || new Date().getFullYear(),
    available: initialData.available !== undefined ? initialData.available : true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.isbn.trim()) newErrors.isbn = 'ISBN is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.coverImage.trim()) newErrors.coverImage = 'Cover image URL is required';
    
    const year = Number(formData.publishedYear);
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
      newErrors.publishedYear = 'Please enter a valid year';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        publishedYear: Number(formData.publishedYear)
      });
    }
  };

  const categories = [
    'Fiction', 
    'Non-Fiction', 
    'Science Fiction', 
    'Fantasy', 
    'Mystery', 
    'Thriller', 
    'Romance', 
    'Biography', 
    'History', 
    'Self-Help', 
    'Children'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.title ? 'border-red-500' : ''
          }`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.author ? 'border-red-500' : ''
          }`}
        />
        {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
      </div>

      <div>
        <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
          ISBN
        </label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.isbn ? 'border-red-500' : ''
          }`}
        />
        {errors.isbn && <p className="mt-1 text-sm text-red-600">{errors.isbn}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.category ? 'border-red-500' : ''
          }`}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : ''
          }`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
          Cover Image URL
        </label>
        <input
          type="text"
          id="coverImage"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.coverImage ? 'border-red-500' : ''
          }`}
        />
        {errors.coverImage && <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>}
      </div>

      <div>
        <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700">
          Published Year
        </label>
        <input
          type="number"
          id="publishedYear"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.publishedYear ? 'border-red-500' : ''
          }`}
        />
        {errors.publishedYear && <p className="mt-1 text-sm text-red-600">{errors.publishedYear}</p>}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="available"
          name="available"
          checked={formData.available}
          onChange={(e) => setFormData({...formData, available: e.target.checked})}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
          Available for borrowing
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default BookForm;