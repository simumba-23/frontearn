import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const FeaturedBlogPost = () => {
  return (
    <Container className="p-4 my-4 rounded bg-light text-dark">
      <Row>
        <Col lg={8}>
          <h2 className="display-4 fw-bold">Featured Payme.io Blog Post</h2>
          <p className="lead mt-3">
            Discover the latest and most intriguing posts on our blog. We provide insightful content to keep you engaged and informed.
          </p>
          <Button variant="primary" href="#" className="mt-3">
            Continue Reading
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturedBlogPost;
