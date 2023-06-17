import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';

const ManageAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'User'));
        const querySnapshot = await getDocs(q);
        const fetchedUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.log('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (event, user) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((selectedUser) => selectedUser !== user)
      );
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedUsers(users.filter((user) => user.role === 'Admin'));
    } else {
      setSelectedUsers([]);
    }
  };

  return (
    <div className='vendorpage'>
      <h1>Manage Admin</h1>
      <Link to='/addnewadmin'>
        <Button variant='secondary' className='add-admin-button'>
          Add New Admin
        </Button>
      </Link>
      <Button variant='secondary' className='add-admin-button'>
        Remove
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Document ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Password</th>
            <th>Role</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.role === 'Admin')
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type='checkbox'
                    checked={selectedUsers.includes(user)}
                    onChange={(event) => handleCheckboxChange(event, user)}
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>{user.username}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageAdmin;
