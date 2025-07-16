import express from "express";
import { changePorteStatus, createPorte, getAllPortes, getPorteStatus, lockAllPortes } from "../controllers/porteController.js";
const router = express.Router();

router.get("/getPorteStatus/:id", getPorteStatus)
router.post("/changePorteStatus/:id", changePorteStatus);
router.get("/getAllPortes", getAllPortes)
router.post("/lockAllPorte", lockAllPortes);
export default router;