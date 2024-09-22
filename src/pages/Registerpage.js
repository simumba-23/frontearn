import React from 'react';
import { Button, Card, Form, FormControl, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import CookieConsent from '../components/CookieConsent';

const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required.'),
    last_name: Yup.string().required('Last name is required.'),
    username: Yup.string().required('Username is required.'),
    email: Yup.string().email('Invalid email address').required('Email is required.'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[\W_]/, 'Password must contain a special character')  // Adding requirement for special character
        .required('Password is required.'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required.'),
    phone_number: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required.'),
    sex: Yup.string().required('Sex is required.'),
});

const Registerpage = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        try {
            const response = await axios.post(`${API_URL}/register`, formData, {
                headers: { "Content-Type": 'multipart/form-data' }
            });
            const { username } = response.data;
            toast.success(`User ${username} registered successfully.`);
            navigate('/Login');
        } catch (error) {
            const errorData = error.response ? error.response.data : { non_field_errors: [error.message] };
            setErrors(errorData);
            toast.error('Registration failed. Please check the form and try again.');
        } finally {
            setSubmitting(false);
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
                                <Formik
                                    initialValues={{
                                        first_name: '',
                                        last_name: '',
                                        username: '',
                                        email: '',
                                        password: '',
                                        confirm_password: '',
                                        phone_number: '',
                                        sex: '',
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting, isValid, errors }) => (
                                        <FormikForm>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group controlId="FirstName">
                                                        <Form.Label>First Name:</Form.Label>
                                                        <Field name="first_name" as={FormControl} placeholder="First Name" isInvalid={!!errors.first_name} />
                                                        <ErrorMessage name="first_name" component="div" className="text-danger" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="LastName">
                                                        <Form.Label>Last Name:</Form.Label>
                                                        <Field name="last_name" as={FormControl} placeholder="Last Name" isInvalid={!!errors.last_name} />
                                                        <ErrorMessage name="last_name" component="div" className="text-danger" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Form.Group controlId="Username">
                                                <Form.Label>Username:</Form.Label>
                                                <Field name="username" as={FormControl} placeholder="Username" isInvalid={!!errors.username} />
                                                <ErrorMessage name="username" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="Email">
                                                <Form.Label>Email Address:</Form.Label>
                                                <Field name="email" type="email" as={FormControl} placeholder="Email" isInvalid={!!errors.email} />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group controlId="Password">
                                                        <Form.Label>Password:</Form.Label>
                                                        <Field name="password" type="password" as={FormControl} placeholder="Password" isInvalid={!!errors.password} />
                                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="ConfirmPassword">
                                                        <Form.Label>Confirm Password:</Form.Label>
                                                        <Field name="confirm_password" type="password" as={FormControl} placeholder="Confirm Password" isInvalid={!!errors.confirm_password} />
                                                        <ErrorMessage name="confirm_password" component="div" className="text-danger" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Form.Group controlId="PhoneNumber">
                                                <Form.Label>Phone Number:</Form.Label>
                                                <Field name="phone_number" as={FormControl} placeholder="Phone Number" isInvalid={!!errors.phone_number} />
                                                <ErrorMessage name="phone_number" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="Sex">
                                                <Form.Label>Sex:</Form.Label>
                                                <Field as="select" name="sex" className="form-control">
                                                    <option value="">Select Sex</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </Field>
                                                <ErrorMessage name="sex" component="div" className="text-danger" />
                                            </Form.Group>

                                            <Button type="submit" className="mt-3 w-100" 
                                            style={{background:'#a8e5f0'}} 
                                            disabled={isSubmitting || !isValid}>
                                                {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Register'}
                                            </Button>
                                        </FormikForm>
                                    )}
                                </Formik>
                            </Card.Body>
                            <CookieConsent />
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </>
    );
}

export default Registerpage;
