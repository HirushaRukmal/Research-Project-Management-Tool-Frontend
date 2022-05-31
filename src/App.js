import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Routes
import Home from './Home';
import Register from './pages/student/register';
import AdminRegister from './pages/admin/register';
import AdminDashboard from './pages/admin/dashboard';
import AdminLogin from './pages/admin/login';
import EditProfile from './pages/admin/editProfile';
// import ProfileDetails from './pages/admin/Userprofile';
import StaffDashboard from './pages/Staff/dashboard';
import StaffRegister from './pages/Staff/register';

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
          <Route path="/admin/profile/update/:id" element={<EditProfile />} />
          {/* <Route path="/admin/profile/:id" element={<ProfileDetails />} /> */}
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/register" element={<StaffRegister />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
