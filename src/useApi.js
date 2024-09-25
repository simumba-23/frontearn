// useApi.js
// import { actions } from 'react-table';
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
  const getSurveys = (taskId) => axiosInstance.get(`/surveys/${taskId}/task`,taskId);
  const createSurvey = (survey) => axiosInstance.post(`/surveys`, survey);
  const getQuestions = (surveyId) => axiosInstance.get(`/surveys/${surveyId}/questions`);
  const createQuestion = (question) => axiosInstance.post(`/surveys/${question.survey}/questions`, question);
  const getAnswerOptions = (questionId) => axiosInstance.get(`/questions/${questionId}/options`);
  const createAnswerOption = (option) => axiosInstance.post(`/questions/${option.question}/options`, option);
  const submitAnswers = (surveyId, answers) => axiosInstance.post(`/surveys/${surveyId}/submit`, answers);
  const withdrawRequest = (amount) => axiosInstance.post('/withdrawal-requests',amount);
  const approve = (id) => axiosInstance.post(`/withdrawal-requests/${id}/approve`);
  const reject = (id) => axiosInstance.post(`/withdrawal-requests/${id}/reject`);
  const createBlog = (blogData) => axiosInstance.post('/create_blog',blogData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  const getReferralLinks = () => axiosInstance.get('/referral-link');
  const getInvitees = () => axiosInstance.get('/invitee-lists');
  const getReferralEarnings = () => axiosInstance.get('/referral-earnings');
  const createContactDetails = (formData) => axiosInstance.post('/contact_form_submission',formData);
  const changePassword = (passData) => axiosInstance.post('/change-password',passData);
  const generate2fa = () => axiosInstance.get('/generate_2fa_qr_code');
  const verify2fa = (otpCode) => axiosInstance.post('/verify_2fa',otpCode);
  const getProfileData = () => axiosInstance.get('/profile-details');
  const updateProfileData = (formState) => axiosInstance.put('/profile-details',formState);
  const getLeaderboard = () => axiosInstance.get('/leaderboard');
  const getUserHistory = () => axiosInstance.get('/user_history');
  const getReferralStatus = () => axiosInstance.get ('/referral-status');
  const getRecentActivities = () => axiosInstance.get('/recent-activities');
  const getTaskProgress = () => axiosInstance.get('/task-progress');
  const getUserList = () => axiosInstance.get('/customers')
  const bulkActions = (action, userIds) => axiosInstance.post('/bulk-action',{  action,
  user_ids: userIds});
const createRewards = (formData) => axiosInstance.post('/create_rewards',formData,{
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
const getRewardsList = () => axiosInstance.get('/rewards');
const create_blog_category = (data) => axiosInstance.post('/create_blog_category',data);
const create_blog_tag = (data) => axiosInstance.post('/create_blog_tag',data);


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
    createBlog,
    getReferralLinks,
    getInvitees,
    getReferralEarnings,
    createContactDetails,
    changePassword,
    generate2fa,
    verify2fa,
    getProfileData,
    updateProfileData,
    getLeaderboard,
    getUserHistory,
    getRecentActivities,
    getReferralStatus,
    getTaskProgress,
    getUserList,
    bulkActions,
    createRewards,
    getRewardsList,
    create_blog_category,
    create_blog_tag,
  
  };
};

export default useApi;
