import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/templates/Layout';
import Dashboard from './components/pages/Dashboard';
import EmployeesList from './components/pages/EmployeeList';
import AddEmployee from './components/pages/AddEmployee';
import EditEmployee from './components/pages/EditEmployee';
import EmployeeDetails from './components/pages/EmployeeDetails';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DepartmentList from './components/pages/DepartmentList';
import AddDepartment from './components/pages/AddDepartment';
import ProjectsList from './components/pages/ProjectList';
import EditProject from './components/pages/EditProject';
import ProjectDetails from './components/pages/ProjectDetails';
import AddProject from './components/pages/AddProject';
import WorksOnList from './components/pages/WorksOnList';
import AddWorksOn from './components/pages/AddWorksOn';
import EditWorksOn from './components/pages/EditWorksOn';
import WorksOnDetails from './components/pages/WorksOnDetails';
import DepartmentDetails from './components/pages/DepartmentDetails';
import EditDepartment from './components/pages/EditDepartment';
import LocationList from './components/pages/LocationList';
import LocationDetails from './components/pages/LocationDetails';
import AddLocation from './components/pages/AddLocation';
import EditLocation from './components/pages/EditLocation';
import DeactivateEmployeeForm from './components/organisms/DeactivateEmployeeForm';
import DependentForm from './components/organisms/DependentForm';

export const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/employees/new" element={<AddEmployee />} />
          <Route path="/employees/:empNo" element={<EmployeeDetails />} />
          <Route path="/employees/edit/:empNo" element={<EditEmployee />} />
          <Route path="/employees/deactivate/:empNo" element={<DeactivateEmployeeForm />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/new" element={<AddDepartment />} />
          <Route path="/departments/:deptNo" element={<DepartmentDetails />} />
          <Route path="/departments/edit/:deptNo" element={<EditDepartment />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/new" element={<AddProject />} />
          <Route path="/projects/:projNo" element={<ProjectDetails />} />
          <Route path="/projects/edit/:id" element={<EditProject />} />
          <Route path="/workson" element={<WorksOnList />} />
          <Route path="/workson/new" element={<AddWorksOn />} />
          <Route path="/workson/edit/:empNo/:projNo" element={<EditWorksOn />} />
          <Route path="/workson/:empNo/:projNo" element={<WorksOnDetails />} />
          <Route path="/location" element={<LocationList />} />
          <Route path="/location/:id" element={<LocationDetails />} />
          <Route path="/location/new" element={<AddLocation />} />
          <Route path="/location/edit/:id" element={<EditLocation />} />
          <Route path="/employees/dependent/:empNo" element={<DependentForm />} />
        </Routes>
      </Layout>
    </Router>
    </QueryClientProvider>
  )
}

export default App
