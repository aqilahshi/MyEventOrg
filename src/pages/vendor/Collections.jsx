import React, { useState } from 'react';
import './Vendor.css'; // Import custom CSS file for additional styling
import { Button, Table, Form, Pagination } from 'react-bootstrap'; // Import Button, Table, Form, and Pagination components from react-bootstrap
import { Link } from 'react-router-dom';

const Collections = () => {
  // Sample data for available collections
  const [collections, setcollections] = useState([
    { id: 1, name: 'collection 1', code: 'collection1'},
    { id: 2, name: 'collection 2', code: 'collection2'},
    { id: 3, name: 'collection 3', code: 'collection3'},
    // Add more collection objects as needed
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // State for items per page

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = collections.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle individual collection selection
  const handlecollectionSelect = (collectionId) => {
    const updatedcollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        return { ...collection, selected: !collection.selected };
      }
      return collection;
    });
    setcollections(updatedcollections);
  };

  // Function to handle status toggle
  const handleStatusToggle = (collectionId) => {
    const updatedcollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        return { ...collection, status: !collection.status };
      }
      return collection;
    });
    setcollections(updatedcollections);
  };

  const handleIncludeInMenuToggle = (collectionId) => {
    const updatedcollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        return { ...collection, includeinmenu: !collection.includeinmenu };
      }
      return collection;
    });
    setcollections(updatedcollections);
  };

  // Function to handle select all checkbox
  const handleSelectAll = () => {
    const updatedcollections = collections.map((collection) => ({
      ...collection,
      selected: !collection.selected,
    }));
    setcollections(updatedcollections);
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
      <h2>Collections</h2>
      <Link to="/newcollection"><Button variant="primary" className="add-collection-button">New collection</Button></Link>
      <Link to="" ><Button variant="primary" className="add-collection-button">Delete</Button></Link>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                label=""
                checked={collections.every((collection) => collection.selected)}
                onChange={handleSelectAll}
                className="checkbox-select-all"
              />
            </th>
            <th>Collection Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((collection) => (
            <tr key={collection.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={collection.selected}
                  onChange={() => handlecollectionSelect(collection.id)}
                />
              </td>
              <td>{collection.name}</td>
              <td>{collection.code}</td>
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
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= collections.length} />
                <Pagination.Last onClick={() => handlePageChange(Math.ceil(collections.length / itemsPerPage))} disabled={indexOfLastItem >= collections.length} />
              </Pagination>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Collections;
