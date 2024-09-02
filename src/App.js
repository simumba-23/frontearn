import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
// import './App.css';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
// import Dashboardpage from './pages/Dashboardpage';
import Admindashboard from './pages/Admindashboard';
import Customerdashboard from './pages/Customerdashboard';
import PrivateRoute from './components/PrivateRoute';
import CustomerList from './pages/CustomerList';
import AddTask from './pages/AddTask';
import TransactionPage from './pages/TransactionPage';
import { AdminTransactions } from './pages/AdminTransactions';
import { TaskCategory } from './pages/TaskCategory';
import { CustomerTasks } from './pages/CustomerTasks';
import VideoTask from './pages/VideoTask';
import MusicTask from './pages/MusicTask';
import TaskList from './pages/TaskList';
import { ManageMusicTask } from './pages/ManageMusicTask';
import { Faqs } from './components/Faqs';
import AdminTaskList from './pages/AdminTaskList';
import { ManageVideoTask } from './pages/ManageVideoTask';
import { ManagePodcastTask } from './pages/ManagePodcastTask';
import AddSurvey from './pages/AddSurvey';
import AddQuestion from './pages/AddQuestions';
import AddAnswerOption from './pages/AddAnswerOption';
import SurveyDetail from './pages/SurveyDetail';
import SurveyList from './pages/SurveyList';
import QuestionList from './pages/AddAnswerOption';
import { WithdrawRequest } from './pages/WithdrawRequest';
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
const App = () =>{ 
  return(
  
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/AddTask" element={<AddTask />} />
        <Route path="/TransactionSummary" element={<TransactionPage />} />
        {/* <Route path="/Dashboard" element={<PrivateRoute element={Dashboardpage} />} /> */}
        <Route path="/Admin" element={<PrivateRoute> <Admindashboard /> </PrivateRoute> }  />
        <Route path="/Customer" element={<PrivateRoute> <Customerdashboard /> </PrivateRoute> } />
        <Route path="/Customer-List" element={<CustomerList />} />
        <Route path="/AdminTransactions" element={<AdminTransactions />} />
        <Route path="/Categorys" element={<TaskCategory />} />
        <Route path="/tasks/Video" element={<VideoTask />} />
        <Route path="/tasks/Music" element={<MusicTask />} />
        <Route path="/task/:taskId" element={ <TaskDetails />} />


        <Route path="/tasks/:taskType?" element={TaskList} />
        <Route path="/Manage/:taskType?" element={< AdminTaskList />} />
        <Route path="/Manage/Music" element={< ManageMusicTask />} />
        <Route path="/Manage/Video" element={< ManageVideoTask />} />
        <Route path="/Manage/Podcast" element={<ManagePodcastTask />} />
        <Route path="/CustomerTasks" element={<CustomerTasks />} />
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
