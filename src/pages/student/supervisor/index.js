import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/student/group-details.css';
import Header from '../../../components/student/Navbar';
import Swal from 'sweetalert2';
import { getStudentId } from '../../../services/SessionManager';

const App = () => {

    const [currentGroup, setCurrentGroup] = useState([]);
    const [dataAvailable, setDataAvailability] = useState(false);
    

    const fetchCurrentGroup = () => {
        console.log("WORKING");
        axios.get(`${process.env.BACKEND_API_LOCAL}/group/groupData/${getStudentId()}`)
            .then(response => {
                console.log(response.data);
                setCurrentGroup(response.data);
                console.log(currentGroup);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const updateGroup = () => {
        Swal.fire(
            'Do you want to update your group Members, group Name or group Topic?',
            'You must contact your supervisor!',
            'info'
        )
    }

    useEffect(() => {
        fetchCurrentGroup();
    }, [])

    return (
        <div>
            <Header />
            <center>
                <h1>Supervisor & Co-Supervisor </h1>
            </center>

            <div>
                <br />
                {currentGroup != null ? (
                    <div>
                        <center>
                            <h4>Group Name: {currentGroup.groupName}</h4>
                            <h4>Group Id: {currentGroup._id}</h4>
                            <h4>Group Topic: {currentGroup.groupTopic}</h4>
                        </center>
                        <br />
                        <center>
                            {/* <div class="container profile-page">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-7 col-md-12">
                                        <div class="card profile-header">
                                            <div class="body">
                                                <div class="row">
                                                    <div class="col">
                                                        <h3 class="m-t-0 m-b-0"><strong>{student1.fullName}</strong></h3>
                                                        <h4 class="job_post">{student1.sliitId}</h4>
                                                        <p>SLIIT Email Address: {student1.sliitEmail}</p>
                                                        <p>Personal Email Address: {student1.personalEmail}</p>
                                                        <p>Contact Number: {student1.contactNo}</p>
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
                                                        <h3 class="m-t-0 m-b-0"><strong>{student2.fullName}</strong></h3>
                                                        <h4 class="job_post">{student2.sliitId}</h4>
                                                        <p>SLIIT Email Address: {student2.sliitEmail}</p>
                                                        <p>Personal Email Address: {student2.personalEmail}</p>
                                                        <p>Contact Number: {student2.contactNo}</p>
                                                        <div>
                                                            <button class="btn btn-primary btn-round">Follow</button> &nbsp;
                                                            <button class="btn btn-primary btn-round btn-simple">Message</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </center>
                    </div>
                ) : (
                    <center>
                        <h3>You don't have a group</h3>
                    </center>
                )}

                <br />

            </div>

            <div>
                <nav class="navbar navbar-expand-md navbar-dark " style={{ position: 'static', marginLeft: "32%" }}>
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/request-supervisor">
                                <button className="btn btn-info" type="submit" style={{ color: "white" }}>Request Supervisor/Co-Supervisor</button>
                            </a>
                        </li>
                        {/* <li class="nav-item">
                            <a class="nav-link">
                                <button onClick={deleteGroup} className="btn btn-info" style={{ color: "white" }} >Delete Project Group</button>
                            </a>
                        </li> */}
                        <li class="nav-item dropdown">
                            <a class="nav-link">
                                <button onClick={updateGroup} className="btn btn-info" style={{ color: "white" }} >Re-request Supervisor/Co-Supervisor</button>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>


        </div >
    )

}

export default App;