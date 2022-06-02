import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
export default class SubTypeTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteSubType = this.deleteSubType.bind(this);
  }
  deleteSubType() {
    axios
      .delete(
        "http://localhost:8000/admin/delete-submission/${id}" +
          this.props.obj._id
      )
      .then((res) => {
        const Swal = require("sweetalert2");
        Swal.fire({
          title: "Success!",
          text: "Submission Type Deleted Successfully",
          icon: "Danger",
          confirmButtonText: "Close",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.props.history.push("/list_subTypes");
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.Submission_Topic}</td>
        <td>{this.props.obj.Deadline}</td>
        <td>{this.props.obj.Description}</td>
        <td>
          <a
            className="btn btn-warning text-decoration-none text-white"
            to={"/edit-submission/" + this.props.obj._id}
          >
            <i className="fas fa-edit"></i>&nbsp;Edit
          </a>
          &nbsp;
          <a
            className="btn btn-danger text-decoration-none text-white"
            onClick={this.deleteSubType}
          >
            <i className="far fa-trash-alt"></i>&nbsp;Delete
          </a>
        </td>
      </tr>
    );
  }
}
