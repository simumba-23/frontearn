import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, ListGroup } from 'react-bootstrap';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        axios.get(`https://earn-app.onrender.com/api/blogs/${id}/`)
            .then(response => {
                setBlog(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the blog data!', error);
            });
    }, [id]);
    const BASE_URL = 'http://127.0.0.1:8000/';

    if (!blog) return <div>Loading...</div>;

    return (
        <Container>
            <Card className="my-4">
                <Card.Body>
                <Card.Img
                        variant="top"
                                                src={`${BASE_URL}${blog.image_url}`}
                                                alt={blog.title}
                                                style={{ width: '100%', height: '300px' }}
                                            />
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>{blog.content}</Card.Text>
                </Card.Body>
            </Card>
            <h3>Comments:</h3>
            <ListGroup>
                {blog.comments && blog.comments.map(comment => (
                    <ListGroup.Item key={comment.id}>
                        {comment.content} - <strong>{comment.author_name}</strong>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default BlogDetail;