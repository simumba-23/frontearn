// Admindashboard.js
import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/AdminBaseLayout';
// import { Link, NavLink } from "react-router-dom";
// import '../App.css';
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
    <BaseLayout title='Admin Dashboard' >
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
    </BaseLayout>
  );
};

export default Admindashboard;
