import express from "express";
import EventsService from "../servicios/events-service.js";
import { authMiddleware } from "../utils/auth-utils.js";

const router = express.Router();
const eventsService = new EventsService();

//Punto 2
router.get("/", (request, response) => {
  const pageSize = request.query.pageSize;
  const page = request.query.page;

  const getAllEvents = eventsService.getAllEvents(pageSize, page);
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
  if(detalleEvento == null){
    return response.status(404).json({ message: "No se encontro evento de dicho ID" });
  }else{
  return response.status(200).json(DetalleEvento);
  }
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
router.post("/", authMiddleware, async (request, response) => {
  try {
    const eventData = request.body;
    if(eventData.name.length<3 || eventData.descrption.length<3 || eventsService.excedeAsistencia() || eventData.price<0 || eventData.duration_in_minutes<0){
      return response.status(400).json({message: "Error en los datos del evento"})
    }else{
    const nuevoEvent = await eventsService.crearEvent(eventData);
    response.status(201).json(nuevoEvent);
  }
  } catch (error) {
    console.error("Error al crear el evento:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
});
router.put("/:id", authMiddleware, async (request, response) => {
  const { id } = request.params;
  const eventData = request.body;
  if(eventData.name.length<3 || eventData.descrption.length<3 || eventsService.excedeAsistencia() || eventData.price<0 || eventData.duration_in_minutes<0){
    return response.status(400).json({message: "Error en los datos del evento"})
  }else if(eventData.id == null){
    return response.status(404).json({message: "ID no encontrado"})
  }else{
  try {
    const existe = await eventsService.getEventById(id);
    if (!existe) {
      return response.status(404).json({ message: "Evento no encontrado" });
    }
    if (existe.id_creator_user != eventData.id_creator_user) {
      return response
        .status(403)
        .json({ message: "Id creador evento != id actual" });
    }
    const updatedEvent = await eventsService.putEvent(id, eventData);
    response.json(updatedEvent);
  } catch (error) {
    console.error("Error al editar el evento:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
  }
});
router.delete("/:id", authMiddleware, async (request, response) => {
  const { id } = request.params;

  try {
    const existe = await eventsService.getEventById(id);
    if (!existe) {
      return response.status(404).json({ message: "Evento no encontrado" });
    }
    if (existe.id_creator_user != requcreator_usest.body.id_er) {
      return response
        .status(403)
        .json({ message: "Id creador evento != id actual" });
    }
    await eventsService.borrarEvent(id);
    response.status(200).end();
  } catch (error) {
    console.error("Error al eliminar el evento:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
});

//punto 9

router.post("/:id/enrollment", authMiddleware, async (request, response) => {
  try {
    const { id_event, id_user } = request.body;
    if (id_event == null) {
      response.status(404).json("Id no encontrado");
    } else if (eventsService.maxExceed() || eventsService.datePast() || eventsService.noHabilitado() ||eventsService.estadoRegistro(id_user)){
      return response.status(400).json({message: "todo mal"}) 
  }else {
      const nuevoEnrollment = await eventsService.registerUser(
        id_event,
        id_user
      );
      response.status(201).json(nuevoEnrollment);
    }
  } catch (error) {
    console.error("Error al crear el evento:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
});

router.delete("/:id/enrollment", authMiddleware, async (request, response) => {
  try {
    const { id_event, id_user } = request.body;
    if (eventsService.estadoRegistro(id_user), eventsService.datePast()) {
      return response.status(400).json({message: "Errores"})
    } else if(id_event == null){
      return response.status(404).json({message: "ID no encontrado"})
    }else{
      const eliminado = unregisterUser(id_event, id_user);
      response.status(200).json(eliminado);
    }
  } catch (error) {
    console.error("Error al crear el evento:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
});

//punto 10
router.patch("/:id/enrollment/:rating", authMiddleware, async (request, response) => {
    try {
      const { id, rating } = request.params;
      const event = await eventsService.getEventById(id);
      if (event == null) {
        response.status(404).json({ message: "Evento no encontrado" });
      } else if (rating < 1 || rating > 10 || eventsService.noFinalizo() || eventsService.estadoRegistro(id)) {
        response
          .status(400)
          .json({ message: "Errores varios" });
      } else {
        const rate = eventsService.ratingEvento(id, rating);
        response.status(200).json(rate);
      }
    } catch (error) {
      console.error("Error al registrar el rating del evento:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }
);

export default router;
