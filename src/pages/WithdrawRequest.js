import React, { useState } from 'react';
import { Card, Row, Col, Container, FormGroup, FormLabel, FormControl, Button, Form, Alert, Spinner } from 'react-bootstrap';
import BaseLayout from '../components/BaseLayout';
import useApi from '../useApi';

export const WithdrawRequest = () => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { withdrawRequest } = useApi();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        setMessage('');
        
        try {
            const response = await withdrawRequest(amount);
            setMessage(`Withdrawal request successful: $ ${response.data.amount}`);
            setAmount('');
        } catch (error) {
            setMessage('Withdrawal request failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseLayout title='Withdraw Request'>
            <Container className='my-4'>
                <Row className='justify-content-center'>
                    <Col md={6} lg={4}>
                        <Card className='p-4'>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup controlId='withdrawalRequest'>
                                    {message && (
                                        <Alert className='mt-3' variant={message.includes('failed') ? 'danger' : 'success'}>
                                            {message}
                                        </Alert>
                                    )}
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl
                                            placeholder='Enter amount'
                                            value={amount}
                                            type='number'
                                            step='0.01'
                                            min='0'
                                            required
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button 
                                            className='mt-3'
                                            type='submit'
                                            disabled={loading}
                                        >
                                            {loading ? <Spinner animation='border' size='sm' /> : 'Request'}
                                        </Button>
                                    </FormGroup>
                                
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </BaseLayout>
    );
};
