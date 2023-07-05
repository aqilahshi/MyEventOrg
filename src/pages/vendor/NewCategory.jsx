import React, { useState } from 'react';
import './Vendor.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Button from 'react-bootstrap/Button';

const NewCategory = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState(('Enabled'));
  const [includedinstoremenu, setincludedinstoremenu] = useState('Yes');
  

  const handleImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    // Perform additional actions with the uploaded file
    console.log('Uploaded file:', file);
    setSelectedImage(file);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleStatusChange2 = (event) => {
    setincludedinstoremenu(event.target.value);
  };

  return (
    <div className="vendorpage">
        <h2>Create A New Category</h2>
      <Form >
        <Container>
            <Row>
                <Col>
                <Row className="d-flex justify-content-center">
                    <div className="custom-div">
                        <h6>General</h6>
                        <Form.Group as={Col} controlId="productname">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                        type="text"
                        //   placeholder="Enter product name"
                        //   onChange={(e) => setProductName(e.target.value)}
                        //   value={productname}
                        />
                    </Form.Group>

                    {/* <Form.Group as={Col} controlId="productname">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        type="text"

                        />
                    </Form.Group> */}
                    </div>
                </Row>

                <br/>

                {/* <Row className="d-flex justify-content-center">
                    <div className="custom-div">
                        <h6>Search engine optimize</h6>
                        <Form.Group as={Col} controlId="productname">
                        <Form.Label>Url key</Form.Label>
                        <Form.Control
                        type="text"
                        //   placeholder="Enter product name"
                        //   onChange={(e) => setProductName(e.target.value)}
                        //   value={productname}
                        />
                        </Form.Group>

                        <Form.Group as={Col} controlId="productname">
                        <Form.Label>Meta title</Form.Label>
                        <Form.Control
                        type="text"
                        //   placeholder="Enter description "
                        //   onChange={(e) => setProductName(e.target.value)}
                        //   value={productname}
                        />
                        </Form.Group>

                        <Form.Group as={Col} controlId="productname">
                        <Form.Label>Meta keywords</Form.Label>
                        <Form.Control
                        type="text"
                        //   placeholder="Enter description "
                        //   onChange={(e) => setProductName(e.target.value)}
                        //   value={productname}
                        />
                        </Form.Group>

                        <Form.Group as={Col} controlId="productname">
                        <Form.Label>Meta description</Form.Label>
                        <Form.Control
                        type="text"
                        //   placeholder="Enter description "
                        //   onChange={(e) => setProductName(e.target.value)}
                        //   value={productname}
                        />
                        </Form.Group>
                    </div>
                </Row> */}
                </Col>

                <Col>
                {/* <Row className="d-flex justify-content-center">
                    <div className="custom-div">
                    <h6>Category banner</h6>
                    <Dropzone onDrop={handleImageDrop}>
                        {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            {selectedImage ? (
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Uploaded"
                                className="uploaded-image"
                            />
                            ) : (
                            <p>Drag 'n' drop an image here, or click to select files</p>
                            )}
                        </div>
                        )}
                    </Dropzone>
                    </div>
                </Row>

                <br/>

                <Row className="d-flex justify-content-center">
                    <div className="custom-div">
                    <p>STATUS</p>
                    <Form.Group as={Col}>
                        <Form.Check
                        type="radio"
                        label="Disabled"
                        name="status"
                        value="Disabled"
                        checked={status === 'Disabled'}
                        onChange={handleStatusChange}
                        />
                        <Form.Check
                        type="radio"
                        label="Enabled"
                        name="status"
                        value="Enabled"
                        checked={status === 'Enabled'}
                        onChange={handleStatusChange}
                        />
                     
                    </Form.Group>
                    </div>
                </Row> */}

                <Row className="d-flex justify-content-center">
                    <div className="custom-div">
                    <p>INCLUDED IN STORE MENU</p>
                    <Form.Group as={Col}>
                        <Form.Check
                        type="radio"
                        label="No"
                        name="includedinstoremenu"
                        value="No"
                        checked={includedinstoremenu === 'No'}
                        onChange={handleStatusChange2}
                        />
                        <Form.Check
                        type="radio"
                        label="Yes"
                        name="includedinstoremenu"
                        value="Yes"
                        checked={includedinstoremenu === 'Yes'}
                        onChange={handleStatusChange2}
                        />
                        {/* Add more radio options as needed */}
                    </Form.Group>
                    </div>
                </Row>
                </Col>
          </Row>
        </Container>
      </Form>
      <Button>Cancel</Button>
      <Button>Save</Button>
    </div>
  );
};

export default NewCategory;
