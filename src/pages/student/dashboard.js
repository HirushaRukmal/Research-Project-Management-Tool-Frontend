import React from 'react';
import '../../assets/student/student.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/student/Navbar';

class App extends React.Component {
    render() {

        return (
            <div>
                <Header />
                <h1>Student Dashboard</h1>
            </div>
        )

    }
}

export default App;