// add timestamp in db
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col } from 'react-bootstrap';
import { db, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { updateDoc, doc } from "firebase/firestore";


import "./Vendor.css"; // Import custom CSS file for additional styling

const CreatePost = () => {
  const [sessionId, setSessionId] = useState('');
  const [sessionUsername, setSessionUsername] = useState('');
  
  useEffect(() => {
    // Retrieve session ID from sessionStorage
    const sessionId = sessionStorage.getItem('sessionId');
    setSessionId(sessionId);
    const sessionUsername = sessionStorage.getItem('sessionUsername');
    setSessionUsername(sessionUsername);
    
    
    // Do something with the session ID
    console.log('Session ID:', sessionId);
    console.log('Session Username:', sessionUsername);
  }, []);

  const [visibility, setVisibility] = useState("Visible");
  const [productname, setProductName] = useState("");
  const [productdesc, setProductDesc] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productcategory, setproductcategory] = useState("");
  const [productquantity, setProductQuantity] = useState("");
  const [productspecification, setSpecification] = useState("");
  const [productcollection, setCollection] = useState("");

  const [files, setFiles] = useState([]); // Store an array of files
  const [downloadURLs, setDownloadURLs] = useState([]); // Store an array of download URLs
  const [previewImages, setPreviewImages] = useState([]);


  // const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  // const [downloadURL, setDownloadURL] = useState('');
  // const [previewImage, setPreview] = useState();
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
  const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
  const newFiles = selectedFiles.slice(0, 10); // Limit the number of files to 10

  setFiles(newFiles);

  // Create an array of promises to get the preview URLs for the selected files
  const previewURLs = newFiles.map((file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.readAsDataURL(file);
    });
  });

  // Resolve all promises to get the preview URLs
  Promise.all(previewURLs).then((results) => {
    setPreviewImages(results); // Update the state with the preview URLs
  });
};

  
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const docRef = await addDoc(collection(db, "Product"), {
      vendorID: sessionId,
      vendorUsername: sessionUsername,
      productname: productname,
      productdesc: productdesc,
      productprice: productprice,
      productcategory: productcategory,
      productquantity: productquantity,
      visibility: visibility,
      productspecification: productspecification,
      productcollection: productcollection
    });

    const uploadPromises = files.map((file) => {
      return new Promise(async (resolve) => {
        // Create a storage reference
        const storageRef = ref(
          storage,
          `productimg/${sessionId}/${docRef.id}/${file.name}`
        );

        // Upload file to Firebase Storage
        await uploadBytes(storageRef, file);

        // Get the download URL for the file
        const downloadURL = await getDownloadURL(storageRef);

        resolve(downloadURL);
      });
    });

    const downloadedURLs = await Promise.all(uploadPromises);

    await updateDoc(doc(db, "Product", docRef.id), {
      downloadURLs: downloadedURLs
    });

    setDownloadURLs(downloadedURLs);

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  } finally {
    setUploading(false);
  }
};


  

  const onOptionChange2 = (e) => {
    setVisibility(e.target.value);
  };

  return (
    <div className="vendorpage">
      <h3>Create A New Product</h3>
      <div className="form-section">
        <div>
          <h5>Product Details</h5>
          <Form onSubmit={handleSubmit}>
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
              <Form.Group as={Col} controlId="productcategory">
                <Form.Label>Product Category</Form.Label>
                
                <Form.Select
                  onChange={(e) => setproductcategory(e.target.value)}
                  value={productcategory}
                >
                  <option value="">Select category</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Specification">Keychain</option>
                </Form.Select>
              </Form.Group>
            </Row>
            {/* <Row className="mb-3">
              <Form.Group as={Col} controlId="productcollection">
                <Form.Label>Product Collection</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product collection"
                  onChange={(e) => setCollection(e.target.value)}
                  value={productcollection}
                />
              </Form.Group>
            </Row> */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="productspecification">
                <Form.Label>Product Specification</Form.Label>
  

                <Form.Select
                  onChange={(e) => setSpecification(e.target.value)}
                  value={productspecification}
                >
                  <option value="">Select attribute</option>
                  <option value="Brand">Brand</option>
                  <option value="Size">Material</option>
                  <option value="Brand">Colour</option>
                  <option value="Size">Size</option>
                </Form.Select>
              </Form.Group>
            
              <Form.Group as={Col} controlId="productquantity">
                <Form.Label>Specification Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="E.g: small"
                  onChange={(e) => setSpecification(e.target.value)}
                  value={productquantity}
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
              <Form.Group as={Col} controlId="visibility">
                <Form.Label>Visibility</Form.Label>
                <Form.Check
                  type="radio"
                  name="visibility"
                  value="Visible"
                  label="Visible"
                  checked={visibility === 'Visible'}
                  onChange={onOptionChange2}
                />
                <Form.Check
                  type="radio"
                  name="visibility"
                  value="Hidden"
                  label="Hidden"
                  checked={visibility === 'Hidden'}
                  onChange={onOptionChange2}
                />
              </Form.Group>
            </Row>
            <Button type="submit">Create Product</Button>
          </Form>
        </div>
        <div>
  <h5>Upload Images</h5>
  <InputGroup className="mb-3">
    <Form.Control
      type="file"
      accept="image/*"
      multiple // Allow selecting multiple files
      onChange={handleFileChange}
    />
  </InputGroup>
  {previewImages.length > 0 && (
    <div>
      {previewImages.map((previewImage, index) => (
        <img key={index} className="preview" src={previewImage} alt="" />
      ))}
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default CreatePost;