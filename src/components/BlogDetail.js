import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, ListGroup, Alert, Spinner } from 'react-bootstrap';
import DOMPurify from 'dompurify';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;
    const BASE_URL = 'http://127.0.0.1:8000';

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            setError(null); // Reset error before new request
            try {
                const response = await axios.get(`${API_URL}/blogs/${id}/`);
                setBlog(response.data);
            } catch (error) {
                setError('There was an error fetching the blog data!');
                console.error('There was an error fetching the blog data!', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, API_URL]);

    if (loading) return (
        <div className="text-center my-5">
            <Spinner animation="border" />
            <p>Loading...</p>
        </div>
    );

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container>
            <Card className="my-4 shadow-lg">
                <Card.Body>
                    <Card.Img
                        variant="top"
                        src={`${BASE_URL}${blog.image_url}`}
                        alt={blog.title}
                        className="img-fluid"
                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                    />
                    <Card.Title className="mt-3">{blog.title}</Card.Title>
                    <Card.Subtitle className='font-italic'>
                        {blog.author_name}, {new Date(blog.created_at).toLocaleString()}
                    </Card.Subtitle>
                    <Card.Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />
                </Card.Body>
            </Card>
            <h3>Comments:</h3>
            {blog.comments && blog.comments.length > 0 ? (
                <ListGroup>
                    {blog.comments.map(comment => (
                        <ListGroup.Item key={comment.id}>
                            {comment.content} - <strong>{comment.author_name}</strong>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p>No comments yet.</p>
            )}
        </Container>
    );
};

export default BlogDetail;
