import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BaseLayout from './AdminBaseLayout';
import useApi from '../useApi';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
    const [blogData, setBlogData] = useState({
        title: '',
        content: '',
        image_url: null,
        categories: [],
        tags: [],
    });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const { createBlog } = useApi();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    // Fetch categories and tags when component mounts
    useEffect(() => {
        const fetchCategoriesAndTags = async () => {
            try {
                const [categoriesResponse, tagsResponse] = await Promise.all([
                    axios.get(`${API_URL}/categories`),
                    axios.get(`${API_URL}/tags`)
                ]);
                setCategories(categoriesResponse.data);
                setTags(tagsResponse.data);
            } catch (error) {
                console.error('Error fetching categories or tags:', error);
            }
        };

        fetchCategoriesAndTags();
    }, [API_URL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({
            ...blogData,
            [name]: value
        });
    };

    const handleContentChange = (value) => {
        setBlogData({
            ...blogData,
            content: value
        });
    };

    const handleMultiSelectChange = (selectedOptions, name) => {
        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setBlogData({
            ...blogData,
            [name]: values
        });
    };

    const handleFileChange = (e) => {
        setBlogData({
            ...blogData,
            image_url: e.target.files[0] // Update this line
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', blogData.title);
        formData.append('content', blogData.content);
        formData.append('image_url', blogData.image_url);
        blogData.categories.forEach(category => formData.append('categories', category));
        blogData.tags.forEach(tag => formData.append('tags', tag));
    

        createBlog(formData).then(response => {
            console.log('data:', response.data);
            navigate('/blogs');
        }).catch(error => {
            console.error('error:', error);
            console.error("response data:", error.response.data);
            console.error("response status:", error.response.status);
        });
    };

    return (
        <BaseLayout title='Create a New Blog'>
            <Container >
                {/* <h1>Create a New Blog</h1> */}
                <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <Form.Group controlId="blogTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={blogData.title}
                            onChange={handleChange}
                            placeholder="Enter the blog title"
                        />
                    </Form.Group>
                    <Form.Group controlId="blogContent" className="mt-3">
                        <Form.Label>Content</Form.Label>
                        <ReactQuill
                            value={blogData.content}
                            onChange={handleContentChange}
                            placeholder="Enter the blog content"
                            modules={{
                                toolbar: [
                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ 'align': [] }],
                                    ['link', 'image'],
                                    ['clean']
                                ],
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="blogCategories" className="mt-3">
                        <Form.Label>Categories</Form.Label>
                        <Select
                            isMulti
                            name="categories"
                            options={categories.map(category => ({
                                value: category.id,
                                label: category.name
                            }))}
                            value={categories.filter(category => blogData.categories.includes(category.id)).map(category => ({
                                value: category.id,
                                label: category.name
                            }))}
                            onChange={(options) => handleMultiSelectChange(options, 'categories')}
                            placeholder="Select categories"
                        />
                    </Form.Group>
                    <Form.Group controlId="blogTags" className="mt-3">
                        <Form.Label>Tags</Form.Label>
                        <Select
                            isMulti
                            name="tags"
                            options={tags.map(tag => ({
                                value: tag.id,
                                label: tag.name
                            }))}
                            value={tags.filter(tag => blogData.tags.includes(tag.id)).map(tag => ({
                                value: tag.id,
                                label: tag.name
                            }))}
                            onChange={(options) => handleMultiSelectChange(options, 'tags')}
                            placeholder="Select tags"
                        />
                    </Form.Group>
                    <Form.Group controlId="blogImage" className="mt-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="image_url"
                            onChange={handleFileChange} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-3">Create Blog</Button>
                </Form>
            </Container>
        </BaseLayout>
    );
};

export default CreateBlog;
