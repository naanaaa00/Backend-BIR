import express from 'express';
import { CreateBook, getAllBooks, deleteBook, getBookById, updateBook } from '../controllers/Book.js';
import upload from "../middleware/Upload.js";
import uploadImage from '../middleware/UploadImage.js';

const router = express.Router();

// GET /books
router.get('/', getAllBooks);

// // GET /books/:id
router.get('/:id', getBookById);

// POST /books
router.post('/', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'fileImage', maxCount: 1 }]), CreateBook);

// PUT /books/:id
router.put('/:id', updateBook);

// // DELETE /books/:id
router.delete('/:id', deleteBook);

export default router;