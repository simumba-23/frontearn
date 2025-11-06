import React, { useEffect, useState } from 'react';
import { Table, Button, Alert, Pagination, Form, Row, Col, Spinner } from 'react-bootstrap';
import useApi from '../useApi';
import BaseLayout from '../components/AdminBaseLayout';

export const PayListAdmin = () => {
    const [payoutList, setPayoutList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState({ success: '', error: '' });
    const { getLeaderboard, approve, reject } = useApi();

    useEffect(() => {
        const fetchPaylist = async () => {
            setLoading(true);
            try {
                const response = await getLeaderboard();
                setPayoutList(response.data.payout_list);
                setMessages({ success: '', error: '' });
            } catch (error) {
                console.error('Error fetching payout list', error);
                setMessages({ success: '', error: 'Error fetching payout list' });
            }
            setLoading(false);
        };
        fetchPaylist();
    }, []);

    const handleApprove = async (user) => {
        console.log("Approve ID:", user); // Add logging
        setLoading(true);
        try {
            await approve(user);
            setPayoutList(payoutList.map(customer => 
                customer.user === user ? { ...customer, status: 'approved' } : customer
            ));
            setMessages({ success: 'Request approved successfully', error: '' });
        } catch (error) {
            console.error('Error approving request', error);
            setMessages({ success: '', error: 'Error approving request' });
        }
        setLoading(false);
    };

    const handleReject = async (id) => {
        console.log("Reject ID:", id); // Add logging
        setLoading(true);
        try {
            await reject(id);
            setPayoutList(payoutList.map(customer => 
                customer.id === id ? { ...customer, status: 'rejected' } : customer
            ));
            setMessages({ success: 'Request rejected successfully', error: '' });
        } catch (error) {
            console.error('Error rejecting request', error);
            setMessages({ success: '', error: 'Error rejecting request' });
        }
        setLoading(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = payoutList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(payoutList.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    return (
        <BaseLayout title='Manage 200 PayList'>
            <div>
                {/* <h5>Top 200 Payout List (Current Week)</h5> */}
                {messages.success && <Alert variant="success">{messages.success}</Alert>}
                {messages.error && <Alert variant="danger">{messages.error}</Alert>}
                {currentItems.length > 0 ? (
                    <>
                        <Row className='justify-content-end'>
                            <Col md={3}>
                                <Form.Group controlId="itemsPerPage" className="mb-3">
                                    <Form.Control as="select" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>User</th>
                                    <th>Balance</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((entry,index) => {
                                    console.log("Entry:", entry.id); // Add logging
                                    console.log("Current Entry Object:", entry); 
                                    return (
                                        <tr key={index}>
                                            <td>{entry.rank}</td>
                                            <td>{entry.user}</td>
                                            <td>${entry.balance}</td>
                                            <td>{entry.status}</td>
                                            <td>
                                                <Button 
                                                    variant="success" 
                                                    onClick={() => handleApprove(entry.user)}
                                                    disabled={loading || entry.status === 'approved'}
                                                >
                                                    Approve
                                                </Button>
                                                {' '}
                                                <Button 
                                                    variant="danger" 
                                                    onClick={() => handleReject(entry.user)}
                                                    disabled={loading || entry.status === 'rejected'}
                                                >
                                                    Reject
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
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
                {loading && <Spinner animation="border" />}
            </div>
        </BaseLayout>
    );
};
