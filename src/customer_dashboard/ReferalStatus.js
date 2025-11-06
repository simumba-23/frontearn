import React, { useState, useEffect } from 'react';
import useApi from '../useApi';
import { Card, Row, Col } from 'react-bootstrap';
import { FaRegShareFromSquare } from "react-icons/fa6";

const ReferralStatus = () => {
  const [referralStatus, setReferralStatus] = useState({
    invitees_count: 0,
    status: '0',
  });

  const { getReferralStatus } = useApi();

  useEffect(() => {
    const fetchReferralStatus = async () => {
      try {
        const response = await getReferralStatus();
        const data = response.data;
        const inviteesCount = data.invitees_count || 0;
        let status = data.status;

        // Ensure status is a valid number and handle undefined or non-numeric values
        if (isNaN(parseInt(status, 10))) {
          status = '0';
        } else if (parseInt(status, 10) >= 15) {
          status = '15+';
        } else {
          status = `${status}/15`;
        }

        setReferralStatus({ invitees_count: inviteesCount, status: status });
      } catch (error) {
        console.error('Error fetching referral status:', error);
      }
    };

    fetchReferralStatus();
  }, [getReferralStatus]);

  return (
    <Row>
      <Col>
        <Card className="card border shadow-sm">
          <Card.Body>
            <Card.Title style={{ fontSize: 16 }}>
              <FaRegShareFromSquare className='me-2' />
              Referral Status
            </Card.Title>
            <Card.Text>{referralStatus.status}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ReferralStatus;
