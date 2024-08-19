import React, { useState, useEffect } from 'react';
import useApi from '../useApi';
import { Form, FormGroup, FormLabel, FormControl, FormCheck, Button, Container, Card } from 'react-bootstrap';
import BaseLayout from '../components/AdminBaseLayout';
import { Link, useParams } from 'react-router-dom';

const AddQuestion = () => {
  const [text, setText] = useState('');
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { surveyId } = useParams();
  const { createQuestion, getQuestions }= useApi();


  const fetchQuestions = () => {
    getQuestions(surveyId).then(response => {
      setQuestions(response.data);
    }).catch(error => {
      console.error('Error fetching questions:', error);
    });
  };

  useEffect(() => {
    fetchQuestions();
  }, [surveyId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuestion({ survey: surveyId, text, is_multiple_choice: isMultipleChoice }).then(response => {
      setText('');
      setIsMultipleChoice(false);
      fetchQuestions(); // Update the questions list after adding a new question
    }).catch(error => {
      console.error('Error creating question:', error);
    });
  };

  return (
    <BaseLayout>
      <Container>
        <h1>Add Question</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId="formQuestion">
            <FormLabel>Question:</FormLabel>
            <FormControl
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup controlId="formMultipleChoice">
            <FormCheck
              type="checkbox"
              label="Multiple Choice"
              checked={isMultipleChoice}
              onChange={(e) => setIsMultipleChoice(e.target.checked)}
            />
          </FormGroup>
          <Button type="submit">Add Question</Button>
        </Form>

        <h2 className="mt-4">Questions</h2>
        {questions.map((question) => (
          <Card key={question.id} className="mt-2">
            <Card.Header>Question Details</Card.Header>
            <Card.Body>
              <Card.Title>{question.text}</Card.Title>
              {/* <Card.Text>Multiple Choice: {question.is_multiple_choice ? 'Yes' : 'No'}</Card.Text> */}
              <Button className="m-2" as={Link} to={`/questions/${question.id}/options/add`}>
                Add Answer Options
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </BaseLayout>
  );
};

export default AddQuestion;
