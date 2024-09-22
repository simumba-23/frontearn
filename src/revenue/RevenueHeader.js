import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker'; // Install react-datepicker for date range selection
import 'react-datepicker/dist/react-datepicker.css';

const RevenueHeader = ({ onDateChange, onExport, onCurrencyChange }) => {
    return (
        <Container fluid>
            <Row className="mb-4">
                <Col md={4}>
                    <Form.Group controlId="dateRange">
                        <Form.Label>Select Date Range</Form.Label>
                        <DatePicker
                            selected={new Date()}
                            onChange={onDateChange}
                            startDate={new Date()}
                            endDate={new Date()}
                            selectsRange
                            inline
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Total Revenue</Card.Title>
                                    <Card.Text>$0.00</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Total Costs</Card.Title>
                                    <Card.Text>$0.00</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Net Profit</Card.Title>
                                    <Card.Text>$0.00</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Pending Payouts</Card.Title>
                                    <Card.Text>$0.00</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    <Button onClick={onExport} variant="primary" className="mb-2">Export Data</Button>
                    <Form.Group controlId="currencySelector">
                        <Form.Label>Select Currency</Form.Label>
                        <Form.Select onChange={onCurrencyChange}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            {/* Add more currencies as needed */}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
};

export default RevenueHeader;
