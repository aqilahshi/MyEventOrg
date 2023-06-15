import React, { useState } from 'react';
import './Vendor.css'; // Import custom CSS file for additional styling
import { Button, Table, Form, Pagination } from 'react-bootstrap'; // Import Button and Table components from react-bootstrap

const Products = () => {
  // Sample data for available products
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 10, sku: 'SKU1', quantity: 5, status: true, selected: false, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 20, sku: 'SKU2', quantity: 10, status: false, selected: false, image: 'product2.jpg' },
    { id: 3, name: 'Product 3', price: 30, sku: 'SKU3', quantity: 3, status: true, selected: false, image: 'product3.jpg' },
    // Add more product objects as needed
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // State for items per page

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);



  // Function to handle individual product selection
  const handleProductSelect = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, selected: !product.selected };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  // Function to handle status toggle
  const handleStatusToggle = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, status: !product.status };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  // Function to handle select all checkbox
  const handleSelectAll = () => {
    const updatedProducts = products.map((product) => ({
      ...product,
      selected: !product.selected,
    }));
    setProducts(updatedProducts);
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
      <h2>Products</h2>
      <Button variant="primary" className="add-product-button">Add Product</Button> {/* Add a button component */}
      <Button variant="primary" className="add-product-button">Delete</Button> {/* Add a button component */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th><Form.Check
                    type="checkbox"
                    label=""
                    checked={products.every((product) => product.selected)}
                    onChange={handleSelectAll}
                    className="checkbox-select-all"
                />
            </th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={product.selected}
                  onChange={() => handleProductSelect(product.id)}
                />
              </td>
              <td>
                <img src={product.image} alt={product.name} className="product-image" />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.sku}</td>
              <td>{product.quantity}</td>
              <td>
                <Button
                  variant={product.status ? 'success' : 'danger'}
                  onClick={() => handleStatusToggle(product.id)}
                  className={`status-toggle-button ${product.status ? 'active' : ''}`}
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
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= products.length} />
                <Pagination.Last onClick={() => handlePageChange(Math.ceil(products.length / itemsPerPage))} disabled={indexOfLastItem >= products.length} />
              </Pagination>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
