import React from 'react';
import styled from 'styled-components';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { useLocation } from 'react-router-dom';
import spellingData from '../dictionary/spelling.json';
import synonyms from '../dictionary/synonyms.json';
import didYouMean from 'didyoumean';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  cursor: pointer;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ProductName = styled.h5`
  margin-top: 10px;
  margin-bottom: auto;
  color: black;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-wrap: break-word;
`;

const ProductImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Product = ({ product }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');
  const { inputs, list } = spellingData;
  

  const matchingKeywords = [
    keyword,
    ...(synonyms[keyword] || []),
    ...(inputs.filter(input => input === keyword).map(input => didYouMean(input, list))),
  ];

  const isMultiLine = product.productname.length > 17;


if (!keyword || matchingKeywords.some((key) => key && product.productname.toLowerCase().includes(key.toLowerCase()))) {
  return (
    <Link to={`/product/${product.id}/${encodeURIComponent(product.productname)}`}>
      <Container>
        <Circle>
          <ProductImage src={product.downloadURLs} alt={product.productname} fluid roundedCircle />
          <ProductName multiLine={isMultiLine}>{product.productname}</ProductName>
        </Circle>
        <Info>
          <Icon>
            <ShoppingCartOutlinedIcon />
          </Icon>
          <Icon>
            <SearchOutlinedIcon />
          </Icon>
          <Icon>
            <FavoriteBorderOutlinedIcon />
          </Icon>
        </Info>
      </Container>
    </Link>
  );
}

return null;
};

export default Product;
