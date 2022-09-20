import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Form, Toast } from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";

const API_URL = process.env.API_URL || 'https://api.bhejooo.com';
export const SHIPPING_LABEL = `${API_URL}/document/shipping_label_configuration`;

const Customize = () => {
    const [toast, setToast] = useState(false);
    const [failtoast, setFailToast] = useState(false);
    const [shippingForm, setshippingForm] = useState();
    const navigate = () => {
        setToast(false);
        setFailToast(false);
    }
    useEffect(()=>{
        trackPromise(axios.get(SHIPPING_LABEL).then(res=>{
            setshippingForm(res.data);
        }))
    },[])
    return (
        <>
            <div className="topBar">
                <h2>Shipping Label Customization</h2>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">

                            <Formik
                                initialValues={shippingForm ? { rtoAddressVisible: shippingForm.rto_visibility } : {}}
                                enableReinitialize
                                onSubmit={(values, { setSubmitting }) => {
                                        values.rtoAddressVisible = (values.rtoAddressVisible === 'true')
                                        trackPromise(axios.put(SHIPPING_LABEL, values).then(async (res) => {
                                            setSubmitting(false);
                                            setToast(true);
                                        }, err => {
                                            setFailToast(true);
                                            setSubmitting(false);
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
                                        Display RTO address in shipping label 
                                        <Form.Group>
                                            <div >
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="rtoAddressVisible" id="optionsRadios1" value="true" onChange={handleChange} defaultChecked={values.rtoAddressVisible} />
                                                        <i className="input-helper"></i>
                                                        <div style={{ "display": "flex", "flexDirection": "row", "paddingLeft": "10px" }}>
                                                            <span className="menu-title" style={{ "paddingLeft": "10px" }}>Yes</span>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="form-check" style={{ "paddingLeft": "20px" }}>
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="rtoAddressVisible" id="optionsRadios2" value="false" onChange={handleChange} defaultChecked={!values.rtoAddressVisible} />
                                                        <i className="input-helper"></i>
                                                        <div style={{ "display": "flex", "flexDirection": "row", "paddingLeft": "10px" }}>
                                                            <span className="menu-title" style={{ "paddingLeft": "10px" }}>No</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </Form.Group>
                                        </div>
                                        {(<div className="col-md-12 mb-2">
                                            <button type="submit" className="btn btn-primary mr-2" disabled={isSubmitting}>
                                                Submit
                                            </button>
                                        </div>)}

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

export default Customize;