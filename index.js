import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/AuthUser.js";
import AuthRoute from "./routes/AuthRoute.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

// simpan secret di dotnev in the future
app.use(
  session({
    secret: "ocidocidocid",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
//proteksi route middleware sebenernya bisa saja di tulis di UserRoute pada masing masing endpoint, saya buat disini biar nggak nulis banyak, oh iya disini jg ada prefix
app.use("/users", verifyUser, adminOnly, UserRoute);
app.use(AuthRoute);

// store.sync();

// simpan port di dotnev in the future
app.listen(8080, () => {
  console.log("Server up and running on http://localhost:8080");
});
