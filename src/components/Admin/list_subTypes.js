import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import SubTypeTableRow from './SubTypeTableRow';
import '../../assets/admin/SideMenu.css';

export default class subTypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
        admin_sts: [],
    };
    
  }
  componentDidMount() {
    axios.get('http://localhost:8000/admin/')
      .then(res => {
        this.setState({
            admin_sts: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  DataTable() {
    return this.state.admin_sts.map((res, i) => {
      return <SubTypeTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (<div className="table-wrapper" >
      <Table striped bordered hover > 
        <thead className="listTable">
          <tr>
            <th>Submission Topic</th>
            <th>Deadline</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}