import express from "express";
import UsersService from "./../servicios/users-service.js";
import Validaciones from "../utils/validaciones-utils.js";
const usersService = new UsersService();
const router = express.Router();
const validaciones = new Validaciones();
//punto 6
router.post("/login", async (request, response) => {
  try {
    const username = request.query.username;
    const password = request.query.password;
    if(await usersService.validarMail(username) == false){
      response.status(400).json({
        success: false,
        message: "El email es invalido.",
        token: ""
      });
    }else{
    const login = await usersService.recibirToken(username, password); 
    if (login) {
      response.status(200).json({
        succes: true,
        message: "Inicio correcto",
        token: login,
      });
    } else {
      response.status(401).json({
        succes: false,
        message: "Usuario o clave invalida",
        token: "",
      });
    }
  }
  } catch (error) {
    console.error("Error al crear algo", error);
    return response.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/register", async (request, response) => {
  try {
    const first_name = request.query.last_name;
    const last_name = request.query.first_name;
    const username = request.query.username;
    const password = request.query.password;
    const valido = await usersService.validarMail(username)
    if(!valido){
      response.status(400).json({message: "Username(email) no valido."} )
    }else if(validaciones.menor3(first_name)){
      response.status(400).json({message: "first_name vacio o menor a 3 caracteres"} )
    }else if(validaciones.menor3(last_name)){
      response.status(400).json({message: "last_name vacio o menor a 3 caracteres"} )
    }else if(validaciones.menor3(password)){
      response.status(400).json({message: "password vacio o menor a 3"} )
    }
    const nuevoUser = await usersService.crearUsuario(
      first_name,
      last_name,
      username,
      password
    );
    response.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al crear algo", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
