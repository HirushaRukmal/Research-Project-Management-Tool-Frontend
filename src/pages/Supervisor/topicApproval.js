// import React, { Component } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import Sidebar from "../admin/Sidebar";
// import Navbar from "../admin/Navbar";

// class TopicApproval extends Component {
//     constructor(props, { history }) {
//       super(props);
  
//       this.state = {
//         group: [],
//       };
//     }
  
//     //Auto refresh
//     onload = () => {
//       if (!window.location.hash) {
//         window.location = window.location + "#loaded";
//         window.location.reload();
//       }
//     };

//     componentDidMount() {
//         // this.onload();
//         this.retrieveGroup();
//       }
    
//       retrieveGroup() {
//           console.log("this is called");
//         axios.get("http://localhost:8000/supervisorTopics/").then((res) => {
//             console.log(res);
//         //   if (res.data.success) {
//         //     this.setState({
//         //       group: res.data.existingGroup,
//         //     });
    
//         //     console.log(this.state.group.length);
//         //   }
//         });
//       }

//     //   onDelete = (id) => {
//     //     axios
//     //       .delete(`http://localhost:8000/staff/profile/delete/${id}`)
//     //       .then((res) => {
//     //         const Swal = require("sweetalert2");
//     //         Swal.fire({
//     //           title: "Success!",
//     //           text: "Profile Deleted Successfully",
//     //           icon: "success",
//     //           confirmButtonText: "Cool",
//     //         });
    
//     //         this.retrieveProfiles();
//     //       });
//     //   };

//     filterData(group, searchKey) {
//         const result = group.filter((group) =>
//         group.uName.includes(searchKey)
//         );
    
//         this.setState({ group: result });
//       }

//       handleSearchArea = (e) => {
//         const searchKey = e.currentTarget.values;
    
//         axios.get("http://localhost:8000/supervisorTopics/").then((res) => {
//           if (res.data.success) {
//             this.filterData(res.data.existingGroup, searchKey);
//           }
//         });
//       };

//       render() {
//         return (
//           <div>
//             <Navbar />
//             <Sidebar />
//             <div className="container ">
//               <h2>Registered Groups</h2>
//               <br />
//               <p>
//                 {/* <button className="btn btn-primary">
//                   <a
//                     href="/staff/register"
//                     className="text-decoration-none text-white"
//                     style={{ textDecoration: "none" }}
//                   >
//                     Create New Profile
//                   </a>
//                 </button> */}
    
//                 <div style={{ marginTop: "-38px", marginLeft: "190px" }}>
//                   <ReactHTMLTableToExcel
//                     className="btn btn-outline-success"
//                     table="table"
//                     filename="User Details Excel"
//                     sheet="Sheet"
//                     buttonText="Generate Sheet"
//                   />
//                 </div>
    
//                 <div
//                   className="float-end"
//                   style={{ marginTop: "-30px", marginLeft: "190px" }}
//                 >
//                   <input
//                     className="form-control"
//                     type="search"
//                     placeholder="Search here"
//                     name="searchQuery"
//                     onChange={this.handleSearchArea}
//                   ></input>
//                 </div>
//               </p>
//               <table id="table" class="table">
//                 <thead>
//                   <tr>
//                     <th scope="col">#</th>
//                     <th scope="col">Group Name</th>
//                     <th scope="col">Leader Name</th>
//                     <th scope="col">Topic</th>
//                     <th scope="col">Topic Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {this.state.group.map((group, index) => (
//                     <tr key={index}>
//                       <th scope="row">{index + 1}</th>
//                       <td>
//                         <a
//                           className="text-decoration-none"
//                         //   href={`/staff/profile/view/${profiles._id}`}
//                           style={{ textDecoration: "none" }}
//                         >
//                           {group.groupName}
//                         </a>
//                       </td>
//                       <td>{group.groupLeader}</td>
//                       <td>{group.groupTopic}</td>
//                       <td>
//                         {/* <a
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
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <p>
//                 <b>Total Registered Groups: {this.state.group.length}</b>
//               </p>
//             </div>
//           </div>
//         );
//       }
//     }
//     export default TopicApproval;