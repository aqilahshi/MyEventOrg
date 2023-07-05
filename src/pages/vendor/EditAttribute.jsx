import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

const EditAttribute = () => {
  const { id, name } = useParams(); // Retrieve the Attribute.id and Attribute.name from URL parameters
 
  const [required, setrequired] = useState(('Required'));
  const [Type, setType] = useState(('Text'));
  const [show, setshow] = useState(('Yes'));
  const [filterable, setfilterable] = useState(('Yes'));


  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handlerequiredChange = (event) => {
    setrequired(event.target.value);
  };

  const handlefilterableChange = (event) => {
    setfilterable(event.target.value);
  };

  const handleshowChange = (event) => {
    setshow(event.target.value);
  };


  return (
    <div className='vendorpage'>
      <h1>Editing {name}</h1>
      {/* <p>ID: {id}</p> */}

      <Form >
        <Container>
            <Row>
                <Col>
                <Row className="d-flex justify-content-center">
                    <div className="custom-div">
                        <h6>General</h6>
                        <Form.Group as={Col} controlId="productname">
                        <Form.Label>Attribute Name</Form.Label>
                        <Form.Control
                        type="text"
                        //   placeholder="Enter product name"
                        //   onChange={(e) => setProductName(e.target.value)}
                        //   value={productname}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="productname">
                        <Form.Label>Attribute Code</Form.Label>
                        <Form.Control
                        type="text"
                        //   placeholder="Enter description "
                        //   onChange={(e) => setProductName(e.target.value)}
                        //   value={productname}
                        />
                    </Form.Group>

                    {/* <Form.Label>Type</Form.Label> */}
                    {/* <Form.Group as={Col}>
                        <Form.Check
                        type="radio"
                        label="Text"
                        name="Type"
                        value="Text"
                        checked={Type === 'Text'}
                        onChange={handleTypeChange}
                        />
                        <Form.Check
                        type="radio"
                        label="Select"
                        name="Type"
                        value="Select"
                        checked={Type === 'Select'}
                        onChange={handleTypeChange}
                        />
                        <Form.Check
                        type="radio"
                        label="Multiselect"
                        name="Type"
                        value="Multiselect"
                        checked={Type === 'Multiselect'}
                        onChange={handleTypeChange}
                        />
                        <Form.Check
                        type="radio"
                        label="Textarea"
                        name="Type"
                        value="Textarea"
                        checked={Type === 'Textarea'}
                        onChange={handleTypeChange}
                        />
                       
                    </Form.Group> */}

                    </div>
                </Row>

                {/* <br/> */}

                {/* <Row className="d-flex justify-content-center">
                    <div className="custom-div">
                        <h6>ATTRIBUTE GROUP</h6>
                        <p>Select groups the attribute belongs to hgxgxgx</p>
                    </div>
                </Row> */}
                </Col>

                {/* <Col> */}
                
                {/* <Row className="d-flex justify-content-center">
                    <div className="custom-div">
                    <h6>Setting</h6>
                    <p>Is Required?</p>
                    <Form.Group as={Col}>
                        <Form.Check
                        type="radio"
                        label="Not required"
                        name="required"
                        value="Not required"
                        checked={required === 'Not required'}
                        onChange={handlerequiredChange}
                        />
                        <Form.Check
                        type="radio"
                        label="Required"
                        name="required"
                        value="Required"
                        checked={required === 'Required'}
                        onChange={handlerequiredChange}
                        />
                       
                    </Form.Group>
                    </div>
                </Row> */}

                {/* <Row className="d-flex justify-content-center">
                    <div className="custom-div">
                    <p>Is Filterable?</p>
                    <Form.Group as={Col}>
                        <Form.Check
                        type="radio"
                        label="No"
                        name="filterable"
                        value="No"
                        checked={filterable === 'No'}
                        onChange={handlefilterableChange}
                        />
                        <Form.Check
                        type="radio"
                        label="Yes"
                        name="filterable"
                        value="Yes"
                        checked={filterable === 'Yes'}
                        onChange={handlefilterableChange}
                        /> */}
                        {/* Add more radio options as needed */}
                    {/* </Form.Group>
                    </div>
                </Row> */}

                {/* <Row className="d-flex justify-content-center">
                    <div className="custom-div">
                    <p>Show to customers?</p>
                    <Form.Group as={Col}>
                        <Form.Check
                        type="radio"
                        label="No"
                        name="show"
                        value="No"
                        checked={show === 'No'}
                        onChange={handleshowChange}
                        />
                        <Form.Check
                        type="radio"
                        label="Yes"
                        name="show"
                        value="Yes"
                        checked={show === 'Yes'}
                        onChange={handleshowChange}
                        /> */}
                        {/* Add more radio options as needed */}
                    {/* </Form.Group>
                    </div>
                </Row> */}
                {/* </Col> */}
          </Row>
        </Container>
      </Form>
      <Button>Cancel</Button>
      <Button>Save</Button>
    </div>
  );
};

export default EditAttribute;
