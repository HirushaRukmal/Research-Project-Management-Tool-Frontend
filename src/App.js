import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Routes
import Home from './Home';
import Register from './pages/student/register';
import AdminRegister from './pages/admin/register';
import AdminDashboard from './pages/admin/dashboard';
import AdminLogin from './pages/admin/login';
import SideMenu from './components/Admin/sideMenu';
import AddSubTypes from './components/Admin/add-subTypes';

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
          <Route path="/admin/home" element={<SideMenu/>}/>
          <Route path='/admin/subTypes' element={<AddSubTypes/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
