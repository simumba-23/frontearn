import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const RevenueWidgets = ({ adRevenue, affiliateRevenue, contentRevenue, userTaskRevenue, payoutOverview }) => {
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Ad Revenue</Card.Title>
                            <Card.Text>Impressions: {adRevenue.impressions}</Card.Text>
                            <Card.Text>Clicks: {adRevenue.clicks}</Card.Text>
                            <Card.Text>CPM: ${adRevenue.cpm}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Affiliate Revenue</Card.Title>
                            <Card.Text>Conversions: {affiliateRevenue.conversions}</Card.Text>
                            <Card.Text>Revenue per Conversion: ${affiliateRevenue.revenuePerConversion}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Content Revenue</Card.Title>
                            <Card.Text>Views: {contentRevenue.views}</Card.Text>
                            <Card.Text>Streams: {contentRevenue.streams}</Card.Text>
                            <Card.Text>Total Earnings: ${contentRevenue.totalEarnings}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>User Task Revenue</Card.Title>
                            <Card.Text>Tasks Completed: {userTaskRevenue.completedTasks}</Card.Text>
                            <Card.Text>Total Revenue: ${userTaskRevenue.totalRevenue}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Payout Overview</Card.Title>
                            <Card.Text>Allocated: ${payoutOverview.allocated}</Card.Text>
                            <Card.Text>Pending: ${payoutOverview.pending}</Card.Text>
                            <Card.Text>Available Balance: ${payoutOverview.availableBalance}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RevenueWidgets;
