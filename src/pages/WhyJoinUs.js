import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaMoneyBillWave, FaQuestionCircle, FaUsers } from 'react-icons/fa';

const WhyJoin = () => {
  return (
    <section className="why-join py-5">
      <Container>
        <h2 className="text-center mb-4">Earn Extra Money</h2>
        <h3 className="text-center mb-5">Why Join Us?</h3>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="text-center p-3 border-0 shadow-sm">
              <Card.Body>
                <FaQuestionCircle size={40} className="mb-3 text-primary" />
                <Card.Title>What is PayMe.io?</Card.Title>
                <Card.Text>
                  PayMe.io is your gateway to earning money while enjoying activities you love. Whether it’s watching videos, listening to music, taking surveys, or reading blogs, PayMe.io rewards you for every minute you spend on our platform. Think of it as turning your leisure time into an income stream. No tricks, no hidden costs—just a straightforward way to make money online.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="text-center p-3 border-0 shadow-sm">
              <Card.Body>
                <FaMoneyBillWave size={40} className="mb-3 text-success" />
                <Card.Title>How and How Much Do I Earn?</Card.Title>
                <Card.Text>
                  Earning with PayMe.io is simple and rewarding. You can complete tasks like watching videos, listening to music, completing surveys, or exploring content on our platform. For every task you complete, you earn points, which accumulate in your account and can be converted into real money. Once you reach the minimum payout threshold of $5, you can withdraw your earnings directly to your bank account or preferred payment method. Your earning potential is unlimited—the more tasks you complete, the more you earn.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}  className="mb-4">
            <Card className="text-center p-3 border-0 shadow-sm">
              <Card.Body>
                <FaUsers size={40} className="mb-3 text-warning" />
                <Card.Title>20% Referral Bonus</Card.Title>
                <Card.Text>
                  Want to boost your earnings even faster? Invite your friends and family to join PayMe.io and earn a 20% bonus on their earnings. Every time they complete tasks, you get rewarded too. There’s no limit to how many people you can refer, meaning there’s no limit to how much you can earn!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyJoin;
