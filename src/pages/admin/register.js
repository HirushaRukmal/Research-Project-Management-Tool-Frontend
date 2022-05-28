import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '@natscale/react-calendar';
import Swal from 'sweetalert2';

function Register() {
  const [fName, setFirstName] = useState('');
  const [mName, setMiddleName] = useState('');
  const [lName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [nic, setNIC] = useState('');
  const [tel, setTel] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/admin/profile/create', {
        fName: fName,
        mName: mName,
        lName: lName,
        email: email,
        dob: dob,
        nic: nic,
        tel: tel,
        address: address,
        password: password,
      });
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setEmail('');
      setDOB('');
      setNIC('');
      setTel('');
      setAddress('');
      setPassword('');
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 2000);
      const Swal = require('sweetalert2');
      Swal.fire({
        title: 'Success!',
        text: 'Profile Created Successfully',
        icon: 'success',
        confirmButtonText: 'Cool',
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Admin Registration Failed',
        icon: 'error',
        confirmButtonText: 'Try again',
      });
    }
  }

  return (
    <div className="App">
      <div>
        <div className="card">
          <div className="card-header px-lg-5">
            <div className="card-heading text-primary">Admin Registeration</div>
          </div>
          <div className="card-body p-lg-5">
            <h3 className="mb-4">SLIIT Research Management Tool</h3>
            <p className="text-muted text-sm mb-5">
              Please fill your personal detail to create an admin account.
            </p>
            <form action="#">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="fName"
                      type="text"
                      placeholder="name"
                      required
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                    />
                    <label for="first name">First Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="mName"
                      type="text"
                      placeholder="name@example.com"
                      onChange={(event) => {
                        setMiddleName(event.target.value);
                      }}
                    />
                    <label for="middle name"> Middle Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="lName"
                      type="text"
                      placeholder="lastname"
                      required
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                    />
                    <label for="lastname"> Last Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="email"
                      required
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                    <label for="email"> Email Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="dob"
                      type="date"
                      placeholder="dob"
                      required
                      onChange={(event) => {
                        setDOB(event.target.value);
                      }}
                    />
                    <label for="dob">Date of Birth</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="nic"
                      type="text"
                      placeholder="NIC"
                      required
                      onChange={(event) => {
                        setNIC(event.target.value);
                      }}
                    />
                    <label for="NIC">National Identity Card</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="tel"
                      type="text"
                      placeholder="tel"
                      required
                      onChange={(event) => {
                        setTel(event.target.value);
                      }}
                    />
                    <label for="studentType">Contact Number</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="address"
                      type="text"
                      placeholder="address"
                      required
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                    />
                    <label for="floatingPassword">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <label for="repeatPassword">Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="repeatPassword"
                      type="password"
                      placeholder="Password"
                    />
                    <label for="repeatPassword">Confirm Password</label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="agree"
                      id="agree"
                    />
                    <label className="form-check-label" for="agree">
                      I agree with the <a href="#">Terms & Conditions</a>.
                    </label>
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-primary"
                      id="regidter"
                      type="button"
                      name="registerSubmit"
                      onClick={handleSubmit}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer px-lg-5 py-lg-4">
            <div className="text-sm text-muted"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
