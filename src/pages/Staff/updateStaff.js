import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../admin/Navbar";
import Sidebar from "../admin/Sidebar";

const App = (props) => {
  const { id } = useParams();
  const [staff, setStaff] = useState([]);

  const [state, setState] = useState({
    fName: "",
    mName: "",
    lName: "",
    email: "",
    dob: "",
    nic: "",
    tel: "",
    address: "",
    type: "",
    password: "",
  });

  //destructure values from state
  const { fName, mName, lName, email, dob, nic, tel, address, type, password } =
    state;

  function handleChange(name) {
    return function (event) {
      setState({ ...state, [name]: event.target.value });
    };
  }

  const fetchStaff = () => {
    console.log("WORKING");
    axios
      .get(`http://localhost:8000/staff/profiles/`)
      .then((response) => {
        console.log("All", response);
        setStaff(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchStaff();
    axios
      .get(`http://localhost:8000/staff/profile/${id}`)
      .then((response) => {
        console.log("user", response);
        const {
          fName,
          mName,
          lName,
          email,
          dob,
          nic,
          tel,
          address,
          type,
          password,
        } = response.data.profile;
        setState({
          ...state,
          fName,
          mName,
          lName,
          email,
          dob,
          nic,
          tel,
          address,
          type,
          password,
        });
      })
      .catch((error) => console.log("Error Loading Update Student: " + error));
  }, []);

  function handleChange(name) {
    return function (event) {
      setState({ ...state, [name]: event.target.value });
    };
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.table({
      fName,
      mName,
      lName,
      email,
      dob,
      nic,
      tel,
      address,
      type,
      password,
    });
    axios
      .put(`http://localhost:8000/staff/profile/update/${id}`, {
        fName,
        mName,
        lName,
        email,
        dob,
        nic,
        tel,
        address,
        type,
        password,
      })
      .then((response) => {
        console.log(response);
        const {
          fName,
          mName,
          lName,
          email,
          dob,
          nic,
          tel,
          address,
          type,
          password,
        } = response.data;

        //empty state
        setState({
          ...state,
          fName,
          mName,
          lName,
          email,
          dob,
          nic,
          tel,
          address,
          type,
          password,
        });

        Swal.fire(`Profile Updated`, "Click Ok to continue", "success");
        setTimeout(() => {
          window.location.href = "/staff/dashboard";
        }, 1000);
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
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="card">
        <div className="card-body p-lg-5" style={{ marginLeft: "80px" }}>
          <h3 className="mb-4">Edit {fName} profile details</h3>
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
                    onChange={handleChange("fName")}
                    value={fName}
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
                    onChange={handleChange("mName")}
                    value={mName}
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
                    onChange={handleChange("lName")}
                    value={lName}
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
                    onChange={handleChange("email")}
                    value={email}
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
                    onChange={handleChange("nic")}
                    value={nic}
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
                    onChange={handleChange("tel")}
                    value={tel}
                  />
                  <label for="studentType">Contact Number</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Enter address"
                    onChange={handleChange("address")}
                    value={address}
                  />
                  <label for="floatingPassword">Address</label>
                </div>
                <div className="form-floating mb-3">
                  Type{" "}
                  <select
                    className="form-floating mb-3 "
                    onChange={handleChange("type")}
                    value={type}
                    required
                    style={{ width: "200px", paddingLeft: "10px" }}
                  >
                    <option value="Supervisor">Supervisor</option>
                    <option value="Co-Supervisor">Co Supervisor</option>
                    <option value="Panel Member">Panel Member</option>
                  </select>
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-primary float-end"
                    id="regidter"
                    type="button"
                    name="registerSubmit"
                    onClick={handleSubmit}
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
  );
};

export default App;
