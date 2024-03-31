import Books from "../models/BookModel.js";
import UserModel from "../models/UserModel.js";
import { v4 as uuidv4 } from "uuid";


export const CreateBook = async (req, res) => {
    const { title, summary } = req.body;
    try {
        const file = req.file ? req.file.path : null;
        const fileImage = req.file ? req.file.path : null;
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
    const { title, summary, music } = req.body;
    try {
        const book = await Books.update(
        { title: title, summary: summary, music: music },
        { where: { bookid: id } }
        );
        res.status(200).json(book);
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