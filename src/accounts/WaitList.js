import React,{ useEffect,useState } from 'react'
import BaseLayout from '../components/BaseLayout'
import useApi from '../useApi'
import { Table } from 'react-bootstrap'

export const WaitList = () => {
    const [waitlist, setWaitlist] = useState([]);
    const { getLeaderboard} = useApi()

    useEffect( () =>{
        const fetchWaitList = async() =>{
            try {
                const response = await getLeaderboard();
                setWaitlist(response.data.waitlist);
                console.log("data",waitlist)
    
            } catch (error) {
                console.error('Err',error)
            }
        
        }
        fetchWaitList();
    },[])



  return (
    <BaseLayout title='Waitlist for Coming Weeks'>
    <div>
    <h5>Waitlist for Future Weeks</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {waitlist.map((entry, index) => (
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
