import React, { useEffect, useState } from 'react';
import { Table, Alert, Pagination, Form, Row, Col, Button } from 'react-bootstrap';
import useApi from '../useApi';
import BaseLayout from '../components/AdminBaseLayout';

export const WaitListAdmin = () => {
    const [waitlist, setWaitlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
    const { getLeaderboard, approve, reject } = useApi();

    useEffect(() => {
        const fetchWaitList = async () => {
            try {
                const response = await getLeaderboard();
                setWaitlist(response.data.waitlist);
                console.log("data", response.data.waitlist);
            } catch (error) {
                console.error('Err', error);
            }
        };
        fetchWaitList();
    }, [getLeaderboard]);

    const handleApprove = async (id) => {
        try {
            await approve(id);
            setWaitlist(waitlist.map(entry =>
                entry.id === id ? { ...entry, status: 'approved' } : entry
            ));
        } catch (error) {
            console.error('Error approving request', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await reject(id);
            setWaitlist(waitlist.map(entry =>
                entry.id === id ? { ...entry, status: 'rejected' } : entry
            ));
        } catch (error) {
            console.error('Error rejecting request', error);
        }
    };

    // Calculate the indices for the items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = waitlist.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the total number of pages
    const totalPages = Math.ceil(waitlist.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle items per page change
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1); // Reset to first page whenever items per page change
    };

    return (
        <BaseLayout title='Manage 200 Payout WaitList'>
            <div>
                <h5>Waitlist for Future Weeks</h5>
                {currentItems.length > 0 ? (
                    <>
                        <Row className='justify-content-end'>
                            <Col md={3}>
                                <div className=''>
                                    <Form.Group controlId="itemsPerPage" className="mb-3">
                                        <Form.Control as="select" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>User</th>
                                    <th>Balance</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.rank}</td>
                                        <td>{entry.user}</td>
                                        <td>${entry.balance}</td>
                                        <td>
                                            <Button
                                                variant="success"
                                                onClick={() => handleApprove(entry.id)}
                                                disabled={entry.status === 'approved'}
                                                className="me-2"
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleReject(entry.id)}
                                                disabled={entry.status === 'rejected'}
                                            >
                                                Reject
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination>
                            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {[...Array(totalPages)].map((_, i) => (
                                <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                        </Pagination>
                    </>
                ) : (
                    <Alert variant="info">No payout data available.</Alert>
                )}
            </div>
        </BaseLayout>
    );
};
