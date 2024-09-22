import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import BaseLayout from '../components/AdminBaseLayout';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('https://earn-app.onrender.com/api/customers')
            .then(response => {
                setCustomers(response.data);
                console.log('data:',response.data)
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    }, []);

    return (
        <BaseLayout title='Pending withdrawals'>
        <div className="container mt-2">
            {/* <h1 className="text-center mb-4">Customer List</h1> */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.username}</td>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>

                            <td>{customer.email}</td>
                        
                            <td>
                                <Button className='btn btn-primary'>Approve</Button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        
        </BaseLayout>
        
    );
}

export default CustomerList;
