import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authenticateCustomer, getCustomerUser } from '../../SessionManager';
import '../../assets/admin/Login.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [manager, setManager] = useState([]);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const Swal = require('sweetalert2');

  useEffect(() => {
    const id = getCustomerUser();
    if (getCustomerUser()) {
      window.location.href = `/home`;
    }
  }, []);

  const routeChange = () => {
    window.location.href = `/register`;
  };

  async function Login() {
    // const user = { email, password }
    console.log(email, password);
    axios
      .post('http://localhost:8000/admin/login', { email, password })
      .then((mresponse) => {
        console.log(mresponse);
        if (mresponse.data == null) {
          Swal.fire({
            title: 'Login Failed!',
            text: 'Email or Password incorrect',
            icon: 'error',
            confirmButtonText: 'Try again',
          });
        } else {
          authenticateCustomer(
            mresponse,
            () => (window.location.href = `/admin/dashboard`),
            500
          );
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Login Failed',
          icon: 'error',
          confirmButtonText: 'Try again',
        });
      });
  }

  return (
    <div className="App">
      <div class="page-holder align-items-center py-4 bg-gray-100 vh-100">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-8 px-lg-4">
              <div className="card">
                <div className="card-header px-lg-5">
                  <div className="card-heading text-primary">Admin Login</div>
                </div>
                <div className="card-body p-lg-5">
                  <h3 className="mb-4">SLIIT Research Management Tool</h3>
                  <p className="text-muted text-sm mb-5">
                    Please enter Admin email address and password to login.
                  </p>
                  <form id="loginForm" action="index.html">
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="floatingInput"
                        type="email"
                        placeholder="it12345678@my.sliit.lk"
                        required
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="floatingPassword"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <label for="floatingPassword">Password</label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="remember"
                        id="remember"
                      />
                      <label className="form-check-label" for="remember">
                        Remember me
                      </label>
                    </div>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={Login}
                    >
                      Submit
                    </button>
                  </form>
                </div>
                <div className="card-footer px-lg-5 py-lg-4">
                  <div className="text-sm text-muted"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
