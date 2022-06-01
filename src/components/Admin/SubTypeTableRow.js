import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
export default class SubTypeTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteSubType = this.deleteSubType.bind(this);
    }
    deleteSubType() {
        axios.delete('http://localhost:8000/admin/delete-submission/' + this.props.obj._id)
            .then((res) => {
                const Swal = require('sweetalert2');
      Swal.fire({
        title: 'Success!',
        text: 'Submission Type Deleted Successfully',
        icon: 'Danger',
        confirmButtonText: 'Close',
      });
            }).catch((error) => {
                console.log(error)
            })
            this.props.history.push('/list_subTypes')
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.Submission_Topic}</td>
                <td>{this.props.obj.Deadline}</td>
                <td>{this.props.obj.Description}</td>
                <td>
                    <Link className="edit-link" to={"/edit-submission/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteSubType} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}