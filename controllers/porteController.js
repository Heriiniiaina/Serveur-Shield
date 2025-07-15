import { PorteModel } from "../models/porteModel.js"

export const createPorte = async(cadreNom, vitreNom) => {
    try {
        const porte = await PorteModel.create({
            cadreNom,
            vitreNom,
        })
        return {
            status: "success",
            porte,
        }
    } catch (error) {
        return {
            status: "error",
            message: error.message,
        }
    }
}

export const getPorteStatus = async(req, res)=>{
    const id = req.params.id
    console.log(id)
    const porte = await PorteModel.findOne({_id:id})
    if (!porte) {
        return res.status(404).json({
            status: "error",
            message: "Porte not found",
        })
    }
    console.log(porte)
    res.status(200).json({
        message: "Porte status retrieved successfully",
        status: porte.porteStatus,
    })
}

export const changePorteStatus = async(req, res) => {
    const id = req.params.id
    console.log("change porte status", id)
    const porte = await PorteModel.findOne({_id:id})
    if (!porte) {
        return res.status(404).json({
            status: "error",
            message: "Porte not found",
        })
    }
    porte.porteStatus = !porte.porteStatus
    await porte.save()
    console.log("ok niova")
    res.status(200).json({
        status: "success",
        porte,
    })
}
