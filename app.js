import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { connectDb } from "./config/db.js";
import { createPorte } from "./controllers/porteController.js";
import routes from "./routes/routes.js";
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

app.post("/ouvert/:id", (req, res) => {
  console.log(" Requête Rn reçue");
  const id = req.params.id
  io.emit("test", {status:"ouvrir porte", id:id, donnee:req.body});
  res.send("ok");
});
app.post("/fermer/:id", (req, res) => {
const id = req.params.id
console.log(req.body)
  console.log(" Requête Rn reçue");
  io.emit("stop", {status:"ferme porte", id:id, donnee:req.body});
  res.send("ok");
});

// createPorte("OpenAluPorteExt", "OpenFerPorteExt")
// createPorte("OpenAluPorteExt2", "OpenFerPorteExt2")
// createPorte("OpenAluPorteExt3", "OpenFerPorteExt3")
// createPorte("OpenCadreVitrePortePpl3", "OpenVitrePortePpl3")
// createPorte("OpenCadreVitrePortePpl4", "OpenVitrePortePpl4")
// createPorte("OpenFerCadreFenetreExt1", "OpenVitreCadreFenetreExt1")
// createPorte("OpenFerCadreFenetreExt2", "OpenVitreCadreFenetreExt2")
// createPorte("OpenPorteExt2")
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Serveur: http://localhost:${PORT}`);
});
