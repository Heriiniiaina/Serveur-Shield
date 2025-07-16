import express from "express";
import { changePorteStatus, createPorte, getAllPortes, getPorteStatus } from "../controllers/porteController.js";
const router = express.Router();

router.get("/getPorteStatus/:id", getPorteStatus)
router.post("/changePorteStatus/:id", changePorteStatus);
router.get("/getAllPortes", getAllPortes)
export default router;