import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import DependentService from '../../service/DependantService'; // Ensure this service is correctly implemented
import Button from '../atoms/Button';
import { Form } from 'react-bootstrap';

const DependentForm = ({ onDependentAdded }) => {
    const { empNo } = useParams(); // Get employee ID from URL
    const [formData, setFormData] = useState({
        name: '',
        sex: '',
        dob: '',
        relationship: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // Prevent duplicate submissions

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate employee number
        if (!empNo) {
            toast.error('Employee ID is missing. Please check the URL.');
            return;
        }

        setIsSubmitting(true); // Prevent multiple clicks
        try {
            // API call to add dependent
            await DependentService.addDependent(empNo, formData);
            toast.success('Dependent added successfully!');
            onDependentAdded(); // Refresh dependents list after adding
            setFormData({ name: '', sex: '', dob: '', relationship: '' }); // Reset form
        } catch (error) {
            console.error('Error adding dependent:', error);
            toast.error(
                error.response?.data?.message ||
                    'Failed to add dependent. Please try again.'
            );
        } finally {
            setIsSubmitting(false); // Allow form submission again
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sex</Form.Label>
                <Form.Control
                    as="select"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Relationship</Form.Label>
                <Form.Control
                    type="text"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting} // Disable button while submitting
            >
                {isSubmitting ? 'Submitting...' : 'Add Dependent'}
            </Button>
        </Form>
    );
};

export default DependentForm;
