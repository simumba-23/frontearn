// TransactionSummary.js
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import useApi from '../useApi';

const TransactionSummary = () => {
  const { userTaskStats } = useApi();
  const [stats, setStats] = useState({
    total_points: 0,
    total_tasks: 0,
    completed_tasks: 0,
    wallet_balance: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await userTaskStats();
        setStats(response.data);
        console.log("dt:",response.data)
      } catch (error) {
        console.error('Error fetching user task stats', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Row className="transaction-summary">
      <Col md={3}>
        <Card className="mb-4 bg-info text-light">
          <Card.Body>
        <Card.Title>Pending Amount</Card.Title>
            <Card.Text>$ {stats.pending_total}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="mb-4 bg-success text-light">
          <Card.Body>
            <Card.Title>Earned Points</Card.Title>
            <Card.Text>{stats.total_points}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="mb-4 bg-warning text-light">
          <Card.Body>
            <Card.Title>Completed Tasks</Card.Title>
            <Card.Text>{stats.completed_tasks}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="mb-4 bg-secondary text-light">
          <Card.Body>
            <Card.Title>Equivalent Balance</Card.Title>
            <Card.Text>$ {stats.wallet_balance}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TransactionSummary;
