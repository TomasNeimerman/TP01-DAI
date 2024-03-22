export class ProvinceService {
    getAllUsers(pageSize, requestedPage){

      //const query = `select * from province limit ${pageSize} offset ${requestedPage}`;
      //const query2 = `select count(*) from province`;

        throw new Error("Error en el servicio de provincias");

        return{
            collection: query,
            pagination:{
                limit: pageSize,
                offset: requestedPage,
                nextPage: "http://localhost:3000/province?limit=15&offset=1",
                total: query2,
            },
        }
        
    }
    
}