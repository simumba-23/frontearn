import React from 'react'

const SurveyPage = () => {
    const [showSurveyForm, setShowSurveyForm] = useState(false)
    const [currentTask, setCurrentTask] = useState(null)
    const [survey, setSurvey] = useState(null)
    const [answers, setAnswers] = useState([])

    const fetchSurvey = async (task) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/survey/${task.id}`)

            setSurvey(response.data)
            console.log('Survey data:', response.data)
            setCurrentTask(task)
            setShowSurveyForm(true)
        } catch (error) {
            console.error('Error fetching survey', error)
        }
    }

    const handleAnswerChange = (questionId, selectedOptionId) => {
        setAnswers((prevAnswers) => {
            const existingAnswer = prevAnswers.find((answer) => answer.question_id === questionId)
            if (existingAnswer) {
                return prevAnswers.map((answer) => 
                    answer.question_id === questionId ? { ...answer, selected_option_id: selectedOptionId } : answer
                )
            }
            return [...prevAnswers, { question_id: questionId, selected_option_id: selectedOptionId }]
        })
    }

    const handleSurveySubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/complete_task', {
                taskId: currentTask.id,
                answers: answers
            })
            if (response.status === 200) {
                setCompletionMessages(`Task ${currentTask.name} is completed successfully`)
                setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, currentTask.id])
                setShowSurveyForm(false)
                setAnswers([])
            } else {
                console.error('Unexpected response', response)
            }
        } catch (error) {
            console.error('Error completing task', error)
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
  return (
    <div>
 {showSurveyForm && currentTask && currentTask.id === task.id && survey && (
                        <Form onSubmit={handleSurveySubmit}>
                            <h5>{survey.title}</h5>
                            {survey.questions.map((question) => (
                                <Form.Group key={question.id} controlId={`question-${question.id}`}>
                                    <Form.Label>{question.text}</Form.Label>
                                    {question.options.map((option) => (
                                        <Form.Check
                                            type="radio"
                                            name={`question-${question.id}`}
                                            id={`option-${option.id}`}
                                            label={option.text}
                                            value={option.id}
                                            onChange={() => handleAnswerChange(question.id, option.id)}
                                            required
                                        />
                                    ))}
                                </Form.Group>
                            ))}
                            <Button variant="primary" type="submit">
                                Submit Answers
                            </Button>
                        </Form>
                    )}


    </div>
  )
}

export default SurveyPage