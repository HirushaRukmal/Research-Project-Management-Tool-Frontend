import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../pages/admin/Navbar";
import Sidebar from "../../pages/admin/Sidebar";

const App = (props) => {
  const { id } = useParams();
  const [staff, setStaff] = useState([]);

  const [state, setState] = useState({
    Submission_Topic: "",
    Deadline: "",
    Description: "",
  });

  //destructure values from state
  const { Submission_Topic, Deadline, Description } = state;

  function handleChange(name) {
    return function (event) {
      setState({ ...state, [name]: event.target.value });
    };
  }

  const fetchStaff = () => {
    console.log("WORKING");
    axios
      .get(`http://localhost:8000/admin/`)
      .then((response) => {
        // console.log("All", response);
        setStaff(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchStaff();
    axios
      .get(`http://localhost:8000/admin/edit-submission/${id}`)
      .then((response) => {
        console.log("user", response);
        console.log("data", response.data.Submission_Topic);
        const { Submission_Topic, Deadline, Description } = response.data;
        setState({
          ...state,
          Submission_Topic,
          Deadline,
          Description,
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
      Submission_Topic,
      Deadline,
      Description,
    });
    axios
      .put(`http://localhost:8000/admin/update-submission/${id}`, {
        Submission_Topic,
        Deadline,
        Description,
      })
      .then((response) => {
        console.log(response);
        const { Submission_Topic, Deadline, Description } = response.data;

        //empty state
        setState({
          ...state,
          Submission_Topic,
          Deadline,
          Description,
        });

        Swal.fire(`Submission Updated`, "Click Ok to continue", "success");
        setTimeout(() => {
          window.location.href = "/admin/subtypelist";
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
          <h3 className="mb-4">Edit Submission details</h3>
          <p className="text-muted text-sm mb-5">
            Please fill submission detail to update submission type.
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
                    onChange={handleChange("Submission_Topic")}
                    value={Submission_Topic}
                    pattern="[A-Za-z]+"
                    title="Characters can only be A-Z and a-z."
                    required
                  />
                  <label for="Submission_Topic">Submission Topic</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="mName"
                    placeholder="Enter Last Name"
                    onChange={handleChange("Deadline")}
                    value={Deadline}
                    pattern="[A-Za-z]+"
                    title="Characters can only be A-Z and a-z."
                    required
                  />
                  <label for="Deadline">Deadline</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="lName"
                    placeholder="Enter Last Name"
                    onChange={handleChange("Description")}
                    value={Description}
                    pattern="[A-Za-z]+"
                    title="Characters can only be A-Z and a-z."
                    required
                  />
                  <label for="Description"> Description</label>
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
