import React, { useEffect, useState } from 'react';
require('dotenv').config();
import axios from 'axios';
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import '../../../assets/student/scrollable-div.css';

const App = (props) => {

    const { id } = useParams();
    const [student, setStudent] = useState([]);
    const [group, setGroup] = useEffect([]);
    const [wordEntered, setWordEntered] = useState("");

    const [state, setState] = useState({
        groupName: "",
        groupLeader: "",
        firstMember: "",
        secondMember: "",
        thirdMember: "",
        groupTopic: "",
        groupEmail: "",
    });

    //destructure values from state
    const {
        groupName,
        groupLeader,
        firstMember,
        secondMember,
        thirdMember,
        groupTopic,
        groupEmail,
    } = state;

    const handleSubmit = event => {
        event.preventDefault()
        console.table({ firstName, middleName, lastName, mobileNumber, email, DOB, address, NIC, type, accountStatus, profileURL })
        axios
            .put(`http://localhost:8000/employee/update/${props.match.params.id}`, { firstName, middleName, lastName, mobileNumber, email, DOB, address, NIC, type, accountStatus, profileURL })
            .then(response => {

                console.log(response)
                const { firstName, middleName, lastName, mobileNumber, email, DOB, address, NIC, type, accountStatus, profileURL } = response.data

                //empty state
                setState({ ...state, firstName, middleName, lastName, mobileNumber, email, DOB, address, NIC, type, accountStatus, profileURL });
                //show success alert
                // alert(`Staff Member ${firstName} is Updated`);
                Swal.fire(
                    `Staff Member ${firstName} is Updated`,
                    'Click Ok to continue',
                    'success'
                )
            })
            .catch(error => {
                console.log(error.Response)
                // alert(error.response.data.error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.response.data.error}`,
                    footer: 'Please try again'
                })
            })
    };


    const fetchStudent = () => {
        axios.get(`${process.env.BACKEND_API_AZURE}/student/${id}`)
            .then(response => {
                console.log(response)
                setStudent(response.data);
            })
            .catch(error => console.log(error));
    }

    function handleChange(name) {
        return function (event) {
            setState({ ...state, [name]: event.target.value });
        };
    }

    useEffect(() => {
        fetchStudent()
    }, [])

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div style={{ position: "absolute" }}>
                <div className="card scrollable-div" style={{ width: "100%", height: "590px" }}>
                    <div className="card-body">
                        <h1 align="center">Registred Stundets</h1>
                        <div className="row">
                            <div class="col">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className="form-group">
                                            <label className="text-muted">Group Name</label>
                                            <input onChange={handleChange('groupName')} value={groupName} type="text" className="form-control" placeholder="Enter Group Name" required />
                                        </div>

                                        <br />

                                        <div className="form-group">
                                            <label className="text-muted">Group Topic</label>
                                            <input onChange={handleChange('groupTopic')} value={groupTopic} type="text" className="form-control" placeholder="Enter Group Topic" required />
                                        </div>

                                        <br />

                                        <div className="form-group">
                                            <label className="text-muted">Group Email Address</label>
                                            <input onChange={handleChange('groupEmail')} value={groupEmail} type="email" className="form-control" placeholder="Enter Group Email Address" required />
                                        </div>

                                        <br />

                                        <div className="form-group">
                                            <label className="text-muted"> Select Group Leader</label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <select

                                                onChange={handleChange("groupLeader")}
                                                name="groupLeader"
                                                id="groupLeader"
                                                style={{
                                                    width: "400px",
                                                    color: "blue",
                                                    position: "relative",
                                                    border: "1px solid transparent"
                                                }}
                                                required>
                                                <option value="" disabled selected>Select the Group Leader</option>
                                                {student.map((student, i) => (
                                                    <option key={i} value={student._id} >
                                                        {student.fullName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="text-muted"> Select Group Member 1</label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <select
                                                onChange={handleChange("firstMember")}
                                                name="firstMember"
                                                id="firstMember"
                                                style={{
                                                    width: "400px",
                                                    color: "blue",
                                                    position: "relative",
                                                    border: "1px solid transparent"
                                                }}
                                                required>
                                                <option value="" disabled selected>Select Group Member 1</option>
                                                {student.map((student, i) => (
                                                    <option key={i} value={student._id} >
                                                        {student.fullName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label className="text-muted"> Select Group Member 2</label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <select
                                                onChange={handleChange("secondMember")}
                                                name="secondMember"
                                                id="secondMember"
                                                style={{
                                                    width: "400px",
                                                    color: "blue",
                                                    position: "relative",
                                                    border: "1px solid transparent"
                                                }}
                                                required>
                                                <option value="" disabled selected>Select Group Member 2</option>
                                                {student.map((student, i) => (
                                                    <option key={i} value={student._id} >
                                                        {student.fullName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="row">
                                            <div className="form-group">
                                                <label className="text-muted"> Select Group Member 3</label>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <select
                                                    onChange={handleChange("thirdMember")}
                                                    name="thirdMember"
                                                    id="thirdMember"
                                                    style={{
                                                        width: "400px",
                                                        color: "blue",
                                                        position: "relative",
                                                        border: "1px solid transparent"
                                                    }}
                                                    required>
                                                    <option value="" disabled selected>Select Group Member 3</option>
                                                    {student.map((student, i) => (
                                                        < option key={i} value={student._id} >
                                                            {student.fullName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <br />
                                        <div>
                                            <button className="btn btn-primary btn-lg btn-block">Register</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col">
                                <div>
                                    <center><h3 className="mb-4">Guideline & Rules<br className="d-none d-lg-inline" /></h3></center>
                                    <p className="lead text-muted">Make your project Team easily with get the pre-approval from your Lecture in Charge on few clicks!</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default App;