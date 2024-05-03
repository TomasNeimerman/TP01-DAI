import express from "express"
import provinceService from "../servicios/province-service.js";
const router = express.Router()

router.post("/create_province", (request,response) => {
    const id = 2
    const name = "Cordoba"
    const full_name = "Cordoba"
    const latitude = "0.0"
    const longitude = "5000.00"
    const display_order = "2"
    try{
        const verification = provinceService.CreateProvince(id,name,full_name,latitude,longitude,display_order)
        return response.json(verification)
    }catch(error){
        console.log("error")
        return response.json("error")
    }
})
router.post("/:id/edition_province", (request,response) => {
    const id = 2
    const name = "Mendoza"
    const full_name = "Mendoza"
    const latitude = "0.0"
    const longitude = "3000.00"
    const display_order = "3"
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
        const verification = provinceService.DeleteProvince(2)
    }catch{

    }
})
router.get("/:id/get_province", (request,response) => {
    try{
        const verification = 2
        return response.json("error")
    }catch(error){
        console.log("error")
        return response.json("error")
    }
})

export default router;