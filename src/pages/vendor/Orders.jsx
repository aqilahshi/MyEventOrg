import React, { useState } from 'react';
import './Vendor.css'; // Import custom CSS file for additional styling
import { Button, Table, Form, Pagination } from 'react-bootstrap'; // Import Button and Table components from react-bootstrap

const Orders = () => {
  // Sample data for available Orders
  const [Orders, setOrders] = useState([
    { id: 1, Date: 'Jun 12, 2023', CustomerEmail: "mwong@mail.com", ShipmentStatus: 'Unfullfilled', PaymentStatus: "Paid", Total: "24242", selected: false, OrderNumber: '#11999' },
    { id: 2, Date: 'Jun 11, 2023', CustomerEmail: "197akshaytitar@gmail.com", ShipmentStatus: 'Delivered', PaymentStatus: "Pending", Total: "6788", selected: false, OrderNumber: '#11998' },
    { id: 3, Date: 'Jun 11, 2023', CustomerEmail: "shashidikkar7787@gmail.com", ShipmentStatus: 'Unfullfilled', PaymentStatus: "Pending", Total: "90.89", selected: false, OrderNumber: '#11997' },
    // Add more order objects as needed
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // State for items per page

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Orders.slice(indexOfFirstItem, indexOfLastItem);



  // Function to handle individual order selection
  const handleOrderselect = (orderId) => {
    const updatedOrders = Orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, selected: !order.selected };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  // Function to handle Total toggle
  const handleTotalToggle = (orderId) => {
    const updatedOrders = Orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, Total: !order.Total };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  // Function to handle select all checkbox
  const handleSelectAll = () => {
    const updatedOrders = Orders.map((order) => ({
      ...order,
      selected: !order.selected,
    }));
    setOrders(updatedOrders);
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
    <div classDate='vendorpage'>
      <h2>Orders</h2>
      <Button variant="primary" classDate="add-order-button">Add order</Button> {/* Add a button component */}
      <Button variant="primary" classDate="add-order-button">Delete</Button> {/* Add a button component */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th><Form.Check
                    type="checkbox"
                    label=""
                    checked={Orders.every((order) => order.selected)}
                    onChange={handleSelectAll}
                    classDate="checkbox-select-all"
                />
            </th>
            <th>Order Number</th>
            <th>Date</th>
            <th>Customer Email</th>
            <th>Shipment Status</th>
            <th>Payment Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
            {currentItems.map((order) => (
            <tr key={order.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={order.selected}
                  onChange={() => handleOrderselect(order.id)}
                />
              </td>
              <td>{order.OrderNumber}</td>
              <td>{order.Date}</td>
              <td>{order.CustomerEmail}</td>
              <td>{order.ShipmentStatus}</td>
              <td>{order.PaymentStatus}</td>
              <td>RM{order.Total}</td>
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
                classDate="items-per-page-input"
              />
              per page
            </td>
          </tr>
          <tr>
            <td colSpan="4">
              <Pagination classDate="pagination">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= Orders.length} />
                <Pagination.Last onClick={() => handlePageChange(Math.ceil(Orders.length / itemsPerPage))} disabled={indexOfLastItem >= Orders.length} />
              </Pagination>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
