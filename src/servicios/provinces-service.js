import ProvinceRepository from './../../repositories/province-repository.js';  

export default class ProvincesService{
    getAllProvinces = async (pageSize = 10, page = 0) =>{
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllProvinces(pageSize, page);
        return returnArray;
    }

    getProvinceById = async (id) =>{
        const repo = new ProvinceRepository();
        const returnArray = await repo.getProvinceById(id);
        return returnArray;
    }

    


}