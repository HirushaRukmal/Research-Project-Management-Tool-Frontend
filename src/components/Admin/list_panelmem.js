import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import PmTableRow from "./pmTableRow";
import Navbar from "../../pages/admin/Navbar";
import Sidebar from "../../pages/admin/Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default class panelMemberlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
        allocatepanelmembers: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/admin/show")
      .then((res) => {
        this.setState({
            allocatepanelmembers: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  DataTable() {
    return this.state.allocatepanelmembers.map((res, i) => {
      return <PmTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="container">
          <h2>Student Group's Panel Members</h2>
          <br />
          <p>
            <button className="btn btn-primary">
              <a href="/admin/allocate-pm" className="text-decoration-none text-white">
                Add Panel Member
              </a>
            </button>

            <div style={{ marginTop: "-38px", marginLeft: "230px" }}>
              <ReactHTMLTableToExcel
                className="btn btn-outline-success"
                table="table"
                filename="Panel Member Details"
                sheet="Sheet"
                buttonText="Generate Sheet"
              />
            </div>

            <div
              className="float-end"
              style={{ marginTop: "-30px", marginLeft: "190px" }}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search here"
                name="searchQuery"
              ></input>
            </div>
          </p>
          <Table id="table" class="table">
            <thead>
              <tr>
                <th scope="col">Panel Member</th>
                <th scope="col">Panel Member Email</th>
                <th scope="col">Group</th>
                <th scope="col">Group Leader Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{this.DataTable()}</tbody>
          </Table>
          <p>
            <b>Panel members allocated groups total: {this.state.allocatepanelmembers.length}</b>
          </p>
        </div>
      </div>
    );
  }
}
