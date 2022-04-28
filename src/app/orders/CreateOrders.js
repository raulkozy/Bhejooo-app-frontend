import React from 'react';
import { Trans } from 'react-i18next';
import { Form } from 'react-bootstrap';

const CreateOrders = () => {
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
        <div>
            <div className="d-flex align-items-center auth px-0 h-100">
                <div className="row w-100 mx-0">
                    <div className="col-lg-12 mx-auto">
                        {/* <div className="card text-left py-5 px-4 px-sm-5"> */}
                        <h1 className="font-weight-light">1. Create Order</h1>
                        {/* </div> */}
                        <div className="card text-left py-3 px-4 px-sm-5">
                            <h4>Customer's Details:</h4>
                            <form className="pt-3">
                                <div>
                                    <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="text" required className={`form-control form-control-lg border`}
                                                id="exampleInputUsername1" placeholder="Customer Name*"
                                            // value={firstName} onChange={e => handleFirstName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{firstNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="tel" required className={`form-control form-control-lg border`} id="exampleInputUsername2" placeholder="Customer Mobile Number*"
                                            // value={lastName} onChange={e => handleLastName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{lastNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="email" className={`form-control form-control-lg border `} id="exampleInputPassword1" placeholder="Customer Email Id"
                                            // value={password} onChange={e => handlePassword(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{passwordError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "45%" }}>
                                            <input type="text" className={`form-control form-control-lg border `} id="exampleInputEmail1" placeholder="Flat No. & Building Name*" // value={email} onChange={e => handleEmail(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{emailError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "45%" }}>
                                            <input type="text" required className={`form-control form-control-lg border`} id="exampleInputEmail1" placeholder="Road, Locality"
                                            // value={mobileNo} onChange={e => handleMobileNumber(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{mobileNoError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="text" required className={`form-control form-control-lg border`}
                                                id="exampleInputUsername1" placeholder="Landmark*"
                                            // value={firstName} onChange={e => handleFirstName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{firstNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="tel" required className={`form-control form-control-lg border`} id="exampleInputUsername2" placeholder="City, State*"
                                            // value={lastName} onChange={e => handleLastName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{lastNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="email" className={`form-control form-control-lg border `} id="exampleInputPassword1" placeholder="Customer Email Id"
                                            // value={password} onChange={e => handlePassword(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{passwordError}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <h4>Order Details:</h4>
                            <form className="pt-3">
                                <div>
                                    <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="text" required className={`form-control form-control-lg border`}
                                                id="exampleInputUsername1" placeholder="Product Name*"
                                            // value={firstName} onChange={e => handleFirstName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{firstNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="tel" required className={`form-control form-control-lg border`} id="exampleInputUsername2" placeholder="Product Price (Per Unit Item)*"
                                            // value={lastName} onChange={e => handleLastName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{lastNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="text" className={`form-control form-control-lg border `} id="exampleInputPassword1" placeholder="Quantity"
                                            // value={password} onChange={e => handlePassword(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{passwordError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "45%" }}>
                                            <input type="text" className={`form-control form-control-lg border `} id="exampleInputEmail1" placeholder="SKU No. (Optional)" // value={email} onChange={e => handleEmail(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{emailError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "45%" }}>
                                            <input type="text" required className={`form-control form-control-lg border`} id="exampleInputEmail1" placeholder="Product Category"
                                            // value={mobileNo} onChange={e => handleMobileNumber(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{mobileNoError}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <h4>Select Payment Mode:</h4>
                            {/* <div style={{ "display": "flex", "flexDirection": "row" }}>
                                <div style={{ "display": "flex", "flexDirection": "row" }}>
                                    <span className="menu-icon"><i className="mdi mdi-currency-inr text-success"></i></span>
                                    <span className="menu-title" style={{ "paddingLeft": "10px" }}><Trans>Dashboard</Trans></span>
                                </div>
                                <div style={{ "display": "flex", "flexDirection": "row", "paddingLeft": "10px" }}>
                                    <span className="menu-icon"><i className="mdi mdi-credit-card text-warning"></i></span>
                                    <span className="menu-title" style={{ "paddingLeft": "10px" }}><Trans>Prepaid</Trans></span>
                                </div>
                            </div> */}
                            <Form.Group>
                                <div >
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="" />
                                            <i className="input-helper"></i>
                                            <div style={{ "display": "flex", "flexDirection": "row", "paddingLeft": "10px" }}>
                                                <span className="menu-icon"><i className="mdi mdi-currency-inr text-success"></i></span>
                                                <span className="menu-title" style={{ "paddingLeft": "10px" }}><Trans>COD</Trans></span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="form-check" style={{ "paddingLeft": "20px" }}>
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2" defaultChecked />
                                            <i className="input-helper"></i>
                                            <div style={{ "display": "flex", "flexDirection": "row", "paddingLeft": "10px" }}>
                                                <span className="menu-icon"><i className="mdi mdi-credit-card text-warning"></i></span>
                                                <span className="menu-title" style={{ "paddingLeft": "10px" }}><Trans>Prepaid</Trans></span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </Form.Group>
                        </div>
                        <br />

                    </div>
                </div>
                <div className="row w-100 mx-0">
                    <div className="col-lg-12 mx-auto">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateOrders;