// src/components/CommentForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const CommentForm = ({ blogId, onCommentAdded }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/comments/', {
            blog: blogId,
            content: content
        })
        .then(response => {
            onCommentAdded(response.data);
            setContent('');
        })
        .catch(error => {
            console.error('There was an error posting the comment!', error);
        });
    };

    return (
        <Container className="my-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="commentContent">
                    <Form.Label>Write a comment</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="Enter your comment"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">Submit</Button>
            </Form>
        </Container>
    );
};

export default CommentForm;
