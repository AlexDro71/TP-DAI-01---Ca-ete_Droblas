import express from "express";
import {EventsService,} from "../servicios/events-service.js";
 
    const router = express.Router();
    const evenService = new EventsService();
  
//Punto 2
  router.get("/",(request,response)=>{
    const pageSize = req.query.pageSize;
    const page = req.query.page;

    const getAllEvents = EventsService.getAllEvents(pageSize, page)
    return response.json(getAllEvents);

  })

// punto 3
  router.get("/", (request, response) => {
  const name = request.query.name;
  const category = request.query.category;
  const startDate = request.query.startDate;
  const tag = request.query.tag;
  try {
      const BusquedaEvent = EventosRecolectar.BusquedaEvento(name, category, startDate, tag);
      return response.json(BusquedaEvent);
  } catch(error){
      console.log("Un eror Papu :V")
      return response.json("La hora sad :'v")
  }
  })

  //punto 4
  router.get("/id", (request, response) => {
  const id = request.query.id;
  const pageSize = req.query.pageSize;
  const page = req.query.page;
   const detalleEvento = DetalleEvento.DetalleEvento(id);
   return response.json(DetalleEvento);
  })


export default router;