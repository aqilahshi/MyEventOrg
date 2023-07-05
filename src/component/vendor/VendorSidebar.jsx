import React, { useEffect  } from 'react';
import { FaHome, FaBoxOpen, FaPaperclip, FaHashtag, FaTag, FaBox, FaUsers } from "react-icons/fa";
import "../../pages/vendor/Vendor.css";
// import VendorDashboard from "../../pages/vendor/VendorDashboard";


const VendorSidebar = ({ children }) => {
  useEffect(() => {
    // Retrieve session ID from sessionStorage
    const sessionId = sessionStorage.getItem('sessionId');
    const sessionUsername = sessionStorage.getItem('sessionUsername');

    // Do something with the session ID
    console.log('Session ID:', sessionId);
    console.log('Session Username:', sessionUsername);
  }, []);
  
  const menuItems = [
    {
      category: 'QUICK LINKS',
      items: [
        { label: 'Dashboard', link: '/vendordashboard', icon: <FaHome /> },
        { label: 'New Product', link: '/newproduct', icon: <FaBoxOpen /> }
      ]
    },
    {
      category: 'CATALOG',
      items: [
        { label: 'Products', link: '/listproducts', icon: <FaBoxOpen /> },
        { label: 'Categories', link: '/categories', icon: <FaPaperclip /> },
        // { label: 'Collections', link: '/collections', icon: <FaTag /> },
        { label: 'Specification', link: '/attributes', icon: <FaHashtag /> }
      ]
    },
    // {
    //   category: 'SALE',
    //   items: [
    //     { label: 'Orders', link: '/orders', icon: <FaBox /> }
    //   ]
    // },
    // {
    //   category: 'CUSTOMER',
    //   items: [
    //     { label: 'Customers', link: '/customers', icon: <FaUsers /> }
    //   ]
    // }
    // Add more categories and menu items as needed
  ];

  const activeItem = '/products';

  return (
    <div className="vendor-page">
      <div className="vendorsidebar">
        <ul className="menu">
          {menuItems.map((category, index) => (
            <React.Fragment key={index}>
              <li className="category-title">{category.category}</li>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className={activeItem === item.link ? 'active' : ''}>
                  <a href={item.link}>
                    {item.icon} {/* Icon */}
                    {item.label} {/* Label */}
                  </a>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default VendorSidebar;
