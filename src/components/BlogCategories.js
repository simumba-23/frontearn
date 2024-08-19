import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

export const BlogCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('error:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <Container className=" lh-1 py-3">
                {/* <Row className="flex-nowrap justify-content-between align-items-center">
                    <Col className="pt-1">
                        <a className="link-secondary" href="#">Subscribe</a>
                    </Col>
                    <Col className="text-center">
                        <a className="blog-header-logo text-body-emphasis text-decoration-none" href="#">Large</a>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        <a className="link-secondary" href="#" aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="mx-3" role="img" viewBox="0 0 24 24">
                                <title>Search</title>
                                <circle cx="10.5" cy="10.5" r="7.5"></circle>
                                <path d="M21 21l-5.2-5.2"></path>
                            </svg>
                        </a>
                        <Button variant="outline-secondary" size="sm">Sign up</Button>
                    </Col>
                </Row> */}

                <div className="nav-scroller py-1 mb-3 border-bottom">
                    <nav className="nav nav-underline justify-content-between">
                        {categories.map(category => (
                            <a key={category.id} className="nav-item nav-link link-body-emphasis" href="#">
                                {category.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </Container>
        </div>
    );
}
