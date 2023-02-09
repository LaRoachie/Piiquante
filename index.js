import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routes/user.js";
import sauceRouter from "./routes/sauce.js";
import auth from "./middlewares/auth.js";


// Lecture du fichier .env
dotenv.config();

const app = express();

// Permet à l'application Express de recevoir et de gérer les données envoyées au format JSON
app.use(express.json())

// Autorise les appels depuis un domaine différent (ex : 4200 vs 3000)
app.use(cors())

//Sécurisation des headers, routes etc...
app.use(helmet({crossOriginResourcePolicy:{policy:"cross-origin"}}))

// Définition du routeur pour les URL qui commencent par "/api/auth"
app.use("/api/auth", userRouter)

// Définition du routeur pour les URL qui commencent par "/api/sauces"
// L'utilisateur devra etre authentifié
app.use("/api/sauces", auth, sauceRouter)

// Gestion des requêtes pour les ressources situées dans le dossier "images"
app.use("/images", express.static("images"))

await mongoose.connect(process.env.MONGO_URL)

app.listen(3000);


