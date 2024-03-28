import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/Users.js";

const router = express.Router();

//Proteksi route dan prefix endpoint saya taruh di app.use index.js
router.get("/", getUsers);
router.get("/:userid", getUserById);
router.post("/", createUser);
router.patch("/:userid", updateUser);
router.delete("/:userid", deleteUser);

export default router;
