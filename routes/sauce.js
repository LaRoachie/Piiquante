import express from "express";
import { getSauceList } from "../controllers/sauce.js";

const router = express.Router();
router.get('/', getSauceList)

export default router;