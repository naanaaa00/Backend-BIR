import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        // Generate a unique name with uuid and timestamp
        const newFilename = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });

export default upload;