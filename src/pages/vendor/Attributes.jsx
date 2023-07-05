import React, { useState } from 'react';
import './Vendor.css'; // Import custom CSS file for additional styling
import { Button, Table, Form, Pagination } from 'react-bootstrap'; // Import Button, Table, Form, and Pagination components from react-bootstrap
import { Link } from 'react-router-dom';

const Attributes = () => {
  // Sample data for available Attributes
  const [Attributes, setAttributes] = useState([
    { id: 1, name: 'Brand', group: 'Default', type: 'select', required: 'Yes', filterable: 'No'},
    { id: 2, name: 'Material', group: 'Default', type: 'select', required: 'Yes', filterable: 'No'},
    { id: 3, name: 'Colour', group: 'Default', type: 'select', required: 'Yes', filterable: 'No'},
    { id: 4, name: 'Size', group: 'Default', type: 'select', required: 'Yes', filterable: 'No'},
    // Add more Attribute objects as needed
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // State for items per page

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Attributes.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle individual Attribute selection
  const handleAttributeSelect = (AttributeId) => {
    const updatedAttributes = Attributes.map((Attribute) => {
      if (Attribute.id === AttributeId) {
        return { ...Attribute, selected: !Attribute.selected };
      }
      return Attribute;
    });
    setAttributes(updatedAttributes);
  };

  // Function to handle status toggle
  const handleStatusToggle = (AttributeId) => {
    const updatedAttributes = Attributes.map((Attribute) => {
      if (Attribute.id === AttributeId) {
        return { ...Attribute, status: !Attribute.status };
      }
      return Attribute;
    });
    setAttributes(updatedAttributes);
  };

  const handleIncludeInMenuToggle = (AttributeId) => {
    const updatedAttributes = Attributes.map((Attribute) => {
      if (Attribute.id === AttributeId) {
        return { ...Attribute, includeinmenu: !Attribute.includeinmenu };
      }
      return Attribute;
    });
    setAttributes(updatedAttributes);
  };

  // Function to handle select all checkbox
  const handleSelectAll = () => {
    const updatedAttributes = Attributes.map((Attribute) => ({
      ...Attribute,
      selected: !Attribute.selected,
    }));
    setAttributes(updatedAttributes);
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
      <h2>Specification</h2>
      <Link to="/newAttribute"><Button variant="primary" className="add-Attribute-button">New Attribute</Button></Link>
      <Link to="" ><Button variant="primary" className="add-Attribute-button">Delete</Button></Link>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                label=""
                checked={Attributes.every((Attribute) => Attribute.selected)}
                onChange={handleSelectAll}
                className="checkbox-select-all"
              />
            </th>
            <th>Attribute Name</th>
            {/* <th>Attribute Group</th> */}
            {/* <th>Type</th>
            <th>Is Required?</th>
            <th>Is Filterable?</th> */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((Attribute) => (
            <tr key={Attribute.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={Attribute.selected}
                  onChange={() => handleAttributeSelect(Attribute.id)}
                />
              </td>
              <td><Link to={`/editattribute/${Attribute.id}/${encodeURIComponent(Attribute.name)}`}>{Attribute.name}</Link></td>
              {/* <td>{Attribute.group}</td> */}
              {/* <td>{Attribute.type}</td>
              <td>{Attribute.required}</td>
              <td>{Attribute.filterable}</td> */}
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
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= Attributes.length} />
                <Pagination.Last onClick={() => handlePageChange(Math.ceil(Attributes.length / itemsPerPage))} disabled={indexOfLastItem >= Attributes.length} />
              </Pagination>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Attributes;
