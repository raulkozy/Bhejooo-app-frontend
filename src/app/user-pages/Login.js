import React, { Component, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import './common.css';
import { Formik } from 'formik';
import axios from 'axios';


const API_URL = process.env.API_URL || 'https://api.bhejooo.com';
export const LOGIN_URL = `${API_URL}/auth/login`;
export const GENERATE_OTP_URL = `${API_URL}/auth/generate-otp`;
export const OTP_URL = `${API_URL}/auth/otp-login`;

const Login = () => {
  const [error, setError] = useState();
  const [selection, setSelection] = useState();
  const [verify_id, setVerify_id] = useState();
  const [togglePassword, setTogglePassword] = useState(true);
  const history = useHistory();
  const GENERATE_OTP = (phone_no) => {
    setSelection('OTP');
    axios.post(GENERATE_OTP_URL,{phone_no: phone_no},{
      headers:{
        "client": "BHEJOOO_FE_CLIENT",
        "api_key": "4e8755af-0b26-4040-bf1d-a1f76a7d1f4d"
      }
    }).then(res=>{
      setVerify_id(res.data);
    })
  }
    return (
      <div>
        {/* <img src={require('../../assets/images/background/background.jpg')} alt="logo" /> */}
        <div className="d-flex align-items-center auth px-0 overlay" >
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  {/* <img src={require("../../assets/images/logo.svg")} alt="logo" /> */}
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Formik
                  initialValues={{ }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      axios.post(selection=='password'?LOGIN_URL:OTP_URL,selection=='password'?values:{...values, ...verify_id}).then(res=>{
                        setSubmitting(false);
                        if(res.data)
                          sessionStorage.setItem('access_token', res.data.access_token)
                          sessionStorage.setItem('username',res.data.user)
                          history.push('/dashboard')
                          //else return Promise.reject(res)
                        },err=>{
                          let errors = {};
                          errors.message = 'Invalid username or password!';
                          setError(errors);
                        })
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <Form className="pt-3" onSubmit={handleSubmit}>
                      {error && (<p className='mb-lg-15 alert alert-danger'>{error.message}</p>)}
                      <Form.Group className="d-flex search-field">
                        <Form.Control type="tel" name="phone_no" placeholder="Mobile Number" size="lg" className="h-auto" onChange={handleChange} />
                      </Form.Group>
                      {values && values.phone_no && (
                      <Form.Group>
                        <div >
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="mode" id="optionsRadios1" value="OTP" onChange={()=>GENERATE_OTP(values.phone_no)} />
                              <i className="input-helper"></i>
                              <div style={{ "display": "flex", "flexDirection": "row", "paddingLeft": "10px" }}>
                                <span className="menu-title" style={{ "paddingLeft": "10px" }}>OTP</span>
                              </div>
                            </label>
                          </div>
                          <div className="form-check" style={{ "paddingLeft": "20px" }}>
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="mode" id="optionsRadios2" value="Password" onChange={()=>setSelection('password')} />
                              <i className="input-helper"></i>
                              <div style={{ "display": "flex", "flexDirection": "row", "paddingLeft": "10px" }}>
                                <span className="menu-title" style={{ "paddingLeft": "10px" }}>Password</span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </Form.Group>)}
                      {selection && selection === 'password' && (
                      <Form.Group className="d-flex search-field">
                        <Form.Control type={togglePassword?"password":"text"} name="password" placeholder="Password" size="lg" className="h-auto" onChange={handleChange} />
                        <i className="far fa-eye eye" id="togglePassword" onClick={()=>setTogglePassword(!togglePassword)}></i>
                      </Form.Group>)}
                      {selection && selection === 'OTP' && (
                      <Form.Group className="d-flex search-field">
                        <Form.Control type="password" name="otp" placeholder="OTP" size="lg" className="h-auto" onChange={handleChange} />
                      </Form.Group>)}
                      <div className="mt-3">
                        <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN IN</button>
                      </div>
                      <div className="my-2 d-flex justify-content-between align-items-center">
                        <div className="form-check">
                          <label className="form-check-label text-muted">
                            <input type="checkbox" className="form-check-input" />
                            <i className="input-helper"></i>
                            Keep me signed in
                          </label>
                        </div>
                        <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Forgot password?</a>
                      </div>
                      {/* <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div> */}
                      <div className="text-center mt-4 font-weight-light">
                        Don't have an account? <Link to="/user-pages/register-1" className="text-primary">Create</Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login
