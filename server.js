import express from "express";
import eventController from "./src/controllers/events-controller.js";
const app=express();
app.use(express.json());
app.use("/event", eventController);
const port = 3508;