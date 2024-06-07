import express from "express";
import UsersService from "./../servicios/users-service.js";
const usersService = new UsersService();
const router = express.Router();
//punto 6
router.post("/login", async (request, response) => {
  try {
    const username = request.query.username;
    const password = request.query.password;
    const login = await usersService.recibirToken(username, password);
    if (login) {
      return response.status(200).json({
        succes: true,
        message: "Inicio correcto",
        token: login.token,
      });
    } else {
      response.status(401).json({
        succes: false,
        message: "Usuario o clave invalida",
        token: "",
      });
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
    console.log(valido)
    if (first_name == "" || last_name == "" || password.length < 3 ||!valido) {
      return response.status(400).json({ message: "Datos no validos" });
    }
    const nuevoUser = await usersService.crearUsuario(
      first_name,
      last_name,
      username,
      password
    );
    response.status(201).json(nuevoUser);
  } catch (error) {
    console.error("Error al crear algo", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
