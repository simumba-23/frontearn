import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import useApi from '../useApi';
import BaseLayout from '../components/BaseLayout';

const SurveyDetail = () => {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const { getQuestions, getAnswerOptions, submitAnswers }  = useApi();


  useEffect(() => {
    const fetchQuestionsAndOptions = async () => {
      try {
        const questionsResponse = await getQuestions(surveyId);
        const questionsData = questionsResponse.data;

        const questionsWithOptions = await Promise.all(
          questionsData.map(async question => {
            const optionsResponse = await getAnswerOptions(question.id);
            return {
              ...question,
              options: optionsResponse.data,
            };
          })
        );

        setQuestions(questionsWithOptions);
      } catch (error) {
        console.error('Error fetching questions and options:', error);
      }
    };

    fetchQuestionsAndOptions();
  }, [surveyId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const answerData = Object.entries(answers).map(([questionId, selectedOption]) => ({
      question: questionId,
      selected_option: selectedOption,
    }));

    try {
      await submitAnswers(surveyId,answerData);
      // Handle successful submission
    } catch (error) {
      console.error('Error submitting answers:', error);
      console.error('ERR:',error.response.data);
      console.error('err:',error.response.data.status)
      
    }
  };

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: optionId
    }));
  };

  return (
    <BaseLayout>
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            {/* <h1>Survey Details</h1> */}
            <Form onSubmit={handleSubmit}>
              {questions.length > 0 ? (
                questions.map(question => (
                  <Card key={question.id} className="mb-3">
                    <Card.Body>
                      <Card.Title>{question.text}</Card.Title>
                      {(question.options || []).map(option => (
                        <Form.Check
                          key={option.id}
                          type={question.is_multiple_choice ? "checkbox" : "radio"}
                          label={option.text}
                          name={`question-${question.id}`}
                          checked={answers[question.id] === option.id}
                          onChange={() => handleAnswerChange(question.id, option.id)}
                        />
                      ))}
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No questions available.</p>
              )}
              <Button variant="primary" type="submit">Submit Answers</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  );
};

export default SurveyDetail;
