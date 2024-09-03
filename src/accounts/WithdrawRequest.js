import React, { useState } from 'react';
import { Card, Row, Col, Container, FormGroup, FormLabel, FormControl, Button, Form, Alert, Spinner } from 'react-bootstrap';
import BaseLayout from '../components/BaseLayout';
import useApi from '../useApi';
import { IoInformationCircleOutline } from "react-icons/io5";

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
                    <Col  lg={4}>
                        <Card className='p-4 border'>

                            <Card.Body>
                            <Card.Title className='fw-normal fs-6 fst-italic'> 
                                <IoInformationCircleOutline /> The minimum withdrawble amount $ 5 and more   </Card.Title> 
                                <Card.Title className='fw-normal fs-6 fst-italic'> 
                                <IoInformationCircleOutline /> The 2nd  withdraw is unlimited but it require to invite 15 friends  </Card.Title> 
 
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
                                            style={{background: '#2c70c9' }}
                                        >
                                            {loading ? <Spinner animation='border' size='sm' /> : 'Request'}
                                        </Button>
                                    </FormGroup>
                                
                                </Form>
                            </Card.Body>
                        </Card>
                        <div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </BaseLayout>
    );
};
