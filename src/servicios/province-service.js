import BD from "../repositories/provinces-repositories.js";


export default class ProvinceService {
    CreateProvince(id, name, full_name, latitude, longitude, display_order){
        
        try{
            BD.Query1(id, name, full_name, latitude, longitude, display_order)
            return("Succesfuly created")
        }catch{
            console.log("Error");
            return response.json("Error");
        }
    }
    EditProvince(id, name, full_name, latitude, longitude, display_order){
        
        try{
            BD.Query2(id, name, full_name, latitude, longitude, display_order)
            return("Edited Succesfuly")
        }catch{
            console.log("error");
            return response.json("error");
        }
    }
    DeleteProvince(id){
        
        try{
            BD.Query3(id)
            return("Succesfuly Deleted")
        }catch(error){
            console.log("Error")
            return response.json("error")
        }
    }
    GetProvince(id){
        
        try{
            BD.Query4(id)
            return("succesfull")
        }catch(error){
            console.log("error")
            return response.json("error")
        }
    }
}