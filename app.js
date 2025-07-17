import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { connectDb } from "./config/db.js";
import { createPorte, lockAllPortes } from "./controllers/porteController.js";
import routes from "./routes/routes.js";
import { PorteModel } from "./models/porteModel.js";
import { stat } from "fs";
const app = express();
app.use(cors({
  origin:"*",
  methods:["GET", "POST"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/shields", routes);
connectDb()
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("WebSocket connecte :", socket.id);

  socket.on("disconnect", () => {
    console.log("WebSocket déconnecté :", socket.id);
  });
});

app.post("/ouvert/:id", async (req, res) => {
  console.log(" Requête Rn reçue");
  const id = req.params.id
  console.log(req.body);
  const alarme = await PorteModel.findOne({ _id: "68780a2b1eacf19903991072" });
  alarme.porteStatus = false;
  await alarme.save();
  io.emit("test", {status:"ouvrir porte", id:id, donnee:req.body});
  res.send("ok");
});
app.post("/fermer/:id", (req, res) => {
const id = req.params.id
console.log(req.body)
  console.log(" Requête Rn reçue");
  console.log(req.body);
  io.emit("stop", {status:"ferme porte", id:id, donnee:req.body});
  res.send("ok");
});
app.post("/send", async(req,res)=>{
  const {current} = req.body;
  
  const porte = await PorteModel.find({})
  const ft = porte.filter((p) => p.cadreNom.includes(current.substring(5)));
  console.log(ft) ;
  io.emit("send", {id:ft[0]._id,cadreNom:ft[0].cadreNom, vitreNom:ft[0].vitreNom, status:"send", colisionNom:ft[0].colision});
  res.send("ok");
})


app.post("/lock", async(req, res) => {
  const portes = await PorteModel.find({});
  console.log("ok pr")
  if (portes.length === 0) {
    return res.status(404).json({
      status: "error",
      message: "No portes found",
    });
  }
  io.emit("lockAllPortes", { status: "lockAllPortes" });
  
  console.log("ok pr 1")

  console.log("ok pr 2")
  res.status(200).json({
    status: "success",
    message: "All portes locked successfully",
  });
});

app.post("/alarme", async(req, res) => {
  console.log("alao le alarme")
  const alarme = await PorteModel.findOne({ _id: "68780a2b1eacf19903991072" });
  if (alarme.porteStatus == false) {
    alarme.porteStatus = true;
    await alarme.save();
    io.emit("lockAllPortes", { status: "lockAllPortes" });
    console.log("Alarme activée");
    //lockAllPortes(req, res);
  }
  else {
    alarme.porteStatus = false;
    ;
  }
  res.send("Alarme chqnger")
})
// createPorte("alarme", "alarme")
// createPorte("OpenAluPorteExt2", "OpenFerPorteExt2")
// createPorte("OpenAluPorteExt3", "OpenFerPorteExt3")
// createPorte("OpenCadreVitrePortePpl3", "OpenVitrePortePpl3")
// createPorte("OpenCadreVitrePortePpl4", "OpenVitrePortePpl4")
// createPorte("OpenFerCadreFenetreExt1", "OpenVitreCadreFenetreExt1")
// createPorte("OpenFerCadreFenetreExt2", "OpenVitreCadreFenetreExt2")
// createPorte("OpenPorteExt2")

const ajouteColision = async(collision, id) =>{
  const porte = await PorteModel.findById(id);
  if (!porte) {
    console.error("Porte not found");
    return;
  }
  porte.colision = collision;
  await porte.save();
  console.log("Colision added successfully");
}

// ajouteColision("OpenCollisionVavahadyKely", "6875fe7b782aa23b2e76a869");
// ajouteColision("OpenCollisionVavahadyBe", "6875fe7b782aa23b2e76a868");
// ajouteColision("OpenCollisionPorteExt4.001", "6877214479684e033565d894");
// ajouteColision("OpenCollisionPortePpl3", "6877214479684e033565d890");
// ajouteColision("OpenCollisionPortePpl4", "6877214479684e033565d891");

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Serveur: http://localhost:${PORT}`);
});
