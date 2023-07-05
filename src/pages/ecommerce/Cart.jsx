import React from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import Navbar from "../components/Navbar";
// import Announcement from "../components/Announcement";
// import { mobile } from "../responsive";
// import { tablet } from "../responsive";
// import Footer from "../components/Footer";
import {Link} from 'react-router-dom';
import { db } from '../../firebase';
import { collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;


const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const TopTexts = styled.div`
   display: "none"; 
`;

const Cart = () => {

  const [cartItems, setCartItems] = React.useState([]);

  const fetchCartItems = async () => {
    const cartId = "PoMlIn3Ov7qBL89oUF2D"; // Replace with the actual document ID
    const cartRef = doc(db, 'Cart', cartId);
    const cartDoc = await getDoc(cartRef);
    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const items = Object.values(cartData); // Retrieve the cart item objects from the cart data object
      setCartItems(items);
    } else {
      console.log("Cart not found");
    }
  };

  React.useEffect(() => {
    fetchCartItems();
  }, []);
  
  
  
  return (
    <Container>
      {/* <Announcement /> */}
      {/* <Navbar /> */}
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/shop"><TopButton>CONTINUE SHOPPING</TopButton></Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            {/* <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          <TopButton type='filled'>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>



          {cartItems.map((item) => (
  <Product key={item.productID}>
    <ProductDetail>
      {/* <Image src={item.image} />  */}
      <Details>
        <ProductName>
          <b>Product:</b> {item.price} {/* Assuming `name` is the property for the product name */}
        </ProductName>
        <ProductId>
          <b>ID:</b> {item.productID}
        </ProductId>
        <ProductColor color={item.productName} />
        <ProductSize>
          <b>Size:</b> {item.quantity} {/* Assuming `size` is the property for the product size */}
        </ProductSize>
      </Details>
    </ProductDetail>
    <PriceDetail>
      {/* ... */}
    </PriceDetail>
  </Product>
))}




            <Product>
              <ProductDetail>
                <Image src='https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2FfAvhAT8JBImMQzzqkwsG%2Fhk1.jpg?alt=media&token=3784d85e-2486-4fdf-969a-cb43161d8f86,https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2FfAvhAT8JBImMQzzqkwsG%2Fhk2.jpg?alt=media&token=772b44ff-27bb-4b4e-a8e4-935ee9df8d22,https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2FfAvhAT8JBImMQzzqkwsG%2Fhk3.png?alt=media&token=db20c388-f2ee-4aac-92f3-0d9df59aa5bb,https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2FfAvhAT8JBImMQzzqkwsG%2Fhk4.jpg?alt=media&token=79f8255d-6a4e-41f1-a919-20028afba0e7,https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2FfAvhAT8JBImMQzzqkwsG%2Fhk5.webp?alt=media&token=b5f11fe0-c7b0-484e-8830-317ac27aacd9,https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2FfAvhAT8JBImMQzzqkwsG%2Fhk6.jpeg?alt=media&token=77ff3f77-f10b-41a8-b4d0-3fb973d98bc6,https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2FfAvhAT8JBImMQzzqkwsG%2Fhk7.webp?alt=media&token=c3a5c4b3-77e4-4405-a6f9-e84df4e832d4,https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2FfAvhAT8JBImMQzzqkwsG%2Fhk8.jpeg?alt=media&token=759a32ff-7bbb-412d-82d8-400c7df46e19,https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2FfAvhAT8JBImMQzzqkwsG%2Fhk9.jpg?alt=media&token=4cff9012-02dc-4947-8e1b-006b74237983,https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2FfAvhAT8JBImMQzzqkwsG%2Fhk10.jpg?alt=media&token=25dd2c54-c8ad-429e-a66e-e6bccaf8f99f' />
                <Details>
                  <ProductName>
                    <b>Product:</b> Small Hand Towel (1 piece)
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  {/* <ProductColor color='black' /> */}
                  <ProductSize>
                    {/* <b>Size:</b> 37.5 */}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon />
                  <ProductAmount>20</ProductAmount>
                  <RemoveIcon />
                </ProductAmountContainer>
                <ProductPrice>RM 1.50</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            <Product>
              <ProductDetail>
                <Image src='https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2Fp6rlCCiViOG91FYBL6Xq%2Fft1.jpg?alt=media&token=d4e87342-64f1-4082-b6ad-472d709af291,https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2Fp6rlCCiViOG91FYBL6Xq%2Fft2.jpeg?alt=media&token=37db63f4-dd64-4e15-9649-2b5a8ffaf643' />
                <Details>
                  <ProductName>
                    <b>Product:</b> Face Towel 100% Cotton 35*75cm Hotel Grade Towel Water Absorption Soft Cotton Face Towel
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  {/* <ProductColor color='gray' /> */}
                  <ProductSize>
                    {/* <b>Size:</b> M */}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon />
                  <ProductAmount>1</ProductAmount>
                  <RemoveIcon />
                </ProductAmountContainer>
                <ProductPrice>RM 4.50</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>RM 34.50</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping</SummaryItemText>
              <SummaryItemPrice>RM 0.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              {/* <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>RM -5.90</SummaryItemPrice> */}
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>RM 34.50</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      {/* <Footer /> */}
    </Container>
  );
};

export default Cart;
