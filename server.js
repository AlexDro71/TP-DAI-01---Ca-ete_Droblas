import express from "express";
import eventController from "./src/controllers/events-controller.js";
import usersController from "./src/controllers/users-controller.js";
const app=express();
app.use(express.json());
app.use("/users", usersController);
app.use("/event", eventController);
const port = 3508;