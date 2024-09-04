import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import useApi from '../useApi';

const UserHistory = () => {
  const [earnings, setEarnings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const { getUserHistory} = useApi();

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await getUserHistory();
        setEarnings(response.data.earnings);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching user history', error);
      }
    };

    fetchUserHistory();
  }, []);

  return (
    <Container>
      <h2 className="my-3">Your History</h2>
      
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h3">Earning History</Card.Header>
            <ListGroup variant="flush">
              {earnings.map(earning => (
                <ListGroup.Item key={earning.id}>
                  <strong>Task:</strong> {earning.user_task.task}<br />
                  <strong>Points Earned:</strong> {earning.points_earned}<br />
                  <strong>Money Earned:</strong> ${earning.money_earned}<br />
                  <strong>Date:</strong> {new Date(earning.created_at).toLocaleDateString()}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h3">Transaction History</Card.Header>
            <ListGroup variant="flush">
              {transactions.map(transaction => (
                <ListGroup.Item key={transaction.id}>
                  <strong>Type:</strong> {transaction.transaction_type}<br />
                  <strong>Amount:</strong> ${transaction.amount}<br />
                  <strong>Description:</strong> {transaction.description}<br />
                  <strong>Date:</strong> {new Date(transaction.created_at).toLocaleDateString()}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserHistory;
