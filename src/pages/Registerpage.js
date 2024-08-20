import React, { useState } from 'react';
import { Button, Card, Form, FormControl, FormGroup, Container, Row, Col, Spinner, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registerpage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        sex: '',
        phone_number: '',
        role: 'customer',
        admin_code: '', // Only needed if registering as an admin
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validate = () => {
        const errors = {};
        if (formData.password !== formData.confirm_password) {
            errors.password = "Passwords do not match.";
        }
        if (formData.role === 'admin' && formData.admin_code !== 'CARDO_45') {
            errors.admin_code = "Invalid admin code. try as customer";
        }
        if (!formData.role) {
            errors.role = "Role is required.";
        }
        return errors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            try {
                const response = await axios.post('https://earn-app.onrender.com/api/register', formDataToSend, {
                    headers: { "Content-Type": 'multipart/form-data' }
                });
                const { username, role } = response.data;
                toast.success(`User ${username} registered as ${role} successfully.`);
                
                setFormData({
                    first_name: '',
                    last_name: '',
                    username: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                    sex: '',
                    phone_number: '',
                    role: '',
                    admin_code: '' // Reset the admin code
                });
                navigate('/Login');
            } catch (error) {
                const errorData = error.response ? error.response.data : { non_field_errors: [error.message] };
                setErrors(errorData); // Display backend errors
                toast.error('Registration failed. Please check the form and try again.');
                console.error('Error:', error.message);
                console.error('Response data:', errorData);
                console.error('Response status:', error.response ? error.response.status : 'Unknown');
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <>
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <Card className="shadow-sm">
                            <Card.Header className="text-center bg-warning text-white">
                                PayMe.io
                            </Card.Header>
                            <Card.Body className="p-4">
                                <Form onSubmit={handleFormSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FirstName">
                                                <Form.Label>First Name:</Form.Label>
                                                <FormControl 
                                                    name="first_name"
                                                    placeholder="First Name"
                                                    value={formData.first_name}
                                                    onChange={handleChange}
                                                    autoComplete="firstName"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="LastName">
                                                <Form.Label>Last Name:</Form.Label>
                                                <FormControl 
                                                    name="last_name"
                                                    placeholder="Last Name"
                                                    value={formData.last_name}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group controlId="Username">
                                        <Form.Label>Username:</Form.Label>
                                        <FormControl 
                                            name="username"
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Email">
                                        <Form.Label>Email Address:</Form.Label>
                                        <FormControl 
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="Password">
                                                <Form.Label>Password:</Form.Label>
                                                <FormControl 
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    autoComplete="password"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="ConfirmPassword">
                                                <Form.Label>Confirm Password:</Form.Label>
                                                <FormControl 
                                                    type="password"
                                                    name="confirm_password"
                                                    placeholder="Confirm Password"
                                                    value={formData.confirm_password}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group controlId="PhoneNumber">
                                        <Form.Label>Phone Number:</Form.Label>
                                        <FormControl 
                                            name="phone_number"
                                            placeholder="Phone Number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <FormGroup controlId="Sex">
                                        <FormLabel>Sex:</FormLabel>
                                        <Form.Control
                                            as="select"
                                            name="sex"
                                            value={formData.sex}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Sex</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Form.Control>
                                    </FormGroup>
                                    <Form.Group controlId="Role">
                                        <Form.Label>Role:</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                        </Form.Control>
                                        {errors.role && <p className="text-danger">{errors.role}</p>}
                                    </Form.Group>
                                    {formData.role === 'admin' && (
                                        <Form.Group controlId="AdminCode">
                                            <Form.Label>Admin Code:</Form.Label>
                                            <FormControl 
                                                type="text"
                                                name="admin_code"
                                                placeholder="Admin Code"
                                                value={formData.admin_code}
                                                onChange={handleChange}
                                            />
                                            {errors.admin_code && <p className="text-danger">{errors.admin_code}</p>}
                                        </Form.Group>
                                    )}
                                    <Button variant="primary" type="submit" className="mt-3 w-100" disabled={loading}>
                                        {loading ? 'Registering ...' : 'Register'}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </>
    );
}

export default Registerpage;
