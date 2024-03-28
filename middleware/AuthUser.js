import User from "../models/UserModel.js";

//middlewares untuk proteksi routes

//fungsi verifyuser untuk melihat apakah user login atau tidak lalu juga deklarasi request yang berisi userid dan role
export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const user = await User.findOne({
    where: {
      userid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.userid = user.userid;
  req.role = user.role;
  next();
};

//untuk mengecek apakah orang ini admin?
export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      userid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "admin") return res.status(403).json({ msg: "Akses terlarang" });
  next();
};
