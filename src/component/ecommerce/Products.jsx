// import React from 'react';
// import styled from 'styled-components';
// import {popularProducts} from './data'
// import Product from './Product';

// const Container = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

// const Products = () => {
//   return (
//     <Container>
//       {popularProducts.map((product) => (
//         <Product product={product} key={product.id}/>
//       ))}
//     </Container>
//   )
// }

// export default Products






import React from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import Product from './Product';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
`;

const Products = () => {
  const [products, setProducts] = React.useState([]);
 
  React.useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'Product');
      const productsQuery = query(productsCollection);
      const productsSnapshot = await getDocs(productsQuery);
      // const productsData = productsSnapshot.docs.map((doc) => doc.data());
      // 
      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // setUsers(fetchedUsers);
      // 
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </Container>
  );
};

export default Products;
