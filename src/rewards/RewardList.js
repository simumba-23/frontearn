import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import BaseLayout from '../components/BaseLayout';
import useApi from '../useApi';

const RewardList = () => {
  const [rewards, setRewards] = useState([]);
  const { getRewardsList } = useApi();
  const baseURL = 'http://127.0.0.1:8000'; 


  const fetchRewards = async () => {
    try {
      const response = await getRewardsList();
      setRewards(response.data);
      console.log('rw:',response.data)
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);
  return (
    <BaseLayout title='Rewards' >
        <Container>
      <Row>
        { rewards.length > 0 ? <>
            {rewards.map((reward) => (
          <Col md={4} key={reward.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={`${baseURL}${reward.image}`} 
              style={{
                backgroundColor: reward.image ? 'transparent' : 'green', // Change background color if no image
                display: reward.image ? 'block' : 'none' // Hide image if there's no source
            }}
              />
              <Card.Body>
                <Card.Title>{reward.name}</Card.Title>
                {/* <Card.Text>{reward.description}</Card.Text> */}
                <Card.Text>{reward.points_required}</Card.Text>
                {/* <Button variant="success">Claim Reward</Button> */}
            </Card.Body>
            </Card>
          </Col>
        ))}
        </>:<p>Rewards not yet available</p>}

      </Row>
    </Container>
    </BaseLayout>

  );
};

export default RewardList;
