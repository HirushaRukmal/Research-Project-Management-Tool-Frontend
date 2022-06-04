import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Sidebar from "../admin/Sidebar";
import Navbar from "./Navbar";

class Dashboard extends Component {
  constructor(props, { history }) {
    super(props);

    this.state = {
      profiles: [],
    };
  }

  //Auto refresh
  onload = () => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  };

  componentDidMount() {
    this.onload();
    this.retrieveProfiles();
  }

  retrieveProfiles() {
    axios.get("http://localhost:8000/admin/profiles").then((res) => {
      if (res.data.success) {
        this.setState({
          profiles: res.data.existingProfile,
        });

        console.log(this.state.profiles);
        console.log(this.state.profiles.length);
      }
    });
  }

  onDelete = (id) => {
    axios
      .delete(`http://localhost:8000/admin/profile/delete/${id}`)
      .then((res) => {
        const Swal = require("sweetalert2");
        Swal.fire({
          title: "Success!",
          text: "Profile Deleted Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });

        this.retrieveProfiles();
      });
  };

  filterData(profiles, searchKey) {
    const result = profiles.filter((profiles) =>
      profiles.uName.includes(searchKey)
    );

    this.setState({ profiles: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.values;

    axios.get("http://localhost:8000/admin/profiles").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingProfile, searchKey);
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="container">
          <h2>Registered Admin Users</h2>
          <br />
          <p>
            <button className="btn btn-primary">
              <a
                href="/admin/register"
                className="text-decoration-none text-white"
              >
                Create New Profile
              </a>
            </button>

            <div style={{ marginTop: "-38px", marginLeft: "190px" }}>
              <ReactHTMLTableToExcel
                className="btn btn-outline-success"
                table="table"
                filename="User Details Excel"
                sheet="Sheet"
                buttonText="Generate Sheet"
              />
            </div>

            <div
              className="float-end"
              style={{ marginTop: "-30px", marginLeft: "190px" }}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search here"
                name="searchQuery"
                onChange={this.handleSearchArea}
              ></input>
            </div>
          </p>
          <table id="table" class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Middle Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email address</th>
                <th scope="col">Type</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.profiles.map((profiles, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      className="text-decoration-none"
                      href={`/admin/profile/${profiles._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {profiles.fName}
                    </a>
                  </td>
                  <td>{profiles.mName}</td>
                  <td>{profiles.lName}</td>
                  <td>{profiles.email}</td>
                  <td>{profiles.type}</td>
                  <td>
                    {/* <a
                      className="btn btn-warning text-decoration-none text-white"
                      href={`/admin/profile/update/${profiles._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a> */}
                    &nbsp;
                    <a
                      className="btn btn-danger text-decoration-none text-white"
                      onClick={() => this.onDelete(profiles._id)}
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <b>Total Registered Admins: {this.state.profiles.length}</b>
          </p>
        </div>
      </div>
    );
  }
}
export default Dashboard;
