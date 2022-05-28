import React from 'react';
import '../../assets/student/student.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    //set the state default value
    constructor(props) {
        super(props);
        this.state = { login: 'show col-lg-6 px-lg-4', details: 'show', register: 'hide' };
    }
    showlogin = () => { //button click functionality

        this.setState({ login: 'show col-lg-6 px-lg-4' });
        this.setState({ details: 'show' })
        this.setState({ register: 'hide' });
    }

    showregister = () => { //button click functionality

        this.setState({ details: 'hide' })
        this.setState({ login: 'hide' });
        this.setState({ register: 'show px-lg-4' });
    }
    render() {

        return (
            <div className="App">

                {/*} login {*/}
                <div className="page-holder align-items-center py-4 bg-gray-100 vh-100">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className={this.state.login}>
                                <div className="card">
                                    <div className="card-header px-lg-5">
                                        <div className="card-heading text-primary">Student Login</div>
                                    </div>
                                    <div className="card-body p-lg-5">
                                        <h3 className="mb-4">Research Management Tool - SLIIT</h3>
                                        <p className="text-muted text-sm mb-5">Please enter your email address and password to login.</p>
                                        <form id="loginForm" action="index.html">
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="floatingInput" type="email" placeholder="it12345678@my.sliit.lk" required />
                                                <label for="floatingInput">Email address</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="floatingPassword" type="password" placeholder="Password" required />
                                                <label for="floatingPassword">Password</label>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                                                <label className="form-check-label" for="remember">Remember me</label>
                                            </div>
                                            <button className="btn btn-primary" type="button">Submit</button>
                                        </form>
                                    </div>
                                    <div className="card-footer px-lg-5 py-lg-4">
                                        <div className="text-sm text-muted">Don't have an account? <a onClick={this.showregister}>Register</a>.</div>
                                    </div>
                                </div>
                            </div>

                            {/*} register {*/}
                            <div className={this.state.register}>
                                <div className="card">
                                    <div className="card-header px-lg-5">
                                        <div className="card-heading text-primary">Student Register</div>
                                    </div>
                                    <div className="card-body p-lg-5">
                                        <h3 className="mb-4">Get starte with your research project</h3>
                                        <p className="text-muted text-sm mb-5">Please fill your correct detail and create your account to continue you research project.</p>
                                        <form action="#">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="fullName" type="text" placeholder="name@example.com" required />
                                                        <label for="fullName">Full Name</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="sliitEmail" type="email" placeholder="name@example.com" required />
                                                        <label for="sliitEmail"> Student Email address</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="personalEmail" type="email" placeholder="name@example.com" required />
                                                        <label for="personalEmail"> Personal Email address</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="contactNo" type="text" placeholder="07XXXXXXXX" required />
                                                        <label for="contactNo">Contact Number</label>
                                                    </div>

                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="sliitId" type="text" placeholder="IT12345678" required />
                                                        <label for="sliitId">SLIIT Student ID</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="studentType" type="text" placeholder="Prorata | Regular" required />
                                                        <label for="studentType">Student Type</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="floatingPassword" type="password" placeholder="Password" required />
                                                        <label for="floatingPassword">New Password</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="repeatPassword" type="password" placeholder="Password" required />
                                                        <label for="repeatPassword">Repeat Password</label>
                                                    </div>
                                                    <div className="form-check mb-3">
                                                        <input className="form-check-input" type="checkbox" name="agree" id="agree" />
                                                        <label className="form-check-label" for="agree">I agree with the <a href="#">Terms & Conditions</a>.</label>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="btn btn-primary" id="regidter" type="button" name="registerSubmit">Register</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer px-lg-5 py-lg-4">
                                        <div className="text-sm text-muted">Already have an account? <a onClick={this.showlogin} >Login</a>.</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center text-primary">
                                <div className={this.state.details}>
                                    {/* <img className="img-fluid mb-4" width="300" src="https://connix.institute.org.in/assets/images/student-login-2.svg" alt="" style={{ transform: "rotate(10deg)" }} /> */}
                                    <h1 className="mb-4">Research Project Management<br className="d-none d-lg-inline" />SLIIT</h1>
                                    <p className="lead text-muted">Make your project Team easily with get the pre-aproval from your Lecture in Charge on few clicks!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}
export default App;