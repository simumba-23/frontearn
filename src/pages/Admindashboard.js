// Admindashboard.js
import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/AdminBaseLayout';
// import { Link, NavLink } from "react-router-dom";
import '../App.css';
import useApi from '../useApi';
import { Button } from 'react-bootstrap';

const Admindashboard = () => {
  const [customers,setCustomers] = useState([])
  const { getWithdrawalRequestList,approve,reject} = useApi();

  useEffect(() =>{
    getWithdrawalRequestList().then(response =>{
      setCustomers(response.data)
      console.log(response.data)
    })
  },[])

  const handleApprove = async (id) => {
    try {
      await approve(id);
      setCustomers(customers.map(customer => 
        customer.id === id ? { ...customer, status: 'approved' } : customer
      ));
    } catch (error) {
      console.error('Error approving request', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await reject(id);
      setCustomers(customers.map(customer => 
        customer.id === id ? { ...customer, status: 'rejected' } : customer
      ));
    } catch (error) {
      console.error('Error rejecting request', error);
    }
  };

  return (
    <BaseLayout title='PayMe.io | Admin'>
      <div>
        <div data-new-gr-c-s-check-loaded="14.1187.0" data-gr-ext-installed="">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-calendar" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                This week
              </button>
            </div>
          </div>
          {/* <canvas className="my-4 w-100 chartjs-render-monitor" id="myChart" width="284" height="119" style={{display: 'block', width: 284, height: 119}}></canvas> */}
          {/* <h2>Customers</h2> */}
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">User_id</th>
                  <th scope="col">Amount</th>
                  {/* <th scope="col">Created At</th> */}

                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
              {
                  customers.map(customer =>(
                    <tr key={customer.id} >
                    <td>{customer.user}</td>
                    <td>{customer.amount}</td>
                    {/* <td>{customer.created_at}</td> */}
                    {/* <td>{customer.updated_at}</td> */}
                    <td>{customer.status}</td>
                    <td>
                    {/* <Button className='btn btn-success'> Approve</Button> */}

                    {customer.status === 'pending' && (
                                            <>
                                                <Button 
                                                onClick={() => handleApprove(customer.id)} 
                                                className='mx-2'>
                                                    Approve
                                                </Button>
                                                <Button 
                                                onClick={() => handleReject(customer.id)}
                                                className='ml-3 btn-danger'>
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                    </td>
                    
                  </tr>
                    
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Admindashboard;
