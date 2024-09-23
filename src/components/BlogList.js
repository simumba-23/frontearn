import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Pagination, Alert, Spinner, Form } from 'react-bootstrap';
import { BlogCategories } from './BlogCategories';
import DOMPurify from 'dompurify';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null); // Add state for selected category

    const blogsPerPage = 5;
    const API_URL = process.env.REACT_APP_API_URL;
    const BASE_URL = 'http://127.0.0.1:8000';

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/blogs`);
                setBlogs(response.data);
            } catch (error) {
                setError('There was an error fetching the blog data!');
                console.error('There was an error fetching the blog data!', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [API_URL]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCategorySelect = async (categoryId) => {
        setSelectedCategory(categoryId);
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/blog_category/${categoryId}/category`);
            setBlogs(response.data);
        } catch (error) {
            setError('There was an error fetching the blogs for the selected category!');
            console.error('There was an error fetching the blogs for the selected category!', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        // You can add more filters here if needed
    );

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    
    return (
        <Container>
            <BlogCategories onSelectCategory={handleCategorySelect} />
            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" />
                    <p>Loading...</p>
                </div>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <Row className='mt-2'>
                        <Form.Control
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mb-4"
                        />
                        { filteredBlogs.length > 0 ? (
                            <>
                            {currentBlogs.map(blog => (
                                <div className="mb-4" key={blog.id}>
                                    <Card className="shadow-lg">
                                        <Card.Body>
                                            <Row>
                                                <Col md={5}>
                                                    <Card.Img
                                                        variant="top"
                                                        src={`${BASE_URL}${blog.image_url}`}
                                                        alt={blog.title}
                                                        style={{ width: '100%' }}
                                                    />
                                                </Col>
                                                <Col md={7}>
                                                    <Card.Title>{blog.title}</Card.Title>
                                                    <Card.Subtitle className="font-italic">
                                                        {blog.author_name}, {new Date(blog.created_at).toLocaleString()}
                                                    </Card.Subtitle>
                                                    <Card.Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content.substring(0, 100)) }} />
                                                    <Button variant="primary" as={Link} to={`/blogs/${blog.id}`} style={{ background: "#a7d6d9" }}>
                                                        Read More
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                            </>

                        ): <>
                        <Alert> This Blog is currently not available </Alert>
                        </>}
                    
                    </Row>
                    <Pagination className="justify-content-center mt-4">
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </>
            )}
        </Container>
    );
};

export default BlogList;
