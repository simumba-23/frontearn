import React from 'react';
import { Table, Button, Form,Container,Row,Col } from 'react-bootstrap';

const PayoutManagement = ({ pendingPayouts, onThresholdChange, onSchedulePayouts, onApprovePayouts, payoutHistory }) => {
    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h5>Pending Payouts</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingPayouts.map((payout, index) => (
                                <tr key={index}>
                                    <td>{payout.user}</td>
                                    <td>${payout.amount}</td>
                                    <td>{payout.status}</td>
                                    <td>
                                        <Button variant="success" onClick={() => onApprovePayouts(payout.id)}>Approve</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <Form>
                        <Form.Group controlId="threshold">
                            <Form.Label>Payout Threshold</Form.Label>
                            <Form.Control type="number" placeholder="Minimum points/earnings for payout" onChange={onThresholdChange} />
                        </Form.Group>
                        <Button variant="primary" onClick={onSchedulePayouts}>Schedule Payouts</Button>
                    </Form>
                    <h5>Payout History</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>User</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payoutHistory.map((history, index) => (
                                <tr key={index}>
                                    <td>{history.date}</td>
                                    <td>{history.user}</td>
                                    <td>${history.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default PayoutManagement;
