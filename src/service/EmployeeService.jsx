import apiClient from "../axiosConfig";

const getAll = async (params) => {
    return await apiClient.get("/Employee", { params });
};

const get = async (empNo) => {
    return await apiClient.get(`/Employee/${empNo}`);
};

const create = async (data) => {
    return await apiClient.post("/Employee", data);
};

const update = async (empNo, data) => {
    return await apiClient.put(`/Employee/update-employee-timestamp/${empNo}`, data);
};

const remove = async (empNo) => {
    return await apiClient.delete(`/Employee/${empNo}`);
};

const search = async (params) => {
    return await apiClient.get("/Employee/search", { params });
}

const deactivate = async (empno, reason) => {
    return await apiClient.put(`/Employee/deactivate/${empno}`, { reason });
}

const addDependent = async (empno, data) => {
    return await apiClient.post(`/Employee/employees/${empno}/dependents`,  data);
}

const EmployeeService = {
    getAll,
    get,
    create,
    update,
    remove,
    search,
    deactivate,
    addDependent,
};
    
export default EmployeeService;