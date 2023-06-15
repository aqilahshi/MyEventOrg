import React, { useState } from 'react';
import './Admin.css'; // Import custom CSS file for additional styling
import { Button, Table, Form, Pagination } from 'react-bootstrap'; // Import Button and Table components from react-bootstrap

const ManageAdmin = () => {
    const [admins, setadmins] = useState([
        { id: 1, name: 'admin 1', price: 10, phonenum: 'phonenum1', selected: false, image: 'admin1' },
        { id: 2, name: 'admin 2', price: 20, phonenum: 'phonenum2',  selected: false, image: 'admin2' },
        { id: 3, name: 'admin 3', price: 30, phonenum: 'phonenum3',  selected: false, image: 'admin3' },
        // Add more admin objects as needed
      ]);
    
      // Pagination state
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(20); // State for items per page
    
      // Calculate the index range for the current page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = admins.slice(indexOfFirstItem, indexOfLastItem);
    
    
    
      // Function to handle individual admin selection
      const handleadminSelect = (adminId) => {
        const updatedadmins = admins.map((admin) => {
          if (admin.id === adminId) {
            return { ...admin, selected: !admin.selected };
          }
          return admin;
        });
        setadmins(updatedadmins);
      };

    
      // Function to handle select all checkbox
      const handleSelectAll = () => {
        const updatedadmins = admins.map((admin) => ({
          ...admin,
          selected: !admin.selected,
        }));
        setadmins(updatedadmins);
      };
    
      // Function to handle input change for items per page
      const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = parseInt(event.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to the first page when changing items per page
      };
    
      // Pagination change page
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      
    
    
    
    
      return (
        <div className='vendorpage'>
          {/* <h2>admins</h2> */}
          <Button variant="secondary" className="add-admin-button">Add New Admin</Button> {/* Add a button component */}
          <Button variant="secondary" className="add-admin-button">Remove</Button> {/* Add a button component */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th><Form.Check
                        type="checkbox"
                        label=""
                        checked={admins.every((admin) => admin.selected)}
                        onChange={handleSelectAll}
                        className="checkbox-select-all"
                    />
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={admin.selected}
                      onChange={() => handleadminSelect(admin.id)}
                    />
                  </td>
                  <td>{admin.image}</td>
                  <td>{admin.name}</td>
                  <td>{admin.price}</td>
                  <td>{admin.phonenum}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="5">
                  Show
                  <input
                    type="number"
                    min="1"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        setCurrentPage(1);
                      }
                    }}
                    className="items-per-page-input"
                  />
                  per page
                  <Pagination className="pagination">
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= admins.length} />
                    <Pagination.Last onClick={() => handlePageChange(Math.ceil(admins.length / itemsPerPage))} disabled={indexOfLastItem >= admins.length} />
                  </Pagination>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    };

export default ManageAdmin;