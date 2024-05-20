import express from "express";
import * as itemController from "../controller/inventory.js";

const router = express.Router();

router.post("/inventory/create", itemController.post);

router.get("/inventory/list", itemController.getList);

router.get("/inventory/search", itemController.index);

router.get("/inventory/:id", itemController.get);

router.put("/inventory/update/:id", itemController.update);

router.delete("/inventory/delete/:id", itemController.remove);

export default router;
