import express from "express";
import cors from "cors";
import usersController from "./src/controllers/users-controller.js";
import eventController from "./src/controllers/events-controller.js";
import provinceController from "./src/controllers/provinces-controller.js"
const app=express();
app.use(cors);
app.use(express.json());
app.use('/front', express.static('public'));
app.use("/api/users", usersController);
app.use("/api/events", eventController);
app.use("/api/provinces", provinceController);
app.use(unknownEndpoint);
const port = 3508;

app.listen(port, () => { 
    // Inicio el servidor WEB (escuchar)  
    console.log(`Listening on http://localhost:${port}`) 
})
