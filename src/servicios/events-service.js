class EventsService {
    getAllEvents(){
        const pageSize = 10;
        const requestedPage = 0;
        //ir a base de datos...
        query = 'select * from events limit $(pagesize) offset $(requestedPage)';
        const eventsInDB = query.execute();

        return{
            collection: eventsInDB,
            pageSize: pageSize,
            page: requestedPage,
            nextPage: requestedPage + 1,
        }
        
    }
}