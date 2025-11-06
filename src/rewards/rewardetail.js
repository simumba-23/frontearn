import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import BaseLayout from '../components/BaseLayout';
import useApi from '../useApi';
import rewardImage from '../Assets/reward.jpg'; // Ensure the correct path to your image
import { GiTwoCoins } from "react-icons/gi";

const RewardDetail = () => {
  const { id } = useParams();
  const [reward, setReward] = useState(null);
  const { getRewardDetail } = useApi(); // Add this function in useApi

  const fetchRewardDetail = async () => {
    try {
      const response = await getRewardDetail(id);
      setReward(response.data);
    } catch (error) {
      console.error('Error fetching reward detail:', error);
    }
  };

  useEffect(() => {
    fetchRewardDetail();
  }, [id]);

  return (
    <BaseLayout title="Reward Detail">
      <Container style={{ background: '#a7c9c5', padding: 8 }}>
        {reward ? (
          <Row>
            <Col md={6} xs={12} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={reward.image ? `http://127.0.0.1:8000${reward.image}` : rewardImage}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
                <Card.Body>
                  <Card.Title>{reward.name}</Card.Title>
                  <Card.Text>{reward.description}</Card.Text>
                  <Card.Text>
                    <GiTwoCoins className="me-2" />
                    {reward.points_required}
                  </Card.Text>
                  <Button variant="primary">Claim Reward</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </BaseLayout>
  );
};

export default RewardDetail;
