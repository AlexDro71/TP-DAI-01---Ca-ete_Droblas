import express from "express";
import EventsService from "../servicios/events-service.js";

const router = express.Router();
const eventsService = new EventsService();

//Punto 2
router.get("/", (request, response) => {
  const pageSize = request.query.pageSize;
  const page = request.query.page;

  const getAllEvents = EventsService.getAllEvents(pageSize, page);
  return response.json(getAllEvents);
});

// punto 3
router.get("/", (request, response) => {
  const pageSize = request.query.pageSize;
  const page = request.query.page;
  const name = request.query.name;
  const category = request.query.category;
  const startDate = request.query.startDate;
  const tag = request.query.tag;
  try {
    const BusquedaEvent = EventosRecolectar.BusquedaEvento(
      name,
      category,
      startDate,
      tag
    );
    return response.json(BusquedaEvent);
  } catch (error) {
    console.log("Un eror Papu :V");
    return response.json("La hora sad :'v");
  }
});

//punto 4
router.get("/id", (request, response) => {
  const pageSize = request.query.pageSize;
  const page = request.query.page;
  const id = request.query.id;
  const detalleEvento = DetalleEvento.DetalleEvento(id);
  return response.json(DetalleEvento);
});

//punto 5
router.get("/", (request, response) => {
  const pageSize = request.query.pageSize;
  const page = request.query.page;
  const id = request.query.id;
  const first = request.query.first_name;
  const last = request.query.last_name;
  const user = request.query.username;
  const attended = request.query.attended;
  const rating = request.query.rating;
  try {
    const BusquedaEvent = EventosRecolectar.BusquedaEvento(
      id,
      first,
      last,
      user,
      attended,
      rating
    );
    return response.json(BusquedaEvent);
  } catch (error) {
    console.log("Un eror Papu :V");
    return response.json("La hora sad :'v");
  }
});

//punto 8
router.post("/", async (request, response) => {
  try {
      const eventData = request.body;
      const newEvent = await eventsService.crearEvent(eventData);
      response.status(201).json(newEvent);
  } catch (error) {
      console.error("Error al crear el evento:", error);
      response.status(500).json({ message: "Error interno del servidor" });
  }
});
router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const eventData = request.body;

  try {
 
      const existingEvent = await eventsService.getEventById(id);

      if (!existingEvent) {
          return response.status(404).json({ message: "Evento no encontrado" });
      }

      if (existingEvent.id_creator_user !== eventData.id_creator_user) {
          return response.status(403).json({ message: "No tienes permiso para editar este evento" });
      }

      const updatedEvent = await eventsService.putEvent(id, eventData);
      response.json(updatedEvent);
  } catch (error) {
      console.error("Error al editar el evento:", error);
      response.status(500).json({ message: "Error interno del servidor" });
  }
});
router.delete("/:id", async (request, response) => {
  const { id } = request.params;

  try {
      
      const existingEvent = await eventsService.getEventById(id);
      if (!existingEvent) {
          return response.status(404).json({ message: "Evento no encontrado" });
      }
      if (existingEvent.id_creator_user !== request.body.id_creator_user) {
          return response.status(403).json({ message: "No tienes permiso para eliminar este evento" });
      }
      await eventsService.borrarEvent(id);
      response.status(204).end();
  } catch (error) {
      console.error("Error al eliminar el evento:", error);
      response.status(500).json({ message: "Error interno del servidor" });
  }
});



export default router;
