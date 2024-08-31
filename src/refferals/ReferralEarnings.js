// ReferralEarnings.js

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import useApi from '../useApi';
import BaseLayout from '../components/BaseLayout';
const ReferralEarnings = () => {
    const [referralRewards, setReferralRewards] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const { getReferralEarnings } = useApi();

    useEffect(() => {
        const fetchReferralEarnings = async () => {
            try {
                const response = await getReferralEarnings();
                setReferralRewards(response.data.referral_rewards);
                setTotalEarnings(response.data.total_earnings);
            } catch (error) {
                console.error('Error fetching referral earnings:', error);
            }
        };

        fetchReferralEarnings();
    }, []);

    return (
        <BaseLayout title="Referral Earnings"> 
        <div>
            <p>Total Earnings: ${totalEarnings.toFixed(2)}</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {referralRewards.map((reward) => (
                        <tr key={reward.id}>
                            <td>{new Date(reward.created_at).toLocaleDateString()}</td>
                            <td>${reward.amount}</td>
                            <td>{reward.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        
        </BaseLayout>
        
    );
};

export default ReferralEarnings;
