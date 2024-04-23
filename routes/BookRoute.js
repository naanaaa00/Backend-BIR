import express from 'express';
import { CreateBook, getAllBooks, deleteBook, getBookById, updateBook } from '../controllers/Book.js';
import { getPagesByBookId } from "../controllers/Page.js";
import upload from "../middleware/Upload.js";

const router = express.Router();

// GET /books
router.get('/', getAllBooks);

// // GET /books/:id
router.get('/:id', getBookById);

// POST /books
router.post('/', upload.fields([{ name: "file", maxCount: 1 }, { name: "fileImage", maxCount: 1 },]), CreateBook);

// PUT /books/:id
router.patch('/:id', upload.fields([{ name: "file", maxCount: 1 }, { name: "fileImage", maxCount: 1 },]), updateBook);

// // DELETE /books/:id
router.delete('/:id', deleteBook);

// Get Pages by BookId
router.get('/:bookId/pages', getPagesByBookId);

export default router;