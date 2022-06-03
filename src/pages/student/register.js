import React from 'react';
// import '../../assets/student/student.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';
require('dotenv').config();
import { authenticate } from '../../services/SessionManager';


class App extends React.Component {
    //set the state default value
    constructor(props) {
        super(props);
        this.state = {
            login: 'show col-lg-6 px-lg-4',
            details: 'show',
            register: 'hide',

            fullName: "",
            sliitId: "",
            sliitEmail: "",
            personalEmail: "",
            contactNo: "",
            studentType: "",
            groupStatus: "",
            checked: true,

            password: "",
        };
        console.log("NOW: " + this.state.checked)
    }

    onChangeLogin = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleChange = () => {
        this.setState({ checked: !this.state.checked });
        console.log("NOW: " + this.state.checked)
    };

    onSubmitLogin = e => {
        console.log("CLICKED LOGIN");
        e.preventDefault();
        const newLogin = {
            sliitEmail: this.state.sliitEmail,
            password: this.state.password,
        };

        console.log(newLogin);

        var sliitEmail = newLogin.sliitEmail;
        var password = newLogin.password;

        console.log(sliitEmail, password);

        axios.post(`${process.env.BACKEND_API_AZURE}/student/login`, {
            sliitEmail,
            password
        }, {
            headers: { "Access-Control-Allow-Origin": "*" }
        })
            .then(response => {
                console.log(response);
                if (response.data == null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'You are Unautherized!',
                        text: 'Please Check your Credentials and Try Again!',
                    })
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'You are Authenticated!',
                        text: 'You are redirecting to the Student Dashboard',
                    })
                    this.setState({
                        sliitEmail: "",
                        password: "",
                    });
                    authenticate(response, () => (window.location.href = `/group`), 2000);
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Authentication Failed!',
                    text: 'Please Check your Credentials and Try Again!',
                })
            });
    };

    onSubmitRegister = e => {
        e.preventDefault();
        const newUser = {
            fullName: this.state.fullName,
            sliitId: this.state.sliitId,
            sliitEmail: this.state.sliitEmail,
            personalEmail: this.state.personalEmail,
            contactNo: this.state.contactNo,
            studentType: this.state.studentType,
            groupStatus: this.state.groupStatus,
        };

        var fullName = newUser.fullName;
        var sliitId = newUser.sliitId;
        var sliitEmail = newUser.sliitEmail;
        var personalEmail = newUser.personalEmail;
        var contactNo = newUser.contactNo;
        var studentType = newUser.studentType;
        var groupStatus = newUser.groupStatus;

        axios.post(`${process.env.BACKEND_API_AZURE}/student/`, {
            fullName,
            sliitId,
            sliitEmail,
            personalEmail,
            contactNo,
            studentType,
            groupStatus
        })
            .then(response => {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'You are Registred!',
                    text: 'Please check you emails to get the username and password',
                })
                this.setState({
                    fullName: "",
                    sliitId: "",
                    sliitEmail: "",
                    personalEmail: "",
                    contactNo: "",
                    studentType: "",
                    groupStatus: ""
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error! Student Email Address is already in use!',
                    text: 'Please Try Again!',
                })
            });
    };

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
            <div className="App ">

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
                                        <form onSubmit={this.onSubmitLogin}>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" onChange={this.onChangeLogin} value={this.state.sliitEmail} id="sliitEmail" type="email" placeholder="it12345678@my.sliit.lk" required />
                                                <label for="sliitEmail">Email address</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" onChange={this.onChangeLogin} value={this.state.password} id="password" type="password" placeholder="Password" required />
                                                <label for="password">Password</label>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                                                <label className="form-check-label" for="remember">Remember me</label>
                                            </div>
                                            <button className="btn btn-primary" type="submit">Submit</button>
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
                                        <form onSubmit={this.onSubmitRegister}>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" onChange={this.onChange} value={this.state.fullName} id="fullName" type="text" placeholder="Isuru Pathum Herath" pattern="^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$" title="Invalid Input for Full Name" required />
                                                        <label for="fullName">Full Name</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" onChange={this.onChange} value={this.state.sliitEmail} id="sliitEmail" type="email" placeholder="name@example.com" required />
                                                        <label for="sliitEmail"> Student Email address</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" onChange={this.onChange} value={this.state.personalEmail} id="personalEmail" type="email" placeholder="name@example.com" required />
                                                        <label for="personalEmail"> Personal Email address</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" onChange={this.onChange} value={this.state.contactNo} id="contactNo" type="text" placeholder="07XXXXXXXX" pattern="[0-9]{10}" title="Invalid Mobile Number." required />
                                                        <label for="contactNo">Contact Number</label>
                                                    </div>

                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" onChange={this.onChange} value={this.state.sliitId} id="sliitId" type="text" placeholder="IT12345678" pattern="[A-Za-z0-9]{10}" title="Invalid Studnt Number." required />
                                                        <label for="sliitId">SLIIT Student ID</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <select id="studentType" value={this.state.studentType} onChange={this.onChange} className="form-control" required>
                                                            <option value="" disabled selected>Select a Student Type</option>
                                                            <option value="Regular">Regular</option>
                                                            <option value="Prorata">Prorata</option>
                                                            <option value="Repeat">Repeat</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <select id="groupStatus" value={this.state.groupStatus} onChange={this.onChange} className="form-control" required>
                                                            <option value="" disabled selected>Select a Group Status</option>
                                                            <option value="true">I have a group</option>
                                                            <option value="false">I don't have a group</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-check mb-3">
                                                        <input className="form-check-input" onClick={this.handleChange} type="checkbox" name="agree" id="agree" required />
                                                        <label className="form-check-label" for="agree">I agree with the <a href="#">Terms & Conditions</a>.</label>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="btn btn-primary" id="register" type="submit" name="registerSubmit">Register</button>
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
                                    <p className="lead text-muted">Make your project Team easily with get the pre-approval from your Lecture in Charge on few clicks!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    };
}

export default App;