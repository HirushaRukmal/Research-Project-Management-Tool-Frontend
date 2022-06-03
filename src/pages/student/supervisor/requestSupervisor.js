import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../../components/student/Navbar';
import { getStudentId } from '../../../services/SessionManager';

const App = () => {

    const [supervisorList, setSupervisorList] = useState([]);
    const [coSupervisorList, setCoSupervisorList] = useState([]);
    const [groupId, setGroupId] = useState("");

    const [state, setState] = useState({
        supervisorId: "",
        coSupervisorId: "",
        status: false,
    });

    const {
        supervisorId,
        coSupervisorId,
        status,
    } = state;

    function handleChange(name) {
        return function (event) {
            setState({ ...state, [name]: event.target.value });
        };
    }

    const fetchGruopId = () => {
        axios.get(`${process.env.BACKEND_API_LOCAL}/group/groupData/${getStudentId()}`)
            .then(response => {
                console.log(response.data)
                setGroupId(response.data._id)
            })
            .catch(error => {
                console.log(error);
            });
    }

    const fetchSupervisor = () => {
        console.log("WORKING");
        axios.get(`${process.env.BACKEND_API_LOCAL}/staff/profiles/supervisor`)
            .then(response => {
                console.log(response)
                setSupervisorList(response.data.profile);
                console.log(supervisorList);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`${process.env.BACKEND_API_LOCAL}/staff/profiles/co-supervisor`)
            .then(response => {
                console.log(response)
                setCoSupervisorList(response.data.profile);
                console.log(coSupervisorList);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchSupervisor();
        fetchGruopId();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.table({
            groupId,
            supervisorId,
            coSupervisorId,
            status,
        });

        axios
            .post(`${process.env.BACKEND_API_LOCAL}/supervisor-group/`, {
                groupId,
                supervisorId,
                coSupervisorId,
                status,
            })
            .then((response) => {
                console.log(response);
                Swal.fire(
                    `Supervisor/Co-Supervisor Request Sent!`,
                    'Click Ok to continue',
                    'success'
                )
                //empty state
                setState({
                    ...state,
                    supervisorId: "",
                    coSupervisorId: "",
                    status: "",
                });

                setGroupId("");
            })
            .catch((error) => {
                console.log(error.Response);
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.error}`,
                    // text: `${error.response.data.error}`,
                    footer: 'Please try again'
                })
                // alert(error.response.data.error);
            });
    };

    return (
        <div>
            <Header />
            <div className='container'>
                <br />
                <center><h1>Supervisor & Co-Supervisor</h1><br /></center>
                <br />

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div class="col">
                            <center>
                                <p>Please request your supervisor and co-supervisor</p>
                            </center>
                            <div className="form-group">
                                <label className="text-muted"> Supervisor</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <select
                                    onChange={handleChange("supervisorId")}
                                    name="supervisorId"
                                    id="supervisorId"
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
                                    onChange={handleChange("coSupervisorId")}
                                    name="coSupervisorId"
                                    id="coSupervisorId"
                                    style={{
                                        width: "400px",
                                        color: "blue",
                                        position: "relative",
                                        border: "1px solid transparent"
                                    }}
                                    required>
                                    <option value="" disabled selected>Select a co-supervisor</option>
                                    {coSupervisorList.map((coSupervisorList, i) => (
                                        <option key={i} value={coSupervisorList._id} >
                                            {coSupervisorList.fName + " " + coSupervisorList.lName}
                                        </option>
                                    ))}
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