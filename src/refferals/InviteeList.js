import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import BaseLayout from '../components/BaseLayout';
import useApi from '../useApi';

function InviteesList() {
    const [invitees, setInvitees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { getInvitees} = useApi();

    useEffect(() => {
        const fetchInvitees = async () => {
            try {
                const response = await getInvitees();
                setInvitees(response.data);
                console.log("invitees",response.data)
            } catch (error) {
                setError('Error fetching invitee list.');
                console.error('err',error.response)
                console.error('err:',error.response)
            } finally {
                setLoading(false);
            }
        };

        fetchInvitees();
    }, []);

    return (
        <BaseLayout title='Your Invitees List'>
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col >
                        <Card>
                            {/* <Card.Header>Invitee List</Card.Header> */}
                            {loading ? (
                                <div className="text-center my-4">
                                    <Spinner animation="border" />
                                </div>
                            ) : error ? (
                                <Alert variant="danger" className="my-4">{error}</Alert>
                            ) : (
                                <ListGroup variant="flush">
                                    {invitees.length > 0 ? (
                                        invitees.map((invitee, index) => (
                                            <ListGroup.Item key={index}>
                                                {invitee.username} - {invitee.email} (Joined: {new Date(invitee.date_joined).toLocaleDateString()})
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <ListGroup.Item>No invitees yet.</ListGroup.Item>
                                    )}
                                </ListGroup>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>


        </BaseLayout>
                );
}

export default InviteesList;
