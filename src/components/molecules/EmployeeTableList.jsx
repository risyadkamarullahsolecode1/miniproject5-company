import React from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const EmployeeTableList = ({ employee }) => {
    const navigate = useNavigate();

    return (
        <tr>
            <td>{employee.empNo}</td>
            <td>{employee.fname}</td>
            <td>{employee.position}</td>
            <td>{employee.deptname}</td>
            <td>{employee.employeetype}</td>
            <td>{new Date(employee.lastupdateddate).toLocaleString()}</td>
            <td>
                <Button variant="primary" onClick={() => navigate(`/employees/${employee.empNo}`)}>
                    <FontAwesomeIcon icon={faInfoCircle} /> Details
                </Button>{' '}
                <Button variant="warning" onClick={() => navigate(`/employees/edit/${employee.empNo}`)}>
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => alert('Delete not implemented')}>
                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                </Button>
            </td>
        </tr>
    );
};


export default EmployeeTableList;
