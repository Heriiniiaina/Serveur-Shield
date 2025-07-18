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
export const getAllPortes = async(req, res) => {
    try {
        const portes = await PorteModel.find({})
        if (portes.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No portes found",
            })
        }
        res.status(200).json({
            status: "success",
            portes,
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        })
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
    if (porte.cadreNom === "all") {
       const portes = await PorteModel.find({})
         portes.forEach(async (p) => {
              p.porteStatus = false
              await p.save()
         })
    }
  
    else
    {
        porte.porteStatus = !porte.porteStatus
        await porte.save()
    }
    console.log("ok niova")
    res.status(200).json({
        status: "success",
        porte,
    })
}

export const lockAllPortes = async(req, res) => { 
    const portes = await PorteModel.find({})

    portes.forEach(async (porte) => {
        if (porte.cadreNom != "alarme")
        {
            porte.porteStatus = false
            await porte.save()
        }
       
    })
    res.status(200).json({
        status: "success",
        message: "All portes locked successfully",
    })
}

