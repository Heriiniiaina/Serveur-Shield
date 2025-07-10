import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post("/test/:id", (req, res) => {
  console.log(" Requête Rn reçue");
  const id = req.params.id
  io.emit("test", {status:"ouvrir porte", id:id, donnee:req.body});
  res.send("ok");
});
app.post("/stop/:id", (req, res) => {
const id = req.params.id
console.log(req.body)
  console.log(" Requête Rn reçue");
  io.emit("stop", {status:"ferme porte", id:id, donnee:req.body});
  res.send("ok");
});


const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Serveur: http://192.168.42.1:${PORT}`);
});
