import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import SubTypeTableRow from "./SubTypeTableRow";
import Navbar from "../../pages/admin/Navbar";
import Sidebar from "../../pages/admin/Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default class subTypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_sts: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/admin/")
      .then((res) => {
        this.setState({
          admin_sts: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  DataTable() {
    return this.state.admin_sts.map((res, i) => {
      return <SubTypeTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="container">
          <h2>Submission Types</h2>
          <br />
          <p>
            <button className="btn btn-primary">
              <a href="/subTypes" className="text-decoration-none text-white">
                Create Submission Type
              </a>
            </button>

            <div style={{ marginTop: "-38px", marginLeft: "230px" }}>
              <ReactHTMLTableToExcel
                className="btn btn-outline-success"
                table="table"
                filename="Submission Type Details"
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
                <th scope="col">Topic</th>
                <th scope="col">Deadline</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{this.DataTable()}</tbody>
          </Table>
          <p>
            <b>Total Submission Types: {this.state.admin_sts.length}</b>
          </p>
        </div>
      </div>
    );
  }
}
