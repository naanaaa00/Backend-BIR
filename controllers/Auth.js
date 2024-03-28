import User from "../models/UserModel.js";
import argon2 from "argon2";

//fungsi digunakan untuk mengecek session berdasarkan id, kita disini tidak perlu mengisi req bodynya, karena req disini hanya di isi oleh req.session.userId yang mana di deklarrasikan di fungsi login
export const Me = async (req, res) => {
  //kondisi mengirimkan res error ketika req.session.userId (yang mana req ini di deklarasikan di fungsi login)
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  //query untuk mencari data data daari table users dengan session yang ada
  const user = await User.findOne({
    attributes: ["userid", "username", "email", "role"],
    where: {
      userid: req.session.userId,
    },
  });
  //jika query diatas tidak ditemukan maka akan masuk kodisi dibawah yaaa
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

//fungsi yang digunakan untuk handle registrasi, dia akan memasukkan data ke database
export const Register = async (req, res) => {
  //deklarasi variable untuk data data yang dikirimkan melalui request body json
  const { username, email, password, confPassword } = req.body;
  //ini biar password ga typo hehe
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  //hashing, yaitu mengubah bentuk normal password ke bentuk acak, disini saya pake argon2
  const hashPassword = await argon2.hash(password);
  //mulai query,btw yang di kuerikan itu hash passwordnya hehe
  try {
    await User.create({
      username: username,
      email: email,
      password: hashPassword,
      role: "user",
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    //jika query input data gagal
    res.status(400).json({ msg: error.message });
  }
};

//fungsi yang digunakan untuk menghandle login
export const Login = async (req, res) => {
  //mencari email yang sama dengan yagn di req.body
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  //jika query gagal maka akan return error
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  //verivy password menggunakan argon, mengapa? karena kita hashing nya jg pakai argon
  const match = await argon2.verify(user.password, req.body.password);
  //jika tidak match antara password di req.body ada di database user.password maka masuk kondisi error dibawah
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  //deklarasi request req.session.userId, btw ini berkat express-session, baca dokumentasi biar ga bingung hehe
  req.session.userId = user.userid;
  //semua const dibawah jg merupakan deklarasi untuk setiap variable untuk nantika di masukkan ke respon
  const userid = user.userid;
  const username = user.username;
  const email = user.email;
  const role = user.role;
  //memasukkan data variable ke res, jadi nanti responnya itu ya variable variable yang ada di bawah
  res.status(200).json({ userid, username, email, role });
};

//logout
export const logOut = (req, res) => {
  //menghapus req.session dari userid yang telah login
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
