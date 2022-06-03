import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/student/group-details.css';
import Header from '../../../components/student/Navbar';

const App = () => {

    const [currentStudent, setCurrentStudent] = useState([]);

    const fetchCurrentStudent = () => {
        console.log("WORKING");
        axios.get(`${process.env.BACKEND_API_AZURE}/student/62980e249099ee02c30e69af`)
            .then(response => {
                console.log(response)
                setCurrentStudent(response.data)
            })
            .catch(error => {
                console.log(error);
                alert("Error Fetching Cusrrent Student Details")
            });


    }

    useEffect(() => {
        fetchCurrentStudent();
    }, [])

    return (
        <div>
            <Header />
            <center>
                <h3>Research Project Group 62980e249099ee02c30e69af</h3>
            </center>
            <div>
                <nav class="navbar navbar-expand-md navbar-dark " style={{ position: 'static', marginLeft: "32%" }}>
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/group-register">
                                <button className="btn btn-info" type="submit" style={{ color: "white" }}>Register Project Group</button>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/group">
                                <button className="btn btn-info" type="submit" style={{ color: "white" }}>Delete Project Group</button>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link" href="/dashboard">
                                <button className="btn btn-info" type="submit" style={{ color: "white" }}>Update Project Group</button>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                <br />
                <center>
                    <div class="container profile-page">
                        <div class="row">
                            <div class="col-xl-6 col-lg-7 col-md-12">
                                <div class="card profile-header">
                                    <div class="body">
                                        <div class="row">
                                            <div class="col">
                                                <h4 class="m-t-0 m-b-0"><strong>Michael</strong> Deo</h4>
                                                <span class="job_post">Ui UX Designer</span>
                                                <p>795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                                                <div>
                                                    <button class="btn btn-primary btn-round">Follow</button> &nbsp;
                                                    <button class="btn btn-primary btn-round btn-simple">Message</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="col-xl-6 col-lg-7 col-md-12">
                                <div class="card profile-header">
                                    <div class="body">
                                        <div class="row">
                                            <div class="col">
                                                <h4 class="m-t-0 m-b-0"><strong>Michael</strong> Deo</h4>
                                                <span class="job_post">Ui UX Designer</span>
                                                <p>795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                                                <div>
                                                    <button class="btn btn-primary btn-round">Follow</button>&nbsp;
                                                    <button class="btn btn-primary btn-round btn-simple">Message</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xl-6 col-lg-7 col-md-12">
                                <div class="card profile-header">
                                    <div class="body">
                                        <div class="row">
                                            <div class="col">
                                                <h4 class="m-t-0 m-b-0"><strong>Michael</strong> Deo</h4>
                                                <span class="job_post">Ui UX Designer</span>
                                                <p>795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                                                <div>
                                                    <button class="btn btn-primary btn-round">Follow</button>&nbsp;
                                                    <button class="btn btn-primary btn-round btn-simple">Message</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="col-xl-6 col-lg-7 col-md-12">
                                <div class="card profile-header">
                                    <div class="body">
                                        <div class="row">
                                            <div class="col">
                                                <h4 class="m-t-0 m-b-0"><strong>Michael</strong> Deo</h4>
                                                <span class="job_post">Ui UX Designer</span>
                                                <p>795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                                                <div>
                                                    <button class="btn btn-primary btn-round">Follow</button>&nbsp;
                                                    <button class="btn btn-primary btn-round btn-simple">Message</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </center>
            </div>


        </div >
    )

}

export default App;