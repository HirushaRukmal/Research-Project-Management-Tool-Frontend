import React, { useEffect, useState } from 'react';
require('dotenv').config();
import axios from 'axios';
import Swal from "sweetalert2";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const App = () => {

    const [student, setStudent] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [count, setCount] = useState([]);

    const fetchStudent = () => {
        axios.get(`${process.env.BACKEND_API_LOCAL}/student/`)
            .then(response => {
                console.log(response)
                setStudent(response.data);
                setCount(response.data.length);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchStudent()
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
                        response.studentType.toLowerCase().includes(searchWord.toLowerCase()) ||
                        response.groupStatus.toLowerCase().includes(searchWord.toLowerCase());
                });

                if (searchWord === "") {
                    console.log("EMPLTY");
                    fetchStudent();
                } else {
                    fetchStudent(newFilter);
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <div className="card" >
                <div className="card-body">
                    <h1 align="center">Registred Stundets</h1>
                    <br />
                    <div>
                        <center>
                            <div
                                className="border border-info"
                                style={{
                                    width: "100%",
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
                                    {/* <div className="col">
                                        <h3>{count}</h3>
                                    </div> */}
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
                            </form>
                        </center>
                    </div>


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
                                    <td>{student.mobileNumber}</td>
                                    <td>{student.studentType}</td>
                                    <td>{student.groupStatus.toString()}</td>
                                    <td>
                                        <a className="" href={`/updateStaffMember/${student.employeeId}`}>
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </a>
                                        &nbsp;
                                        <a className="" href="#" onClick={() => deleteStudent(student.employeeId)}>
                                            <i className="far fa-trash-alt"></i>&nbsp;
                                        </a>
                                        &nbsp;
                                        <a href={`/attendance/${student.employeeId}`} style={{ textDecoration: 'none' }}>
                                            <i class="fas fa-calendar-week"></i>&nbsp;
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <div style={{ marginTop: '', marginLeft: "1030px" }}>
                        <ReactHTMLTableToExcel
                            className='btn btn-outline-success'
                            table='table'
                            filename='Students Excel'
                            sheet='Sheet'
                            buttonText='Download Excel Sheet'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default App;