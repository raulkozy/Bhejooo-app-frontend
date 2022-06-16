import React, { useState } from "react";
import "./Kyc.scss";
import { Trans } from "react-i18next";
import { Form, Toast } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import axios from 'axios';
import { Formik } from 'formik';

const API_URL = process.env.API_URL || 'https://api.bhejooo.com/';
export const KYC_URL = `${API_URL}/user/kyc`;

const Kyc = () => {
  const [toast, setToast] = useState(false);
  const [failtoast, setFailToast] = useState(false);
  const navigate = () => {
    setToast(false);
    setFailToast(false);
  }
  return (
    // <div className="row">
    //     <div className="col-12 grid-margin">
    //         <div className="card">
    //             <div className="card-body" style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
    //                 <h4 className="card-title">Create Orders</h4>
    //                 {/* <i className="menu-arrow"></i> */}
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <>
      <div className="topBar">
        <h2>KYC</h2>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Kyc form</h4>

              <Formik
                            initialValues={{}}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                axios.post(KYC_URL, values).then(async (res)=>{
                                    setSubmitting(false);
                                    setToast(true);
                                },err=>{
                                    setFailToast(true);
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
              <form className="forms-sample row" onSubmit={handleSubmit}>
                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label for="exampleInputUsername1">Website url </label>
                    <input
                      placeholder="Website url "
                      type="text"
                      id="exampleInputUsername1"
                      className="form-control"
                      name="website_link"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label for="exampleInputUsername1">Account Number <sup>*</sup></label>
                    <input
                      placeholder="Account Number"
                      type="text"
                      id="exampleInputUsername1"
                      className="form-control"
                      name="account_number"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label for="exampleInputUsername1">
                      Retype Account Number{" "}
                    </label>
                    <input
                      placeholder="Account Number"
                      type="text"
                      id="exampleInputUsername1"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Bank <sup>*</sup></label>
                    <select required name="bank_name" onChange={handleChange} className="form-control" id="exampleSelectGender">
                      <option>Select One</option>
                      <option value={'SBI'}>SBI</option>
                      <option value={'HDFC'}>HDFC</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Account Type <sup>*</sup></label>
                    <select required name="account_type" onChange={handleChange} className="form-control" id="exampleSelectGender">
                      <option>Select One</option>
                      <option >Savings </option>
                      <option>Current</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <div className="form-group">
                    <label for="exampleInputUsername1">IFSC <sup>*</sup></label>
                    <input
                      placeholder="IFSC"
                      type="text"
                      id="exampleInputUsername1"
                      className="form-control"
                      name="ifsc"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label for="exampleInputUsername1">
                      Account Holder Name <sup>*</sup>
                    </label>
                    <input
                      placeholder="Account Holder Name"
                      type="text"
                      id="exampleInputUsername1"
                      className="form-control"
                      name="account_holder_name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label for="exampleInputUsername1">Pan Number <sup>*</sup></label>
                    <input
                      placeholder="Pan Number"
                      type="text"
                      id="exampleInputUsername1"
                      className="form-control"
                      name="pan_details.identity_number"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label> Upload Pan Card <sup>*</sup></label>
                    <div className="custom-file">
                      <input
                        lang="es"
                        type="file"
                        id="customFileLang"
                        className="form-control visibility-hidden form-control-file"
                        name="pan_details.doc_url"
                        onChange={handleChange}
                      />
                      <label className="custom-file-label" for="customFileLang">
                      Upload Pan Card
                      </label>
                    </div>
                  </div>
                </div>


                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label for="exampleInputUsername1">GSTIN</label>
                    <input
                      placeholder="GSTIN"
                      type="text"
                      id="exampleInputUsername1"
                      className="form-control"
                      name="gst_details.identity_number"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label> Upload GSTIN</label>
                    <div className="custom-file">
                      <input
                        lang="es"
                        type="file"
                        id="customFileLang"
                        className="form-control visibility-hidden form-control-file"
                        name="gst_details.doc_url"
                        onChange={handleChange}
                      />
                      <label className="custom-file-label" for="customFileLang">
                      Upload GSTIN
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mb-2">
                <button type="submit" className="btn btn-primary mr-2" disabled={isSubmitting}>
                  Submit
                </button>
                </div>
                
              </form>
                            )}
              </Formik>              
            </div>
          </div>
        </div>
      </div>
        {toast && (<Toast onClose={navigate} className="toast-success">
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Ordered Sucessfully.</Toast.Body>
        </Toast>
        )}
        {failtoast && (<Toast onClose={navigate} className="toast-danger">
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Failure</strong>
          </Toast.Header>
          <Toast.Body>Order Failed.</Toast.Body>
        </Toast>
        )}
    </>
  );
};

export default Kyc;
