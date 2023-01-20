import express from "express";
import multer from "../middlewares/multer-config.js";
import { sauceList, sauce, updateSauce, createSauce, postSauceLiked, deleteSauce } from "../controllers/sauce.js";


const router = express.Router();
router.get('/', sauceList)
router.get('/:id', sauce)

router.post('/', multer, createSauce)
router.post('/:id/like', multer, postSauceLiked)

router.put('/:id', multer, updateSauce)

router.delete('/:id', deleteSauce)

export default router;