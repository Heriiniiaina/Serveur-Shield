import mongoose from "mongoose";

const PorteSchema = mongoose.Schema({
    cadreNom:String,
    vitreNom:String,
    porteStatus:{
        type:Boolean,
        default:false
    }
})

export const PorteModel = mongoose.model("porte", PorteSchema)