import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../../assets/admin/AdminProfile.css";
import { getToken } from "../../SessionManager";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Navbar from "../admin/Navbar";
import Sidebar from "../admin/Sidebar";
import logo from "../../assets/admin/avatar7.png";

const Userprofile = (props) => {
  // state
  const [profile, setUser] = useState({});

  let id = JSON.parse(sessionStorage.getItem("User ID"));

  useEffect(() => {
    axios
      .get(`http://localhost:8000/admin/profile/${id}`, {})
      .then((response) => {
        console.log("data", response);
        console.log("name", response.data.profile.fName);
        setUser(response.data.profile);
      })
      .catch((error) => alert("Error Loading Manager Details"));

    var date = profile.dob;
    var momentDate = moment.utc(date).format("MM/DD/YYYY");
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="container mt-4">
        <h1 align="center">{profile.fName}'s Profile</h1>
        <br />
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={logo}
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{profile.fName + " " + profile.lName}</h4>
                      <p className="text-muted font-size-sm">{profile.type}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mt-4">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Account Status</h6>
                    <button className="btn btn-success">Active</button>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Username</h6>
                    <span className="text-success">{profile.email}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Username</h6>
                    </div>
                    <div className="col-sm-9 text-blue">{profile.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-blue">
                      {profile.fName +
                        " " +
                        profile.mName +
                        " " +
                        profile.lName}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">NIC</h6>
                    </div>
                    <div className="col-sm-9 text-blue">{profile.nic}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-blue">{profile.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Contact Number</h6>
                    </div>
                    <div className="col-sm-9 text-blue">{profile.tel}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-blue">{profile.address}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date of Birth</h6>
                    </div>
                    <div className="col-sm-9 text-blue">
                      {moment.utc(profile.dob).format("DD/MM/YYYY")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
