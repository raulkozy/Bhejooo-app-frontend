import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Toast } from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";

const API_URL = process.env.API_URL || 'https://api.bhejooo.com';
export const CHANNEL_INTEGRATION = `${API_URL}/integration/create`;
export const CHANNEL_FETCHORDERS = `${API_URL}/integration/fetchOrders`;
export const INTEGRATION_UPDATE = `${API_URL}/integration/update`;
export const INTEGRATION = `${API_URL}/integration`;

const Channel = () => {
    const [toast, setToast] = useState(false);
    const [failtoast, setFailToast] = useState(false);
    const [form, setForm] = useState({});
    useEffect(()=>{
        trackPromise(axios.get(INTEGRATION).then(res=>{
            setForm(res.data[0]);
        }))
    },[])
    const navigate = () => {
        setToast(false);
        setFailToast(false);
    }
    return (
        <>
            <div className="topBar">
                <h2>Channel Integration</h2>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">

                            <Formik
                                initialValues={form}
                                enableReinitialize
                                onSubmit={(values, { setSubmitting }) => {
                                        if(values.id)
                                        {
                                            trackPromise(axios.put(INTEGRATION_UPDATE, values,{
                                                headers:{
                                                    provider: 'SHOPIFY'
                                                }
                                            }).then(async (res) => {
                                                setSubmitting(false);
                                                setToast(true);
                                                trackPromise(axios.get(CHANNEL_FETCHORDERS,{
                                                    provider: 'SHOPIFY'
                                                }).then(res=>{
                                                    setToast(true);
                                                },
                                                err=>{
                                                    setFailToast(true);
                                                }))
                                            }, err => {
                                                setFailToast(true);
                                                setSubmitting(false);
                                            }))    
                                        } 
                                        else {
                                            trackPromise(axios.post(CHANNEL_INTEGRATION, values,{
                                                headers:{
                                                    provider: 'SHOPIFY'
                                                }
                                            }).then(async (res) => {
                                                setSubmitting(false);
                                                setToast(true);
                                                trackPromise(axios.get(CHANNEL_FETCHORDERS,{
                                                    provider: 'SHOPIFY'
                                                }).then(res=>{
                                                    setToast(true);
                                                },
                                                err=>{
                                                    setFailToast(true);
                                                }))
                                            }, err => {
                                                setFailToast(true);
                                                setSubmitting(false);
                                            }))
                                        }
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
                                                <label for="exampleInputUsername1">
                                                    Entity Name
                                                </label>
                                                <input
                                                    placeholder="Entity Name"
                                                    type="text"
                                                    id="exampleInputUsername1"
                                                    className="form-control"
                                                    name="entity_name"
                                                    onChange={handleChange}
                                                    defaultValue={values.entity_name}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label for="exampleInputUsername1">
                                                    Access Token
                                                </label>
                                                <input
                                                    placeholder="Access Token"
                                                    type="text"
                                                    id="exampleInputUsername1"
                                                    className="form-control"
                                                    name="access_token"
                                                    onChange={handleChange}
                                                    defaultValue={values.access_token}
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

export default Channel;