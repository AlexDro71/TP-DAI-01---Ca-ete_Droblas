import express from "express";
import EventlocationocationService from "./../servicios/event-location-service.js";
const eventlocationService = new EventlocationService();
const router = express.Router();

router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const location = await eventlocationService.getEventLocationById(id);
      if (!location) {
        return response
          .status(404)
          .json({ message: " event-location " });
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
      const locations = await eventlocationService.getAllEventlocations(pageSize, page);
      response.status(200).json(locations);
    } catch (error) {
      console.error("Error al obtener todas las localidades:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });
  router.get("/:id/event-location", async (request, response)=> {
    try{
        const { id } = resquest.params;
        const eventLocation = await locationService.getAllEventLocationByLocationId(id);
        if(!eventLocation){
            return response
            .status(404)
            .json({menssage: "localidad no encontrada"});
        }
        response.status(200).json(locations)
    }catch (error) {
            console.error("error al obtener la localidad por ID", error);
            response.status(500).json({messange: "Error interno del servidor"})
        }
    }
  )
export default router;