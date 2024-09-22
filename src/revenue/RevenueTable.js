import React from 'react';
import { Table,Button } from 'react-bootstrap';

const RevenueTable = ({ revenueData }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Revenue Source</th>
                    <th>Amount Earned</th>
                    <th>Associated Costs</th>
                    <th>Net Revenue</th>
                    <th>Payout Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {revenueData.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.date}</td>
                        <td>{entry.revenueSource}</td>
                        <td>${entry.amountEarned}</td>
                        <td>${entry.associatedCosts}</td>
                        <td>${entry.netRevenue}</td>
                        <td>{entry.payoutStatus}</td>
                        <td>
                            <Button variant="info">View</Button>
                            <Button variant="warning">Edit</Button>
                            <Button variant="danger">Remove</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default RevenueTable;
