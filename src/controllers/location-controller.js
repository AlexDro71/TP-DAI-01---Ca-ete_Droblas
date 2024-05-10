import express from "express";
import LocationService from "./../servicios/location-service.js";
const locationService = new LocationService();
const router = express.Router();

//punto 11
router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const location = await locationService.getlocationById(id);
      if (!location) {
        return response
          .status(404)
          .json({ message: "localidad no encontrada" });
      }
      response.status(200).json(locations);
    } catch (error) {
      console.error("Error al obtener la localidad por ID:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });
router.get("/", async (request, response) => {
    try {
      const { pageSize, page } = request.query;

      pageSize = ValdacionesHelerp.EsUnInteger(pageSize, 0)
      const locations = await locationServiceService.getAlllocations(pageSize, page);
      response.status(200).json(locations);
    } catch (error) {
      console.error("Error al obtener todas las localidades:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });
export default router;