import React, { useState } from 'react';
import { FaHome, FaBoxOpen, FaPaperclip, FaHashtag, FaTag, FaBox, FaUsers } from "react-icons/fa";
import "../../pages/vendor/Vendor.css";
// import VendorDashboard from "../../pages/vendor/VendorDashboard";


const Sidebar = ({ children }) => {
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
        { label: 'Products', link: '/products', icon: <FaBoxOpen /> },
        { label: 'Categories', link: '/categories', icon: <FaPaperclip /> },
        { label: 'Collections', link: '/collections', icon: <FaTag /> },
        { label: 'Attributes', link: '/attributes', icon: <FaHashtag /> }
      ]
    },
    {
      category: 'SALE',
      items: [
        { label: 'Orders', link: '/orders', icon: <FaBox /> }
      ]
    },
    {
      category: 'CUSTOMER',
      items: [
        { label: 'Customers', link: '/customers', icon: <FaUsers /> }
      ]
    }
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

export default Sidebar;
