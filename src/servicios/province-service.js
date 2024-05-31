import BD from "../repositories/provinces-repositories.js";
const bd = new BD();

export default class ProvinceService {

    async GetProvince(pageSize, requestedPage, path) {
        const offset = (requestedPage - 1) * pageSize;
        const province = await bd.query4();
        const paginatedProvinces = province.slice(offset, offset + pageSize);
        const provArray = paginatedProvinces.map(row => ({
            id: row.id,
            name: row.name,
            full_name: row.full_name,
            latitude: row.latitude,
            longitude: row.longitude,
            display_order: row.display_order
        }));
    
        return {
            collection: provArray,
            pagination: {
                limit: pageSize,
                offset: requestedPage,
                nextPage: `${process.env.BASE_URL}/${path}?limit=${pageSize}&offset=${requestedPage + 1}`
            }
        };
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

    async GetLocationsByProvinceId(id) {
        try {
            const locations = await bd.queryLocationsByProvinceId(id);
            return locations;
        } catch (error) {
            console.error("Error al buscar las ubicaciones", error);
            throw error;
        }
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