import express from "express";
import EventCategoryService from "./../servicios/event-category-service.js";
const eventcategoryService = new EventCategoryService();
const router = express.Router();


router.post("/", async (request, response) => {
    try {
      const {name, display_order} = request.body;
      const newCategory = await eventcategoryService.crearCategory(name, display_order);
      response.status(201).json(newCategory);
    } catch (error) {
      console.error("Error al crear la categoria:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
    
    router.get("/", async (request, response) => {
      try {
        const { pageSize, page } = request.query;
        const categorias = await eventcategoryService.getAllCategories(pageSize, page);
        response.json(categorias);
      } catch (error) {
        console.error("Error al obtener todas las categorias:", error);
        response.status(500).json({ message: "Error interno del servidor" });
      }
    });
    router.get("/:id", async (request, response) => {
      try {
        const { id } = request.params;
        const categoria = await eventcategoryService.getCategoriaById(id);
        if (!categoria) {
          return response
            .status(404)
            .json({ message: "Categoria no encontrada" });
        }
        response.json(categoria);
      } catch (error) {
        console.error("Error al obtener la categoria por ID:", error);
        response.status(500).json({ message: "Error interno del servidor" });
      }
    });
    router.put("/:id", async (request, response) => {
      try {
        const { id } = request.params;
        const { name, display_order } = request.body;
        const updatedCategory = await eventcategoryService.putCategory(
          id,
          name, 
          display_order
        );
        response.json(updatedCategory);
      } catch (error) {
        console.error("Error al editar la categoria:", error);
        response.status(500).json({ message: "Error interno del servidor" });
      }
    });
    router.delete("/:id", async (request, response) => {
      try {
        const { id } = request.params;
        await eventcategoryService.borrarCategory(id);
        response.status(204).end();
      } catch (error) {
        console.error("Error al eliminar la provincia:", error);
        response.status(500).json({ message: "Error interno del servidor" });
      }
    });
  })
export default router;