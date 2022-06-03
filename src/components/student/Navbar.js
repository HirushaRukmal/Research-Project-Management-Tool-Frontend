/*
    Created by - Isuru Pathum Herath
    Name - Navbar
 */

import React, { useState } from 'react';

const Navbar = () => {
    const [collapse2, setCollapse2] = useState(false);

    const bgBlack = { backgroundColor: '#000000', color: '#f4f4f4' };

    return (
        <div>
            <hr style={{ marginTop: "1%", border: "3px solid blue" }} />
            <nav class="navbar navbar-expand-md navbar-dark " style={{ position: 'static', marginTop: "-1%", }}>
                <h1><a class="navbar-brand" href="/student" style={{ marginLeft: "15%" }}>SLIIT - Project Management</a></h1>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <ul class="navbar-nav" style={{ marginLeft: "10%" }}>
                    <li class="nav-item active">
                        <a class="nav-link" href="/student">
                            <i class="fa fa-home"></i>
                            Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/group">
                            <i class="fas fa-project"></i>
                            Project Group
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="/supervisor">
                            <i class="fa fa-dollar"></i>
                            Supervisor/Co-Supervior
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/student">
                            <i class="fa fa-cogs">&nbsp;</i>&nbsp;
                            My Profile
                        </a>
                    </li>
                </ul>

                <ul class="navbar-nav" style={{ marginLeft: "25%", marginRight: "2%" }}>
                    <li class="nav-item active">
                        <button className="btn btn-danger" type="submit">Logout</button>
                    </li>

                </ul>
            </nav>
            <hr style={{ marginTop: "0%", border: "3px solid blue" }} />
        </div>
    );
};
export default Navbar;