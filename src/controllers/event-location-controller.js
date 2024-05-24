// import express from "express";
// import EventLocationService from "./../servicios/event-location-service.js";
// import { authMiddleware } from "../utils/auth-utils.js";
// const eventlocationService = new EventLocationService();
// const router = express.Router();

// router.get("/:id", authMiddleware, async (request, response) => {
//     try {
//       const { id } = request.params;
//       const location = await eventlocationService.getEventLocationById(id);
//       if (!location) {
//         return response
//           .status(404)
//           .json({ message: " event-location " });
//       }
//       response.status(200).json(locations);
//     } catch (error) {
//       console.error("Error al obtener la localidad por ID:", error);
//       response.status(500).json({ message: "Error interno del servidor" });
//     }
//   });
// router.get("/", authMiddleware, async (request, response) => {
//     try {
//       const { pageSize, page } = request.query;

//       pageSize = ValdacionesHelerp.EsUnInteger(pageSize, 0)
//       const locations = await eventlocationService.getAllEventlocations(pageSize, page);
//       response.status(200).json(locations);
//     } catch (error) {
//       console.error("Error al obtener todas las localidades:", error);
//       response.status(500).json({ message: "Error interno del servidor" });
//     }
//   });
  
// export default router;