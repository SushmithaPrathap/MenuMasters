import express from "express";
import * as mealController from "../controller/meal.js";

const router = express.Router();

router.post("/meal/create", mealController.post);

router.get("/meal/list", mealController.getList);

router.get("/meal/meals", mealController.getListByDate);

router.get("/available/list", mealController.getAvailableList);

router.get("/meal/search", mealController.index);

router.get("/meal/:id", mealController.get);

router.put("/meal/update/:id", mealController.update);

router.delete("/meal/delete/:id", mealController.remove);

export default router;
