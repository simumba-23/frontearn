import React, { useState } from 'react';
import BaseLayout from '../components/AdminBaseLayout';
import useApi from '../useApi';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryForm = () => {
    const { create_blog_category } = useApi();

    const [data, setData] = useState({
        name: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.name.trim()) {
            setError("Title is required");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        create_blog_category(data)
            .then(response => {
                setMessage('Category added successfully');
                setData({ name: '' });
            })
            .catch(error => {
                setError("Error adding category: " + error.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <BaseLayout title="Add Category">
            <Container>
                <Card className="my-4">
                    <Card.Body>
                        <Form onSubmit={handleSubmit} noValidate>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    required
                                />
                            </Form.Group>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Add Category'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </BaseLayout>
    );
};

export default CategoryForm;
