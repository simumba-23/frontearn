import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, FormControl, InputGroup, Row, Col, Table } from 'react-bootstrap';
import useApi from '../useApi';
import BaseLayout from '../components/AdminBaseLayout';
import ReactPaginate from 'react-paginate';
import { CiTrash } from "react-icons/ci";
import { FaBan } from "react-icons/fa";
import { CgUnblock } from "react-icons/cg";
import { MdDesktopAccessDisabled } from "react-icons/md";
import { FaTrash } from 'react-icons/fa6';
import { BiEdit } from 'react-icons/bi';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../App.css'

const Users = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { getUserList,bulkActions } = useApi();
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUserList();
        setData(response.data);
        console.log('data:',response.data)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBulkAction = async (action) => {
    try {
      await bulkActions(action, selectedRows);
      const response = await getUserList();
      setData(response.data);
      setSelectedRows([]);
    } catch (error) {
      // setError('Error performing bulk action');
      console.error('Error performing bulk action:', error);
    }
  };

  const handleApprove = (id) => {
    console.log('Approving user with id:', id);
  };

  const filteredData = data.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(globalFilter.toLowerCase())
    )
  );

  const pageCount = Math.ceil(filteredData.length / pageSize);
  const currentPageData = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  return (
    <BaseLayout title="Customer List">
      <div className="container">
        <Row className="mb-3">
          <Col xs={12} md={4}>
            <DropdownButton id="dropdown-basic-button" title="Bulk Actions" className="w-100 mb-2 mb-md-0">
              <Dropdown.Item onClick={() => handleBulkAction('suspend')}><MdDesktopAccessDisabled  className='me-2'/>Suspend</Dropdown.Item>
              <Dropdown.Item onClick={() => handleBulkAction('delete')}><CiTrash className='me-2'/>Delete</Dropdown.Item>
              <Dropdown.Item onClick={() => handleBulkAction('ban')}><FaBan className='me-2'/>Ban</Dropdown.Item>
              <Dropdown.Item onClick={() => handleBulkAction('unban')}><CgUnblock className='me-2'/>Unban</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs={12} md={3} className='mb-2'>

<select
  value={pageSize}
  onChange={(e) => setPageSize(Number(e.target.value))}
  className="form-control"
>
  {[10, 25, 50, 100].map((size) => (
    <>
    <option key={size} value={size}>
    show {size}
    </option>
    </>
  
  ))}
</select>
</Col>
          <Col xs={12} md={4} className="mb-2">
            <InputGroup>
              <FormControl
                placeholder="Search"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </InputGroup>
          </Col>
        
        </Row>

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>SignUp Date</th>
                <th>Refferal Status</th>
                <th>Points</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(user.id)}
                      onChange={() => handleRowSelect(user.id)}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{new Date(user.date_joined).toLocaleString() }</td>
                  <td>{user.referral_status}</td>
                  <td>{user.total_points_earned}</td>
                  <td>{ user.is_active && !user.is_banned ? <> Active</> :<> Inactive</> }</td>
                  <td>
                    <Button onClick={() => handleApprove(user.id)} className='bg-success me-2'>
                    <BiEdit />
                    </Button>
                    <Button onClick={() => handleApprove(user.id)} className='bg-danger'>
                    <FaTrash /> 
                    </Button>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

      <div className="pagination">
      <ReactPaginate
        previousLabel={<FaChevronLeft />}
        nextLabel={<FaChevronRight />}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => setPageIndex(selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
      </div>
    </BaseLayout>
  );
};

export default Users;
