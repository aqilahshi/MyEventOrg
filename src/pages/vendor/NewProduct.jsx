import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';

import "./Vendor.css"; // Import custom CSS file for additional styling

const CreatePost = () => {
  const [Status, setStatus] = useState("Enabled");
  const [Visibility, setVisibility] = useState("Visible");
  const [MStock, setMStock] = useState("Yes");
  const [SAvailability, setSAvailability] = useState("Yes");

  const [productname, setProductName] = useState("");
  const [productdesc, setProductDesc] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [producttype, setProductType] = useState("");
  const [productquantity, setProductQuantity] = useState("");

  const Submit = async (y) => {
    y.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "product"), {
        productname: productname,
        productdesc: productdesc,
        productprice: productprice,
        producttype: producttype,
        productquantity: productquantity,
        Status: Status,
        Visibility: Visibility,
        MStock: MStock,
        SAvailability: SAvailability,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (y) {
      console.error("Error adding document: ", y);
    }
  };

  const [todos, setTodos] = useState([]);

  const fetchPost = async () => {

    await getDocs(collection(db, "Product"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setTodos(newData);
        console.log(todos, newData);
      })

  }

  useEffect(() => {
    fetchPost();
  }, []);


  const onOptionChange = e => {
    setStatus(e.target.value);
  };

  const onOptionChange2 = f => {
    setVisibility(f.target.value);
  };

  const onOptionChange3 = g => {
    setMStock(g.target.value);
  };

  const onOptionChange4 = h => {
    setSAvailability(h.target.value);
  };

  const [currentFile, setFile] = React.useState();
  const [previewImage, setPreview] = React.useState();
  const [success, setSuccess] = React.useState(false);

  const selectFile = function (e) {
    setFile(e.target.files[0]);

    let reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submit2 = function () {
    let fd = new FormData();

    fd.append("file", currentFile);

    let request = new XMLHttpRequest();

    request.onreadystatechange = function (state) {
      if (
        state.originalTarget.readyState === 4 &&
        state.originalTarget.status === 200
      ) {
        setSuccess(true);
      }
    };

    request.open(
      "POST",
      "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload",
      true
    );
    request.send(fd);
  };

  return (
    <div className="vendorpage">
      <h3>Create A New Product</h3>
      <div className="form-section">
        <div>
          <h5>Product Details</h5>
          <Form onSubmit={Submit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="productname">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productname}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="productdesc">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter product description"
                  onChange={(e) => setProductDesc(e.target.value)}
                  value={productdesc}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="productprice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  onChange={(e) => setProductPrice(e.target.value)}
                  value={productprice}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="producttype">
                <Form.Label>Product Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product type"
                  onChange={(e) => setProductType(e.target.value)}
                  value={producttype}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="productquantity">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product quantity"
                  onChange={(e) => setProductQuantity(e.target.value)}
                  value={productquantity}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Check
                  type="radio"
                  name="status"
                  value="Enabled"
                  label="Enabled"
                  checked={Status === 'Enabled'}
                  onChange={onOptionChange}
                />
                <Form.Check
                  type="radio"
                  name="status"
                  value="Disabled"
                  label="Disabled"
                  checked={Status === 'Disabled'}
                  onChange={onOptionChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="visibility">
                <Form.Label>Visibility</Form.Label>
                <Form.Check
                  type="radio"
                  name="visibility"
                  value="Visible"
                  label="Visible"
                  checked={Visibility === 'Visible'}
                  onChange={onOptionChange2}
                />
                <Form.Check
                  type="radio"
                  name="visibility"
                  value="Hidden"
                  label="Hidden"
                  checked={Visibility === 'Hidden'}
                  onChange={onOptionChange2}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="mstock">
                <Form.Label>Manage Stock</Form.Label>
                <Form.Check
                  type="radio"
                  name="mstock"
                  value="Yes"
                  label="Yes"
                  checked={MStock === 'Yes'}
                  onChange={onOptionChange3}
                />
                <Form.Check
                  type="radio"
                  name="mstock"
                  value="No"
                  label="No"
                  checked={MStock === 'No'}
                  onChange={onOptionChange3}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="savailability">
                <Form.Label>Stock Availability</Form.Label>
                <Form.Check
                  type="radio"
                  name="savailability"
                  value="Yes"
                  label="Yes"
                  checked={SAvailability === 'Yes'}
                  onChange={onOptionChange4}
                />
                <Form.Check
                  type="radio"
                  name="savailability"
                  value="No"
                  label="No"
                  checked={SAvailability === 'No'}
                  onChange={onOptionChange4}
                />
              </Form.Group>
            </Row>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
        <div>
          <h5>Upload Image</h5>
          <InputGroup className="mb-3">
            <Form.Control
              type="file"
              onChange={selectFile}
            />
          </InputGroup>
          <Button onClick={submit2}>Upload</Button>
          {success && <p>Image uploaded successfully!</p>}
          {previewImage && (
            <img src={previewImage} alt="Preview" className="preview-image" />
          )}
        </div>
      </div>
      {/* <h2>Products</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/product/${todo.id}`}>{todo.productname}</Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default CreatePost;
