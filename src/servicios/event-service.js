export class EventService {
    getAllEvents(pageSize, requestedPage) {
      // Ir a base de datos...
  
     const query = `select * from event limit ${pageSize} offset ${requestedPage}`;
    const query2 = `select count(*) from event`;
  
      throw new Error("Error en el servicio  de eventos");
  
      return {
        collection: query,
        pagination: {
          limit: pageSize,
          offset: requestedPage,
          nextPage: "http://localhost:3000/pizzas?limit=15&offset=1",
          total: query2,
        },
      };
    }
  }