import express, { response } from "express";
import {ProvinceService} from "../servicios/province-service.js/"
const router = express.Router();
const provinceService = new ProvinceService();
router.post("/create_province", (request,response) => {
    const id = request.query.id
    const name = request.query.id
    const full_name = request.query.full_name
    const latitude = request.query.latitude
    const longitude = request.query.longitude
    const display_order = request.query.display_order
    try{
        const verification = provinceService.CreateProvince(id,name,full_name,latitude,longitude,display_order)
        return response.json(verification)
    }catch(error){
        console.log("error")
        return response.json("error")
    }
})
router.post("/:id/edition_province", (request,response) => {
    const id = request.query.id
    const name = request.query.id
    const full_name = request.query.full_name
    const latitude = request.query.latitude
    const longitude = request.query.longitude
    const display_order = request.query.display_order
    try{
        const verification = provinceService.EditProvince(id,name,full_name,latitude,longitude,display_order)
        return response.json(verification)
    }catch{
        console.log("error")
        return response.json("error")
    }
})
router.delete("/:id/delete_event", (request,response) => {
    try{
        const verification = provinceService.DeleteProvince(request.params.id)
    }catch{

    }
})
router.get("/:id/get_province", (request,response) => {
    try{
        const verification = provinceService.GetProvince
        return response.json("error")
    }catch(error){
        console.log("error")
        return response.json("error")
    }
})

export default router;