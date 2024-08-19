import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Pagination } from 'react-bootstrap';
import { BlogCategories } from './BlogCategories';
import FeaturedBlog from './FeaturedBlog';
// import RecentPosts from './RecentPosts'; // Uncomment if using RecentPosts component

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/blogs?page=${currentPage}&limit=10`);
                setBlogs(response.data.results); // Adjust based on the response structure
                setTotalPages(response.data.total_pages); // Adjust based on the response structure
            } catch (error) {
                console.error('There was an error fetching the blog data!', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const BASE_URL = 'http://127.0.0.1:8000/';
    return (
        <Container>
            <BlogCategories />

            <h4 className="my-2">About Our Blog</h4>
            <p>
                Welcome to our blog! Here you will find a variety of articles on topics that interest us, including technology, lifestyle, and more. Stay tuned for our latest updates and insights.
            </p>
            <FeaturedBlog />
            {/* <RecentPosts /> Uncomment if using RecentPosts component */}
            <h4 className="my-4">Blog List</h4>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Row>
                        {blogs.map(blog => (
                            <Col md={6} lg={4} className="mb-4" key={blog.id}>
                                <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
                                    <Card className='shadow-lg'>
                                        <Card.Img
                                            variant="top"
                                            src={`${BASE_URL}${blog.image_url}`}
                                            alt={blog.title}
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                        />
                                        <Card.Body>
                                            <Card.Title>{blog.title}</Card.Title>
                                            <Card.Text>{blog.content.substring(0, 100)}...</Card.Text>
                                            <Button variant="primary" as={Link} to={`/blogs/${blog.id}`}>
                                                Read More
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        />
                        {[...Array(totalPages).keys()].map(page => (
                            <Pagination.Item
                                key={page + 1}
                                active={page + 1 === currentPage}
                                onClick={() => handlePageChange(page + 1)}
                            >
                                {page + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        />
                    </Pagination>
                </>
            )}
        </Container>
    );
};

export default BlogList;
