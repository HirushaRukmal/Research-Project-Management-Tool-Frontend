import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Header from '../../../components/student/Navbar';

const App = () => {

    const [supervisorList, setSupervisorList] = useState([]);

    const [state, setState] = useState({
        supervisor: "",
        co_supervisor: "",
    });

    const {
        supervisor,
        co_supervisor,
    } = state;

    function handleChange(name) {
        return function (event) {
            setState({ ...state, [name]: event.target.value });
        };
    }

    const fetchSupervisor = () => {
        console.log("WORKING");
        axios.get(`${process.env.BACKEND_API_LOCAL}/staff/profiles`)
            .then(response => {
                console.log(response)
                setSupervisorList(response.data.existingProfile);
                console.log(supervisorList);
            })
            .catch(error => {
                console.log(error);
                // alert("Error Fetching Student Details")
            });
    }

    useEffect(() => {
        fetchSupervisor();
    }, [])

    return (
        <div>
            <Header />
            <div className='container'>
                <br />
                <center><h1>Supervisor & Co-Supervisor</h1><br /></center>
                <br />

                <form>
                    <div className="row">
                        <div class="col">
                            <center>
                                <p>Please request your supervisor and co-supervisor</p>
                            </center>
                            <div className="form-group">
                                <label className="text-muted"> Supervisor</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <select
                                    onChange={handleChange("supervisor")}
                                    name="supervisor"
                                    id="supervisor"
                                    style={{
                                        width: "400px",
                                        color: "blue",
                                        position: "relative",
                                        border: "1px solid transparent"
                                    }}
                                    required>
                                    <option value="" disabled selected>Select a Supervisor</option>
                                    {supervisorList.map((supervisorList, i) => (
                                        <option key={i} value={supervisorList._id} >
                                            {supervisorList.fName + " " + supervisorList.lName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Co-Supervisor</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <select
                                    onChange={handleChange("co_supervisor")}
                                    name="co_supervisor"
                                    id="co_supervisor"
                                    style={{
                                        width: "400px",
                                        color: "blue",
                                        position: "relative",
                                        border: "1px solid transparent"
                                    }}
                                    required>
                                    {/* <option value="" disabled selected>Select a co-supervisor</option>
                                    {supervisorList.map((supervisorList, i) => (
                                        <option key={i} value={supervisorList._id} >
                                            {supervisorList.fName + " " + lName}
                                        </option>
                                    ))} */}
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <center><h3 className="mb-4">Guideline & Rules<br className="d-none d-lg-inline" /></h3></center>
                                <p className="lead text-muted">Make your project Team easily with get the pre-approval from your Lecture in Charge on few clicks!</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-lg btn-block">Request</button>
                    </div>
                </form>

            </div >
        </div>
    )

}

export default App;