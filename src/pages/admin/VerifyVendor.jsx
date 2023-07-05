import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';

const VerifyVendor = () => {
  const [vendors, setvendors] = useState([]);
  const [selectedvendors, setSelectedvendors] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchvendors = async () => {
      try {
        const q = query(collection(db, 'Vendorwaitinglist'));
        const querySnapshot = await getDocs(q);
        const fetchedvendors = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setvendors(fetchedvendors);
      } catch (error) {
        console.log('Error fetching vendor application: ', error);
      }
    };

    fetchvendors();
  }, []);

  const handleCheckboxChange = (event, vendor) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedvendors((prevSelectedvendors) => [...prevSelectedvendors, vendor]);
    } else {
      setSelectedvendors((prevSelectedvendors) =>
        prevSelectedvendors.filter((selectedvendor) => selectedvendor !== vendor)
      );
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // setSelectedvendors(vendors.filter((vendor) => vendor.role === 'Admin'));
    } else {
      setSelectedvendors([]);
    }
  };

  return (
    <div className='vendorpage'>
      <h2>Verify Vendor</h2>
      {/* <Link to='/addnewadmin'>
        <Button variant='secondary' className='add-admin-button'>
          Add New Admin
        </Button>
      </Link> */}
      {/* <Button variant='secondary' className='add-admin-button'>
        Remove
      </Button> */}
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
            <th>Business Username</th>
            <th>Business Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Application Date</th>
            <th>Comment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vendors
            // .filter((vendor) => vendor.role === 'Admin')
            .map((vendor) => (
              <tr key={vendor.id}>
                <td>
                  <input
                    type='checkbox'
                    checked={selectedvendors.includes(vendor)}
                    onChange={(event) => handleCheckboxChange(event, vendor)}
                  />
                </td>
                <td><Link to={`/verify/${vendor.id}/${encodeURIComponent(vendor.vendorusername)}`}>{vendor.vendorusername}</Link></td>
                {/* <td>{vendor.vendorusername}</td> */}
                <td>{vendor.businessname}</td>
                <td>{vendor.vendoremail}</td>
                <td>{vendor.vendoraddress}</td>
                <td>{vendor.datecreated && vendor.datecreated.toDate().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })}</td>
                <td>{vendor.comment}</td>
                <td>{vendor.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VerifyVendor;