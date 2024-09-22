import React, { useState, useEffect } from 'react';
import useApi from '../useApi';
import { Card,Row,Col } from 'react-bootstrap';
import { FaRegShareFromSquare } from "react-icons/fa6";
const ReferralStatus = () => {
  const [referralStatus, setReferralStatus] = useState(0);
  const { getReferralStatus } = useApi();

  useEffect(() => {
    const fetchReferralStatus = async () => {
      try {
        const response = await getReferralStatus();
          setReferralStatus(response.data)  
          const status = response.data.invitees_count      
        if (status >= 15) {
          setReferralStatus('15+');
        } else {
          setReferralStatus(`${status}/15`);
        }
      } catch (error) {
        console.error('err:', error);
      }
    };
    fetchReferralStatus();
  }, [getReferralStatus]);

  return (
    <Row>
      <Col >
      <Card className="card border shadow-sm">
      <Card.Body >
<Card.Title style={{fontSize:16}} ><FaRegShareFromSquare className='me-2' />
Referral Status</Card.Title>
        <Card.Text >{referralStatus}</Card.Text>
      </Card.Body>
    </Card>
      </Col>
    
    </Row>
  
  );
};

export default ReferralStatus;
