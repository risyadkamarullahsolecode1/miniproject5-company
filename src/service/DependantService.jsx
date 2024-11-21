import apiClient from "../axiosConfig";

const getAll = async (params) => {
    return await apiClient.get("/Dependant", { params });
};

const get = async (id) => {
    return await apiClient.get(`/Dependant/${id}`);
};

const create = async (data) => {
    return await apiClient.post("/Dependant", data);
};

const update = async (id, data) => {
    return await apiClient.put(`/Dependant/${id}`, data);
};

const remove = async (id) => {
    return await apiClient.delete(`/Dependant/${id}`);
};

const getDependentsByEmployee = async (empno) => {
    return await apiClient.get(`/Dependant/dependent/${empno}`)
}

const DependantService = {
    getAll,
    get,
    create,
    update,
    remove,
    getDependentsByEmployee
};
    
export default DependantService;