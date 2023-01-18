import express from "express";
import multer from "../middlewares/multer-config.js";
import { getSauceList, putSauceList, postSauceList, deleteSauceList } from "../controllers/sauce.js";


const router = express.Router();
router.get('/', getSauceList)
router.post('/', multer, postSauceList)
router.put('/', multer, putSauceList)
router.delete('/', deleteSauceList)

export default router;