import React, { useState, useEffect } from 'react';
import useApi from '../useApi';
import { Table, InputGroup, FormControl, Spinner, Container, Row, Col } from 'react-bootstrap';
import BaseLayout from '../components/AdminBaseLayout';

const WithdrawalRequests = () => {
  const [requests, setRequests] = useState([]); // Holds the withdrawal requests
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [loading, setLoading] = useState(false); // Loading state
  const { getWithdrawalRequestList } = useApi(); // API hook for fetching data

  // Fetch data whenever the searchQuery changes
  useEffect(() => {
    fetchRequests(searchQuery);
  }, [searchQuery]);

  // Function to fetch requests from the API
  const fetchRequests = async (query) => {
    setLoading(true); // Show spinner while loading
    try {
      const data = await getWithdrawalRequestList(query);
      setRequests(data?.results || []); // Set requests, fallback to an empty array
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setRequests([]); // Ensure requests is always an array on error
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  // Handle search query changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  return (
    <BaseLayout>
      <Container>
        <Row className="my-4">
          <Col>
            <h3>Withdrawal Requests</h3>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <InputGroup>
              <FormControl
                placeholder="Search by username, amount, or status"
                value={searchQuery}
                onChange={handleSearch}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <div className="text-center my-4">
                <Spinner animation="border" />
              </div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {requests?.length > 0 ? (
                    requests.map((request, index) => (
                      <tr key={request.id}>
                        <td>{index + 1}</td>
                        <td>{request.user}</td>
                        <td>${request.amount}</td>
                        <td>{request.status}</td>
                        <td>{new Date(request.created_at).toLocaleString()}</td>
                        <td>{new Date(request.updated_at).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  );
};

export default WithdrawalRequests;
