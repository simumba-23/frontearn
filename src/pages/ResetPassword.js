import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Card, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ResetPassword = () => {
    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');
    const API_URL = process.env.REACT_APP_API_URL;


    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .required('New Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            const response = await axios.post(`${API_URL}/reset-password`, { token, new_password: values.newPassword });
            setStatus({ success: response.data.message });
        } catch (error) {
            setStatus({ error: error.response.data.error });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className='border'>
                        <Card.Body>
                            <h2 className="text-center fs-6 mb-4">Reset Password</h2>
                            <Formik
                                initialValues={{ newPassword: '', confirmPassword: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    values,
                                    errors,
                                    touched,
                                    isSubmitting,
                                    status,
                                }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        {status && status.success && (
                                            <Alert variant="success">{status.success}</Alert>
                                        )}
                                        {status && status.error && (
                                            <Alert variant="danger">{status.error}</Alert>
                                        )}
                                        <Form.Group id="new-password">
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="newPassword"
                                                value={values.newPassword}
                                                onChange={handleChange}
                                                isInvalid={touched.newPassword && !!errors.newPassword}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.newPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group id="confirm-password">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirmPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Button type="submit" className="w-100 mt-3" disabled={isSubmitting} style={{background:'#a8e5f0'}}>
                                            Reset Password
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPassword;
