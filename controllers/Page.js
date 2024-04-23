import fs from "fs";
import path from "path";
// Some other file
import { Books, Pages } from "../models/Associations.js";

// Now you can use Books and Pages, and the associations will be set up correctly

export const CreatePage = async (req, res) => {
    const { storytext } = req.body;
    const { bookId } = req.params;
    
    try {
        const fileImage = req.files && req.files["fileImage"] ? req.files["fileImage"][0].filename.replace(/\s/g, "-") : null;
        const page = await Pages.create({
        storytext: storytext,
        image: fileImage,
        relatedBookId: bookId,
        });
        res.status(201).json(page);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const getAllPages = async (req, res) => {
    try {
        const pages = await Pages.findAll();
        res.status(200).json(pages);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const getPageById = async (req, res) => {
    const id = req.params.id;
    try {
        const page = await Pages.findOne({ where: { pageid: id } });
        res.status(200).json(page);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updatePage = async (req, res) => {
    const id = req.params.id;
    const { storytext, relatedBookId } = req.body;
    try {
        // Get old page data
        const oldPage = await Pages.findOne({ where: { pageid: id } });

        if (!oldPage) {
            return res.status(404).json({ msg: "Page not found" });
        }

        // Delete old files
        if (oldPage.image) {
            fs.unlinkSync(path.join("./uploads/", oldPage.image));
        }

        // Update page
        const fileImage = req.files && req.files["fileImage"] ? req.files["fileImage"][0].filename.replace(/\s/g, "-") : oldPage.image;
        const page = await oldPage.update({
            storytext: storytext,
            image: fileImage,
            relatedBookId: relatedBookId,
        });
        res.status(200).json(page);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const getPagesByBookId = async (req, res) => {
    const { bookId } = req.params;

    try {
        const pages = await Pages.findAll({
            where: {
                relatedBookId: bookId
            },
            include: [
                {
                    model: Books,
                    as: 'relatedBook'
                }
            ]
        });

        res.status(200).json(pages);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deletePage = async (req, res) => {
    const id = req.params.id;
    try {
        const page = await Pages.findOne({ where: { pageid: id } });

        if (page) {
            // Delete the page's image file
            if (page.image) {
                fs.unlinkSync(path.join("./uploads/", page.image));
            }

            // Delete the page
            await Pages.destroy({ where: { pageid: id } });
            res.status(200).json({ msg: "Page and its image file deleted" });
        } else {
            res.status(404).json({ msg: "Page not found" });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};