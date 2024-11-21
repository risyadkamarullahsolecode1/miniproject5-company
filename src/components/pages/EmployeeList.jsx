import React, { useState, useEffect } from 'react';
import EmployeeService from '../../service/EmployeeService';
import EmployeeTable from '../organisms/EmployeeTable';
import Button from '../atoms/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import '../styling/pagination.css';

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [sortField, setSortField] = useState('Fname');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);

    const pageSizes = [5, 10, 15, 20];

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await EmployeeService.search({
                PageNumber: currentPage,
                PageSize: pageSize,
                SortBy: sortField,
                SortOrder: sortOrder,
            });
    
            console.log("Fetched Employees:", response.data); // Debugging log
    
            // Ensure backend response includes totalItems and pageSize
            const totalItems = response.data.totalItems; // Replace with your actual response field
            const employeesData = response.data.data; // Employee data array
            setEmployees(employeesData);
            setTotalPages(Math.ceil(totalItems / pageSize)); // Correctly calculate total pages
        } catch (err) {
            console.error("Error fetching employees:", err);
            toast.error('Failed to fetch employees.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };    

    const getSortIcon = (field) => {
        if (sortField !== field) return '↕️'; 
        return sortOrder === 'asc' ? '↑' : '↓'; 
    };
    

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1); 
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1); 
    };

    useEffect(() => {
        fetchEmployees();
    }, [currentPage, pageSize, sortField, sortOrder]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Employees</h2>
            <Row className="mb-2">
                <Col>
                    <Button variant="primary" href="/employees/new">Add New Employee</Button>
                </Col>
                <Col>
                    <Link to="/employees/search">
                        <Button variant="primary" className="mb-3">
                            <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
                        </Button>
                    </Link>
                </Col>
            </Row>
            {/* Dropdown for items per page */}
            <div className="d-flex align-items-center justify-content-between">
                <div>
                    Items per Page:{' '}
                    <select onChange={handlePageSizeChange} value={pageSize}>
                        {pageSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Employee Table with Sorting */}
            <EmployeeTable
                employees={employees}
                handleSort={handleSort} // Fix this: Ensure the function is passed correctly
                getSortIcon={getSortIcon}
            />

            {/* Pagination controls */}
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={totalPages || 0} // Ensure this is a valid integer
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
            <ToastContainer />
        </div>
    );
};

export default EmployeesList;
