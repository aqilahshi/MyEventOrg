import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, doc, getDoc, setDoc, updateDoc, getDocs, orderBy, limit } from 'firebase/firestore';


const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  &:link {
    color: black;
  }
  &:visited {
    color: black;
  }
  &:hover {
    color: black;
  }
  &:active {
    color: black;
  }
`;

const CartLink = styled(Link)`
  text-decoration: none;
  &:link {
    color: black;
  }
  &:visited {
    color: black;
  }
  &:hover {
    color: black;
  }
  &:active {
    color: black;
  }
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const SuggestionBox = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: blue;
  border: 1px solid lightgray;
  padding: 10px;
  z-index: 10;
`;

const NavbarShop = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('Search:', searchValue);
      navigate(`/shop?keyword=${searchValue}`);
    }
  };

  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSuggestSearch = async () => {
    const searchRef = collection(db, 'Searches');
    const querySnapshot = await getDocs(query(searchRef, orderBy('count', 'desc'), limit(1)));
  
    if (!querySnapshot.empty) {
      const suggestedKeyword = querySnapshot.docs[0].id;
      setSearchValue(suggestedKeyword);
      setShowSuggestions(true);
    }
  };

  const handleSearch = async () => {
    if (searchValue.trim() !== '') {
      const searchRef = doc(db, 'Searches', searchValue);
      const searchDoc = await getDoc(searchRef);
  
      if (!searchDoc.exists()) {
        await setDoc(searchRef, { count: 1 });
      } else {
        const count = searchDoc.data().count + 1;
        await updateDoc(searchRef, { count });
      }
  
      setShowSuggestions(false);
      navigate(`/shop?keyword=${searchValue}`);
    }
  };
  
  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input
              placeholder='Search'
              value={searchValue}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
              onClick={() => {
                // handleSearch();
                handleSuggestSearch();
              }}
              // showSuggestions={showSuggestions}
            />
            <SearchIcon
              style={{ color: "gray", fontSize: "16px" }}
              onClick={handleSearch}
            />
          </SearchContainer>
        </Left>
        
        <Center>
          <Logo>
            <NavLink to='/'>MyEventOrg Shop.</NavLink>
          </Logo>
        </Center>
        <Right>
          {/* <MenuItem>
            <CartLink to="/cart">
              <AccountCircleIcon />
            </CartLink>
          </MenuItem> */}

          <MenuItem>
            <CartLink to="/cart">
              <Badge badgeContent={2} color='primary'>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </CartLink>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavbarShop;
