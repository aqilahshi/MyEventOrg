import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavbarShop from "../../component/ecommerce/NavbarShop";
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import {Link} from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import Chat from '../../pages/vendor/Chat';
import { useNavigate } from 'react-router-dom';



const Container = styled.div`

`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option`

`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const Vendorshop = styled.button`
padding: 5px;
margin-bottom: 18px;
border: 2px solid teal;
background-color: white;
cursor: pointer;
font-weight: 500;
&:hover{
    background-color: #f8f4f4;
}
`;



const Product = () => {
  const [amount, setAmount] = useState(1);

  const { productID } = useParams();
  const [productname, setname] = useState('');
  const [productdesc, setproductdesc] = useState('');
  const [productcategory, setcategory] = useState('');
  const [productcollection, setcollection] = useState('');
  const [productprice, setprice] = useState('');
  const [productquantity, setquantity] = useState('');
  const [productspecification, setspecification] = useState('');
  const [downloadURLs, setsdownloadURLs] = useState('');
  const [vendorUsername, setsvendorUsername] = useState('');

  useEffect(() => {
    const fetchProductTitle = async () => {
      const productRef = doc(collection(db, 'Product'), productID);
      const productDoc = await getDoc(productRef);
      if (productDoc.exists()) {
        setname(productDoc.data().productname);
        setproductdesc(productDoc.data().productdesc);
        setprice(productDoc.data().productprice);
        setquantity(productDoc.data().productquantity);
        setsdownloadURLs(productDoc.data().downloadURLs);
        setsvendorUsername(productDoc.data().vendorUsername);
      }
    };

    fetchProductTitle();
  }, [productID]);




  const navigate = useNavigate();

  const handleChatClick = () => {
    const sessionID = 'PoMlIn3Ov7qBL89oUF2D';
    const vendorID = 'F7IO8jpjgGa9WZxKQTIH';
    navigate(`/chatpage?sessionID=${sessionID}&vendorID=${vendorID}`);
  };

  const addToCart = async () => {
    try {
      const sessionID = 'PoMlIn3Ov7qBL89oUF2D'; // Replace with your session ID
  
      // Fetch the existing cart document
      const cartRef = doc(collection(db, 'Cart'), sessionID);
      const cartDoc = await getDoc(cartRef);
  
      let cartItems = [];
      if (cartDoc.exists()) {
        // If the cart document already exists, get its existing items
        cartItems = cartDoc.data().cartItems || [];
      }
  
      // Create a new cart item
      const newCartItem = {
        productID: productID,
        productName: productname,
        quantity: amount,
        price: productprice
      };
  
      // Add the new item to the existing items
      cartItems.push(newCartItem);
  
      // Update the cart document with the updated items
      await setDoc(cartRef, { cartItems: cartItems });
      console.log('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  
  
  

  const handleAddToCart = () => {
    const sessionID = 'PoMlIn3Ov7qBL89oUF2D'; // or use the appropriate session ID
    addToCart(sessionID);
  };




  return (
    <Container>
      {/* <Announcement /> */}
      <NavbarShop />
      <Wrapper>
        <ImgContainer>
          <Image src= {downloadURLs} alt={productname} />
        </ImgContainer>
        <InfoContainer>
          {/* Contact seller: <Vendorshop onClick={handleChatClick}>{vendorUsername} <ChatIcon /></Vendorshop>
          {sessionID && vendorID && <Chat sender={sessionID} receiver={vendorID} />} */}
          Contact seller: <Vendorshop onClick={handleChatClick}>
      {vendorUsername} <ChatIcon />
    </Vendorshop>


          <Title>{productname}</Title>
          <Desc>{productdesc}</Desc>
          <Price>RM {productprice}</Price>
          <h6>{productquantity} in stock</h6>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
          <AmountContainer>
            <RemoveIcon onClick={() => {
                if (amount > 0) {
                  setAmount(amount - 1);
                }
              }} />
            <Amount>{amount}</Amount>
            <AddIcon onClick={() => {
              if (amount < productquantity) {
                setAmount(amount + 1);
              }
            }} />
          </AmountContainer>
            <Link to="/cart"><Button onClick={handleAddToCart}>ADD TO CART</Button></Link>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </Container>
  )
}

export default Product
