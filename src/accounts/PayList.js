import React, { useEffect,useState } from 'react'
import { Table } from 'react-bootstrap';
import BaseLayout from '../components/BaseLayout'
import useApi from '../useApi';


export const PayList = () => {
const [payoutList, setPayoutList] = useState([]);
const { getLeaderboard } = useApi();

useEffect(() =>{
    const fetchpaylist = async() =>{
        try {
            const response = await getLeaderboard();
            setPayoutList(response.data.payout_list);
            console.log(response.data.payout_list)

        } catch (error) {
            console.error('err',error)
        }
    }
    fetchpaylist();

},[])
  return (
    <BaseLayout title='Payout List'>
    <div>
    <h5>Top 200 Payout List (Current Week)</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {payoutList.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.rank}</td>
                            <td>{entry.user}</td>
                            <td>${entry.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            
    </div>
    </BaseLayout>
  )
}
