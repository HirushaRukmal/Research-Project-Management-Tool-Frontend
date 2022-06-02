import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import SubTypeTableRow from './SubTypeTableRow';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class subTypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
        admin_sts: [],
    }
    
    
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
    return (
      <div>
        <div className="card">
          <div className="card-header px-lg-20">
            <div className="card-heading text-primary">Create Submission Types</div>
            
          </div>
          <div className="card-body p-lg-30">
            <h3 className="mb-100" >SLIIT Research Management Tool</h3>
</div>
     <div>
               <div>
 <button className="btn btn-warning">
              <a
                href="/admin/subTypes"
                style={{ textDecoration: 'none', color: '#' }}
              >
                Create New One
              </a>
            </button>
            </div> 
           <div className = "row">
                  <table className = "table table-striped table-bordered" >

                      <thead>
                          <tr>
                              <th> Submission Topic</th>
                              <th> Deadline</th>
                              <th> Description</th>
                              <th> Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                      {this.DataTable()}
                             
                      </tbody>
                  </table>

           </div>

      </div>
      <div className="card-footer px-lg-5 py-lg-4">
                <div className="text-sm text-muted"></div>
              </div>
            </div>
            
          </div>
  )
}
  }
