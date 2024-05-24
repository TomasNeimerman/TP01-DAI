import BD from "../repositories/provinces-repositories.js";
const bd = new BD();

export default class ProvinceService {
    async GetProvince(pageSize, requestedPage) {
        const offset = (requestedPage - 1) * pageSize;
        const province = await bd.Query5();
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
                nextPage: `${process.env.BASE_URL}/province?limit=${pageSize}&offset=${requestedPage + 1}`
            }
        };
    }
    GetProvinceById(id){
        const province = BD.Query4(id)
        provObj = new Object();
        prov = province.map(row =>{
            provObj.id = row.id
            provObj.name = row.name
            provObj.full_name = row.full_name
            provObj.latitude = row.latitude
            provObj.longitude = row.longitude
            provObj.display_order = row.display_order
        })
        return prov
    }
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
    
}