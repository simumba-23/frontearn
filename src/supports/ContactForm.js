import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import BaseLayout from '../components/BaseLayout';
import { ContactPage } from './Contactpage';
import useApi from '../useApi';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    subject: 'Feedback',  // Default subject
    message: '',
  });
  const { createContactDetails } = useApi();

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      createContactDetails(formData).then(response => {
        setSubmitted(true);
        alert(response.data.message);
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
  };

  return (
    <BaseLayout title='Contact us'>
      <div>
        <Container className="mt-5">
          <Card>
            <Card.Header>We're here to help! Reach out to us with any questions, feedback, or support needs.</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    aria-label="Select Subject"
                    required
                  >
                    <option value="Feedback">Feedback</option>
                    <option value="Support">Support</option>
                    <option value="Business">Business</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    name="message"
                    as="textarea"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    required
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <ContactPage />
    </BaseLayout>
  );
};
