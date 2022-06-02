import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { logout } from "../../SessionManager";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { getUser, getToken } from "../../SessionManager";

const Sidebar = () => {
  const [manager, setManager] = useState([]);
  const [state, setState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    DOB: "",
    nic: "",
    address: "",
    type: "",
    id: "",
    accountStatus: "",
  });

  //destructure values from state
  const {
    firstName,
    middleName,
    lastName,
    mobileNumber,
    email,
    DOB,
    nic,
    address,
    type,
    accountStatus,
  } = state;

  const logoutFromSession = () => {
    swal({
      title: "Are you sure?",
      text: "Do you want to logout!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Logging out", {
          icon: "success",
        });
        logout();
        window.location.href = `/admin/login`;
      } else {
        swal("Stay in Session!");
      }
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        height: "100vh",
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#000">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href=""
            className="text-decoration-none text-white"
            style={{ color: "#fff" }}
          >
            Admin Dashboard
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              className="text-decoration-none text-white"
              exact
              to="/admin/dashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">Admin</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              className="text-decoration-none text-white"
              exact
              to="/staff/dashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="table">Staff</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className="text-decoration-none text-white"
              exact
              to="/student/dashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">Student</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className="text-decoration-none text-white"
              exact
              to="#"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="th">Panel Members</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className="text-decoration-none text-white"
              exact
              to="/admin/subtypelist"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="book">
                Submission List
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className="text-decoration-none text-white"
              exact
              to="#"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="envelope">
                Marking Scheme
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className="text-decoration-none text-white"
              exact
              to="#"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="th-large">
                Create Template
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              onClick={() => logoutFromSession()}
              className="text-decoration-none text-white"
              exact
              to="#"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          ></div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
