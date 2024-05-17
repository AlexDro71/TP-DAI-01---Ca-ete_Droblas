import express from "express";
import UsersService from "./../servicios/users-service.js";
const usersService = new UsersService();
const router = express.Router();
//punto 6
router.post("/login", async (request, response) =>{
try{
    const {username, password} = request.body;
    const login = await usersService.recibirToken(username, password);
    if(login){response.status(200).json({
        succes: true,
        message: "Usuario o clave invalida",
        token: login.token
    })}else{response.status(401).json({
        succes: false,
        message: "Usuario o clave invalida",
        token: ""
    })}
} catch(error){
    console.error("Error al crear algo", error);
    response.status(500).json({message: "Error interno del servidor"})
}
})

router.post("/register", async (request,response)=>{
try{
    const {first_name, last_name, username, password} = request.body;
    if(first_name == "" || last_name == "" || password.length > 3){
        response.status(400).json({message: "Datos no validos"})
    }
    const nuevoUser = await usersService.crearUsuario(first_name, last_name, username, password);
    response.status(201).json(nuevoUser)
} catch(error){
    console.error("Error al crear algo", error)
    response.status(500).json({message: "Error interno del servidor"})
}
})


export default router;