import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Routes
import Home from './Home';
import Register from './pages/student/register';

function App() {
    return (
        <>
            <Router>
                <Routes>

                    {/* Public Route */}
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />

                </Routes>
            </Router>
        </>
    );
}

export default App;
