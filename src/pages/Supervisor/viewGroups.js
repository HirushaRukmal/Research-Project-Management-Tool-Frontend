import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Sidebar from "../admin/Sidebar";
import Navbar from "../admin/Navbar";

class ViewGroups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group: {},
    };
  }


  componentDidMount() {
    // this.retrieveGroup();
    
    const id = this.props.match.params.id;
    console.log("ID: " + id);

    axios.get(`http://localhost:8000/supervisorTopics/${id}`).then((res) => {
      if (res.data.success) {
        console.log("ID: " + id);
        console.log("DATA: " + res);
        this.setState({
          group: res.data.group,
        });
        console.log(this.state.group);
      } else {
        console.log("error fetch data");
        console.log("ID : " + id);
      }
    });

  }

//   retrieveGroup() {
//     //   console.log("this is called");
//     axios.get("http://localhost:8000/get").then((res) => {
//       console.log(res);
//       if (res.data.success) {
//         this.setState({
//           group: res.data.existingGroup,
//         });

//         console.log(this.state.group);
//       }
//     });
//   }

  //   render() {
  //     return (
  //       <div>
  //         <Navbar />
  //         <Sidebar />
  //         <div className="container ">
  //           <h2>Registered Groups</h2>
  //           <br />
  //           <p>
  //             {/* <button className="btn btn-primary">
  //                   <a
  //                     href="/staff/register"
  //                     className="text-decoration-none text-white"
  //                     style={{ textDecoration: "none" }}
  //                   >
  //                     Create New Profile
  //                   </a>
  //                 </button> */}

  //             <div style={{ marginTop: "-38px", marginLeft: "190px" }}>
  //               <ReactHTMLTableToExcel
  //                 className="btn btn-outline-success"
  //                 table="table"
  //                 filename="User Details Excel"
  //                 sheet="Sheet"
  //                 buttonText="Generate Sheet"
  //               />
  //             </div>

  //             <div
  //               className="float-end"
  //               style={{ marginTop: "-30px", marginLeft: "190px" }}
  //             >
  //               <input
  //                 className="form-control"
  //                 type="search"
  //                 placeholder="Search here"
  //                 name="searchQuery"
  //                 onChange={this.handleSearchArea}
  //               ></input>
  //             </div>
  //           </p>
  //           <table id="table" class="table">
  //             <thead>
  //               <tr>
  //                 <th scope="col">#</th>
  //                 <th scope="col">Group Name</th>
  //                 <th scope="col">Leader Name</th>
  //                 <th scope="col">Topic</th>
  //                 <th scope="col">Topic Status</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {this.state.group.map((group, index) => (
  //                 <tr key={index}>
  //                   <th scope="row">{index + 1}</th>
  //                   <td>
  //                     <a
  //                       className="text-decoration-none"
  //                       //   href={`/staff/profile/view/${profiles._id}`}
  //                       style={{ textDecoration: "none" }}
  //                     >
  //                       {group.groupName}
  //                     </a>
  //                   </td>
  //                   <td>{group.groupLeader}</td>
  //                   <td>{group.groupTopic}</td>
  //                   <td>
  //                     {/* <a
  //                           className="btn btn-warning text-decoration-none text-white"
  //                           href={`/staff/profile/update/${profiles._id}`}
  //                         >
  //                           <i className="fas fa-edit"></i>&nbsp;Edit
  //                         </a>
  //                         &nbsp;
  //                         <a
  //                           className="btn btn-danger text-decoration-none text-white"
  //                           onClick={() => this.onDelete(profiles._id)}
  //                         >
  //                           <i className="far fa-trash-alt"></i>&nbsp;Delete
  //                         </a> */}
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //           <p>
  //             <b>Total Registered Groups: {this.state.group.length}</b>
  //           </p>
  //         </div>
  //       </div>
  //     );
  //   }

  render() {
    const {
      groupName,
      groupLeader,
      firstMember,
      secondMember,
      thirdMember,
      groupEmail,
    } = this.state.group;
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="container mt-4">
          <h1 align="center">test</h1>
          <br />
          <div className="main-body">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <br />
                      <img alt="Admin" className="rounded-circle" width="150" />
                      {/* <div className="mt-3">
                          
                          <p className="font-size-sm text-success">
                            {profile.type}
                          </p>
                        </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Group Name</h6>
                      </div>
                      <div className="col-sm-9 text-blue">
                        {group.groupName}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Leader Name</h6>
                      </div>
                      <div className="col-sm-9 text-blue">
                        {group.groupLeader}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">First Member</h6>
                      </div>
                      <div className="col-sm-9 text-blue">
                        {group.firstMember}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Second Member</h6>
                      </div>
                      <div className="col-sm-9 text-blue">
                        {group.secondMember}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Third Member</h6>
                      </div>
                      <div className="col-sm-9 text-blue">
                        {group.thirdMember}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-blue">
                        {group.groupEmail}
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewGroups;
