import express from "express";
import UsersService from "./../servicios/users-service.js";
const usersService = new UsersService();
const router = express.Router();
//punto 6
router.post("/login", async (request, response) =>{
try{
    const {username, password} = request.body;
    const login = await usersService.login(username, password);
    response.status(201).json(login)
} catch(error){
    console.error("Error al crear algo", error);
    response.status(500).json({message: "Error interno del servidor"})
}
})

router.post("/register", async (request,response)=>{
try{
    const {first_name, last_name, username, password} = request.body;
    const newUser = await usersService.crearUsuario(first_name, last_name, username, password);
    response.status(201).json(newUser)
} catch(error){
    console.error("Error al crear algo", error)
    response.status(500).json({messafe: "Error interno del servidor"})
}
})
//punto 9

//punto 10


export default router;