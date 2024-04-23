import {CreatePage, getAllPages, getPageById, updatePage, deletePage} from '../controllers/Page.js';
import express from 'express';
import upload from "../middleware/Upload.js";

// Other imports...

const router = express.Router();

router.get('/', getAllPages);
router.get('/:id', getPageById);
router.post('/:bookId', upload.fields([{ name: "fileImage", maxCount: 1 },]), CreatePage);
router.patch('/:id', upload.fields([{ name: "fileImage", maxCount: 1 },]), updatePage);
router.delete('/:id', deletePage);

export default router;