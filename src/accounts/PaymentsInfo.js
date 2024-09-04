// TransactionSummary.js
import React, { useEffect, useState } from "react";
import { Card, Row, Col,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useApi from "../useApi";
import BaseLayout from "../components/BaseLayout";
import Leaderboard from "./Leaderboard";

const PaymentInfo = () => {
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
        console.log("dt:", response.data);
      } catch (error) {
        console.error("Error fetching user task stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <BaseLayout title="Payment Information">
      <Row className="transaction-summary">
        <Col md={3}>
          <Card className="mb-4 bg-info text-light">
            <Card.Body>
              <Card.Title>Approved Amount</Card.Title>
              <Card.Text>$ {stats.approved_total}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
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
              <Card.Title>Amount Deductable</Card.Title>
              <Card.Text>$ 5</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="mb-4 bg-secondary text-light">
            <Card.Body>
              <Card.Title>Wallet Balance</Card.Title>
              <Card.Text>$ {stats.wallet_balance} </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="justify-co"> 
      <Button as={Link} to="/withdraw/form" style={{background:'#bfdbc9', borderRadius:8, marginBottom:5}}> Request Withdraw</Button>
      <Button as={Link} to="/leaderboard" style={{background:'#8fc9a4', borderRadius:8,margin:5}}> View Leaderboard</Button>
      <Button as={Link} to="/payoutlist" style={{background:'#82b3b5', borderRadius:8, margin:5 }}>PayList(Currently)</Button>
      <Button as={Link} to="/waitlist" style={{background:'#6797eb', borderRadius:8,margin:5}}>WaitList(Next)</Button>
      
      </div>
      
      {/* <Leaderboard /> */}

    </BaseLayout>
  );
};

export default PaymentInfo;
