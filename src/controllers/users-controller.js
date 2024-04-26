import express from "express";
import UsersService from "./../servicios/users-service.js";
const usersService = new UsersService();
const router = express.Router();
//punto 6
router.post("/login", (request,response)=>{

})
router.post("/register", (request,response)=>{

})
//punto 9
router.post("/id", (request,response)=>{

})
//punto 10


export default router;