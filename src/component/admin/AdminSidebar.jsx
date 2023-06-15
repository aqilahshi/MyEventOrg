import React, { useState } from 'react';
import { FaHome, FaBoxOpen, FaPaperclip, FaHashtag, FaTag, FaBox, FaUsers } from "react-icons/fa";
import "../../pages/admin/Admin.css";


const AdminSidebar = ({ children }) => {
  const menuItems = [
    {
      category: 'QUICK LINKS',
      items: [
        { label: 'Dashboard', link: '/admindashboard', icon: <FaHome /> },
      ]
    },
    {
      category: 'ADMIN',
      items: [
        { label: 'Manage Admin', link: '/manageadmin', icon: <FaBoxOpen /> },
      ]
    },
    {
      category: 'VENDOR',
      items: [
        { label: 'Verify Vendor', link: '/verifyvendor', icon: <FaHashtag /> },
        { label: 'Manage Vendor', link: '/managevendor', icon: <FaPaperclip /> },
      ]
    },
    {
      category: '',
      items: [
        { label: 'Setting', link: '/adminsetting', icon: <FaUsers /> }
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

export default AdminSidebar;
