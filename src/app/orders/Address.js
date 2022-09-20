import axios from 'axios';
import { Formik } from 'formik';
import React, { useRef, useState, useEffect } from 'react';
import { Toast } from "react-bootstrap";
import { trackPromise } from 'react-promise-tracker';
import { useLocation, useParams } from 'react-router-dom';

const API_URL = process.env.API_URL || 'https://api.bhejooo.com';
export const ADDRESS_URL = `${API_URL}/address/pickupAddress`;
export const PIN_DETAILS = `${API_URL}/general/pinDetails?pinCode=`;

const Address = () => {
    const [AddressForm, setAddressForm] = useState();
    const [toast, setToast] = useState(false);
    const [failtoast, setFailToast] = useState(false);
    const [userData, setUserData] = useState();
    const prams = useParams();
    const navigate = () => {
        setToast(false);
        setFailToast(false);
    }
    const fetchpindetails=(pin)=>{
        trackPromise(axios.get(PIN_DETAILS+pin).then(res=>{
          const customer = {};
          customer.city = res.data.city;
          customer.state = res.data.state;
          setUserData(customer);
        }))
    }
    useEffect(()=>{
        trackPromise(axios.get(ADDRESS_URL).then(res=>{
          let value = res.data.filter(e=>e.id==prams.id)[0]
          const customer = {};
          customer.city = value && value.city;
          customer.state = value && value.state;
          setUserData(customer);  
          setAddressForm(value);
        }))
      },[])
    return (
        <>
            <div className="topBar">
                <h2>Address</h2>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Address form</h4>

                            <Formik
                                initialValues={AddressForm ? AddressForm : {}}
                                enableReinitialize
                                onSubmit={(values, { setSubmitting }) => {
                                    var payload = {
                                        "address_lane1": values.address_lane1,
                                        "address_lane2": values.address_lane2,
                                        "landmark": values.landmark,
                                        "Pin": values.Pin,
                                        "name": values.name,
                                        "phoneNo": values.phoneNo,
                                    }
                                    if (values.id)
                                        trackPromise(axios.put(ADDRESS_URL+'/'+values.id, {...payload,...userData}).then(async (res) => {
                                            setSubmitting(false);
                                            setToast(true);
                                        }, err => {
                                            setFailToast(true);
                                        }))
                                    else
                                        trackPromise(axios.post(ADDRESS_URL, {...payload,...userData}).then(async (res) => {
                                            setSubmitting(false);
                                            setToast(true);
                                        }, err => {
                                            setFailToast(true);
                                        }))
                                }}
                                render=
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
                                                <label for="exampleInputUsername1">Flat No. & Building Name<sup>*</sup></label>
                                                <input
                                                    placeholder="Flat No. & Building Name*"
                                                    type="text"
                                                    id="exampleInputUsername1"
                                                    className="form-control"
                                                    name="address_lane1"
                                                    onChange={handleChange}
                                                    defaultValue={values && values.address_lane1}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label for="exampleInputUsername1">Road, Locality<sup>*</sup></label>
                                                <input
                                                    placeholder="Road, Locality"
                                                    type="text"
                                                    id="exampleInputUsername1"
                                                    className="form-control"
                                                    name="address_lane2"
                                                    onChange={handleChange}
                                                    defaultValue={values && values.address_lane2}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label for="exampleInputUsername1">
                                                    Landmark{" "}
                                                </label>
                                                <input
                                                    placeholder="Landmark"
                                                    type="text"
                                                    id="exampleInputUsername1"
                                                    className="form-control"
                                                    name="landmark"
                                                    onChange={handleChange}
                                                    defaultValue={values && values.landmark}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label for="exampleInputUsername1">Pin<sup>*</sup></label>
                                                <input
                                                    placeholder="Pin"
                                                    type="number"
                                                    id="exampleInputUsername1"
                                                    className="form-control"
                                                    name="Pin"
                                                    onChange={(e)=>{handleChange(e);fetchpindetails(e.target.value)}}
                                                    defaultValue={values && values.Pin}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label for="exampleInputUsername1">City</label>
                                                <input
                                                    placeholder="City"
                                                    type="text"
                                                    id="exampleInputUsername1"
                                                    className="form-control"
                                                    name="city"
                                                    onChange={handleChange}
                                                    defaultValue={userData && userData.city}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label for="exampleInputUsername1">
                                                    State
                                                </label>
                                                <input
                                                    placeholder="State"
                                                    type="text"
                                                    id="exampleInputUsername1"
                                                    className="form-control"
                                                    name="state"
                                                    onChange={handleChange}
                                                    defaultValue={userData && userData.state}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label for="exampleInputUsername1">
                                                    Name
                                                </label>
                                                <input
                                                    placeholder="Name"
                                                    type="text"
                                                    id="exampleInputUsername1"
                                                    className="form-control"
                                                    name="name"
                                                    onChange={handleChange}
                                                    defaultValue={values && values.name}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label for="exampleInputUsername1">
                                                    Phone No
                                                </label>
                                                <input
                                                    placeholder="Phone No"
                                                    type="text"
                                                    id="exampleInputUsername1"
                                                    className="form-control"
                                                    name="phoneNo"
                                                    onChange={handleChange}
                                                    defaultValue={values && values.phone_no}
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-12 mb-2">
                                            <button type="submit" className="btn btn-primary mr-2" disabled={isSubmitting}>
                                                Submit
                                            </button>
                                        </div>

                                    </form>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {toast && (<Toast onClose={navigate} className="toast-success" autohide={true}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Success</strong>
                </Toast.Header>
                <Toast.Body>Processed Sucessfully.</Toast.Body>
            </Toast>
            )}
            {failtoast && (<Toast onClose={navigate} className="toast-danger" autohide={true}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Failure</strong>
                </Toast.Header>
                <Toast.Body>Processed Failed.</Toast.Body>
            </Toast>
            )}
        </>
    )
}

export default Address;