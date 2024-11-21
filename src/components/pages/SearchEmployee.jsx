import React, { useState } from "react";
import { Container, InputGroup, Form, Card, Button, Row, Col } from "react-bootstrap";
import EmployeeService from "../../service/EmployeeService"; // Service for API calls
import { useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import "../styling/pagination.css";
import { Link } from "react-router-dom";

// Function to fetch employees based on search criteria
const fetchEmployees = async ({ page, pageSize, searchQuery, sortField, sortOrder, level }) => {
  const { data } = await EmployeeService.search({
    PageNumber: page,
    PageSize: pageSize,
    Keyword: searchQuery,
    SortBy: sortField,
    SortOrder: sortOrder,
    Level: level, 
  });
  return data;
};

const EmployeeSearch = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pageSizes = [5, 10, 20];
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [level, setLevel] = useState(0);

  const handleLevelChange = (e) => {
    setLevel(parseInt(e.target.value));
    setPage(1); // Reset to page 1 on filter change
  };
  const queryClient = useQueryClient();

  // Fetch employees using react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees", page, pageSize, searchQuery, sortField, sortOrder, level],
    queryFn: () => fetchEmployees({ page, pageSize, searchQuery, sortField, sortOrder, level }),
    keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching employees.</p>;

  const pageCount = Math.ceil(data.total / pageSize);

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setPage(1);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return "↕️";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <Container>
      <h1 className="mb-4">Employee Search</h1>

      {/* Search Input */}
      <InputGroup className="mb-3">
        <InputGroup.Text>Search</InputGroup.Text>
        <Form.Control
          placeholder="Enter keyword..."
          type="text"
          onChange={handleSearch}
          value={searchQuery}
        />
      </InputGroup>

      <Form.Group controlId="filterLevel" className="mb-3">
        <Form.Label>Filter by Level</Form.Label>
        <Form.Select onChange={handleLevelChange} value={level}>
            <option value={0}>All Levels</option>
            <option value={1}>Level 1</option>
            <option value={2}>Level 2</option>
            <option value={3}>Level 3</option>
            <option value={4}>Level 4</option>
            <option value={5}>Level 5</option>
        </Form.Select>
      </Form.Group>

      {/* Sorting and Page Size */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Button
            variant="link"
            onClick={() => handleSort("name")}
            className="text-decoration-none text-dark"
          >
            Name {getSortIcon("name")}
          </Button>
          <Button
            variant="link"
            onClick={() => handleSort("department")}
            className="text-decoration-none text-dark"
          >
            Department {getSortIcon("department")}
          </Button>
          <Button
            variant="link"
            onClick={() => handleSort("position")}
            className="text-decoration-none text-dark"
          >
            Position {getSortIcon("position")}
          </Button>
          <Button
            variant="link"
            onClick={() => handleSort("employeetype")}
            className="text-decoration-none text-dark"
          >
            Employee Type {getSortIcon("employeetype")}
          </Button>
          <Button
            variant="link"
            onClick={() => handleSort("lastupdateddate")}
            className="text-decoration-none text-dark"
          >
            Last Updated Date {getSortIcon("lastupdateddate")}
          </Button>
        </div>
        <Form.Select onChange={handlePageSizeChange} value={pageSize} style={{ width: "150px" }}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </Form.Select>
      </div>

      {/* Employee Cards */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {data?.data?.map((employee) => (
          <Col key={employee.empNo}>
            <Card>
              <Card.Body>
                <Card.Title>{employee.fname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {employee.position}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Department:</strong> {employee.deptname}
                  <br />
                  <strong>Level:</strong> {employee.level}
                  <br />
                  <strong>Employment Type:</strong> {employee.employeetype}
                  <br />
                  <strong>Last Updated Date:</strong> {new Date(employee.lastupdateddate).toLocaleString()}
                </Card.Text>
                <Link to={`/employees/${employee.empNo}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
      />
    </Container>
  );
};

export default EmployeeSearch;
