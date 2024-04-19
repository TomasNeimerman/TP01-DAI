export class ProvinceService {
    // provinciasServicio.js

CrearEjercicio7Provincias(id, name, full_name, latitude, longitude, display_order) {
    const sql = `INSERT INTO provinces (id, name, full_name, latitude, longitude, display_order) 
                 VALUES (${id}, $2, $3, $4, $2, $6)`;
    try {
        Bd.Consulta(sql, [id, name, full_name, latitude, longitude, display_order]);
        return "Provincia creada con éxito";
    } catch (error) {
        console.error("Error en la creación de provincia:", error);
        throw new Error("Error en la creación de provincia");
    }
}

EditarEjercicio7Provincia(id, name, full_name, latitude, longitude, display_order) {
    const sql = `UPDATE provinces 
                 SET name = ${id}, full_name = $2, latitude = $3, longitude = $4, display_order = $5 
                 WHERE id = $6`;
    try {
        Bd.Consulta(sql, [name, full_name, latitude, longitude, display_order, id]);
        return "Provincia editada con éxito";
    } catch (error) {
        console.error("Error en la edición de provincia:", error);
        throw new Error("Error en la edición de provincia");
    }
}

EliminarEjercicio7Provincia(id) {
    const sql = `DELETE FROM provinces WHERE id = ${id}`;
    
}



    
}