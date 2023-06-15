import React, { useState } from 'react';
import './Vendor.css'; // Import custom CSS file for additional styling
import { Button, Table, Form, Pagination } from 'react-bootstrap'; // Import Button, Table, Form, and Pagination components from react-bootstrap
import { Link } from 'react-router-dom';

const Categories = () => {
  // Sample data for available categories
  const [categories, setCategories] = useState([
    { id: 1, name: 'category 1', status: true, selected: false, includeinmenu: false },
    { id: 2, name: 'category 2', status: false, selected: false, includeinmenu: false },
    { id: 3, name: 'category 3', status: true, selected: false, includeinmenu: false },
    // Add more category objects as needed
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // State for items per page

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle individual category selection
  const handleCategorySelect = (categoryId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return { ...category, selected: !category.selected };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  // Function to handle status toggle
  const handleStatusToggle = (categoryId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return { ...category, status: !category.status };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const handleIncludeInMenuToggle = (categoryId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return { ...category, includeinmenu: !category.includeinmenu };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  // Function to handle select all checkbox
  const handleSelectAll = () => {
    const updatedCategories = categories.map((category) => ({
      ...category,
      selected: !category.selected,
    }));
    setCategories(updatedCategories);
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
    <div className="vendorpage">
      <h2>Categories</h2>
      <Link to="/newcategory"><Button variant="primary" className="add-category-button">New Category</Button></Link>
      <Link to="" ><Button variant="primary" className="add-category-button">Delete</Button></Link>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                label=""
                checked={categories.every((category) => category.selected)}
                onChange={handleSelectAll}
                className="checkbox-select-all"
              />
            </th>
            <th>Category Name</th>
            <th>Status</th>
            <th>Include In Menu</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((category) => (
            <tr key={category.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={category.selected}
                  onChange={() => handleCategorySelect(category.id)}
                />
              </td>
              <td>{category.name}</td>
              <td>
                <Button
                  variant={category.status ? 'success' : 'danger'}
                  onClick={() => handleStatusToggle(category.id)}
                  className={`status-toggle-button ${category.status ? 'active' : ''}`}
                >
                  <div className="slider" />
                </Button>
              </td>
              <td>
                <Button
                  variant={category.includeinmenu ? 'success' : 'danger'}
                  onClick={() => handleIncludeInMenuToggle(category.id)}
                  className={`status-toggle-button ${category.includeinmenu ? 'active' : ''}`}
                >
                  <div className="slider" />
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">
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
            </td>
          </tr>
          <tr>
            <td colSpan="4">
              <Pagination className="pagination">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= categories.length} />
                <Pagination.Last onClick={() => handlePageChange(Math.ceil(categories.length / itemsPerPage))} disabled={indexOfLastItem >= categories.length} />
              </Pagination>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Categories;
