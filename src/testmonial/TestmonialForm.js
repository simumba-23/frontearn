import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const TestimonialSubmissionForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        profile_picture: null,
        occupation: '',
        testimonial_text: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profile_picture: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('occupation', formData.occupation);
        data.append('testimonial_text', formData.testimonial_text);
        if (formData.profile_picture) {
            data.append('profile_picture', formData.profile_picture);
        }

        axios.post('/api/testimonials/submit/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setMessage('Testimonial submitted successfully!');
                setFormData({
                    name: '',
                    profile_picture: null,
                    occupation: '',
                    testimonial_text: '',
                });
            })
            .catch(error => {
                setMessage('An error occurred while submitting your testimonial.');
            });
    };

    return (
        <div className="testimonial-submission-form">
            <h3>Submit Your Testimonial</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formOccupation">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formTestimonialText">
                    <Form.Label>Testimonial</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="testimonial_text"
                        value={formData.testimonial_text}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formProfilePicture">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                        type="file"
                        name="profile_picture"
                        onChange={handleFileChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default TestimonialSubmissionForm;
