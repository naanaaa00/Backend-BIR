import Books from "../models/BookModel.js";
import UserModel from "../models/UserModel.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from 'path';


export const CreateBook = async (req, res) => {
    const { title, summary } = req.body;

    try {
        const file = req.files && req.files['file'] ? req.files['file'][0].filename.replace(/\s/g, '-') : null;
        const fileImage = req.files && req.files['fileImage'] ? req.files['fileImage'][0].filename.replace(/\s/g, '-') : null;
        const book = await Books.create({
        title: title,
        summary: summary,
        music: file, // Save the file path as music
        image: fileImage, // Save the file path as image
        // userid: req.session.userId,
        });
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const books = await Books.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const getBookById = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Books.findOne({ where: { bookid: id } });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateBook = async (req, res) => {
    const id = req.params.id;
    const { title, summary } = req.body;
    try {
        // Get old book data
        const oldBook = await Books.findOne({ where: { bookid: id } });

        if (!oldBook) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        // Delete old files
        if (oldBook.music) {
            fs.unlinkSync(path.join('./uploads/', oldBook.music));
        }
        if (oldBook.image) {
            fs.unlinkSync(path.join('./uploads/', oldBook.image));
        }

       // Update book data
       const file = req.files && req.files['file'] ? req.files['file'][0].filename.replace(/\s/g, '-') : null;
       const fileImage = req.files && req.files['fileImage'] ? req.files['fileImage'][0].filename.replace(/\s/g, '-') : null;
        const book = await Books.update(
            { title: title, summary: summary, music: file, image: fileImage },
            { where: { bookid: id } }
        );

        console.log(file);
        console.log(fileImage);

        res.status(200).json(book);
        console.log(book);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Books.destroy({ where: { bookid: id } });
        res.status(200).json({ msg: "Book deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}