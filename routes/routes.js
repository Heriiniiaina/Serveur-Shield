import express from "express"
import porteRoute from "./porteRoute.js"

const router = express.Router()

router.use("/porte", porteRoute)

export default router