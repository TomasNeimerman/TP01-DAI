import Bd from "../repositories/provinces-repositories";

export class ProvinceService {
    CreateProvince(id, name, full_name, latitude, longitude, display_order){
        
        try{
            Bd.Query1(id, name, full_name, latitude, longitude, display_order)
            return("Succesfuly created")
        }catch{
            console.log("Error");
            return response.json("Error");
        }
    }
    EditProvince(id, name, full_name, latitude, longitude, display_order){
        
        try{
            Bd.Query2(id, name, full_name, latitude, longitude, display_order)
            return("Edited Succesfuly")
        }catch{
            console.log("error");
            return response.json("error");
        }
    }
    DeleteProvince(id){
        
        try{
            Bd.Query3(id)
            return("Succesfuly Deleted")
        }catch(error){
            console.log("Error")
            return response.json("error")
        }
    }
    GetProvince(id){
        
        try{
            Bd.Query4(id)
            return("succesfull")
        }catch(error){
            console.log("error")
            return response.json("error")
        }
    }
}