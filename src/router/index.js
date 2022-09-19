import { Router } from "express";
import {
    getSliderImagesController,
    getRandomFurnitureInAboutController,
    getAllFurnitureController,
    getRandomFurnitureController,
    getCategoriesController,
    getFilteredFurnituresController
} from "../controllers/index.js";
const router = Router();

router.get("/furnitures", getSliderImagesController);
router.get("/ourFurnitures", getRandomFurnitureInAboutController);
router.get("/furnitures/all", getAllFurnitureController);
router.get("/randFurniture", getRandomFurnitureController);
router.get("/categories", getCategoriesController);
router.get("/furnitures/filter/:id", getFilteredFurnituresController)

export default router;
