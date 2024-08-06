import User from "../models/user.mjs"
import Book from "../models/book.mjs"

exports.getUserLibreary = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('library.book');
        if (!user) {
            // Si el usuario no se encuentra, devuelve un error 404
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.library);
    } catch (error) {
        // Si hay un error en el proceso, devuelve un error 500
        res.status(500).json({ message: error.message });
    }
};

exports.addBookToLibrary = async (req, res) => {
    const { userId, bookId, review, rating } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        user.library.push({ book: book._id, review, rating });
        await user.save();

        res.status(201).json(user.library);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};