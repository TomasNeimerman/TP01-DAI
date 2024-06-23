import BD from "../repositories/provinces-repositories.js";
const bd = new BD();

export default class ProvinceService {
    async getProvince() {
        const province = await bd.query4();
        const provArray = province.map((row) => {
            var provObj = new Object()
            provObj.id = row.id;
            provObj.name = row.name;
            provObj.full_name = row.full_name;
            provObj.latitude = row.latitude;
            provObj.longitude = row.longitude;
            provObj.display_order = row.display_order;
        return{
            provinces: provObj
        }
    })
    return provArray
    }

    async getProvinceById(id){
        const province = await bd.query5(id)
       
        return  province.map((row) =>{
            return {
                id: row.id,
                name: row.name,
                full_name: row.full_name,
                latitude: row.latitude,
                longitude: row.longitude,
                display_order: row.display_order
            }
           });
    
        
    }

    async getLocationsByProvinceId(id){
        const limit = 15;
        const offset = 0;
        const loc = await bd.query6(id,limit,offset)
        const dateBd = loc.map((row) =>{
        var locObj = new Object();
        locObj.id = row.id;
        locObj.name = row.name;
        locObj.id_province = row.id_province;
        locObj.latitude = row.latitude;
        locObj.longitude = row.longitude;
        return{
            locations: locObj
        }
       })
       console.log(dateBd);
       return dateBd;
    }
    CreateProvince(name, full_name, latitude, longitude, display_order){
        return bd.query1(name, full_name, latitude, longitude, display_order)
    }
    EditProvince(id, name, full_name, latitude, longitude, display_order){
        return bd.query2(id, name, full_name, latitude, longitude, display_order)
    }
    DeleteProvince(id){
        return bd.query3(id);
    }
    
}