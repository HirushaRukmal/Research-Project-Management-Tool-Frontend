import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
export default class pmTableRow extends Component {
  constructor(props) {
    super(props);
    this.deletepm= this.deletepm.bind(this);
  }
  deletepm() {
    axios .delete( "http://localhost:8000/admin/delete-pm/" +  this.props.obj._id )
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
    this.props.history.push("/admin/pmlist");
  }
  eventClick = () =>{
    //this.props.history.push("/edit-submission/" + this.props.obj._id)
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.Panel_Member_Name}</td>
        <td>{this.props.obj.Panel_Member_Email}</td>
        <td>{this.props.obj.Group_Name}</td>
        <td>{this.props.obj.Group_email}</td>
        <td>
          <a
            className="btn btn-warning text-decoration-none text-white"
            to={"/update-pm/" + this.props.obj.id}
          >
            <i className="fas fa-edit"></i>&nbsp;Edit
          </a>
          &nbsp;
          <a
            className="btn btn-danger text-decoration-none text-white"
            onClick={this.deletepm}
          >
            <i className="far fa-trash-alt"></i>&nbsp;Delete
          </a>
        </td>
      </tr>
    );
  }
}
