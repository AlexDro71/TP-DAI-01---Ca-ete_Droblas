import express from "express";
import cors from "cors";
import usersController from "./src/controllers/users-controller.js";
import eventController from "./src/controllers/events-controller.js";
import provinceController from "./src/controllers/provinces-controller.js"
import locationController from "./src/controllers/location-controller.js"
import eventlocationController from "./src/controllers/event-location-controller.js"
import eventcategoryController from "./src/controllers/event-category-controller.js"

const app=express();
app.use(cors);
app.use(express.json());
app.use('/front', express.static('public'));
app.use("/api/users", usersController);
app.use("/api/events", eventController);
app.use("/api/provinces", provinceController);
app.use("/api/location", locationController);
app.use("/api/event-location", eventlocationController);
app.use("/api/event-category", eventcategoryController);
app.use(unknownEndpoint);
const port = 5432;

app.listen(port, () => { 
    // Inicio el servidor WEB (escuchar)  
    console.log(`Listening on http://localhost:${port}`) 
})
