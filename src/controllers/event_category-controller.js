import {Router} from "express";
import CategoryService from "../servicios/event_category-service.js";

const categoryService = new CategoryService();
const router = Router() 
router.get("/",  async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    try{
        const res = await categoryService.getAllCategories(limit,offset);
        return response.status(201).json(res);
    }catch(error){
        console.log("Hubo un error: ", error);
        return response.status(400).json("No se pudo mostrar las localidades")
    }
})
router.get("/:id", async (request,response) =>{
    const id = request.params.id;
    try{
        const res = await categoryService.categoryById(id);
        return response.status(201).json(res);
    }catch(error){
        console.log("Hubo un error:", error);
        return response.status(400).json("No se pudo encontrar la categoria")
    }
})
router.post("/", async (request,response) =>{
    const name = request.body.name;
    const display_order = request.body.display_order;

    try{
        const res = await categoryService.CreateCategory(name,display_order)
        return response.status(201).json("created");
    }catch(error){
        console.log("error al crear categoria: ", error);
        return response.status(400).json("error al crear categoria")
    }
})
router.put("/:id", async (request,response) =>{
    const id = request.params.id;
    const name = request.body.name;
    const display_order = request.body.display_order;
    try{
        const res = await categoryService.EditCategory(id,name,display_order)
        return response.status(201).json("edited");
    }catch(error){
        console.log("error al editar categoria", error);
        return response.status(400).json("error al editar categoria")
    }
})
router.delete("/:id", async (request,response) =>{
    const id = request.params.id;
    try{
        const res = categoryService.DeleteCategory(id);
        return response.status(201).json("deleted");
    }catch(error){
        console.log("Hubo un error:", error);
        return response.status(400).json("No se pudo borrar la categoria")
    }
})
export default router;