import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Admindashboard from './pages/Admindashboard';
import PrivateRoute from './components/PrivateRoute';
import CustomerList from './admin_site/CustomerList';
import AddTask from './pages/AdminTasks/AddTask';
import RecentActivityFeed from './customer_dashboard/RecentActivityFeed';

import { AdminTransactions } from './admin_site/dashadmin';
import { TaskCategory } from './pages/TaskCategory';
import VideoTask from './pages/VideoTask';
import MusicTask from './pages/MusicTask';
import TaskList from './pages/TaskList';
import { ManageMusicTask } from './pages/AdminTasks/ManageMusicTask';
import { Faqs } from './components/Faqs';
import AdminTaskList from './pages/AdminTasks/AdminTaskList';
import { ManageVideoTask } from './pages/AdminTasks/ManageVideoTask';
import { ManagePodcastTask } from './pages/AdminTasks/ManagePodcastTask';
import AddSurvey from './pages/AddSurvey';
import AddQuestion from './pages/AddQuestions';
import AddAnswerOption from './pages/AddAnswerOption';
import SurveyDetail from './pages/SurveyDetail';
import SurveyList from './pages/SurveyList';
import QuestionList from './pages/AddAnswerOption';
import { WithdrawRequest } from './accounts/WithdrawRequest';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import CommentForm from './components/CommentForm';
import CreateBlog from './components/CreateBlog';
import TaskDetails from './pages/TaskDetails';
import { BlogCategories } from './components/BlogCategories';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/Privacy-Policy';
import SpotifyPlayer from './components/SpotifyPlayer';
import ProfileInfo  from './accounts/ProfileInfo';
import { Settings } from './accounts/Settings';
import { SupportFaqs } from './supports/Faqs';
import { ContactForm } from './supports/ContactForm';
import ReferralLink from './refferals/refferals';
import InviteesList from './refferals/InviteeList';
import ReferralEarnings from './refferals/ReferralEarnings';
import { ContactFormPage } from './components/ContactUs';
import PaymentInfo from './accounts/PaymentsInfo';
import Leaderboard from './accounts/Leaderboard';
import { PayList } from './accounts/PayList';
import { WaitList } from './accounts/WaitList';
import TestimonialPage from './testmonial/TestmonialPage';
import Customerdashboard from './customer_dashboard/Customerdashboard';
import Users from './admin_site/Users';
import { Dashpayment } from './admin_site/Dashpayment';
import UserInfo from './admin_site/UserProfile';
import { AdminSettings } from './admin_site/AdminSettings';
import RevenueManagementPage from './revenue/RevenueManagementPage';
import { PayListAdmin } from './admin_site/PayListadmin';
import { WaitListAdmin } from './admin_site/WaitlistAdmin';
import AdminTaskDetails from './pages/AdminTasks/AdminTaskDetails';
import ForgotPassword from './pages/ForgotPasswordForm';
import ResetPassword from './pages/ResetPassword';
import RewardCreate from './rewards/RewardCreate';
import RewardList from './rewards/RewardList';
import Notification from './notifications/notify';
import UserHistory from './accounts/UserHistory';
import { CustomerBlogDetails } from './pages/customer/BlogDetails';
import { CustomerBlogList } from './pages/customer/BlogList';
import AdminRegister from './admin_site/AdminRegister';
const App = () =>{ 
    return(
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/AddTask" element={<AddTask />} />
        <Route path="/Admin" element={<PrivateRoute> <Admindashboard /> </PrivateRoute> }  />
        <Route path="/Customer" element={<PrivateRoute> <Customerdashboard /> </PrivateRoute> } />
        <Route path="/pending_withdraws" element={<CustomerList />} />
        <Route path="/AdminInfo" element={<AdminTransactions />} />
        <Route path="/Categorys" element={<TaskCategory />} />
        <Route path="/tasks/Video" element={<VideoTask />} />
        <Route path="/tasks/Music" element={<MusicTask />} />
        <Route path="/task/:taskId" element={ <TaskDetails />} />
        <Route path="/admintasks/:taskId" element = { <AdminTaskDetails />} />
        <Route path="/tasks/:taskType?" element={TaskList} />
        <Route path="/Manage/:taskType?" element={< AdminTaskList />} />
        <Route path="/Manage/Music" element={< ManageMusicTask />} />
        <Route path="/Manage/Video" element={< ManageVideoTask />} />
        <Route path="/Manage/Podcast" element={<ManagePodcastTask />} />
        <Route path="/surveys/:taskId" element={ <AddSurvey />} />
        <Route path="/surveys/:surveyId/questions/add" element={<AddQuestion />} />
        <Route path="/questions/:questionId/options/add" element={<QuestionList/>} />
        <Route path="/surveys/:taskId/task" element={ <SurveyList />} />
        <Route path="/surveys/:surveyId/view" element={<SurveyDetail />} />
        <Route  path='/withdraw/form' element={<WithdrawRequest />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blog-category" element={<BlogCategories />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path='/spotifyplayer' element={<SpotifyPlayer />} />
        <Route path='/faqs' element={< Faqs/>} />
        <Route path='/profile' element ={ <ProfileInfo />} />
        <Route path='/settings' element ={ <Settings />} />
        <Route path= '/support/faqs' element={ <SupportFaqs />}  />
        <Route path='support/contactform' element={ <ContactForm /> } />
        <Route path='/referrals' element ={ <ReferralLink />} />
        <Route path="/invitees" element={ < InviteesList />} />
        <Route path='/ReferralEarnings' element = { <ReferralEarnings />} />
        <Route path='/contactus' element = { <ContactFormPage />} />
        <Route path ='/payments' element = { <PaymentInfo />} />
        <Route path='/leaderboard' element = { <Leaderboard />} />
        <Route path='/payoutlist' element ={ <PayList />} />
        <Route path='/waitlist' element = { <WaitList />} />
        <Route path='/testmonial' element= { <TestimonialPage />} />
        <Route path='/userhistory' element = {< UserHistory />} />
        <Route path='/users_list' element={<Users />} />
        <Route path = '/account_settings' element ={ <AdminSettings />} />
        <Route path = '/account_profile' element={<UserInfo />} />
        <Route path = '/revenue' element={ <RevenueManagementPage />} />
        <Route path = '/payout_list' element = { <PayListAdmin />} />
        <Route path = '/payout_waitlist' element = { <WaitListAdmin />} />
        <Route path='/payment' element={<Dashpayment />} />
        <Route path= '/request_password_reset' element={<ForgotPassword />} />
        <Route path='/reset_password' element = { <ResetPassword />} />
        <Route path='create_rewards' element = {<RewardCreate />} />
        <Route path = '/rewards' element ={ <RewardList />} />
        <Route path='/notifications' element = { <Notification />} />
        <Route path='/userhistory' element = { <UserHistory />} />
        <Route path='/recentactivities' element ={ < RecentActivityFeed />} />
        <Route path = '/blog_details'  element = { < CustomerBlogDetails />} />
        <Route path = '/blog_list' element = { < CustomerBlogList /> } />
        <Route path = '/AdminRegister' element = { < AdminRegister /> } />

        
        <Route 
                    path="/blogs/:id" 
                    element={
                        <>
                            <BlogDetail />
                            <CommentForm />
                        </>
                    } 
                />
    </Routes>
);}

export default App;
