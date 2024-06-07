import BD from "../repositories/provinces-repositories.js";
const bd = new BD();

export default class ProvinceService {
    async getProvince() {
        const province = await bd.query4();
        const provArray = province.map((row) => {
            var provinces = new Object()
            provinces.id = row.id;
            provinces.name = row.name;
            provinces.full_name = row.full_name;
            provinces.latitude = row.latitude;
            provinces.longitude = row.longitude;
            provinces.display_order = row.display_order;
        return{
            provinces:provinces
        }
    })
    return provArray
    }

    async getProvinceById(id){
        const province = await bd.query5(id)
        const dateBd = province.map(row =>{ 
            const provinceO = new Object();
            provinceO.id = row.id,
            provinceO.name = row.name,
            provinceO.full_name = row.full_name,
            provinceO.latitude = row.latitude,
            provinceO.longitude = row.longitude,
            provinceO.display_order = row.display_order;
            return{
            province: provinceO,
        }       
    })
    return dateBd;
    }

    async getLocationsByProvinceId(id) {
       const locations = await bd.query6(id)
       const dateBd = locations.map(row =>{
        const locationsO = new Object();
        locationsO.id = row.id,
        locationsO.name = row.name,
        locationsO.id_province = row.id_province,
        locationsO.latitude = row.latitude,
        locationsO.longitude = row.longitude
        return{
            locations: locationsO,
        }
       })
       return dateBd;
    }
    CreateProvince(id, name, full_name, latitude, longitude, display_order){
        
        try{
            BD.query1(id, name, full_name, latitude, longitude, display_order)
            return("Succesfuly created")
        }catch{
            console.log("Error");
            return response.json("Error");
        }
    }
    EditProvince(id, name, full_name, latitude, longitude, display_order){
        
        try{
            BD.query2(id, name, full_name, latitude, longitude, display_order)
            return("Edited Succesfuly")
        }catch{
            console.log("error");
            return response.json("error");
        }
    }
    DeleteProvince(id){
        
        try{
            BD.query3(id)
            return("Succesfuly Deleted")
        }catch(error){
            console.log("Error")
            return response.json("error")
        }
    }
    
}