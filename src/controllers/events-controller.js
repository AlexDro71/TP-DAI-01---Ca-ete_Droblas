import express from "express";
import {
    EventsService,
    EventsService2,
    EventsService3,
  } from "../servicios/events-service.js";
    const router = express.Router();
    const evenService = new EventsService();
    router.get("/",(request,response)=>{
    const pageSize = req.query.pageSize;
    const page = req.query.page;

    const getAllEvents = EventsService.getAllEvents(pageSize, page)
    return response.json(getAllEvents);

})

router.get("/", (request, repsonse)=>{

})

export default router;