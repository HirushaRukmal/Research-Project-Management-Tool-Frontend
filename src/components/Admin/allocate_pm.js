import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "../../assets/subTypes/subtypee.css";
import Sidebar from "../../pages/admin/Sidebar";
import Navbar from "../../pages/admin/Navbar";
import { Item } from "semantic-ui-react";
export default class allocate_pm extends Component {
  constructor(props) {
    super(props);
    // Setting up functions
    this.onChangePanel_Member_Name = this.onChangePanel_Member_Name.bind(this);
    this.onChangePanel_Member_Email = this.onChangePanel_Member_Email.bind(this);
    this.onChangeGroups = this.onChangeGroups.bind(this);
    this.onChangeGroup_emails = this.onChangeGroup_emails.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      Panel_Member_Name: "",
      Panel_Member_Email: "",
      Group_Name: "",
      Group_email: "",
    };
  }
  onChangePanel_Member_Name(e) {
    this.setState({ Panel_Member_Name: e.target.value });
  }
  onChangePanel_Member_Email(e) {
    this.setState({ Panel_Member_Email: e.target.value });
  }
  onChangeGroups(e) {
    this.setState({ Group_Name: e.target.value });
  }
  onChangeGroup_emails(e) {
    this.setState({ Group_email: e.target.value });
  }


  onSubmit(e) {
    e.preventDefault();
    const panelObject = {
      Panel_Member_Name: this.state.Panel_Member_Name,
      Panel_Member_Email: this.state.Panel_Member_Email,
      Group_Name: this.state.Group_Name,
      
    }
      
  
    axios
      .post("http://localhost:8000/admin/allocate-panel", panelObject)
      .then((res) => console.log(res.data));
    this.setState({ Panel_Member_Name: "", Panel_Member_Email: "", Group_Name: "", Group_email: "" });

    const Swal = require("sweetalert2");
    Swal.fire({
      title: "Success!",
      text: "Allocated Panel Member Successfully",
      icon: "success",
      confirmButtonText: "Close",
    });  
  
  }

  render() {
  
    return (
      <div className="CreateSubmission">
        <Navbar />
        <Sidebar />
        <div>
          <div className="card" style={{ marginLeft: "80px" }}>
            <div className="card-body p-lg-5">
              <h3 className="mb-4">Allocate Panel Members</h3>
              <p className="text-muted text-sm mb-5">
                <br />
               You can allocate panel members to the student groups in here. 
              </p>

              <form action="onSubmit">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="member"
                        type="text"
                        placeholder="name"
                        required
                        value={this.state.Panel_Member_Name}
                        onChange={this.onChangePanel_Member_Name}
                      />
                      <label for="member">Panel Member Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        placeholder="text"
                        required
                        value={this.state.Panel_Member_Email}
                        onChange={this.onChangePanel_Member_Email}
                      />
                      <span className="text-danger">{this.state.error}</span>
                      <label for="email"> Panel Member Email</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="group"
                        type="text"
                        placeholder="text"
                        required
                        value={this.state.Group_Name}
                        onChange={this.onChangeGroups}
                      />
                  
                      <label for="group"> Group Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="group_email"
                        type="text"
                        placeholder="text"
                        required
                        value={this.state.Group_email}
                        onChange={this.onChangeGroup_emails}
                      />
                  
                      <label for="group_email"> Group Leader Email</label>
                    </div>
             

                    <div className="form-floating mb-3"></div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary"
                        id="register"
                        type="button"
                        name="registerSubmit"
                        onClick={this.onSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <form onSubmit={this.onUpload}>
               
              </form>
              <div className="container">
                <div className="row"></div>
              </div>
            </div>
            <div className="card-header px-lg-9"></div>
            <div className="card-header px-lg-9"></div>
          </div>
        </div>
      </div>
    );
  }
}
