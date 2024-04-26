import express from "express";
import eventController from "./src/controllers/events-controller.js";
import usersController from "./src/controllers/users-controller.js";
import provinceController from "./src/controllers/provinces-controller.js"
const app=express();
app.use(express.json());
app.use("/api/users", usersController);
app.use("/api/events", eventController);
app.use("/api/provinces", provinceController);
const port = 3508;