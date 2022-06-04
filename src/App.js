import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";

// Import Routes
import Home from "./Home";
import AdminRegister from "./pages/admin/register";
import AdminDashboard from "./pages/admin/dashboard";
import AdminLogin from "./pages/admin/login";
import ProfileDetails from "./pages/admin/Userprofile";
import StaffDashboard from "./pages/Staff/dashboard";
import StaffRegister from "./pages/Staff/register";
// import ProfileDetails from './pages/admin/Userprofile';
import AddSubTypes from "./components/Admin/add-subTypes";
import FileUpload from "./components/Admin/fileUpload";
import SubTypeList from "./components/Admin/list_subTypes";
import EditSubType from "./components/Admin/update_subtype";
import PanelMember from "./components/Admin/allocate_pm";
import UpdateAdmin from "./pages/admin/updateAdmin";

// Stuednt Route
import Register from "./pages/student/register";
import StudentDashboard from "./pages/student/dashboard";
import Header from "./components/student/Navbar";
import Group from "./pages/student/project-group/index";
import GroupRegister from "./pages/student/project-group/groupRegister";
import RequestSupervisor from "./pages/student/supervisor/requestSupervisor";
import Supervisor from "./pages/student/supervisor/index";
import AllStudents from "./pages/student/admin/AllStudents";
import UpdateGroup from "./pages/student/admin/UpdateGroup";
import UpdateStudent from "./pages/student/admin/UpdateStudent";
import AllGroups from "./pages/student/admin/AllGroups";
import PrivateRoute from "./services/PrivateRoutes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/header" element={<Header />} />
            <Route path="/request-supervisor" element={<RequestSupervisor />} />
            <Route path="/group" element={<Group />} />
            <Route path="/group-register" element={<GroupRegister />} />
            <Route path="/supervisor" element={<Supervisor />} />
            <Route path="/update-student/:id" element={<UpdateStudent />} />
            <Route path="/update-group/:id" element={<UpdateGroup />} />
          </Route>

          {/* Public Route */}
          <Route path="/all-students" element={<AllStudents />} />
          <Route path="/all-groups" element={<AllGroups />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/subTypes" element={<AddSubTypes />} />
          <Route path="/fileUpload" element={<FileUpload />} />
          <Route path="/admin/subtypelist" element={<SubTypeList />} />
          <Route path="/edit-submission/:id" element={<EditSubType />} />
          <Route path="/admin/profile" element={<ProfileDetails />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/register" element={<StaffRegister />} />
          <Route path="/subTypes" element={<AddSubTypes />} />
          <Route path="/admin/subtypelist" element={<SubTypeList />} />
          <Route path="/edit-submission/:id" element={<EditSubType />} />
          <Route path="/admin/allocate-pm" element={<PanelMember />} />
          <Route path="/admin-update" element={<UpdateAdmin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
