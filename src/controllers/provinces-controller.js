import express from "express";
import ProvinceService from "../servicios/province-service.js";
const router = express.Router();
const provService = new ProvinceService()

router.get("/", async (request, response) => {
    const id = request.query.id;
    const limit = parseInt(request.query.limit, 10) || 10;
    const offset = parseInt(request.query.offset, 10) || 1;

    if (limit || offset) {
        try {
            const verification = await provService.GetProvince(limit, offset);
            return response.status(200).json(verification);
        } catch (error) {
            console.error("Error al buscar provincia", error);
            return response.status(500).json("Error al buscar provincia");
        }
    } else if (id) {
        try {
            const verification = await ProvinceService.GetProvinceById(id);
            return response.status(200).json(verification);
        } catch (error) {
            console.error("No se encontró la provincia", error);
            return response.status(404).json("No se encontró la provincia");
        }
    } else {
        return response.status(400).json("No se obtuvo nada");
    }
});
router.post("/create_province", (request, response) => {
  const id = request.id;
  const name = request.name;
  const full_name = request.full_name;
  const latitude = request.latitude;
  const longitude = request.longitude;
  const display_order = request.display_order;
  try {
    const verification = ProvinceService.CreateProvince(
      id,
      name,
      full_name,
      latitude,
      longitude,
      display_order
    );
    return response.json(verification);
  } catch (error) {
    console.log("error al crear provincia");
    return response.json("error al crear provincia");
  }
});
router.post("/:id/edition_province", (request, response) => {
  const id = request.query.id;
  const name = request.query.name;
  const full_name = request.query.full_name;
  const latitude = request.query.latitude;
  const longitude = request.query.longitude;
  const display_order = request.query.display_order;
  try {
    const verification = ProvinceService.EditProvince(
      id,
      name,
      full_name,
      latitude,
      longitude,
      display_order
    );
    return response.json(verification);
  } catch {
    console.log("error al editar provincia");
    return response.json("error al editar provincia");
  }
});
router.delete("/:id/delete_event", (request, response) => {
  try {
    const verification = ProvinceService.DeleteProvince(2);
    return response.json("Se borro correctamente la provincia");
  } catch {
    console.log("Error al borrar provincia");
    return response.json("Error al borrar provincia");
  }
});

export default router;
