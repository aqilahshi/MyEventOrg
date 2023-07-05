import React, { useEffect  } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
// import Announcement from "../components/Announcement";
// import Footer from "../components/Footer";
import NavbarShop from "../../component/ecommerce/NavbarShop";
// import Newsletter from "../components/Newsletter";
import Products from "../../component/ecommerce/Products";
// import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  `;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  `;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  `;
const Option = styled.option``;





const Container7 = styled.div`
  height: 60px;
`;

const Shop = () => {
  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword');

    console.log('Session keyword:',keyword);
  }, [location]);
  
  return (
    
    <Container>
      {/* <Announcement /> */}
      <NavbarShop />
      {/* <Title>Dresses</Title> */}
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select defaultValue="option1">
            <Option disabled value="">
              Color
            </Option>
            <Option  value="option1">White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select defaultValue="option1">
            <Option disabled value="">
              Size
            </Option>
            <Option  value="option1">XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select defaultValue="option1">
            <Option value="option1">
              Newest
            </Option>
            <Option>Price (asc)</Option>
            <Option>Black (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </Container>
  );
};

export default Shop;
