import BD from "../repositories/event_category-repositories.js";
const bd = new BD();

export default class CategoryService {
    async getAllCategories(limit, offset) {
        limit = 15
        offset = 0
        const category = await bd.qGetCategory(limit,offset)
        const dateBd = category.map(row =>{ 
            const catO = new Object();
            catO.id = row.id,
            catO.name = row.name,
            catO.display_order = row.display_order;
            return{
            category: catO,
        
        }  
        
    })
    return dateBd;
    }
    async categoryById(id){
        const category = await bd.qGetCbyId(id);
        return category.map((row) => {
            return {
                id: row.id,
                name: row.name,
                display_order: row.display_order
            };
        });
    }
    async CreateCategory(name,display_order){
        return bd.qCreateCategory(name,display_order);
    }
    async EditCategory(id,name,display_order){
        return bd.qUpdateCategory(id,name,display_order);
    }
    async DeleteCategory(id){
        return bd.qDeleteCategory(id);
    }
}