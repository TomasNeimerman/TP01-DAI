import { Bd } from "../repositories copy/event-repositories";

export class ProvinceService {
    CreateProvince(id, name, full_name, latitude, longitude, display_order){
        const sql = `INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ('${id}','${name}', '${full_name}', '${latitude}', '${longitude}', ${display_order})`;
        try{
            Bd.Consulta(sql)
            return("Succesfuly created")
        }catch{
            console.log("Error");
            return response.json("Error");
        }
    }
    EditProvince(id, name, full_name, latitude, longitude, display_order){
        const sql = `UPDATE province SET id = '${id}', name = '${name}', full_name = '${full_name}', latitude = '${latitude}', longitude = '${longitude}', display_order = '${display_order}'
        WHERE id = '${id}'`;
        try{
            Bd.Consulta(sql)
            return("Edited Succesfuly")
        }catch{
            console.log("error");
            return response.json("error");
        }
    }
    DeleteProvince(id){
        const sql = `DELETE * FROM province WHERE id = '${id}`;
        try{
            Bd.Consulta(sql)
            return("Succesfuly Deleted")
        }catch(error){
            console.log("Error")
            return response.json("error")
        }
    }
    GetProvince(id){
        const sql = `SELECT * FROM PROVINCE WHERE id = '${id}'`
        const SavedData = result.map(row =>({
            id: row.id,
            name: row.name,
            full_name: row.full_name,
            latitude: row.latitude,
            longitude: row.longitude,
            display_order: row.display_order
        }))
        return{ collection: SavedData };
    }
}