import React from 'react';
import EmployeeForm from '../organisms/EmployeeForm';
import EmployeeService from '../../service/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddEmployee = () => {
    const navigate = useNavigate();

    const handleSubmit = async (employeeData) => {
        try {
            // Call the service to add the employee
            await EmployeeService.create(employeeData);
            toast.success("Employee added successfully!");
            navigate('/employees'); // Navigate to employees list
        } catch (error) {
            console.error("Error adding employee:", error);
            toast.error(error.response?.data?.message || "Failed to add employee");
        }
    };

    return (
        <div>
            <h2>Create New Employee</h2>
            <EmployeeForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddEmployee;
