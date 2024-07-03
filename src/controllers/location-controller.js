import express from "express";
import LocationService from "./../servicios/location-service.js";
import { authMiddleware } from "../utils/auth-utils.js";
const locationService = new LocationService();
const router = express.Router();

//punto 11
router.get("/", async (request, response) => {
  const pageSize = request.query.offset;
  const page = request.query.limit;

  try {
    const locations = await locationService.getAlllocations(page, pageSize);
    response.status(200).json(locations);
  } catch (error) {
    console.error("Error al obtener todas las localidades:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
});
router.get("/:id", async (request, response) => {
    try {
      const id = request.params.id;
      const locations = await locationService.getlocationById(id);
      response.status(200).json(locations);
    } catch (error) {
      console.error("Error al obtener la localidad por ID:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });
  router.get("/:id/event-location", authMiddleware, async (request, response)=> {
    try{
      const pageSize = request.query.offset;
      const page = request.query.limit;
        const id = request.params.id;
        const eventLocation = await locationService.getAllEventLocationById(id, page, pageSize);
        response.status(200).json(eventLocation)
    }catch (error) {
            console.error("error al obtener la localidad por ID", error);
            response.status(500).json({messange: "Error interno del servidor"})
        }
    }

  )
export default router;