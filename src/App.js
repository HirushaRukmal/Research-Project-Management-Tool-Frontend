import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";

// Import Routes
import Home from "./Home";
import Register from "./pages/student/register";
import AdminRegister from "./pages/admin/register";
import AdminDashboard from "./pages/admin/dashboard";
import AdminLogin from "./pages/admin/login";
import EditProfile from "./pages/admin/editProfile";
import ProfileDetails from "./pages/admin/Userprofile";
import StaffDashboard from "./pages/Staff/dashboard";
import StaffRegister from "./pages/Staff/register";
import StudentDashboard from "./pages/student/dashboard";
import Register from "./pages/student/register";
// import ProfileDetails from './pages/admin/Userprofile';
import SideMenu from "./components/Admin/sideMenu";
import AddSubTypes from "./components/Admin/add-subTypes";
import FileUpload from "./components/Admin/fileUpload";
import SubTypeList from "./components/Admin/list_subTypes";
import EditSubType from "./components/Admin/update_subtype";
import TopicApproval from "./pages/Supervisor/topicApproval";

// Import Routes
import Home from "./Home";
import Register from "./pages/student/register";
import AdminRegister from "./pages/admin/register";
import AdminDashboard from "./pages/admin/dashboard";
import AdminLogin from "./pages/admin/login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Home />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path='/admin/subTypes' element={<AddSubTypes/>}/>
          <Route path='/fileUpload' element={<FileUpload/>}/>
          <Route path='/admin/subtypelist' element={<SubTypeList/>}/>
          <Route path='/edit-submission/:id' element={<EditSubType/>}/>
          <Route path="/admin/profile/update/:id" element={<EditProfile />} />
          <Route path="/admin/profile" element={<ProfileDetails />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/register" element={<StaffRegister />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/subTypes" element={<AddSubTypes />} />
          <Route path="/admin/subtypelist" element={<SubTypeList />} />
          <Route path="/edit-submission/" element={<EditSubType />} />
          <Route path="/supervisor/topicApproval" element={<TopicApproval />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
