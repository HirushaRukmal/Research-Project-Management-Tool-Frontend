import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Routes
import Home from './Home';

function App() {
    return (
        <>
            <Router>
                <Routes>

                    {/* Public Route */}
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
