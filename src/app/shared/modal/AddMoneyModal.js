import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";
import "./Modal.css";
import { CheckoutProvider, Checkout, injectCheckout} from 'paytm-blink-checkout-react';

const API_URL = process.env.API_URL || 'https://api.bhejooo.com';
export const INITIATE_PAYMENT = `${API_URL}/finance/payment-initiate`;
var config = {};
const USE_EXISTING_CHECKOUT_INSTANCE = 'Use existing checkout instance : ';

const AddMoneyModal = () => {
    const [show, setShow] = useState(true);
    const [showCheckout, setShowCheckout] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modelwindow modal-lg manage-report-mod"
        >
            <Modal.Body>
                <div className="filter-head _fl mdf">

                </div>
                <Formik
                    initialValues={{ amount: 0 }}
                    onSubmit={(values, { setSubmitting }) => {
                        trackPromise(axios.post(INITIATE_PAYMENT, { ...values }).then(async (res) => {
                            setSubmitting(false);
                            alert(JSON.stringify(res.data.body.txnToken));
                            config = {
                                "root": "",
                                "flow": "DEFAULT",
                                "data": {
                                "orderId": res.data.orderId.orderId, /* update order id */
                                "token": res.data.body.txnToken, /* update token value */
                                "tokenType": "TXN_TOKEN",
                                "amount": values.amount, /* update amount */
                                
                                },
                                "merchant": {
                                    "mid": "FKFUNf08026136617820"
                                },
                                payMode: {
                                    labels: {},
                                    filter: {
                                        exclude: []
                                    },
                                    order: [
                                        "NB",
                                        "CARD",
                                        "LOGIN"
                                    ]
                                },
                                "handler": {
                                    "notifyMerchant": function(eventName,data){
                                    console.log("notifyMerchant handler function called");
                                    console.log("eventName => ",eventName);
                                    console.log("data => ",data);
                                    }
                                }
                            };
                            setShowCheckout(true);
                        }, err => {
                            setSubmitting(false);
                        }));
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <div className="create-report-wrap">
                                <h3>Topup Wallet</h3>
                                <div className="create-report-form">

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="inputEmail4" className="form-label">

                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Amount"
                                                className="form-control css-1405j39-control"
                                                id="inputEmail4"
                                                autoComplete="off"
                                                name="amount"
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="createReport-wrap clear-bt-wrap">
                                <button type="submit" className="reset-bt blue-btn" disabled={isSubmitting}>Proceed To Topup</button>
                            </div>
                        </form>
                    )}</Formik>
            </Modal.Body>
            {showCheckout &&(
            <CheckoutProvider config={config} openInPopup="true" env='STAGE'>
                <Checkout />  
            </CheckoutProvider>)}
        </Modal>
    )
}

export default AddMoneyModal;