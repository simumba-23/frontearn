import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { FaUsers, FaUserPlus, FaUserCheck, FaTasks, FaPoll, FaCoins, FaDollarSign, FaPercentage, FaExchangeAlt, FaExpand } from 'react-icons/fa';
import BaseLayout from '../components/AdminBaseLayout';
import useApi from '../useApi';
import '../App.css';

export const AdminTransactions = () => {
    const [reportData, setReportData] = useState(null);
    const { fetch_admin_reports } = useApi();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch_admin_reports();
                setReportData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('error:', error);
            }
        };
        fetchReports();
    }, []);

    if (!reportData) {
        return (
            <BaseLayout title={'Transactions Summary'}>
                <Container>
                    <Row>
                        <Col>
                            <p>Loading...</p>
                        </Col>
                    </Row>
                </Container>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout title={'Info summary'}>
            <Container className='mt-2'>
                <Row className="">
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className='capital'>
                            <Card.Body>
                                <Card.Title>
                                    <FaUsers /> Total Users
                                </Card.Title>
                                <Card.Text>{reportData.total_users}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className='capital'>
                            <Card.Body>
                                <Card.Title>
                                    <FaUserPlus /> New Users
                                </Card.Title>
                                <Card.Text>{reportData.new_users}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className='used'>
                            <Card.Body>
                                <Card.Title>
                                    <FaUserCheck /> Active Users
                                </Card.Title>
                                <Card.Text>{reportData.active_users_count}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className='expenses'>
                            <Card.Body>
                                <Card.Title>
                                    <FaTasks /> Tasks Created
                                </Card.Title>
                                <Card.Text>{reportData.tasks_created_count}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className='stock'>
                            <Card.Body>
                                <Card.Title>
                                    <FaPoll /> Surveys Created
                                </Card.Title>
                                <Card.Text>{reportData.surveys_created_count}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className='stock'>
                            <Card.Body>
                                <Card.Title>
                                    <FaCoins /> Total Visits
                                </Card.Title>
                                <Card.Text>{reportData.total_visits}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className='points'>
                            <Card.Body>
                                <Card.Title>
                                    <FaDollarSign /> Points Stock
                                </Card.Title>
                                <Card.Text>{reportData.total_points_earned}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className='virtual_money'>
                            <Card.Body>
                                <Card.Title>
                                    <FaDollarSign /> Total Balance
                                </Card.Title>
                                <Card.Text>${reportData.total_virtual_money_earned}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col> */}
                </Row>
                <Row className="">
                    <Col xs={12} sm={6} md={4} lg={4}>
                        <Card className='completion'>
                            <Card.Body>
                                <Card.Title>
                                    <FaExchangeAlt /> Task Completion Rate
                                </Card.Title>
                                <Card.Text>{reportData.task_completion_rate} %</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4}>
                        <Card className='completion'>
                            <Card.Body>
                                <Card.Title>
                                    <FaExpand /> Task Completion Rate 24hrs
                                </Card.Title>
                                <Card.Text>{reportData.task_completion_rate_per_24hrs} %</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <Card className='transaction'>
                            <Card.Body>
                                <Card.Title>
                                    <FaCoins/> Total Transactions
                                </Card.Title>
                                <Card.Text>{reportData.total_transactions_count}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </BaseLayout>
    );
};
