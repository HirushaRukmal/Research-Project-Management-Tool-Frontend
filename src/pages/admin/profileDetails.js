import React, { useEffect, Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

class ProfileDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("ID: " + id);

    axios.get(`http://localhost:8000/admin/profile/${id}`).then((res) => {
      if (res.data.success) {
        console.log("ID: " + id);
        console.log("DATA: " + res);
        this.setState({
          profile: res.data.profile,
        });
        console.log(this.state.profile);
      } else {
        console.log("error fetch data");
        console.log("ID : " + id);
      }
    });
  }

  render() {
    const { fName, mName, lName, email, dob, nic, address } =
      this.state.profile;
    return (
      <div>
        <Sidebar />
        <Navbar />
        <div className="container">
          <h1 align="center">{fName}'s Profile</h1>
          <br />
          <div className="main-body">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Admin"
                        className="rounded-circle"
                        width="150"
                      />
                      <div className="mt-3">
                        <h4>{fName + " " + lName}</h4>
                        <p className="text-muted font-size-sm">{address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-3">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">Account Status</h6>
                      <span className="text-success">Active</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">Username</h6>
                      <span className="text-success">undefine</span>
                    </li>
                    <br />
                    <div className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <div className="col-sm-12">
                        <button
                          className="btn btn-success"
                          style={{ width: "100%" }}
                        >
                          <a
                            onClick={this.pdfGenerate}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            Generate report
                          </a>
                        </button>
                      </div>
                    </div>
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
                      <div className="col-sm-9 text-blue">undefine</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                      </div>
                      <div className="col-sm-9 text-blue">
                        {fName + " " + mName + " " + lName}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">NIC</h6>
                      </div>
                      <div className="col-sm-9 text-blue">{nic}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-blue">{email}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div className="col-sm-9 text-blue">{address}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Birthday</h6>
                      </div>
                      <div className="col-sm-9 text-blue">
                        {moment.utc(dob).format("DD/MM/YYYY")}
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
  }
}
export default ProfileDetails;
