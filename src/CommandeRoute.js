import express from "express";
import CommandeController from "./CommandeController.js";

const router = express.Router();

router.get("/commandes", new CommandeController().index);
router.post("/commandes", new CommandeController().store);

export default router;