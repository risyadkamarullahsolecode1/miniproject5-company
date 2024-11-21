import apiClient from "../axiosConfig";

const getAll = async (params) => {
    return await apiClient.get("/Project", { params });
};

const get = async (projno) => {
    return await apiClient.get(`/Project/${projno}`);
};

const create = async (data) => {
    return await apiClient.post("/Project", data);
};

const update = async (projno, data) => {
    return await apiClient.put(`/Project/${projno}`, data);
};

const remove = async (projno) => {
    return await apiClient.delete(`/Project/${projno}`);
};

const getDepartment = async (projno) => {
    return await apiClient.get(`/Project/${projno}/department`); // GET request to fetch associated department
};

const ProjectService = {
    getAll,
    get,
    create,
    update,
    remove,
    getDepartment,
};
    
export default ProjectService;