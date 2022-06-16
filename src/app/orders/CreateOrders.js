import React, { useRef, useState, useEffect } from 'react';
import { Trans } from 'react-i18next';
import { Button, Card, Form, Table, Toast } from 'react-bootstrap';
import * as XLSX from "xlsx";
import axios from 'axios';
import { Formik } from 'formik';

const API_URL = process.env.API_URL || 'https://api.bhejooo.com/';
export const CREATE_ORDER_BULK = `${API_URL}/order/create/bulk`;
export const CREATE_ORDER = `${API_URL}/order/create`;
export const PIN_DETAILS = `${API_URL}/general/pinDetails?pinCode=`;
export const PRODUCT_CATEGORY = `${API_URL}/general/productCategoryList`;
export const SHIPPING_RATE = `${API_URL}/calculator/shiping-rate`;
export const PICKUP_ADDRESS = `${API_URL}/address/pickupAddress`;

const CreateOrders = () => {
    const [addressList, setAddressList] = useState();
    const [courier, setCourier] = useState();
    const [userData, setUserData] = useState({});
    const [category, setCategory] = useState();
    const [toast, setToast] = useState(false);
    const [failtoast, setFailToast] = useState(false);
    const fileUploader = useRef();
    const [file, setFile] = useState();
    
      const filePathset = (e) => {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        console.log(file);
        setFile(file);
    
        console.log(file);
      }
    
      const readFile = () => {
        var f = file;
        var name = f.name;
        const reader = new FileReader();
        reader.onload = (evt) => {
          // evt = on_file_select event
          /* Parse data */
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          /* Update state */
          //console.log("Data>>>" + data);// shows that excel data is read
          //console.log(convertToJson(data)); // shows data in json format
          axios.post(CREATE_ORDER_BULK,convertToJson(data)).then(res=>{
              
          })
        };
        reader.readAsBinaryString(f);
      }
    
      const convertToJson = (csv) => {
        var lines = csv.split("\n");
    
        var result = [];
    
        var headers = lines[0].split(",");
    
        for (var i = 1; i < lines.length; i++) {
          var obj = {};
          var currentline = lines[i].split(",");
    
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
    
          result.push(obj);
        }
    
        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
      }
      const navigate = () => {
          setToast(false);
          setFailToast(false);
      }
      const fetchpindetails=(pin)=>{
        axios.get(PIN_DETAILS+pin).then(res=>{
          const customer = {};
          customer.city = res.data.city;
          customer.state = res.data.state;
          setUserData(customer);
        })
      }
      const fetchshippingrate=(pin,values) =>{
          axios.get(SHIPPING_RATE+'?source='+values.customer.address.Pin+'&destination='+pin+'&payment_type='+values.order.payment_mode+'&weight='+values.shipment_details.weight+'&productValue='+values.order.product_price,{
              headers:{
                  'length': values.shipment_details.volumetric_weight.length,
                  'width': values.shipment_details.volumetric_weight.width,
                  'height': values.shipment_details.volumetric_weight.height
              }
          }).then(res=>{
            setCourier(res.data.rates)
          })
      }
      useEffect(()=>{
          axios.get(PRODUCT_CATEGORY).then((res)=>{
            setCategory(res.data)
          })
          axios.get(PICKUP_ADDRESS).then(res=>{
              setAddressList(res.data)
          })
      },[])
    
    return (
        <>
        <div className="row">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body" style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                        <h4 className="card-title">Create Orders</h4>
                        {/* <i className="menu-arrow"></i> */}
                        <div>
                        <input
                            type="file"
                            id="file"
                            ref={fileUploader}
                            onChange={e=>filePathset(e)}
                            style={{marginRight: '-100px'}}
                            />
                            <button className='btn btn-primary' onClick={readFile}>Bulk Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="d-flex align-items-center auth px-0 h-100">
                <div className="row w-100 mx-0">
                    <div className="col-lg-12 mx-auto">
                        {/* <div className="card text-left py-5 px-4 px-sm-5"> */}
                        <h1 className="title-text" style={{"font-size": "24px"}}>Single Order</h1> 
                        {/* </div> */}
                        <Formik
                            initialValues={{order:{payment_mode:'Prepaid'}}}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                axios.post(CREATE_ORDER, {...values, customer: {...values.customer,address:{...values.customer.address,...userData}}}).then(async (res)=>{
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
                                setFieldValue,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                            <form className="pt-3" onSubmit={handleSubmit}>
                            <div className="card text-left py-3 px-4 px-sm-5">
                            <h4>Customer's Details:</h4>
                            
                                <div>
                                    <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="text" name='customer.name' required className={`form-control form-control-lg border`}
                                                id="exampleInputUsername1" placeholder="Customer Name*" onChange={handleChange}
                                            // value={firstName} onChange={e => handleFirstName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{firstNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="tel" name='customer.mobile_no' required className={`form-control form-control-lg border`}
                                                id="exampleInputUsername2" placeholder="Customer Mobile Number*" onChange={handleChange}
                                            // value={lastName} onChange={e => handleLastName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{lastNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="email" name='customer.email' className={`form-control form-control-lg border `}
                                                id="exampleInputPassword1" placeholder="Customer Email Id" onChange={handleChange}
                                            // value={password} onChange={e => handlePassword(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{passwordError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="text" name='customer.address.address_lane1' className={`form-control form-control-lg border `} 
                                                id="exampleInputEmail1" placeholder="Flat No. & Building Name*" onChange={handleChange} 
                                            // value={email} onChange={e => handleEmail(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{emailError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="text" name='customer.address.address_lane2' required className={`form-control form-control-lg border`} 
                                                id="exampleInputEmail1" placeholder="Road, Locality" onChange={handleChange}
                                            // value={mobileNo} onChange={e => handleMobileNumber(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{mobileNoError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="number" name='customer.address.Pin' required className={`form-control form-control-lg border`} 
                                                id="exampleInputEmail1" placeholder="Pin" onChange={(e)=>{handleChange(e);fetchpindetails(e.target.value)}}
                                            // value={mobileNo} onChange={e => handleMobileNumber(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{mobileNoError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="text" name='customer.address.landmark' required className={`form-control form-control-lg border`}
                                                id="exampleInputUsername1" placeholder="Landmark*" onChange={handleChange}
                                            // value={firstName} onChange={e => handleFirstName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{firstNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="text" name='customer.address.city' required className={`form-control form-control-lg border`} 
                                                id="exampleInputUsername2" placeholder="City*" value={userData.city}
                                            // value={lastName} onChange={e => handleLastName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{lastNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="text" name='customer.address.state' className={`form-control form-control-lg border `} 
                                                id="exampleInputPassword1" placeholder="State" value={userData.state}
                                            // value={password} onChange={e => handlePassword(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{passwordError}</p> */}
                                        </div>
                                    </div>
                                </div>
                            <h4>Order Details:</h4>
                                <div>
                                    <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="text" name='order.product_name' required className={`form-control form-control-lg border`}
                                                id="exampleInputUsername1" placeholder="Product Name*" onChange={handleChange}
                                            // value={firstName} onChange={e => handleFirstName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{firstNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="number" name='order.product_price' required className={`form-control form-control-lg border`} 
                                                id="exampleInputUsername2" placeholder="Product Price (Per Unit Item)*" onChange={handleChange}
                                            // value={lastName} onChange={e => handleLastName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{lastNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="number" name='order.product_quantity' className={`form-control form-control-lg border `} 
                                                id="exampleInputPassword1" placeholder="Quantity" onChange={handleChange}
                                            // value={password} onChange={e => handlePassword(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{passwordError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "45%" }}>
                                            <input type="text" name='order.sku_no' className={`form-control form-control-lg border `} 
                                                id="exampleInputEmail1" placeholder="SKU No. (Optional)" onChange={handleChange}
                                            // value={email} onChange={e => handleEmail(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{emailError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "45%" }}>
                                            <select name='order.product_category' required className={`form-control form-control-lg border`} 
                                                id="exampleInputEmail1" placeholder="Product Category" onChange={handleChange}
                                            // value={mobileNo} onChange={e => handleMobileNumber(e)} 
                                            >
                                                <option value="">Select One</option>
                                                {category && category.map(ele=>
                                                    <option value={ele.id}>{ele.category}</option>
                                                )}
                                            </select>
                                            {/* <p style={{ "color": "red" }}>{mobileNoError}</p> */}
                                        </div>
                                    </div>
                                </div>

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
                                            <input type="radio" className="form-check-input" name="order.payment_mode" id="optionsRadios1" value="COD" onChange={handleChange} />
                                            <i className="input-helper"></i>
                                            <div style={{ "display": "flex", "flexDirection": "row", "paddingLeft": "10px" }}>
                                                <span className="menu-icon"><i className="mdi mdi-currency-inr text-success"></i></span>
                                                <span className="menu-title" style={{ "paddingLeft": "10px" }}><Trans>COD</Trans></span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="form-check" style={{ "paddingLeft": "20px" }}>
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="order.payment_mode" id="optionsRadios2" value="Prepaid" onChange={handleChange} defaultChecked />
                                            <i className="input-helper"></i>
                                            <div style={{ "display": "flex", "flexDirection": "row", "paddingLeft": "10px" }}>
                                                <span className="menu-icon"><i className="mdi mdi-credit-card text-warning"></i></span>
                                                <span className="menu-title" style={{ "paddingLeft": "10px" }}><Trans>Prepaid</Trans></span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </Form.Group>

                            <h4>Shipment Details:</h4>
                                <div>
                                    <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="number" name='shipment_details.volumetric_weight.length' required className={`form-control form-control-lg border`}
                                                id="exampleInputUsername1" placeholder="Volumetric Length*" onChange={handleChange}
                                            // value={firstName} onChange={e => handleFirstName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{firstNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="number" name='shipment_details.volumetric_weight.width' required className={`form-control form-control-lg border`} 
                                                id="exampleInputUsername2" placeholder="Volumetric Width*" onChange={handleChange}
                                            // value={lastName} onChange={e => handleLastName(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{lastNameError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "30%" }}>
                                            <input type="number" name='shipment_details.volumetric_weight.height' className={`form-control form-control-lg border `} 
                                                id="exampleInputPassword1" placeholder="Volumetric Height" onChange={handleChange}
                                            // value={password} onChange={e => handlePassword(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{passwordError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "45%" }}>
                                            <input type="number" name='shipment_details.weight' className={`form-control form-control-lg border `} 
                                                id="exampleInputEmail1" placeholder="Weight" onChange={handleChange}
                                            // value={email} onChange={e => handleEmail(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{emailError}</p> */}
                                        </div>
                                        <div className="form-group" style={{ "width": "45%" }}>
                                            <input type="number" name='shipment_details.pickup_date' className={`form-control form-control-lg border `} 
                                                id="exampleInputEmail1" placeholder="Pickup Pin" onChange={(e)=>fetchshippingrate(e.target.value,values)}
                                            // value={email} onChange={e => handleEmail(e)} 
                                            />
                                            {/* <p style={{ "color": "red" }}>{emailError}</p> */}
                                        </div>
                            <h4>Select Courier Partner:</h4>

                                        <Table className="leader-board" striped hover variant="dark">
                                            
                                            <tbody>
                                                {courier && courier.map(ele=>
                                                <tr>
                                                    <td>
                                                    <div className="form-check">
                                                        <label className="form-check-label">
                                                            <input type="radio" className="form-check-input" name="shipment_details.carrier.carrier" id="optionsRadios1" value={ele.carrier} onChange={handleChange} />
                                                            <i className="input-helper"></i>
                                                            <div style={{ "display": "flex", "flexDirection": "row", "paddingLeft": "10px" }}>
                                                                <span className="menu-title" style={{ "paddingLeft": "10px", color: "#FFF" }}><Trans>{ele.carrier}</Trans></span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    </td>
                                                    <td>
                                                        <span className="menu-icon"><i className="mdi mdi-currency-inr text-success"></i></span>
                                                        <span className="menu-title" style={{ "paddingLeft": "10px", color: "#FFF" }}><Trans>{ele.rate}</Trans></span>
                                                    </td>
                                                </tr>)}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                                <br />

                            <h4>Address Details:</h4>
                                <div>
                                {addressList && addressList.map(ele=>
                                <Card className='mb-2' style={{ width: '18rem', border: values.pickup_details && values.pickup_details.address_id==ele.id?'0.5px solid #fff':'' }}>
                                <Card.Body>
                                    <Card.Title>{ele.address_lane1}</Card.Title>
                                    <Card.Text>
                                    {ele.address_lane1},&nbsp;
                                    {ele.address_lane2},&nbsp;
                                    {ele.city},&nbsp;{ele.state}-{ele.Pin}
                                    </Card.Text>
                                    <Button variant="primary" onClick={()=>setFieldValue('pickup_details.address_id',ele.id)}>Select</Button>
                                </Card.Body>
                                </Card>)}
                                </div>
                            {/* <h4>Pickup Details:</h4>
                                <div>
                                    <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                                        <div className="form-group" style={{ "width": "100%" }}>
                                            <input type="text" name='pickup_details.address_id' required className={`form-control form-control-lg border`}
                                                id="exampleInputUsername1" placeholder="Address ID*" onChange={handleChange}
                                            // value={firstName} onChange={e => handleFirstName(e)} 
                                            />
                                        </div>
                                    </div>
                                </div>   */}
                            <br />      
                            <button className={'btn btn-primary btn-lg'} type='submit'>Order</button>
                            </div>
                            </form>
                            )}
                        </Formik>                        
                         <br />

                    </div>
                </div>
                <div className="row w-100 mx-0">
                    <div className="col-lg-12 mx-auto">
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
    )
}

export default CreateOrders;