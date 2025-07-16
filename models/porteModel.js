import mongoose from "mongoose";

const PorteSchema = mongoose.Schema({
    cadreNom:String,
    vitreNom:{
        type:String,
        default:null
    },
    colision:{
        type:String,
        default:null
    },
    porteStatus:{
        type:Boolean,
        default:false
    }
})

export const PorteModel = mongoose.model("porte", PorteSchema)