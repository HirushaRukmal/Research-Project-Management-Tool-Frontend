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
        axios.get(`${process.env.BACKEND_API_LOCAL}`)
            .then(response => {
                console.log(response)
                const newFilter = group.filter((response) => {
                    return response.groupName.toLowerCase().includes(searchWord.toLowerCase()) ||
                        response.groupLeader.toLowerCase().includes(searchWord.toLowerCase()) ||
                        response.groupEmail.toLowerCase().includes(searchWord.toLowerCase()) ||
                        response.groupTopic.toLowerCase().includes(searchWord.toLowerCase());
                });

                if (searchWord === "") {
                    console.log("EMPLTY");
                    fetchGroup();
                } else {
                    setGroup(newFilter);
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div>
                <div className="card" style={{ marginLeft: "90px", width: "95%", height: "590px" }}>
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
                                            <span><h3>Number of Groups</h3></span>
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

                        <div className="scrollable-div" style={{ marginLeft: "10px", width: "95%" }}>
                            <table id="table" class="table" responsive className="table table-hover" style={{ marginTop: '40px', marginLeft: '20px' }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Group ID</th>
                                        <th>Gorup Name</th>
                                        <th>Group Leader</th>
                                        <th>First Member</th>
                                        <th>Second Member</th>
                                        <th>Third Member</th>
                                        <th>Group Topic</th>
                                        <th>Group Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.map((group, i) => (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>

                                            <a href={`#`} style={{ textDecoration: 'none' }}>
                                                <td>{group._id}</td>
                                            </a>

                                            <td>{group.groupName}</td>
                                            <td>{group.groupLeader}</td>
                                            <td>{group.firstMember}</td>
                                            <td>{group.secondMember}</td>
                                            <td>{group.thirdMember}</td>
                                            <td>{group.groupTopic}</td>
                                            <td>{group.groupEmail}</td>
                                            <td>
                                                <a className="" href={`/update-student/${group._id}`}>
                                                    <i className="fas fa-edit"></i>&nbsp;
                                                </a>
                                                &nbsp;&nbsp;&nbsp;
                                                <a className="" href="#" onClick={() => deleteStudent(group._id)}>
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