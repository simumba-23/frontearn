import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Container, Table } from 'react-bootstrap'
import BaseLayout from '../components/AdminBaseLayout'
import useApi from '../useApi'
import '../App.css'

export const AdminTransactions = () => {

    const [reportData, setReportData] = useState(null)
    const { fetch_admin_reports } = useApi()

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch_admin_reports();
                setReportData(response.data)
                console.log(response.data)

            } catch (error) {
                console.error('error:', error)

            }

        }
        fetchReports();
    }, [])

    // Conditional rendering to handle loading state
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
        )
    }

    return (
        <div>
            <BaseLayout title={'Transactions Summary'}>
                <Container className='mt-2'>
                    <Row className="mb-4">
                        <Col>
                            <Card className='capital'>
                                <Card.Body>
                                    <Card.Title>Total Users</Card.Title>
                                    <Card.Text>{reportData.total_users}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='used'>
                                <Card.Body>
                                    <Card.Title>Active Users</Card.Title>
                                    <Card.Text>{reportData.active_users_count}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='expenses'>
                                <Card.Body>
                                    <Card.Title>Tasks Created</Card.Title>
                                    <Card.Text>{reportData.tasks_created_count}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Card className='stock'>
                                <Card.Body>
                                    <Card.Title>Surveys Created</Card.Title>
                                    <Card.Text>{reportData.surveys_created_count}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='points'>
                                <Card.Body>
                                    <Card.Title>Points Earned</Card.Title>
                                    <Card.Text>{reportData.total_points_earned}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='virtual_money'>
                                <Card.Body>
                                    <Card.Title>Total Balance</Card.Title>
                                    <Card.Text>${reportData.total_virtual_money_earned}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row> 

                    <Row className="mb-4">
                        <Col>
                            <Card className='completion'>
                                <Card.Body>
                                    <Card.Title>Task Completion Rate</Card.Title>
                                    <Card.Text>{reportData.task_completion_rate}%</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='transaction'> 
                                <Card.Body>
                                    <Card.Title>Total Transactions</Card.Title>
                                    <Card.Text>{reportData.total_transactions_count}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
{/* 
                    <h3>Users with Highest Points Earned</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Total Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.users_highest_points.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{user.total_points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h3>Users with Highest Wallet Balances</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Wallet Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.users_with_highest_wallet_balances.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.user__username}</td>
                                    <td>${user.balance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table> */}
                </Container>
            </BaseLayout>
        </div>
    )
}
