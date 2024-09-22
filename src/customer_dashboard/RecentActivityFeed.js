import React, { useState, useEffect } from 'react';
import { Card, CardText, ListGroup } from 'react-bootstrap';
import BaseLayout from '../components/BaseLayout';
import useApi from '../useApi';

const RecentActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const { getRecentActivities } = useApi();

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const response = await getRecentActivities();
        setActivities(response.data);
        console.log('data:', response.data);
      } catch (error) {
        console.error('err:', error);
      }
    };
    fetchRecentActivities();
  }, []);

  return (
    <BaseLayout title='Your Activity' >
    <Card className='border shadow-lg'>
      <Card.Body>
        <Card.Title>Recent Activities</Card.Title>
        <ListGroup variant="flush">
          {activities && activities.length > 0 ? (
            activities.map((activity, index) => (
              <ListGroup.Item key={index}>
                <CardText><strong>Type:</strong> {activity.transaction_type}</CardText>
                <CardText><strong>Amount:</strong> {activity.amount}</CardText>
                <CardText><strong>Description:</strong> {activity.description}</CardText>
                <CardText><strong>Created At:</strong> {new Date(activity.created_at).toLocaleDateString()}</CardText>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No recent activity available</ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
    
    </BaseLayout>
   
  );
};

export default RecentActivityFeed;
