import React, { useEffect, useState } from 'react';
require('dotenv').config();
import axios from 'axios';
import Swal from "sweetalert2";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import '../../../assets/student/scrollable-div.css';

const App = () => {

    const [group, setGroup] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [count, setCount] = useState([]);

    const fetchGroup = () => {
        axios.get(`${process.env.BACKEND_API_LOCAL}/group/`)
            .then(response => {
                console.log(response)
                setGroup(response.data);
                setCount(response.data.length);
            })
            .catch(error => console.log(error));
    }

    const deleteStudent = (groupId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this Student?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            console.log("FIRED");
            if (result.isConfirmed) {
                console.log("CONFIRMED");
                axios
                    .delete(`${process.env.BACKEND_API_LOCAL}/group/${groupId}`)
                    .then(response => {
                        // alert(response.data.message);
                        Swal.fire(
                            `Group under Group ID ${groupId} is Deleted`,
                            `${response.data.message}`,
                            'success'
                        )
                        fetchGroup();
                    })
                    .catch(error => console.log(error));
            }
        })
    }

    useEffect(() => {
        fetchGroup()
    }, [])

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        console.log(searchWord);
        setWordEntered(searchWord);
        axios.get(`${process.env.BACKEND_API_LOCAL}/student/`)
            .then(response => {
                console.log(response)
                const newFilter = student.filter((response) => {
                    return response.fullName.toLowerCase().includes(searchWord.toLowerCase()) ||
                        response.sliitId.toLowerCase().includes(searchWord.toLowerCase()) ||
                        response.sliitEmail.toLowerCase().includes(searchWord.toLowerCase()) ||
                        response.personalEmail.toLowerCase().includes(searchWord.toLowerCase()) ||
                        response.contactNo.toLowerCase().includes(searchWord.toLowerCase()) ||
                        response.studentType.toLowerCase().includes(searchWord.toLowerCase());
                });

                if (searchWord === "") {
                    console.log("EMPLTY");
                    fetchStudent();
                } else {
                    setStudent(newFilter);
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div style={{ position: "absolute" }}>
                <div className="card scrollable-div" style={{ width: "100%", height: "590px" }}>
                    <div className="card-body">
                        <h1 align="center">Registred Stundets</h1>
                        <br />
                        <div>
                            <center>
                                <div
                                    className="border border-info"
                                    style={{
                                        width: "80%",
                                        backgroundColor: "white",
                                        borderRadius: "10px",
                                        borderColor: "#00408C",
                                        padding: "20px 20px 20px 20px",
                                        margin: "10px 0px 0px 0px",
                                        align: "center"
                                    }}
                                >
                                    <div className="row">
                                        <div className="col">
                                            <span style={{ color: "blue" }}><h3>{count}</h3></span>
                                            <span><h3>Number of Students</h3></span>
                                        </div>
                                    </div>
                                </div>
                                <form style={{ marginTop: '40px', marginLeft: '20px', marginRight: '40px', width: "100%" }}>
                                    <div className="col-lg-3 mt-2 mb-2">
                                        <input
                                            className="form-control"
                                            type="search"
                                            placeholder="Search"
                                            value={wordEntered}
                                            onChange={handleFilter}
                                        />
                                    </div>
                                    <div>
                                        <div>
                                            <ReactHTMLTableToExcel
                                                className='btn btn-outline-success'
                                                table='table'
                                                filename='Students Excel'
                                                sheet='Sheet'
                                                buttonText='Download Excel Sheet'
                                            />
                                        </div>
                                    </div>
                                </form>

                            </center>
                        </div>

                        <div className=" scrollable-div">
                            <table id="table" class="table" responsive className="table table-hover" style={{ marginTop: '40px', marginLeft: '20px', width: '95%' }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Registered ID</th>
                                        <th>Student Name</th>
                                        <th>SLIIT ID</th>
                                        <th>SLIIT Email</th>
                                        <th>Personal Email</th>
                                        <th>Contact Number</th>
                                        <th>Stuednt Type</th>
                                        <th>Group Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.map((student, i) => (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>

                                            <a href={`#`} style={{ textDecoration: 'none' }}>
                                                <td>{student._id}</td>
                                            </a>

                                            <td>{student.fullName}</td>
                                            <td>{student.sliitId}</td>
                                            <td>{student.sliitEmail}</td>
                                            <td>{student.personalEmail}</td>
                                            <td>{student.contactNo}</td>
                                            <td>{student.studentType}</td>
                                            <td>{student.groupStatus.toString()}</td>
                                            <td>
                                                <a className="" href={`/update-student/${student._id}`}>
                                                    <i className="fas fa-edit"></i>&nbsp;
                                                </a>
                                                &nbsp;&nbsp;&nbsp;
                                                <a className="" href="#" onClick={() => deleteStudent(student._id)}>
                                                    <i className="far fa-trash-alt"></i>&nbsp;
                                                </a>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <br />

                    </div>
                </div>
            </div>
        </div>
    )
};

export default App;