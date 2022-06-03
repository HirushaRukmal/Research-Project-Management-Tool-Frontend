import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import '../../../assets/student/scrollable-div.css';


const App = props => {

    const { id } = useParams();
    const [student, setStudent] = useState([]);


    const [state, setState] = useState({
        fullName: "",
        sliitId: "",
        sliitEmail: "",
        personalEmail: "",
        contactNo: "",
        studentType: "",
        groupStatus: "",
        password: "",
    });

    //destructure values from state
    const {
        fullName,
        sliitId,
        sliitEmail,
        personalEmail,
        contactNo,
        studentType,
        groupStatus,
        password,
    } = state;

    function handleChange(name) {
        return function (event) {
            setState({ ...state, [name]: event.target.value });
        };
    }


    const fetchStudents = () => {
        console.log("WORKING");
        axios.get(`${process.env.BACKEND_API_AZURE}/student/`)
            .then(response => {
                console.log(response);
                setStudent(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchStudents();
        axios
            .get(`${process.env.BACKEND_API_AZURE}/student/${id}`)
            .then(response => {
                console.log(response)
                const { groupName,
                    fullName,
                    sliitId,
                    sliitEmail,
                    personalEmail,
                    contactNo,
                    studentType,
                    groupStatus,
                    password, } = response.data
                setState({
                    ...state, groupName,
                    fullName,
                    sliitId,
                    sliitEmail,
                    personalEmail,
                    contactNo,
                    studentType,
                    groupStatus,
                    password,
                });
            })
            .catch(error => console.log('Error Loading Update Student: ' + error));
    }, []);

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div class="row">
                <div class="col">
                    <div className="form-group">
                        <label className="text-muted">Full Name</label>
                        <input onChange={handleChange('fullName')} value={fullName} type="text" className="form-control" placeholder="Enter the First Name" pattern="^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$" title="Invalid Input for Full Name" required />
                    </div>
                </div>
                <div class="col">
                    <div className="form-group">
                        <label className="text-muted">SLIIT ID</label>
                        <input onChange={handleChange('sliitId')} value={sliitId} type="text" className="form-control" placeholder="Enter the Middle Name" pattern="[A-Za-z0-9]{10}" title="Invalid Studnt Number." required />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div className="form-group">
                        <label className="text-muted">SLIIT Email Address</label>
                        <input onChange={handleChange('sliitEmail')} value={sliitEmail} type="email" className="form-control" placeholder="Enter the SLIIT Email Address" required />
                    </div>
                </div>
                <div class="col">
                    <div className="form-group">
                        <label className="text-muted">Personal Email Address</label>
                        <input onChange={handleChange('personalEmail')} value={personalEmail} type="email" className="form-control" placeholder="Enter the Personal Email Address" required />
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col">
                    <div className="form-group">
                        <label className="text-muted">Contact Number</label>
                        <input onChange={handleChange('contactNo')} value={contactNo} type="text" className="form-control" placeholder="Enter the Contact Number" pattern="[0-9]{10}" title="Invalid Mobile Number." required />
                    </div>
                </div>
                <div class="col">
                    <div className="form-group">
                        <label className="text-muted">Student Type</label>
                        <select id="studentType" value={studentType} onChange={handleChange("studentType")} className="form-control" required>
                            <option value="Regular">Regular</option>
                            <option value="Prorata">Prorata</option>
                            <option value="Repeat">Repeat</option>
                        </select>
                    </div>
                </div>
                <div class="col">
                    <div className="form-group">
                        <label className="text-muted">Group Status</label>
                        <select id="groupStatus" value={groupStatus} onChange={handleChange("groupStatus")} className="form-control" required>
                            <option value="true">I have a group</option>
                            <option value="false">I don't have a group</option>
                        </select>
                    </div>
                </div>
            </div>
            <br />
            <div>

                <button className="btn btn-primary btn-lg btn-block">Update</button>
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
            fullName,
            sliitId,
            sliitEmail,
            personalEmail,
            contactNo,
            studentType,
            groupStatus,
            password,
        })
        axios
            .put(`${process.env.BACKEND_API_AZURE}/student/${id}`, {
                fullName,
                sliitId,
                sliitEmail,
                personalEmail,
                contactNo,
                studentType,
                groupStatus,
                password,
            })
            .then(response => {

                console.log(response)
                const { groupName,
                    fullName,
                    sliitId,
                    sliitEmail,
                    personalEmail,
                    contactNo,
                    studentType,
                    groupStatus,
                    password, } = response.data

                //empty state
                setState({
                    ...state, fullName,
                    sliitId,
                    sliitEmail,
                    personalEmail,
                    contactNo,
                    studentType,
                    groupStatus,
                    password,
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

        <div>
            <Navbar />
            <Sidebar />
            <div>
                <div className="container" style={{ marginTop: "100px", margineLeft: "200px" }}>
                    <div className="card">
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
                </div>
            </div>
        </div>

    )
}

export default App;