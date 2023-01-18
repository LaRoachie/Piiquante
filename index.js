import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import sauceRouter from "./routes/sauce.js";
import auth from "./middlewares/auth.js";

// Lecture du fichier .env
dotenv.config();
// 
const app = express();

app.use(express.json())
// Autorise les appels depuis un domaine différent (ex : 4200 vs 3000)
app.use(cors())
app.use("/api/auth", userRouter)
app.use("/api/sauces", auth, sauceRouter)

await mongoose.connect(process.env.MONGO_URL)

app.listen(3000);

