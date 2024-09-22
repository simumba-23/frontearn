import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import BaseLayout from '../components/AdminBaseLayout';
import useApi from '../useApi';

const RewardCreate = ({ fetchRewards }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pointsRequired, setPointsRequired] = useState('');
  const [image, setImage] = useState(null);
  const { createRewards } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('points_required', pointsRequired);
    formData.append('image', image);

    try {
      await createRewards(formData);
      fetchRewards();
      setName('');
      setDescription('');
      setPointsRequired('');
      setImage(null);
    } catch (error) {
      console.error('Error creating reward:', error);
    }
  };

  return (
    <BaseLayout title="Post Rewards">
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group controlId="formName">
                <Form.Label>Reward Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter reward name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter reward description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPointsRequired">
                <Form.Label>Points Required</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter points required"
                  value={pointsRequired}
                  onChange={(e) => setPointsRequired(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </Form.Group>
              <Button variant="primary" className="my-3" type="submit">
                Create Reward
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  );
};

export default RewardCreate;
