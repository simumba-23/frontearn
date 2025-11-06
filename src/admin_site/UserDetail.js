import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import useApi from '../useApi';
import BaseLayout from '../components/AdminBaseLayout';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getUserDetails } = useApi() 
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserDetails(id);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return (
          <BaseLayout title={'User Details'} >
          <Container className="text-center mt-5">
                <Spinner animation="border" />
            </Container>
          </BaseLayout>
            
        );
    }

    if (error) {
        return (
          <BaseLayout title={'User Details'}>
          <Container className="mt-5">
                <Alert variant="danger">Error: {error.message}</Alert>
            </Container>
          
          </BaseLayout>
            
        );
    }

    return (
      <BaseLayout title={'User Details'} >
      <Container className="mt-5">
            <Row className="justify-content-center">
                <Col >
                    <Card>
                        <Card.Header as="h1">User Detail</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>ID:</strong> {user.id}
                            </Card.Text>
                            <Card.Text>
                                <strong>Username:</strong> {user.username}
                            </Card.Text>
                            <Card.Text>
                                <strong>First Name:</strong> {user.first_name}
                            </Card.Text>
                            <Card.Text>
                                <strong>Last Name:</strong> {user.last_name}
                            </Card.Text>
                            <Card.Text>
                                <strong>Email:</strong> {user.email}
                            </Card.Text>
                            <Card.Text>
                                <strong>Role:</strong> {user.role}
                            </Card.Text>
                            <Card.Text>
                                <strong>Phone Number:</strong> {user.phone_number}
                            </Card.Text>
                            <Card.Text>
                                <strong>Sex:</strong> {user.sex}
                            </Card.Text>
                            <Card.Text>
                                <strong>2FA Enabled:</strong> {user.is_2fa_enabled ? 'Yes' : 'No'}
                            </Card.Text>
                            <Card.Text>
                                <strong>Date Joined:</strong> {new Date(user.date_joined).toLocaleDateString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
      
      </BaseLayout>
        
    );
};

export default UserDetail;
