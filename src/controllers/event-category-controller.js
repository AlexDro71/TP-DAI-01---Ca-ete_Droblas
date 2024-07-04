import express from "express";
import EventCategoryService from "./../servicios/event-category-service.js";
import Validaciones from "../utils/validaciones-utils.js";
const eventcategoryService = new EventCategoryService();
const router = express.Router();
const validaciones = new Validaciones();

router.post("/", async (request, response) => {
    try {
      const name = request.body.name;
      const display_order = request.body.display_order;
      if(await validaciones.menor3(name)){
        return response.status(400).json({message: "El nombre tiene menos de 3 letras"})
      }else{
      const newCategory = await eventcategoryService.crearCategory(name, display_order);
      response.status(201).json(newCategory);
      }
  } catch (error) {
    console.error("Error al crear la provincia:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }});
    
router.get("/", async (request, response) => {
      try {
        const pageSize = request.query.offset;
        const page = request.query.limit;
        const categorias = await eventcategoryService.getAllCategories(pageSize, page);
        return response.status(200).json(categorias);
      } catch (error) {
        console.error("Error al obtener todas las categorias:", error);
        response.status(500).json({ message: "Error interno del servidor" });
      }
    });
    router.get("/:id", async (request, response) => {
        try {
          const id = request.params.id;
          if(!await validaciones.existeObjeto(`event_categories`, id)){
            return response.status(404).json({message: "Categoria del ID no encontrada"})
          }else{
          const categoria = await eventcategoryService.getCategoryById(id);
          return response.status(200).json(categoria);
          }
      } catch (error) {
        console.error("Error al obtener la categoria por ID:", error);
        response.status(500).json({ message: "Error interno del servidor" });
      }
    });
    router.put("/:id", async (request, response) => {
      try {
        const { id } = request.params;
        const { name, display_order } = request.body;
        if(name.length<3 || name==""){
          return response.status(400).json({message: "El nombre tiene menos de 3 letras"})
        }else{
        const updatedCategory = await eventcategoryService.putCategory(
          id,
          name, 
          display_order
        );
        response.status(200).json(updatedCategory);
      }
      } catch (error) {
        console.error("Error al editar la categoria:", error);
        response.status(500).json({ message: "Error interno del servidor" });
      }
    });
    router.delete("/:id", async (request, response) => {
      try {
        const { id } = request.params;
        if(id==null){
          return response.status(400).json({message: "ID no encontrado"})
        }else{
        await eventcategoryService.borrarCategory(id);
        response.status(200).end();
      }
      } catch (error) {
        console.error("Error al eliminar la provincia:", error);
        response.status(500).json({ message: "Error interno del servidor" });
      }
    });
export default router;