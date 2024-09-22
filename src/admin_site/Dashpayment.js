import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbCreditCardPay } from "react-icons/tb";
import { FaBusinessTime } from "react-icons/fa";
import BaseLayout from '../components/AdminBaseLayout';
import { Link } from 'react-router-dom';
import useApi from '../useApi';
import '../App.css';

export const Dashpayment = () => {
    const [reportData, setReportData] = useState({
        payout_list_count : 0,
        wait_list_count : 0,
    });
    const { getLeaderboard } = useApi();

    useEffect(() =>{
        const fetcdashpayment = async() =>{
            try {
                const response = await getLeaderboard();
                setReportData(response.data);
                console.log(response.data.payout_list)
    
            } catch (error) {
                console.error('err',error)
            }
        }
    fetcdashpayment();    
    },[])

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
        <BaseLayout title={'Payment Info'}>
            <Container className='mt-2'>
                <Row className="mb-4">
                    <Col xs={12} sm={6} md={4} lg={3} as={Link} to='/payout_list' style={{textDecoration:'none'}}>
                        <Card className='capital'>
                            <Card.Body>
                                <Card.Title>
                                <TbCreditCardPay /> PayList
                                </Card.Title>
                                <Card.Text>{reportData.payout_list_count}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} as= {Link} to='/payout_waitlist' style={{textDecoration:'none'}}>
                        <Card className='capital'>
                            <Card.Body>
                                <Card.Title>
                                <FaBusinessTime /> WaitList
                                </Card.Title>
                                <Card.Text>{reportData.waitlist_count}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} as={Link} to='/customers' style={{textDecoration:'none'}}>
                        <Card className='used'>
                            <Card.Body>
                                <Card.Title>
                                <BiMoneyWithdraw /> withdrawals
                                </Card.Title>
                                <Card.Text>1000</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                
                </Row>
            </Container>
        </BaseLayout>
    );
};
