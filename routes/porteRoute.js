import express from "express";
import { changePorteStatus, createPorte, getPorteStatus } from "../controllers/porteController.js";
const router = express.Router();

router.get("/getPorteStatus/:id", getPorteStatus)
router.post("/changePorteStatus/:id", changePorteStatus);
export default router;