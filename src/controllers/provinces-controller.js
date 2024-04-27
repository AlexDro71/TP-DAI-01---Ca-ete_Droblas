import express from "express";
import ProvinceService from './../servicios/provinces-service.js';
const ProvinceService = new ProvinceService();
const router = express.Router();

//Punto 7
router.post("/", async (request, response) => {
  try {
    const {name, fullName, latitude, longitude} = request.body;
    const newProvince = await ProvinceService.crearProvince(name, fullName, latitude, longitude);
    response.status(201).json(newProvince);
  } catch (error) {
    console.error("Error al crear la provincia:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
  
  router.get("/", async (request, response) => {
    try {
      const { pageSize, page } = request.query;

      pageSize = ValdacionesHelerp.EsUnInteger(pageSize, 0)
      const provinces = await ProvinceService.getAllProvinces(pageSize, page);
      response.json(provinces);
    } catch (error) {
      console.error("Error al obtener todas las provincias:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const province = await ProvinceService.getProvinceById(id);
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
      const updatedProvince = await ProvinceService.putProvince(
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
      await ProvinceService.borrarProvince(id);
      response.status(204).end();
    } catch (error) {
      console.error("Error al eliminar la provincia:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });
});

export default router;
