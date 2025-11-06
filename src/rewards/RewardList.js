import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BaseLayout from '../components/BaseLayout';
import useApi from '../useApi';
import rewardImage from '../Assets/reward.jpg'; // Ensure the correct path to your image
import { GiTwoCoins } from "react-icons/gi";

const RewardList = () => {
  const [rewards, setRewards] = useState([]);
  const [earnedPoints, setEarnedPoints] = useState(0); // Replace with actual earned points
  const { getRewardsList } = useApi();
  const MediaUrl = 'http://127.0.0.1:8000';

  const fetchRewards = async () => {
    try {
      const response = await getRewardsList();
      setRewards(response.data);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

  useEffect(() => {
    fetchRewards();
    // Fetch or set the earned points
    setEarnedPoints(3000); // Replace this with actual API call or props
  }, []);

  return (
    <BaseLayout title="Rewards">
      <Container style={{ background: '#a7c9c5', padding: 8 }}>
        <Row>
          {rewards.length > 0 ? (
            rewards.map((reward) => (
              <Col md={4} xs={6} key={reward.id} className="mb-4">
                <Card style={{ background: '#34ebc6' }}>
                  <Link to={`/rewards/${reward.id}`}>
                    <Card.Img
                      variant="top"
                      src={reward.image ? `${MediaUrl}${reward.image}` : rewardImage} // Use default image if no image
                      style={{
                        backgroundColor: reward.image ? 'transparent' : 'green', // Change background color if no image
                        display: reward.image ? 'block' : 'none', // Hide image if there's no source
                        width: '150px', // Adjust the width as needed
                        height: '150px', // Adjust the height as needed
                        //  objectFit: 'cover' // Ensure the image covers the dimensions without distortion
                      }}
                      onError={(e) => { e.target.style.display = 'none'; }} // Hide image on error
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{reward.name}</Card.Title>
                    <Card.Text>
                      <GiTwoCoins className='me-2' />{reward.points_required}
                    </Card.Text>
                    <ProgressBar
                      now={(earnedPoints / reward.points_required) * 100}
                      label={`${earnedPoints} / ${reward.points_required}`}
                      variant={earnedPoints >= reward.points_required ? 'success' : 'info'}
                    />
                    {/* {earnedPoints >= reward.points_required && (
                      <button className="btn btn-primary mt-2">Claim Reward</button>
                    )} */}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>Rewards not yet available</p>
          )}
        </Row>
      </Container>
    </BaseLayout>
  );
};

export default RewardList;
