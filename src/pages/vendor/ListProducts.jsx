import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'Product'));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.log('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCheckboxChange = (event, product) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
    } else {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((selectedProduct) => selectedProduct !== product)
      );
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedProducts(products);
    } else {
      setSelectedProducts([]);
    }
  };

  return (
    <div className='vendorpage'>
      <h1>Product</h1>
      <Link to='/newproduct'>
        <Button variant='secondary' className='add-product-button'>
          Add New Product
        </Button> 
      </Link>
      <Button variant='secondary' className='add-product-button'>
        Remove
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            {/* <th>Document ID</th> */}
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Type</th>
            <th>Product Price</th>
            <th>Product Quantity</th>
            <th>Stock</th>
            <th>Availability</th>
            <th>Status</th>
            <th>Visibility</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <input
                  type='checkbox'
                  checked={selectedProducts.includes(product)}
                  onChange={(event) => handleCheckboxChange(event, product)}
                />
              </td>
              {/* <td>{product.id}</td> */}
              <td>{product.productname}</td>
              <td>{product.productdesc}</td>
              <td>{product.producttype}</td>
              <td>{product.productprice}</td>
              <td>{product.productquantity}</td>
              <td>{product.MStock}</td>
              <td>{product.SAvailability}</td>
              <td>{product.Status}</td>
              <td>{product.Visibility}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
