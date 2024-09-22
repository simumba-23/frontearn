import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, NavLink } from 'react-bootstrap';

export const BlogCategories = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('error:', error);
            }
        };
        fetchCategories();
    }, [API_URL]);

    return (
        <Container className="py-3">
            <div className="nav-scroller py-1 mb-3 border-bottom">
                <nav className="nav nav-underline justify-content-between">
                    {categories.map(category => (
                        <NavLink
                            key={category.id}
                            className="nav-item nav-link link-body-emphasis"
                            onClick={() => onSelectCategory(category.id)} // Pass category ID to parent component
                            style={{ cursor: 'pointer' }}
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </Container>
    );
};
