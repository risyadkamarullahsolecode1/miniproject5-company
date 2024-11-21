import React from 'react';
import { Table } from 'react-bootstrap';

const DependentTable = ({ dependents = [] }) => {
    
    console.log(dependents);

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Date of Birth</th>
                    <th>Relationship</th>
                </tr>
            </thead>
            <tbody>
                {dependents.map((dependent) => (
                    <tr key={dependent.dependentno}>
                        <td>{dependent.name}</td>
                        <td>{dependent.sex}</td>
                        <td>{new Date(dependent.dob).toLocaleDateString()}</td>
                        <td>{dependent.relationship}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DependentTable;
