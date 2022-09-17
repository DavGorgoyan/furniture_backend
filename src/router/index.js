import { Router } from "express";
import {
    getSliderImagesController,
    getRandomFurnitureInAboutController,
    getAllFurnitureController,
    getRandomFurnitureController,
    getFilteredFurnitureController
} from "../controllers/index.js";
const router = Router();

router.get("/furnitures", getSliderImagesController);
router.get("/ourFurnitures", getRandomFurnitureInAboutController);
router.get("/furnitures/all", getAllFurnitureController);
router.get("/randFurniture", getRandomFurnitureController);
router.get("/furnitures/filter/:id", getFilteredFurnitureController)

export default router;
