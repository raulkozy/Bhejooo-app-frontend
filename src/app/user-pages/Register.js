import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './common.css';

const initialState = {
  firstName: "",
  firstNameError: false,
  lastName: {
    value: "",
    error: false
  },
  // lastNameError: false,
  password: {
    value: "",
    error: false
  },
  // passwordError: false,
  email: {
    value: "",
    error: false
  },
  // emailError: false,
  mobileNo: {
    value: "",
    error: false
  },
  // mobileNoError: false,
  businessName: {
    value: "",
    error: false
  },
  // businessNameError: false,
  businessAddress: {
    value: "",
    error: false
  },
  // businessAddressError: false,
  businessType: {
    value: "Type of Business*",
    error: false
  },
  gstin: {
    value: "",
    error: false
  },
  pan: {
    value: "",
    error: false
  },
  // panError: false,
  orders: {
    value: "",
    error: false
  },
  // ordersError: false
}

const API_URL = process.env.API_URL || 'https://api.bhejooo.com/';
export const REGISTER_URL = `${API_URL}/user/register`;
export const OTP_URL = `${API_URL}/user/verifyMobileOtp`;
export const PIN_DETAILS = `${API_URL}/general/pinDetails?pinCode=`;

const Register = () => {

  const [userData, setUserData] = useState(initialState);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [mobileNoError, setMobileNoError] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [businessType, setBusinessType] = useState("Type of Business*");
  const [businessTypeError, setBusinessTypeError] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessAddressError, setBusinessAddressError] = useState("");
  const [gstin, setGstin] = useState("");
  const [gstinError, setGstinError] = useState("");
  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");
  const [orders, setOrders] = useState("");
  const [ordersError, setOrdersError] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [OTP, setOTP] = useState(false);
  const [info, setInfo] = useState();

  const passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  const emailValidator = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const mobileValidator = /^[6-9]\d{9}$/gi;
  const panValidator = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  const numberValidator = /^\d*$/;
  const history = useHistory();

  const handleFirstName = event => {
    console.log(event.target.value)
    setFirstName(event.target.value);
    if (event.target.value !== "") {
      setFirstNameError("");
    } else {
      setFirstNameError("First name required");
    }
  }

  const handleLastName = event => {
    setLastName(event.target.value);
    if (event.target.value !== "") {
      setLastNameError("");
    } else {
      setLastNameError("Last name required");
    }
  }

  const handlePassword = event => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      if (!passwordValidation.test(password)) {
        setPasswordError("Password should be 8 characters long with atleast 1 uppercase, 1 lowercase, a digit and a special charater");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("Password is required");
    }
  }

  const handleEmail = event => {
    setEmail(event.target.value);
    if (event.target.value !== "") {
      if (!emailValidator.test(event.target.value)) {
        setEmailError("Enter a valid email");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("Email is required")
    }
  }

  const handleMobileNumber = event => {
    setMobileNo(event.target.value);
    if (event.target.value !== "") {
      if (!mobileValidator.test(event.target.value)) {
        setMobileNoError("Enter valid mobile number");
      } else {
        setMobileNoError("");
      }
    } else {
      setMobileNoError("Mobile number required");
    }
  }

  const handleBusinessName = event => {
    setBusinessName(event.target.value);
    if (event.target.value !== "") {
      setBusinessNameError("");
    } else {
      setBusinessNameError("Business Name is required");
    }
  }

  const handleBusinessType = event => {
    setBusinessType(event.target.value);
    if (event.target.value == "Type of Business*") {
      setBusinessTypeError("Kindly select Business Type");
    } else {
      setBusinessTypeError("")
    }
  }

  const handleBusinessAddress = event => {
    setBusinessAddress(event.target.value);
    if (event.target.value !== "") {
      setBusinessAddressError("");
    } else {
      setBusinessAddressError("Business Address is required");
    }
  }

  const handleGstin = event => {
    setGstin(event.target.value);
    if (event.target.value !== "") {
      setGstinError("");
    } else {
      setGstinError("GSTIN is required");
    }
  }

  const handlePan = event => {
    setPan(event.target.value);
    if (event.target.value !== "") {
      if (!panValidator.test(event.target.value)) {
        setPanError("Entered PAN not valid");
      } else {
        setPanError("");
      }
    }
  }

  const handleOrders = event => {
    setOrders(event.target.value);
    if (event.target.value !== "") {
      if (!numberValidator.test(event.target.value)) {
        setOrdersError("Enter a valid number");
      } else {
        setOrdersError("");
      }
    }
  }

  const validateForm = () => {
    if (firstName == "") {
      setFirstNameError("First name required");
      setErrorFlag(true);
    } else {
      setFirstNameError("");
    }
    if (lastName == "") {
      setLastNameError("Last name required");
      setErrorFlag(true);
    } else {
      setLastNameError("");
    }
    if (!passwordValidation.test(password)) {
      setPasswordError("Password should be 6 characters long with atleast 1 uppercase, 1 lowercase, a digit and a special charater");
      setErrorFlag(true);
    } else {
      setPasswordError("");
    }
    if (!emailValidator.test(email)) {
      setEmailError("Enter a valid email");
      setErrorFlag(true);
    } else {
      setEmailError("");
    }
    if (!mobileValidator.test(mobileNo)) {
      setMobileNoError("Enter valid mobile number");
      setErrorFlag(true);
    } else {
      setMobileNoError("");
    }
    if (businessName == "") {
      setBusinessNameError("Business Name is required");
      setErrorFlag(true);
    } else {
      setBusinessNameError("");
    }
    if (businessType == "Type of Business*") {
      setBusinessTypeError("Kindly select Business Type");
      setErrorFlag(true);
    } else {
      setBusinessTypeError("");
    }
    if (businessAddress == "") {
      setBusinessAddressError("Business Address is required");
      setErrorFlag(true);
    } else {
      setBusinessAddressError("");
    }
    if (gstin == "") {
      setGstinError("GSTIN is required");
      setErrorFlag(true);
    } else {
      setGstinError("");
    }
    if (!panValidator.test(pan)) {
      setPanError("Entered PAN not valid");
      setErrorFlag(true);
    } else {
      setPanError("");
    }
    if (!numberValidator.test(orders)) {
      setOrdersError("Enter a valid number");
      setErrorFlag(true);
    } else {
      setOrdersError("");
    }
    if (!firstNameError && !lastNameError && !passwordError && !emailError && !mobileNoError && !businessName && !businessType &&
      !businessAddress && !gstinError && !panError && !ordersError) {
      setErrorFlag(false)
    }
    console.log("error flag:", errorFlag);
  }

  const fetchpindetails=(pin)=>{
    axios.get(PIN_DETAILS+pin).then(res=>{
      const customer = {};
      customer.city = res.data.city;
      customer.state = res.data.state;
      setUserData(customer);
    })
  }

  return (
    <div>
      <div className="d-flex align-items-center auth px-0 h-100 overlay">
        <div className="row w-100 mx-0">
          <div className="col-lg-10 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                {/* <img src={require("../../assets/images/logo.svg")} alt="logo" /> */}
              </div>
              <h2 style={{ "textAlign": "center" }}>New here ?</h2>
              <h6 className="font-weight-light" style={{ "textAlign": "center" }}>Signing up is easy. It only takes a few steps</h6>
              {OTP?
              (<>
                <Formik
                  initialValues={{ }}
                  validate={values => {
                    const errors = {};
                    if (!values.otp) {
                      errors.otp = 'Required';
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      axios.post(OTP_URL,{...values, ...info}).then(res=>{
                        setSubmitting(false);
                        if(res.data)
                          sessionStorage.setItem('access_token', res.data.access_token)
                          history.push('/dashboard');
                          //else return Promise.reject(res)
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
                <form className="pt-3" onSubmit={handleSubmit}>
                  <div style={{ "overflow-y": "scroll", "height": "300px" }}>
                    <h5>OTP details :</h5>
                    <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                      <div className="form-group" style={{ "width": "30%" }}>
                        <input type="text" name="otp" required className={`form-control form-control-lg border ${errors.otp ? "border-danger" : "border-secondary"}`} id="exampleInputUsername1" placeholder="OTP*"
                          onChange={handleChange} />
                        <p style={{ "color": "red" }}>{errors.otp}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                  {/* <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN 
                    UP</Link> */}
                  <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Verify</button>
                  </div>
                </form>
                  )}
                </Formik>    
              </>):
              (<Formik
                  initialValues={{ }}
                  validate={(values) => {
                    const errors = {};
                    if(!values.businessAddress.address_lane1){
                      errors.address_lane1 = true;
                    } if(!values.businessAddress.address_lane2){
                      errors.address_lane2 = true;
                    } if(!values.businessAddress.Pin){
                      errors.pin = true;
                    } if(!values.businessAddress.landmark){
                      errors.landmark = true;
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    values = {
                      "firstName": firstName,
                      "lastName": lastName,
                      "phoneNo": parseInt(mobileNo),
                      "password": password,
                      "email": email,
                      "businessName": businessName,
                      "typeOfBusiness": businessType,
                      "businessAddress": businessAddress,
                      "documents": {
                        "name": "string",
                        "url": "string"
                      }
                    }
                    setTimeout(() => {
                      validateForm();
                      axios.post(REGISTER_URL,values).then(res=>{
                        setSubmitting(false);
                        if(res.data)
                          setInfo({
                            "user_id": res.data["user_id"],
                            "verify_id": res.data["verify_id"]
                          })
                          setOTP(true)
                          //else return Promise.reject(res)
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
              <form className="pt-3" onSubmit={handleSubmit}>
                <div style={{ "overflow-y": "scroll", "height": "300px" }}>
                  <h5>Personal details :</h5>
                  <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                    <div className="form-group" style={{ "width": "30%" }}>
                      <input type="text" required className={`form-control form-control-lg border ${firstNameError ? "border-danger" : "border-secondary"}`} id="exampleInputUsername1" placeholder="First Name*" value={firstName}
                        onChange={e => handleFirstName(e)} />
                      <p style={{ "color": "red" }}>{firstNameError}</p>
                    </div>
                    <div className="form-group" style={{ "width": "30%" }}>
                      <input type="text" required className={`form-control form-control-lg border ${lastNameError ? "border-danger" : "border-secondary"}`} id="exampleInputUsername2" placeholder="Last Name*" value={lastName}
                        onChange={e => handleLastName(e)} />
                      <p style={{ "color": "red" }}>{lastNameError}</p>
                    </div>
                    <div className="form-group" style={{ "width": "30%" }}>
                      <input type="password" className={`form-control form-control-lg border ${passwordError ? "border-danger" : "border-secondary"}`} id="exampleInputPassword1" placeholder="Enter Password" value={password}
                        onChange={e => handlePassword(e)} />
                      <p style={{ "color": "red" }}>{passwordError}</p>
                    </div>
                    <div className="form-group" style={{ "width": "45%" }}>
                      <input type="email" className={`form-control form-control-lg border ${emailError ? "border-danger" : "border-secondary"}`} id="exampleInputEmail1" placeholder="Email" value={email}
                        onChange={e => handleEmail(e)} />
                      <p style={{ "color": "red" }}>{emailError}</p>
                    </div>
                    <div className="form-group" style={{ "width": "45%" }}>
                      <input type="tel" required className={`form-control form-control-lg border ${mobileNoError ? "border-danger" : "border-secondary"}`} id="exampleInputEmail1" placeholder="Mobile Number*" value={mobileNo}
                        onChange={e => handleMobileNumber(e)} />
                      <p style={{ "color": "red" }}>{mobileNoError}</p>
                    </div>
                  </div>
                  <h5>Company details :</h5>
                  <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                    <div className="form-group" style={{ "width": "40%" }}>
                      <input type="text" required className={`form-control form-control-lg border ${businessNameError ? "border-danger" : "border-secondary"}`} id="businessName" placeholder="Business Name*" value={businessName}
                        onChange={e => handleBusinessName(e)} />
                      <p style={{ "color": "red" }}>{businessNameError}</p>
                    </div>
                    <div className="form-group" style={{ "width": "40%" }}>
                      <select className={`form-control form-control-lg1  border ${businessTypeError ? "border-danger" : "border-secondary"}`} id="exampleFormControlSelect2"
                        value={businessType} onChange={e => handleBusinessType(e)} >
                        <option>Type of Business*</option>
                        <option>Clothing</option>
                        <option>Mobile phone & accesories</option>
                        <option>Beauty & Personal care</option>
                        <option>Home Decor</option>
                        <option>Home & Kitchen Appliances</option>
                        <option>Footwear</option>
                        <option>Jewellery & Watches</option>
                        <option>Documents</option>
                        <option>Food and Beverage</option>
                        <option>Miscellaneous</option>
                      </select>
                      <p style={{ "color": "red" }}>{businessTypeError}</p>
                    </div>
                          <div className="form-group" style={{ "width": "30%" }}>
                            <input type="text" name='businessAddress.address_lane1' className={`form-control form-control-lg border ${errors.address_lane1 ? "border-danger" : "border-secondary"}`} 
                              id="exampleInputEmail1" placeholder="Flat No. & Building Name*" onChange={handleChange}
                            // value={email} onChange={e => handleEmail(e)} 
                            />
                            {/* <p style={{ "color": "red" }}>{emailError}</p> */}
                          </div>
                          <div className="form-group" style={{ "width": "30%" }}>
                            <input type="text" name='businessAddress.address_lane2' required className={`form-control form-control-lg border ${errors.address_lane2 ? "border-danger" : "border-secondary"}`} 
                              id="exampleInputEmail1" placeholder="Road, Locality" onChange={handleChange}
                            // value={mobileNo} onChange={e => handleMobileNumber(e)} 
                            />
                            {/* <p style={{ "color": "red" }}>{mobileNoError}</p> */}
                          </div>
                          <div className="form-group" style={{ "width": "30%" }}>
                            <input type="number" name='businessAddress.Pin' required className={`form-control form-control-lg border ${errors.pin ? "border-danger" : "border-secondary"}`} 
                              id="exampleInputEmail1" placeholder="Pin" onChange={(e)=>{handleChange(e);fetchpindetails(e.target.value)}}
                            // value={mobileNo} onChange={e => handleMobileNumber(e)} 
                            />
                            {/* <p style={{ "color": "red" }}>{mobileNoError}</p> */}
                          </div>
                          <div className="form-group" style={{ "width": "30%" }}>
                            <input type="text" name='businessAddress.landmark' required className={`form-control form-control-lg border ${errors.landmark ? "border-danger" : "border-secondary"}`} 
                              id="exampleInputUsername1" placeholder="Landmark*" onChange={handleChange}
                            // value={firstName} onChange={e => handleFirstName(e)} 
                            />
                            {/* <p style={{ "color": "red" }}>{firstNameError}</p> */}
                          </div>
                          <div className="form-group" style={{ "width": "30%" }}>
                            <input type="text" name='businessAddress.city' required className={`form-control form-control-lg border ${errors.city ? "border-danger" : "border-secondary"}`} 
                              id="exampleInputUsername2" placeholder="City*" value={userData.city}
                            // value={lastName} onChange={e => handleLastName(e)} 
                            />
                            {/* <p style={{ "color": "red" }}>{lastNameError}</p> */}
                          </div>
                          <div className="form-group" style={{ "width": "30%" }}>
                            <input type="text" name='businessAddress.state' className={`form-control form-control-lg border ${errors.state ? "border-danger" : "border-secondary"}`} 
                              id="exampleInputPassword1" placeholder="State" value={userData.state}
                            // value={password} onChange={e => handlePassword(e)} 
                            />
                            {/* <p style={{ "color": "red" }}>{passwordError}</p> */}
                          </div>      
                    {/* <div className="form-group" style={{ "width": "100%" }}>
                      <input type="text" className={`form-control form-control-lg border ${businessAddressError ? "border-danger" : "border-secondary"}`} id="businessAddress" placeholder="Business Address*" value={businessAddress}
                        onChange={e => handleBusinessAddress(e)} />
                      <p style={{ "color": "red" }}>{businessAddressError}</p>
                    </div>
                    <div className="form-group" style={{ "width": "30%" }}>
                      <input type="text" required className={`form-control form-control-lg border ${gstinError ? "border-danger" : "border-secondary"}`} id="exampleInputEmail1" placeholder="GSTIN*" value={gstin} onChange={e => handleGstin(e)} />
                      <p style={{ "color": "red" }}>{gstinError}</p>
                    </div>
                    <div className="form-group" style={{ "width": "30%" }}>
                      <input type="text" required className={`form-control form-control-lg border ${panError ? "border-danger" : "border-secondary"}`} id="exampleInputEmail1" placeholder="PAN" value={pan}
                        onChange={e => handlePan(e)} />
                      <p style={{ "color": "red" }}>{panError}</p>
                    </div>
                    <div className="form-group" style={{ "width": "30%" }}>
                      <input type="text" required className={`form-control form-control-lg border ${ordersError ? "border-danger" : "border-secondary"}`} id="exampleInputEmail1" placeholder="Orders per day" value={orders}
                        onChange={e => handleOrders(e)} />
                      <p style={{ "color": "red" }}>{ordersError}</p>
                    </div> */}
                    <div className="form-group" style={{ "width": "30%" }}>
                      <input type="file" required className="form-control form-control-lg" id="file" placeholder="Documents" />
                    </div>
                  </div>
                  {/* <h5>Bank Details :</h5>
                  <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                    <div className="form-group" style={{ "width": "30%" }}>
                      <select className="form-control form-control-lg" id="exampleFormControlSelect2">
                        <option>Bank</option>
                        <option>SBI</option>
                        <option>HDFC</option>
                        <option>ICICI</option>
                        <option>Kotak</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ "width": "30%" }}>
                      <input type="text" required className="form-control form-control-lg" id="exampleInputEmail1" placeholder="IFSC" />
                    </div>
                    <div className="form-group" style={{ "width": "30%" }}>
                      <select className="form-control form-control-lg" id="exampleFormControlSelect2">
                        <option>Account Type</option>
                        <option>Saving</option>
                        <option>Current</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ "width": "30%" }}>
                      <input type="text" required className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Account Number" />
                    </div>
                  </div> */}

                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      I agree to all Terms & Conditions
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  {/* <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN 
                    UP</Link> */}
                  <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account? <Link to="/user-pages/login" className="text-primary">Login</Link>
                </div>
              </form>
                  )}
              </Formik>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Register
