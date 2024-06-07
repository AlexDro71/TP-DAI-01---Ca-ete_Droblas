import ProvinceRepository from './../../src/repositories/province-repository.js';  

export default class ProvinceService{

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
    getAllLocationsByProvinceId = async (id, pageSize, page) =>{
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllLocationsByProvinceId(id, pageSize, page);
        return returnArray;
    }

    crearProvince = async (name, fullName, latitude, longitude) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.crearProvince(name, fullName, latitude, longitude);
        return returnArray;
    }
    putProvince = async (id, name, fullName, latitude, longitude)  => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.putProvince(id, name, fullName, latitude, longitude);
        return returnArray;
    }
    borrarProvince = async(id)  => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.borrarProvince(id)
        return returnArray;
    }
    
    

}