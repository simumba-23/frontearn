// TransactionSummary.js
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import useApi from '../useApi';
import ReferralStatus from '../customer_dashboard/ReferalStatus';
import { Link } from 'react-router-dom';

import { FaSackDollar,FaHandHoldingDollar } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { FaRegClock } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { MdOutlineRecentActors } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";

const TransactionSummary = () => {

  const { userTaskStats } = useApi();
  const [stats, setStats] = useState({
    total_points: 0,
    total_tasks: 0,
    completed_tasks: 0,
    wallet_balance: 0,
    task_completion_rate: 0,
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
    <Row className="transaction-summary ">
      <Col md={4} >
        <Card className="mb-4  border shadow-sm">
          <Card.Body>
        <Card.Title style={{fontSize:16}}><FaHandHoldingDollar className='me-2'/>Pending Amount</Card.Title>
            <Card.Text>$ {stats.pending_total}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-4  border shadow-sm">
          <Card.Body>
            <Card.Title style={{fontSize:16}}><TiTick className='me-2' />Completed Tasks</Card.Title>
            <Card.Text>{stats.completed_tasks}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-4  border shadow-sm ">
          <Card.Body>
            <Card.Title style={{fontSize:16}}><FaSackDollar className='me-2' />Equivalent Balance</Card.Title>
            <Card.Text>$ {stats.wallet_balance}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={4}>
        <Card className="mb-4  border shadow-sm ">
          <Card.Body>
            <Card.Title style={{fontSize:16}} ><GiProgression className='me-2' />
            Task Progress</Card.Title>
            <Card.Text>
            {stats.task_completion_rate} %
      </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4} >
      <ReferralStatus />
      </Col>
      <Col md={4} as={Link} to='/userhistory' style={{textDecoration:'none', cursor:'pointer'}}>
        <Card className="mb-4 mt-4  border shadow-sm ">
          <Card.Body>
            
            <Card.Title style={{fontSize:16}} ><FaHistory className='me-2'/>
            User History</Card.Title>
            
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} as={Link} to='/recentactivities' style={{textDecoration:'none', cursor:'pointer'}}>
        <Card className="mb-4  border shadow-sm ">
          <Card.Body>
            
            <Card.Title style={{fontSize:16}} ><MdOutlineRecentActors className='me-2' />

            Recent Activities</Card.Title>
            
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TransactionSummary;
