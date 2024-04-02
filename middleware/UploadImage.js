import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = './uploads/';

// Check if upload directory exists, if not, create it
fs.access(uploadDir, function(error) {
    if (error) {
        fs.mkdirSync(uploadDir);
    } 
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir)
//     },
//     filename: function (req, file, cb) {
//         const newFilename = file.originalname.replace(/\s/g, '-');
//         cb(null, newFilename);
//     }
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        // Get the original file extension
        let ext = path.extname(file.originalname);
        // Replace spaces with hyphens and append the date and original extension
        const newFilename = `${file.originalname.replace(/\s/g, '-')}${ext}`;
        cb(null, newFilename);
    }
});

const uploadImage = multer({ 
    storage: storage,
});

export default uploadImage;