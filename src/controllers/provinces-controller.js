import express from "express";
import ProvinceService from './../servicios/provinces-service.js';
const provinceService = new ProvinceService();
const router = express.Router();

//Punto 7
router.post("/", async (request, response) => {
  try {
    const name = request.query.name;
    const fullName = request.query.full_name;
    const latitude = request.query.latitude;
    const longitude = request.query.longitude;



     if (name.length < 3 || Number(latitude) == NaN || Number(longitude) ==  NaN) {
      return response.status(400).json({ message: "El nombre es muy corto o hay datos de tipo incorrectos" });
    }else{ 
    const newProvince = await provinceService.crearProvince(name, fullName, latitude, longitude);
    response.status(201).json(newProvince);
    }
  } catch (error) {
    console.error("Error al crear la provincia:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }});

  router.get("/", async (request, response) => {
    try {
      const pageSize = request.query.offset;
      const page = request.query.limit;
      const provinces = await provinceService.getAllProvinces(pageSize, page);
      response.json(provinces);
    } catch (error) {
      console.error("Error al obtener todas las provincias:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });

  router.get("/:id", async (request, response) => {
    try {
    
      const id = request.params.id;
      const province = await provinceService.getProvinceById(id);
      if (!province) {
        return response
          .status(404)
          .json({ message: "Provincia no encontrada" });
      }
      response.json(province);
    } catch (error) {
      console.error("Error al obtener la provincia por ID:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });

  router.get("/:id/locations", async (request,response)=>{
    try {
 
      const pageSize = request.query.offset;
      const page = request.query.limit;
      const id = request.params.id;
      const locationsArray = await provinceService.getAllLocationsByProvinceId(id, pageSize, page);
      if (!locationsArray) {
        return response
          .status(404)
          .json({ message: "Provincia no encontrada" });
      }
      response.json(locationsArray);
    } catch (error) {
      console.error("Error al obtener la provincia por ID:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });

  router.put("/:id", async (request, response) => {
    try {
      const id = request.params.id;
      const name = request.query.name;
  
      const fullName = request.query.full_name;

      const latitude = request.query.latitude;
 
      const longitude = request.query.longitude;
    
      
      if(name.length<3 || Number(latitude) == NaN || Number(longitude) ==  NaN ){
        return response.status(400).json({message: "El nombre es muy corto o hay datos de tipo incorrectos"})
      }else 
      if(id == null) {
        return response.status(404).json({message: "ID no encontrado"});
      } else {
        const updatedProvince = await provinceService.putProvince(
          id,
          name,
          fullName,
          latitude,
          longitude
        );
        response.status(200).json(updatedProvince);
      }
    } catch (error) {
      console.error("Error al editar la provincia:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });
  

  router.delete("/:id", async (request, response) => {
    try {
      const id = request.params.id;
      if(id == null){
        return response.status(404).json({message: "ID no encontrado"})}
        else{
      await provinceService.borrarProvince(id);
      response.status(200).json({message: "se elimino correctamente"});
    }
    } catch (error) {
      console.error("Error al eliminar la provincia:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  });


export default router;
