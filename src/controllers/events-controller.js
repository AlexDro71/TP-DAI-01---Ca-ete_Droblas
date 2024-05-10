import express from "express";
import EventsService from "../servicios/events-service.js";

const router = express.Router();
const eventsService = new EventsService();

//Punto 2
router.get("/", (request, response) => {
  const pageSize = request.query.pageSize;
  const page = request.query.page;

  const getAllEvents =  eventsService.getAllEvents(pageSize, page);
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
    const BusquedaEvent = eventsService.BusquedaEvento(
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
  const detalleEvento = eventsService.DetalleEvento(id);
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
    const ListaUsuarios = eventsService.listaUsuarios(
      id,
      first,
      last,
      user,
      attended,
      rating
    );
    return response.json(ListaUsuarios);
  } catch (error) {
    console.log("Un eror Papu :V");
    return response.json("La hora sad :'v");
  }
});

//punto 8
router.post("/", async (request, response) => {
  try {
      const eventData = request.body;
      const nuevoEvent = await eventsService.crearEvent(eventData);
      response.status(201).json(nuevoEvent);
  } catch (error) {
      console.error("Error al crear el evento:", error);
      response.status(500).json({ message: "Error interno del servidor" });
  }
});
router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const eventData = request.body;

  try {
 
      const existe = await eventsService.getEventById(id);

      if (!existe) {
          return response.status(404).json({ message: "Evento no encontrado" });
      }

      if (existe.id_creator_user !== eventData.id_creator_user) {
          return response.status(403).json({ message: "Id creador evento != id actual" });
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
      
      const existe = await eventsService.getEventById(id);
      if (!existe) {
          return response.status(404).json({ message: "Evento no encontrado" });
      }
      if (existe.id_creator_user !== request.body.id_creator_user) {
          return response.status(403).json({ message: "Id creador evento != id actual" });
      }
      await eventsService.borrarEvent(id);
      response.status(204).end();
  } catch (error) {
      console.error("Error al eliminar el evento:", error);
      response.status(500).json({ message: "Error interno del servidor" });
  }
});

//punto 9

  router.post("/id", async (request, response) => {
    try {
        const {id_event, id_user} = request.body;
        const nuevoEenrollment = await eventsService.crearEvent(id_event, id_user);
        response.status(201).json(nuevoEvent);
    } catch (error) {
        console.error("Error al crear el evento:", error);
        response.status(500).json({ message: "Error interno del servidor" });
    }
  });


//punto 10
router.patch("/:id/enrollment/:rating", async (request, response) => {
  try {
      const { id, rating } = request.params;
      const event = await eventsService.getEventById(id);
      if (!event) {
          return response.status(404).json({ message: "Evento no encontrado" });
      }
      if (!event.finalizado) {
          return response.status(400).json({ message: "El evento aún no ha finalizado" });
      }
      const isUserRegistered = await eventsService.checkUserRegistration(id, request.user.id);
      if (!isUserRegistered) {
          return response.status(400).json({ message: "El usuario no está registrado en el evento" });
      }
      if (rating < 1 || rating > 10) {
          return response.status(400).json({ message: "El rating debe estar entre 1 y 10" });
      }
      await eventsService.saveRating(id, request.user.id, rating, request.body.feedback);
      response.status(200).json({ message: "Rating registrado exitosamente" });
  } catch (error) {
      console.error("Error al registrar el rating del evento:", error);
      response.status(500).json({ message: "Error interno del servidor" });
  }
});



export default router;
