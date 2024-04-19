import express from "express";
import { EventsService } from "../servicios/events-service.js";

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

export default router;
