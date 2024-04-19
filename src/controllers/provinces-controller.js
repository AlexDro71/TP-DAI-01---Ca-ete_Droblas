import express from "express";
import ProvincesService from "../services/provinces-service.js";
const provincesService = new ProvincesService();
const router = express.Router();
router.post("/", async (request, response) => {
  try {
    const {name, fullName, latitude, longitude} = request.body;
    const newProvince = await provincesService.crearProvince(name, fullName, latitude, longitude);
    response.status(201).json(newProvince);
  } catch (error) {
    console.error("Error al crear la provincia:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
  router.get("/", async (request, response) => {
    try {
      const { pageSize, page } = request.query;
      const provinces = await provincesService.getAllProvinces(pageSize, page);
      response.json(provinces);
    } catch (error) {
      console.error("Error al obtener todas las provincias:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const province = await provincesService.getProvinceById(id);
      if (!province) {
        return response
          .status(404)
          .json({ message: "Provincia no encontrada" });
      }
      response.json(province);
    } catch (error) {
      console.error("Error al obtener la provincia por ID:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });
  router.put("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const { name, fullName, latitude, longitude } = request.body;
      const updatedProvince = await provincesService.putProvince(
        id,
        name,
        fullName,
        latitude,
        longitude
      );
      response.json(updatedProvince);
    } catch (error) {
      console.error("Error al editar la provincia:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });
  router.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      await provincesService.borrarProvince(id);
      response.status(204).end();
    } catch (error) {
      console.error("Error al eliminar la provincia:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });
});

export default router;
