// useApi.js
import useAxios from './api';

const useApi = () => {
  const axiosInstance = useAxios();

  const fetchTasks = (taskType) => {
    return axiosInstance.get(`/tasks`);
  };

  const addTask = (taskData) => {
    return axiosInstance.post(`/add-task`, taskData);
  };

  const displaySurveys = () => axiosInstance.get(`/surveys`);
  const getWithdrawalRequestList = () => axiosInstance.get('/withdrawal-requests/list')
  const userTaskStats = (stats) => axiosInstance.get('/user_tasks_stats',stats);
  const fetch_admin_reports = (reports) => axiosInstance.get('/admin_reports',reports)
  const getSurveys = (taskId) => axiosInstance.get(`/surveys/${taskId}/task`);
  const createSurvey = (survey) => axiosInstance.post(`/surveys`, survey);
  const getQuestions = (surveyId) => axiosInstance.get(`/surveys/${surveyId}/questions`);
  const createQuestion = (question) => axiosInstance.post(`/surveys/${question.survey}/questions`, question);
  const getAnswerOptions = (questionId) => axiosInstance.get(`/questions/${questionId}/options`);
  const createAnswerOption = (option) => axiosInstance.post(`/questions/${option.question}/options`, option);
  const submitAnswers = (surveyId, answers) => axiosInstance.post(`/surveys/${surveyId}/submit`, answers);
  const withdrawRequest = (amount) => axiosInstance.post('/withdrawal-requests',amount);
  const approve = (id) => axiosInstance.post(`/withdrawal-requests/${id}/approve`);
  const reject = (id) => axiosInstance.post(`/withdrawal-requests/${id}/reject`);
  const createBlog = (blogData) => axiosInstance.post('/create_blog',blogData);
  return {
    fetchTasks,
    getWithdrawalRequestList,
    addTask,
    displaySurveys,
    getSurveys,
    createSurvey,
    getQuestions,
    createQuestion,
    getAnswerOptions,
    createAnswerOption,
    submitAnswers,
    userTaskStats,
    withdrawRequest,
    fetch_admin_reports,
    approve,
    reject,
    createBlog
  };
};

export default useApi;
