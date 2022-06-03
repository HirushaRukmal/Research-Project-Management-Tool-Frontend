import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../../components/student/Navbar';
require('dotenv').config();

const App = () => {

    const [student, setStudent] = useState([]);
    const [groupLeaderEmail, setGroupLeaderEmail] = useState("");
    var stdList = new Map([]);
    const [updateStudent, setUpdateStuednt] = useState([]);

    const [state, setState] = useState({
        groupName: "",
        groupLeader: "",
        firstMember: "",
        secondMember: "",
        thirdMember: "",
        groupTopic: "",
    });

    //destructure values from state
    const {
        groupName,
        groupLeader,
        firstMember,
        secondMember,
        thirdMember,
        groupTopic,
    } = state;

    function handleChange(name) {
        return function (event) {
            setState({ ...state, [name]: event.target.value });
        };
    }

    const updateGroupStatus = () => {
        var array = [];
        array.push(groupLeader);
        array.push(firstMember);
        array.push(secondMember);
        array.push(thirdMember);
        for (let x = 0; x < array.length; x++) {

            axios.get(`${process.env.BACKEND_API_LOCAL}/student/${array[x]}`)
                .then(response => {
                    console.log(response)
                    setUpdateStuednt(response.data)
                })
                .catch(error => {
                    console.log(error);
                });

            const fullName = updateStudent.fullName;
            const sliitId = updateStudent.sliitId;
            const sliitEmail = updateStudent.sliitEmail;
            const personalEmail = updateStudent.personalEmail;
            const contactNo = updateStudent.contactNo;
            const studentType = updateStudent.studentType;
            const groupStatus = true;

            axios
                .patch(`${process.env.BACKEND_API_LOCAL}/student/${array[x]}`, { fullName, sliitId, sliitEmail, personalEmail, contactNo, studentType, groupStatus })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.Response)
                })
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.table({
            groupName,
            groupLeader,
            firstMember,
            secondMember,
            thirdMember,
            groupTopic,
            groupLeaderEmail,
        });

        axios
            .post(`${process.env.BACKEND_API_LOCAL}/group/`, {
                groupName,
                groupLeader,
                firstMember,
                secondMember,
                thirdMember,
                groupTopic,
            })
            .then((response) => {
                console.log(response);
                updateGroupStatus();
                //show success alert
                // alert(`Employee ${response.data.firstName} is Created`);
                Swal.fire(
                    `Group ${groupName} is Created`,
                    'Click Ok to continue',
                    'success'
                )
                //empty state
                setState({
                    ...state,
                    groupName: "",
                    groupLeader: "",
                    firstMember: "",
                    secondMember: "",
                    thirdMember: "",
                    groupTopic: "",
                });
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

    const studentMap = (response) => {
        response.map((student, i) => {
            key = i
            console.log(key);
            console.log(student.fullName);
            console.log(student._id);
            stdList.set(student.fullName, student._id);
        })
        console.log(stdList);

    }

    useEffect(() => {
        fetchStudents();
        console.log(typeof options);
        console.log(typeof stdList);
    }, [])

    return (
        <div>
            <Header />
            <div className='container'>
                <br />
                <center><h1>Project Group Registration</h1><br /></center>
                <br />

                <div className="row">
                    <div class="col">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="form-group">
                                    <label className="text-muted">Group Name</label>
                                    <input onChange={handleChange('groupName')} value={groupName} type="text" className="form-control" placeholder="Enter Group Name" pattern="[A-Za-z]+" title="Characters can only be A-Z and a-z" required />
                                </div>

                                <br />

                                <div className="form-group">
                                    <label className="text-muted">Group Topic</label>
                                    <input onChange={handleChange('groupTopic')} value={groupTopic} type="text" className="form-control" placeholder="Enter Group Topic" pattern="[A-Za-z]+" title="Characters can only be A-Z and a-z" required />
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
                            <center><h1 className="mb-4">Guideline & Rules<br className="d-none d-lg-inline" /></h1></center>
                            <p className="lead text-muted">Make your project Team easily with get the pre-approval from your Lecture in Charge on few clicks!</p>
                        </div>
                    </div>
                </div>

            </div >

        </div >
    )

}

export default App;