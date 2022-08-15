import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Toast } from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";

const API_URL = process.env.API_URL || 'https://api.bhejooo.com';
export const PRIORItY_URL = `${API_URL}/user/courier-priority`;
export const PARTNER_LIST = `${API_URL}/general/partnerList`;

const Priority = () => {
    const [toast, setToast] = useState(false);
    const [failtoast, setFailToast] = useState(false);
    const [priorirtyForm, setpriorirtyForm] = useState();
    const [partner, setPartner] = useState();
    const [enable, setEnable] = useState();
    const navigate = () => {
        setToast(false);
        setFailToast(false);
    }
    useEffect(()=>{
        trackPromise(axios.get(PARTNER_LIST).then(res=>{
            setPartner(res.data);
        }))
        trackPromise(axios.get(PRIORItY_URL).then(res=>{
            setpriorirtyForm(res.data);
            setEnable(true);
        }))
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
                                initialValues={priorirtyForm ? {priority: priorirtyForm} : {}}
                                enableReinitialize
                                onSubmit={(values, { setSubmitting }) => {
                                    if (!enable)
                                           trackPromise(axios.put(PRIORItY_URL, values).then(async (res) => {
                                            setSubmitting(false);
                                            setToast(true);
                                        }, err => {
                                            setFailToast(true);
                                            setSubmitting(false);
                                        }));
                                    else
                                        trackPromise(axios.post(PRIORItY_URL, values).then(async (res) => {
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
                                            <div className="form-group">
                                                <label for="exampleInputEmail1">Courier</label>
                                                {!enable ? (<select required name="priority" onChange={handleChange} className="form-control" id="exampleSelectGender">
                                                <option>Select Courier Priority</option>
                                                {partner && partner.map(ele=>
                                                    <option value={ele} selected={values && values.priority==ele}>{ele}</option>
                                                )}
                                                </select>):(
                                                    <>
                                                    <p>{values.priority}</p>
                                                    <button type="button" className="btn btn-primary mr-2" onClick={()=>setEnable(false)}>
                                                        Edit
                                                    </button></>
                                                )}
                                            </div>
                                        </div>
                                        {!enable  && (<div className="col-md-12 mb-2">
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