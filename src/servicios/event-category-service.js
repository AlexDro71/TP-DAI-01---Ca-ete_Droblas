import EventCategoryRepository from '../repositories/event-category-repository'; 
export default class EventCategoryService{
    getAllCategory = async (pageSize = 10, page = 0) =>{
        const repo = new EventCategoryRepository();
        const returnArray = await repo.getAllCategory(pageSize, page);
        return returnArray;
    }
    getCategoryById = async (id) =>{
        const repo = new EventCategoryRepository();
        const returnArray = await repo.getCategoryById(id);
        return returnArray;
    }
    crearCategory = async (name, display_order) => {
        const repo = new EventCategoryRepository();
        const returnArray = await repo.crearEventCategory(name, display_order);
        return returnArray;
    }
    putCategory = async (id, name, display_order)  => {
        const repo = new EventCategoryRepository();
        const returnArray = await repo.putCategory(id, name, display_order);
        return returnArray;
    }
    borrarCategory = async(id)  => {
        const repo = new EventCategoryRepository();
        const returnArray = await repo.borrarCategory(id)
        return returnArray;
    }
}