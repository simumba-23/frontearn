// Leaderboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import BaseLayout from '../components/BaseLayout';
import useApi from '../useApi';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [userData, setUserData] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 10;
    const { getLeaderboard } = useApi()

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await getLeaderboard();
                setLeaderboard(response.data.leaderboard);
                setUserData(response.data.user_data);
            } catch (error) {
                // console.error('Error fetching leaderboard data:', error);
                console.error('err:',error)
            }
        };

        fetchLeaderboard();
    }, []);

    const pagesVisited = pageNumber * itemsPerPage;

    const displayLeaderboard = leaderboard
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((entry, index) => (
            <tr key={index}>
                <td>{entry.rank}</td>
                <td>{entry.user}</td>
                <td>${entry.balance}</td>
            </tr>
        ));

    const pageCount = Math.ceil(leaderboard.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <BaseLayout title='Leaderboard' >
        <Container>
            {userData && (
                <div>
                    <h2>Your Position</h2>
                    <p>Rank: {userData.rank}</p>
                    <p>Balance: ${userData.balance}</p>

                    {userData.rank > 200 && (
                        <div>
                            <h3>You are currently out of the payout list.</h3>
                            <h4>Waitlist Position</h4>
                            <p>Your current waitlist position: {userData.rank - 200}</p>

                            <h4>Future Weeks</h4>
                            <ol>
                                {userData.future_weeks.map((week, index) => (
                                    <li key={index}>Week {week.week}: Position {week.rank}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            )}

           
            <h5>Full Leaderboard</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {displayLeaderboard}
                </tbody>
            </Table>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
        </Container>
        
        </BaseLayout>
       
    );
};

export default Leaderboard;
