import express from "express";
import cors from "cors";
//import usersController from "./src/controllers/users-controller.js";
//import eventController from "./src/controllers/events-controller.js";
//import provinceController from "./src/controllers/provinces-controller.js"
const app=express();
app.use(cors);
app.use(express.json());

app.get("/login", (req, res)=>{
    console.log("Login")
    res.status(200).json();

})

//app.use("/api/users", usersController);
//app.use("/api/events", eventController);
//app.use("/api/provinces", provinceController);
const port = 3508;


app.listen(port, () => { 
    // Inicio el servidor WEB (escuchar)  
    console.log(`Listening on http://localhost:${port}`) 
})
