import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/student/group-details.css';
import Header from '../../../components/student/Navbar';
import Swal from 'sweetalert2';
import { getStudentId, setSupervisor, setCoSupervisor, getSupervisor, getCoSupervisor } from '../../../services/SessionManager';

const App = () => {

    const [currentGroup, setCurrentGroup] = useState([]);
    const [supervisorGroup, setSupervisorGroup] = useState([]);
    const { supervisor } = getSupervisor();

    const fetchCurrentGroup = () => {
        axios.get(`${process.env.BACKEND_API_AZURE}/group/groupData/${getStudentId()}`)
            .then(response => {
                console.log(response.data);
                setCurrentGroup(response.data);
                axios.get(`${process.env.BACKEND_API_AZURE}/supervisor-group/getByGroupId/${response.data._id}`)
                    .then(response => {
                        console.log(response.data);
                        setSupervisorGroup(response.data);

                        // Fetch Supervisor Detila
                        axios.get(`${process.env.BACKEND_API_AZURE}/staff/profile/${response.data.supervisorId}`)
                            .then(response => {
                                console.log(response);
                                setSupervisor(response);
                                console.log(getSupervisor());
                            })
                            .catch(error => {
                                console.log(error);
                            });

                        //Fetch Co-Supervisor Details
                        axios.get(`${process.env.BACKEND_API_AZURE}/staff/profile/${response.data.coSupervisorId}`)
                            .then(response => {
                                console.log(response.data);
                                setCoSupervisor(response);
                                console.log(getCoSupervisor());
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(error => {
                        console.log(error);
                    });
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
                {currentGroup != null ? (
                    <div>
                        <center>
                            <h4>Group Name: {currentGroup.groupName}</h4>
                            <h4>Group Id: {currentGroup._id}</h4>
                            <h4>Group Topic: {currentGroup.groupTopic}</h4>
                        </center>
                        <br />
                        <br />
                        {supervisor != null ? (
                            <div>
                                <center>
                                    <div class="container profile-page">
                                        <div class="row">
                                            <div class="col-xl-6 col-lg-7 col-md-12">
                                                <div class="card profile-header">
                                                    <div class="body">
                                                        <div class="row">
                                                            <div class="col">
                                                                <h2 class="m-t-0 m-b-0"><strong>Supervisor</strong></h2>
                                                                <hr />
                                                                <h3 class="m-t-0 m-b-0"><strong>{getSupervisor().profile.fName + " " + getSupervisor().profile.lName}</strong></h3>
                                                                {/* <h3 class="m-t-0 m-b-0">Status: {currentGroup.status}</h3> */}
                                                                <p>{getSupervisor().profile.email}</p>
                                                                <p>{getSupervisor().profile.tel}</p>
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
                                                                <h2 class="m-t-0 m-b-0"><strong>Co-Supervisor</strong></h2>
                                                                <hr />
                                                                <h3 class="m-t-0 m-b-0"><strong>{getCoSupervisor().profile.fName + " " + getCoSupervisor().profile.lName}</strong></h3>
                                                                {/* <h3 class="m-t-0 m-b-0">Status: {currentGroup.status}</h3> */}
                                                                <p>{getCoSupervisor().profile.email}</p>
                                                                <p>{getCoSupervisor().profile.tel}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </center>
                            </div>
                        ) : (
                            <div>
                                <center>
                                    <h3>You don't have request supervisor and co-supervisor!</h3>
                                </center>
                            </div>
                        )}
                    </div>
                ) : (
                    <center>
                        <h3>You don't have a group</h3>
                    </center>
                )}

                <br />

            </div>




        </div >
    )

}

export default App;