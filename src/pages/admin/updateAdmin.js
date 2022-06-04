import React, { Component } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fName: "",
      mName: "",
      lName: "",
      tel: "",
      address: "",
      email: "",
      password: "",
      nic: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    let id = JSON.parse(sessionStorage.getItem("User ID"));
    console.log(id);

    e.preventDefault();

    const { fName, mName, lName, uName, address, email, password, nic } =
      this.state;

    const data = {
      fName: fName,
      mName: mName,
      lName: lName,
      uName: uName,
      address: address,
      email: email,
      password: password,
      nic: nic,
    };
    console.log(data);

    axios
      .put(`http://localhost:8000/admin/profile/update/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          setTimeout(() => {
            window.location.href = "/admin/profile";
          }, 1000);
          const Swal = require("sweetalert2");
          Swal.fire({
            title: "Success!",
            text: "Profile Updated Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          this.setState({
            fName: "",
            mName: "",
            lName: "",
            uName: "",
            address: "",
            email: "",
            password: "",
            nic: "",
          });
        }
      });
  };

  componentDidMount() {
    let id = JSON.parse(sessionStorage.getItem("User ID"));
    console.log(id);

    axios.get(`http://localhost:8000/admin/profile/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          fName: res.data.profile.fName,
          mName: res.data.profile.mName,
          lName: res.data.profile.lName,
          tel: res.data.profile.tel,
          email: res.data.profile.email,
          address: res.data.profile.address,
          password: res.data.profile.password,
          nic: res.data.profile.nic,
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Sidebar />
        <div>
          <div className="card">
            <div className="card-body p-lg-5" style={{ marginLeft: "80px" }}>
              <h3 className="mb-4">Edit your profile details</h3>
              <p className="text-muted text-sm mb-5">
                Please fill your personal detail to update your account.
              </p>
              <form action="#">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="fName"
                        placeholder="Enter First Name"
                        value={this.state.fName}
                        onChange={this.handleInputChange}
                        pattern="[A-Za-z]+"
                        title="Characters can only be A-Z and a-z."
                        required
                      />
                      <label for="first name">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="mName"
                        placeholder="Enter Last Name"
                        value={this.state.mName}
                        onChange={this.handleInputChange}
                        pattern="[A-Za-z]+"
                        title="Characters can only be A-Z and a-z."
                        required
                      />
                      <label for="middle name"> Middle Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="lName"
                        placeholder="Enter Last Name"
                        value={this.state.lName}
                        onChange={this.handleInputChange}
                        pattern="[A-Za-z]+"
                        title="Characters can only be A-Z and a-z."
                        required
                      />
                      <label for="lastname"> Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Enter Email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                      <label for="email"> Email Address</label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="nic"
                        placeholder="NIC"
                        required
                        value={this.state.nic}
                        onChange={this.handleInputChange}
                        disabled
                      />
                      <label for="NIC">National Identity Card</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="tel"
                        type="text"
                        placeholder="tel"
                        name="tel"
                        required
                        value={this.state.tel}
                        onChange={this.handleInputChange}
                      />
                      <label for="studentType">Contact Number</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Enter address"
                        value={this.state.address}
                        onChange={this.handleInputChange}
                      />
                      <label for="floatingPassword">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={this.state.password}
                        onChange={this.handleInputChange}
                      />
                      <label for="repeatPassword">Password</label>
                    </div>

                    <div className="form-group">
                      <button
                        className="btn btn-primary float-end"
                        id="regidter"
                        type="button"
                        name="registerSubmit"
                        onClick={this.onSubmit}
                        style={{}}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
                <div className="">
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditProfile;
