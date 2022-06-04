import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../../../assets/student/group-details.css";
import Sidebar from "../admin/Sidebar";
import Navbar from "../admin/Navbar";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const App = () => {
  const [currentGroup, setCurrentGroup] = useState([]);
  const [student1, setStudent1] = useState([]);
  const [student2, setStudent2] = useState([]);
  const [student3, setStudent3] = useState([]);
  const [student4, setStudent4] = useState([]);
  const [dataAvailable, setDataAvailability] = useState(false);
  const { id } = useParams();

  const fetchCurrentStudent = () => {
    console.log("WORKING");
    axios
      .get(`${process.env.BACKEND_API_LOCAL}/group/${id}`)
      .then((response) => {
        console.log(response.data);
        setCurrentGroup(response.data);
        console.log(currentGroup);
        setDataAvailability(true);

        //fetch Student 1
        axios
          .get(
            `${process.env.BACKEND_API_LOCAL}/student/${response.data.groupLeader}`
          )
          .then((response) => {
            console.log(response.data);
            setStudent1(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

        //fetch Student 2
        axios
          .get(
            `${process.env.BACKEND_API_LOCAL}/student/${response.data.firstMember}`
          )
          .then((response) => {
            console.log(response);
            setStudent2(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

        //fetch Student 3
        axios
          .get(
            `${process.env.BACKEND_API_LOCAL}/student/${response.data.secondMember}`
          )
          .then((response) => {
            console.log(response);
            setStudent3(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

        //fetch Student 4
        axios
          .get(
            `${process.env.BACKEND_API_LOCAL}/student/${response.data.thirdMember}`
          )
          .then((response) => {
            console.log(response);
            setStudent4(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setDataAvailability(true);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCurrentStudent();
  }, []);

  const approveTopicAndGroup = (currentGroup) => {
    const groupName = currentGroup.groupName;
    const groupLeader = currentGroup.groupLeader;
    const firstMember = currentGroup.firstMember;
    const secondMember = currentGroup.secondMember;
    const thirdMember = currentGroup.thirdMember;
    const groupTopic = currentGroup.groupTopic;
    const groupEmail = currentGroup.groupEmail;
    var groupStatus = true;

    Swal.fire({
      title: "Are you sure?",
      text: "You want to Approve this Topic!?",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `No, Reject it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${process.env.BACKEND_API_LOCAL}/group/${currentGroup._id}`, {
            groupName,
            groupLeader,
            firstMember,
            secondMember,
            thirdMember,
            groupTopic,
            groupEmail,
            groupStatus,
          })
          .then((response) => {
            console.log(response);
            Swal.fire("Approved!", "Topic is approved!.", "success");
            fetchGroup();
          })
          .catch((error) => {
            console.log(error.Response);
            // alert(error.response.data.error)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error.response.data.error}`,
              footer: "Please try again",
            });
          });
      } else if (result.isDenied) {
        groupStatus = false;
        axios
          .put(`${process.env.BACKEND_API_LOCAL}/group/${currentGroup._id}`, {
            groupName,
            groupLeader,
            firstMember,
            secondMember,
            thirdMember,
            groupTopic,
            groupEmail,
            groupStatus,
          })
          .then((response) => {
            console.log(response);
            Swal.fire("Rejected!", "Topic is Rejected!.", "success");
            fetchGroup();
          })
          .catch((error) => {
            console.log(error.Response);
            // alert(error.response.data.error)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error.response.data.error}`,
              footer: "Please try again",
            });
          });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <center>
        <h1 >Research Project Group </h1>
      </center>
      <div>
        <nav
          class="navbar navbar-expand-md navbar-dark "
          style={{ position: "static", marginLeft: "32%" }}
        ></nav>
      </div>
      <div>
        <br />
        {currentGroup != null ? (
          <div>
            <center>
              <h4>Group Name: {currentGroup.groupName}</h4>
              <h4>Group Id: {currentGroup._id}</h4>
              <h4>Group Topic: {currentGroup.groupTopic}</h4>
              {currentGroup.groupStatus == true ? (
                <h4>Approved: YES</h4>
              ) : (
                <h4>Approved: NO</h4>
              )}
              <button onClick={() => approveTopicAndGroup(currentGroup)} class="btn btn-success">
                Approve
              </button>
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
                            <h3 class="m-t-0 m-b-0">
                              <strong>{student1.fullName}</strong>
                            </h3>
                            <h4 class="job_post">{student1.sliitId}</h4>
                            <p>SLIIT Email Address: {student1.sliitEmail}</p>
                            <p>
                              Personal Email Address: {student1.personalEmail}
                            </p>
                            <p>Contact Number: {student1.contactNo}</p>
                            <div>
                              {/* <button class="btn btn-primary btn-round btn-simple">
                                Message
                              </button> */}
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
                            <h3 class="m-t-0 m-b-0">
                              <strong>{student2.fullName}</strong>
                            </h3>
                            <h4 class="job_post">{student2.sliitId}</h4>
                            <p>SLIIT Email Address: {student2.sliitEmail}</p>
                            <p>
                              Personal Email Address: {student2.personalEmail}
                            </p>
                            <p>Contact Number: {student2.contactNo}</p>
                            <div>
                              {/* <button class="btn btn-primary btn-round btn-simple">
                                Message
                              </button> */}
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
                            <h3 class="m-t-0 m-b-0">
                              <strong>{student3.fullName}</strong>
                            </h3>
                            <h4 class="job_post">{student3.sliitId}</h4>
                            <p>SLIIT Email Address: {student3.sliitEmail}</p>
                            <p>
                              Personal Email Address: {student3.personalEmail}
                            </p>
                            <p>Contact Number: {student3.contactNo}</p>
                            <div>
                              {/* <button class="btn btn-primary btn-round btn-simple">
                                Message
                              </button> */}
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
                            <h3 class="m-t-0 m-b-0">
                              <strong>{student4.fullName}</strong>
                            </h3>
                            <h4 class="job_post">{student4.sliitId}</h4>
                            <p>SLIIT Email Address: {student4.sliitEmail}</p>
                            <p>
                              Personal Email Address: {student4.personalEmail}
                            </p>
                            <p>Contact Number: {student4.contactNo}</p>
                            <div>
                              {/* <button class="btn btn-primary btn-round btn-simple">
                                Message
                              </button> */}
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
    </div>
  );
};

export default App;
