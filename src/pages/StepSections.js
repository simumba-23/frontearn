import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserPlus, FaTasks, FaMoneyBillWave } from 'react-icons/fa';

const StepsSection = () => {
  return (
    <section className="steps py-5">
      <Container>
        <h2 className="text-center mb-4">It's Just Three Steps</h2>
        <h3 className="text-center mb-5">How You Start?</h3>
        <Row>
          <Col md={4} className="mb-4 d-flex flex-column align-items-center">
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <FaUserPlus size={50} className="mb-3 text-primary" />
                <Card.Title>Create an Account</Card.Title>
                <Card.Text>
                  Start by creating an account on our platform. It’s quick and easy!
                </Card.Text>
                <div className="step-number bg-primary text-white rounded-circle">1</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4 d-flex flex-column align-items-center">
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <FaTasks size={50} className="mb-3 text-success" />
                <Card.Title>Complete Tasks</Card.Title>
                <Card.Text>
                  Engage in various tasks such as watching videos, taking surveys, or more.
                </Card.Text>
                <div className="step-number bg-success text-white rounded-circle">2</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4 d-flex flex-column align-items-center">
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <FaMoneyBillWave size={50} className="mb-3 text-warning" />
                <Card.Title>Earn Rewards</Card.Title>
                <Card.Text>
                  Accumulate points and convert them into real money or rewards.
                </Card.Text>
                <div className="step-number bg-warning text-white rounded-circle">3</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default StepsSection;
