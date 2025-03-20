const Book = require('../models/Book');
const User = require('../models/User');

exports.addBook = async (req, res) => {
  const { title, author, ISBN, quantity } = req.body;
  try {
    const book = await Book.create({ title, author, ISBN, quantity });
    res.json(book);
  } catch (error) {
    res.json({ error: error.message });
  }
};


exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};


exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.json({ error: error.message });
  }
};



exports.borrowBook = async (req, res) => {
    const { bookId, userId } = req.params;
  
    try {
      const book = await Book.findById(bookId);
      const user = await User.findById(userId);
  
      if (!book || !user) {
        return res.json({ message: 'Book or User not found' });
      }
  
      if (book.quantity === 0) {
        return res.json({ message: 'Book is out of stock' });
      }
  
      
      user.borrowedBooks.push(bookId);
      book.quantity -= 1;
  
      await user.save();
      await book.save();
  
      res.json({ message: 'Book borrowed successfully' });
    } catch (error) {
      res.json({ error: error.message });
    }
  };
  
 

  exports.returnBook = async (req, res) => {
    const { bookId, userId } = req.params;
  
    try {
      const book = await Book.findById(bookId);
      const user = await User.findById(userId);
  
      if (!book || !user) {
        return res.json({ message: 'Book or User not found' });
      }
  
    
      const bookIndex = user.borrowedBooks.indexOf(bookId);
      if (bookIndex === -1) {
        return res.json({ message: 'Book not borrowed by user' });
      }
  
  
      user.borrowedBooks.splice(bookIndex, 1);
      book.quantity += 1;
  
      await user.save();
      await book.save();
  
      res.json({ message: 'Book returned successfully' });
    } catch (error) {
      res.json({ error: error.message });
    }
  };