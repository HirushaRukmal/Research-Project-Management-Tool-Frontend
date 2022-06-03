import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/student/group-details.css';
import Header from '../../../components/student/Navbar';
import Swal from 'sweetalert2';
import { getStudentId } from '../../../services/SessionManager';

const App = () => {

    const [currentGroup, setCurrentGroup] = useState([]);
    const [student1, setStudent1] = useState([]);
    const [student2, setStudent2] = useState([]);
    const [student3, setStudent3] = useState([]);
    const [student4, setStudent4] = useState([]);
    const [dataAvailable, setDataAvailability] = useState(false);

    const deleteGroupFinal = () => {
        console.log(currentGroup._id);
        const id = currentGroup._id;
        axios.delete(`${process.env.BACKEND_API_LOCAL}/group/${id}`)
            .then(response => {
                Swal.fire(
                    'Deleted!',
                    'Your group has been deleted.',
                    'success'
                )
                setDataAvailability(false);
                fetchCurrentStudent();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const verifyUser = (password) => {
        console.log(password);
        axios.get(`${process.env.BACKEND_API_LOCAL}/student/${getStudentId()}`)
            .then(response => {
                console.log(response.data)
                if (response.data.password == password) {
                    deleteGroupFinal();

                } else {
                    Swal.fire(
                        'Your password is incorrect!',
                        'Please enter the correct password!',
                        'error'
                    )
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    const fetchCurrentStudent = () => {
        console.log("WORKING");
        axios.get(`${process.env.BACKEND_API_LOCAL}/group/groupData/${getStudentId()}`)
            .then(response => {
                console.log(response.data);
                setCurrentGroup(response.data);
                console.log(currentGroup);
                setDataAvailability(true);


                //fetch Student 1
                axios.get(`${process.env.BACKEND_API_LOCAL}/student/${response.data.groupLeader}`)
                    .then(response => {
                        console.log(response.data)
                        setStudent1(response.data)
                    })
                    .catch(error => {
                        console.log(error);
                    });

                //fetch Student 2
                axios.get(`${process.env.BACKEND_API_LOCAL}/student/${response.data.firstMember}`)
                    .then(response => {
                        console.log(response)
                        setStudent2(response.data)
                    })
                    .catch(error => {
                        console.log(error);
                    });

                //fetch Student 3
                axios.get(`${process.env.BACKEND_API_LOCAL}/student/${response.data.secondMember}`)
                    .then(response => {
                        console.log(response)
                        setStudent3(response.data)
                    })
                    .catch(error => {
                        console.log(error);
                    });

                //fetch Student 4
                axios.get(`${process.env.BACKEND_API_LOCAL}/student/${response.data.thirdMember}`)
                    .then(response => {
                        console.log(response)
                        setStudent4(response.data)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                setDataAvailability(true);
                console.log(error);
                // alert("Error Fetching Current Group Details")
            });
    }

    const updateGroup = () => {
        Swal.fire(
            'Do you want to update your group Members, group Name or group Topic?',
            'You must contact your supervisor!',
            'info'
        )
    }

    const deleteGroup = () => {
        console.log("Called Delete");

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete your group?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Please Enter your Password!',
                    html: `<input type="password" id="password" class="swal2-input" placeholder="Password">`,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm!',
                    focusConfirm: false,
                    preConfirm: () => {
                        const password = Swal.getPopup().querySelector('#password').value
                        if (!password) {
                            Swal.showValidationMessage(`Please enter password`)
                        }
                        return { password: password }
                    }
                }).then((result) => {
                    //                     Swal.fire(`
                    // Password: ${result.value.password}
                    //   `.trim())
                    verifyUser(result.value.password);

                })

            }
        })

    }

    useEffect(() => {
        fetchCurrentStudent();
    }, [])

    return (
        <div>
            <Header />
            <center>
                <h1>Research Project Group </h1>
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
                            <a class="nav-link">
                                <button onClick={deleteGroup} className="btn btn-info" style={{ color: "white" }} >Delete Project Group</button>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link">
                                <button onClick={updateGroup} className="btn btn-info" style={{ color: "white" }} >Update Project Group</button>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                <br />
                {currentGroup != null ? (
                    <div>
                        <center>
                            <h4>Group Name: {currentGroup.groupName}</h4>
                            <h4>Group Id: {currentGroup._id}</h4>
                            <h4>Group Topic: {currentGroup.groupTopic}</h4>
                            <h4>Approved: {currentGroup.groupStatus}</h4>
                        </center>
                        <br />
                        <center>
                            <div class="container profile-page">
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
                                                        <h3 class="m-t-0 m-b-0"><strong>{student3.fullName}</strong></h3>
                                                        <h4 class="job_post">{student3.sliitId}</h4>
                                                        <p>SLIIT Email Address: {student3.sliitEmail}</p>
                                                        <p>Personal Email Address: {student3.personalEmail}</p>
                                                        <p>Contact Number: {student3.contactNo}</p>
                                                        <div>
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
                                                        <h3 class="m-t-0 m-b-0"><strong>{student4.fullName}</strong></h3>
                                                        <h4 class="job_post">{student4.sliitId}</h4>
                                                        <p>SLIIT Email Address: {student4.sliitEmail}</p>
                                                        <p>Personal Email Address: {student4.personalEmail}</p>
                                                        <p>Contact Number: {student4.contactNo}</p>
                                                        <div>
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