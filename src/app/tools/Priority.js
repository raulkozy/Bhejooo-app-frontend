import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Toast } from "react-bootstrap";

const API_URL = process.env.API_URL || 'https://api.bhejooo.com';
export const PRIORItY_URL = `${API_URL}/user/courier-priority`;

const Priority = () => {
    const [toast, setToast] = useState(false);
    const [failtoast, setFailToast] = useState(false);
    const [priorirtyForm, setpriorirtyForm] = useState();
    const navigate = () => {
        setToast(false);
        setFailToast(false);
    }
    useEffect(()=>{
        axios.get(PRIORItY_URL).then(res=>{
        setpriorirtyForm(res.data);
        })
    },[])
    return (
        <>
            <div className="topBar">
                <h2>Priorirty</h2>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">

                            <Formik
                                initialValues={priorirtyForm ? priorirtyForm : {}}
                                enableReinitialize
                                onSubmit={(values, { setSubmitting }) => {
                                    if (values.id)
                                        axios.put(PRIORItY_URL, values).then(async (res) => {
                                            setSubmitting(false);
                                            setToast(true);
                                        }, err => {
                                            setFailToast(true);
                                        })
                                    else
                                        axios.post(PRIORItY_URL, values).then(async (res) => {
                                            setSubmitting(false);
                                            setToast(true);
                                        }, err => {
                                            setFailToast(true);
                                        })
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
                                                <label for="exampleInputUsername1">Courier</label>
                                                <input
                                                    placeholder="Select Courier Priority "
                                                    type="text"
                                                    id="exampleInputUsername1"
                                                    className="form-control"
                                                    name="priority"
                                                    onChange={handleChange}
                                                    defaultValue={values && values.priority}
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

           {toast && (<Toast onClose={navigate} className="toast-success">
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>Processed Sucessfully.</Toast.Body>
            </Toast>
            )}
            {failtoast && (<Toast onClose={navigate} className="toast-danger">
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

export default Priority;