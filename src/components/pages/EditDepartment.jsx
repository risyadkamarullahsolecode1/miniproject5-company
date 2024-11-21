import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DepartmentService from '../../service/DepartmentService';
import DepartmentForm from '../organisms/DepartmentForm';
import { Container, Alert, Spinner } from 'react-bootstrap';

const EditDepartment = () => {
    const { id } = useParams(); // Extract the department number from the URL
    const navigate = useNavigate();
    const [department, setDepartment] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch department details on component mount
        const fetchDepartment = async () => {
            try {
                console.log("Fetching department with ID:", id);
                const response = await DepartmentService.get(id);
                setDepartment(response.data); // Populate department state
            } catch (err) {
                setError("Failed to fetch department data.");
                console.error("Error fetching department:", err);
            } finally {
                setIsLoading(false); // Stop loading state
            }
        };

        if (id) {
            fetchDepartment();
        } else {
            setError("Invalid department ID.");
            setIsLoading(false);
        }
    }, [id]);

    const handleSubmit = async (updatedData) => {
        try {
            console.log("Updating department with data:", updatedData);
            await DepartmentService.update(id, updatedData);
            navigate('/departments'); // Redirect to departments list after successful update
        } catch (err) {
            setError("Failed to update department.");
            console.error("Error updating department:", err);
        }
    };

    if (isLoading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" variant="primary" />
                <p>Loading department data...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Edit Department</h2>
            {department ? (
                <DepartmentForm onSubmit={handleSubmit} initialData={department} />
            ) : (
                <Alert variant="warning">Department data not found.</Alert>
            )}
        </Container>
    );
};

export default EditDepartment;