import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

const App = props => {

    const { id } = useParams();
    const [student, setStudent] = useState([]);


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

    function handleChange(name) {
        return function (event) {
            setState({ ...state, [name]: event.target.value });
        };
    }


    const fetchStudents = () => {
        console.log("WORKING");
        axios.get(`${process.env.BACKEND_API_LOCAL}/student/`)
            .then(response => {
                console.log(response)
                setStudent(response.data)
                if (response.data != null) {
                    studentMap(response.data);
                }
                else {
                    console.log("Student null");
                    if (student.length != 0) {
                        studentMap(response.data);
                    }
                    else {
                        console.log("Student null");
                    }
                }
            })
            .catch(error => {
                console.log(error);
                // alert("Error Fetching Student Details")
            });
    }

    useEffect(() => {
        fetchStudents();
        axios
            .get(`${process.env.BACKEND_API_LOCAL}/student/${id}`)
            .then(response => {
                console.log(response)
                const { groupName,
                    groupLeader,
                    firstMember,
                    secondMember,
                    thirdMember,
                    groupTopic,
                    groupEmail, } = response.data
                setState({
                    ...state, groupName,
                    groupLeader,
                    firstMember,
                    secondMember,
                    thirdMember,
                    groupTopic,
                    groupEmail,
                });
            })
            .catch(error => console.log('Error Loading Update Student: ' + error));
    }, []);

    const showUpdateForm = () => (
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
    )

    function handleChange(name) {
        return function (event) {
            setState({ ...state, [name]: event.target.value });
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        console.table({
            groupName,
            groupLeader,
            firstMember,
            secondMember,
            thirdMember,
            groupTopic,
            groupEmail,
        })
        axios
            .patch(`${process.env.BACKEND_API_LOCAL}/student/${id}`, {
                groupName,
                groupLeader,
                firstMember,
                secondMember,
                thirdMember,
                groupTopic,
                groupEmail,
            })
            .then(response => {

                console.log(response)
                const { groupName,
                    groupLeader,
                    firstMember,
                    secondMember,
                    thirdMember,
                    groupTopic,
                    groupEmail, } = response.data

                //empty state
                setState({
                    ...state, groupName,
                    groupLeader,
                    firstMember,
                    secondMember,
                    thirdMember,
                    groupTopic,
                    groupEmail,
                });

                Swal.fire(
                    `Student under Registration Number ${id} is Updated`,
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

    return (

        <div className="container card">
            <div className="card-body">
                <div className="card bg-light mb-3">
                    <div className="card-body">
                        <h1 align="center">Update Stuednt Details</h1>
                        <br />
                        {showUpdateForm()}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default App;