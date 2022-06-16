import React, { useEffect, useState } from "react";
import "./ManageOrders.scss";
import { Trans } from "react-i18next";
import { Form } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";

const API_URL = process.env.API_URL || 'https://api.bhejooo.com/';
export const ORDER_URL = `${API_URL}/order/list`;

const ManageOrders = () => {
  const [list, setList] = useState();
  useEffect(()=>{
    axios.get(ORDER_URL).then(res=>{
      setList(res.data);
    })
  },[])
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
      <div className="topBar">
        <h2>Manage Orders</h2>
        <div className="manageorder-top-tabs">
          <a href="">To be proceessed</a>
          <a href="">Ready to ship</a>
          <a href="">Shipped</a>
          <a href="">Closed</a>
          <a href="">All orders</a>
        </div>
      </div>
      <div className="filterBar">
        <div className="filterByDate">
          <select class="form-control" id="exampleSelectGender">
            <option>Filter by date</option>
            
          </select>
        </div>
        <div className="searchBar">
        <i className="mdi mdi-magnify"></i>
        <input type="text" class="form-control" placeholder="Search products"/>
        </div>
      </div>
      <div className="row ">
        <div className="col-12 grid-margin manage-orders-wrapper">
          <div className="card">
            <div className="card-body">
              {/* <h4 className="card-title">Manage Orders</h4> */}
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: "25px" }}>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            <i className="input-helper"> </i>
                          </label>
                        </div>
                      </th>
                      <th> ORDER ID </th>
                      <th style={{ width: "150px" }}> ORDER DATE & TIME </th>
                      <th> CHANNEL </th>
                      <th style={{ width: "134px" }}> PRODUCT DETAILS </th>
                      <th> PAYMENT </th>
                      <th style={{ width: "176px" }}> CUSTOMER DETAILS </th>
                      <th style={{ width: "115px" }}> ORDER STATUS </th>
                      <th>ACTIONS </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list && list.map(ele=>(
                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            <i className="input-helper"> </i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <span>{ele.tracking_id} </span>
                        </div>
                      </td>
                      <td> {new Date(ele.created_at).toLocaleString()} </td>
                      <td> Manual </td>
                      <td>
                        <div className="proddetailsMain">
                          <div className="proddetails">
                            <span>{ele.product_name}</span>
                            <b>QTY: {ele.product_quantity}</b>
                          </div>
                          <img src="/static/media/lockscreen-bg.0d7ef366.jpg" />
                        </div>
                      </td>
                      <td> ₹{ele.product_price * ele.product_quantity} / - cod </td>
                      <td>
                        <div className="custdetsils">
                          <p>Johanna Barreto</p>
                          <p>Ph: 9158126836</p>
                          <a href="#">VIEW / EDIT DETAILS</a>
                        </div>
                      </td>
                      <td>Approved</td>
                      <td>
                        <button type="button" class="btn btn-success btn-fw">
                          I want to ship
                        </button>
                        <a href="#" className="cancelText">
                          Cancel
                        </a>
                      </td>
                    </tr>
                    ))}

                    {/* <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            <i className="input-helper"> </i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <span>4368241729 </span>
                        </div>
                      </td>
                      <td> 28 Apr 2022, 07: 12 pm </td>
                      <td> Manual </td>
                      <td>
                        <div className="proddetailsMain">
                          <div className="proddetails">
                            <span>ecsdcs</span>
                            <b>QTY: 1</b>
                          </div>
                          <img src="/static/media/lockscreen-bg.0d7ef366.jpg" />
                        </div>
                      </td>
                      <td> ₹122 / - cod </td>
                      <td>
                        <div className="custdetsils">
                          <p>Johanna Barreto</p>
                          <p>Ph: 9158126836</p>
                          <a href="#">VIEW / EDIT DETAILS</a>
                        </div>
                      </td>
                      <td>Approved</td>
                      <td>
                        <button type="button" class="btn btn-success btn-fw">
                          I want to ship
                        </button>
                        <a href="#" className="cancelText">
                          Cancel
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            <i className="input-helper"> </i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <span>4368241729 </span>
                        </div>
                      </td>
                      <td> 28 Apr 2022, 07: 12 pm </td>
                      <td> Manual </td>
                      <td>
                        <div className="proddetailsMain">
                          <div className="proddetails">
                            <span>ecsdcs</span>
                            <b>QTY: 1</b>
                          </div>
                          <img src="/static/media/lockscreen-bg.0d7ef366.jpg" />
                        </div>
                      </td>
                      <td> ₹122 / - cod </td>
                      <td>
                        <div className="custdetsils">
                          <p>Johanna Barreto</p>
                          <p>Ph: 9158126836</p>
                          <a href="#">VIEW / EDIT DETAILS</a>
                        </div>
                      </td>
                      <td>Approved</td>
                      <td>
                        <button type="button" class="btn btn-success btn-fw">
                          I want to ship
                        </button>
                        <a href="#" className="cancelText">
                          Cancel
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            <i className="input-helper"> </i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <span>4368241729 </span>
                        </div>
                      </td>
                      <td> 28 Apr 2022, 07: 12 pm </td>
                      <td> Manual </td>
                      <td>
                        <div className="proddetailsMain">
                          <div className="proddetails">
                            <span>ecsdcs</span>
                            <b>QTY: 1</b>
                          </div>
                          <img src="/static/media/lockscreen-bg.0d7ef366.jpg" />
                        </div>
                      </td>
                      <td> ₹122 / - cod </td>
                      <td>
                        <div className="custdetsils">
                          <p>Johanna Barreto</p>
                          <p>Ph: 9158126836</p>
                          <a href="#">VIEW / EDIT DETAILS</a>
                        </div>
                      </td>
                      <td>Approved</td>
                      <td>
                        <button type="button" class="btn btn-success btn-fw">
                          I want to ship
                        </button>
                        <a href="#" className="cancelText">
                          Cancel
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            <i className="input-helper"> </i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <span>4368241729 </span>
                        </div>
                      </td>
                      <td> 28 Apr 2022, 07: 12 pm </td>
                      <td> Manual </td>
                      <td>
                        <div className="proddetailsMain">
                          <div className="proddetails">
                            <span>ecsdcs</span>
                            <b>QTY: 1</b>
                          </div>
                          <img src="/static/media/lockscreen-bg.0d7ef366.jpg" />
                        </div>
                      </td>
                      <td> ₹122 / - cod </td>
                      <td>
                        <div className="custdetsils">
                          <p>Johanna Barreto</p>
                          <p>Ph: 9158126836</p>
                          <a href="#">VIEW / EDIT DETAILS</a>
                        </div>
                      </td>
                      <td>Approved</td>
                      <td>
                        <button type="button" class="btn btn-success btn-fw">
                          I want to ship
                        </button>
                        <a href="#" className="cancelText">
                          Cancel
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            <i className="input-helper"> </i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <span>4368241729 </span>
                        </div>
                      </td>
                      <td> 28 Apr 2022, 07: 12 pm </td>
                      <td> Manual </td>
                      <td>
                        <div className="proddetailsMain">
                          <div className="proddetails">
                            <span>ecsdcs</span>
                            <b>QTY: 1</b>
                          </div>
                          <img src="/static/media/lockscreen-bg.0d7ef366.jpg" />
                        </div>
                      </td>
                      <td> ₹122 / - cod </td>
                      <td>
                        <div className="custdetsils">
                          <p>Johanna Barreto</p>
                          <p>Ph: 9158126836</p>
                          <a href="#">VIEW / EDIT DETAILS</a>
                        </div>
                      </td>
                      <td>Approved</td>
                      <td>
                        <button type="button" class="btn btn-success btn-fw">
                          I want to ship
                        </button>
                        <a href="#" className="cancelText">
                          Cancel
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            <i className="input-helper"> </i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <span>4368241729 </span>
                        </div>
                      </td>
                      <td> 28 Apr 2022, 07: 12 pm </td>
                      <td> Manual </td>
                      <td>
                        <div className="proddetailsMain">
                          <div className="proddetails">
                            <span>ecsdcs</span>
                            <b>QTY: 1</b>
                          </div>
                          <img src="/static/media/lockscreen-bg.0d7ef366.jpg" />
                        </div>
                      </td>
                      <td> ₹122 / - cod </td>
                      <td>
                        <div className="custdetsils">
                          <p>Johanna Barreto</p>
                          <p>Ph: 9158126836</p>
                          <a href="#">VIEW / EDIT DETAILS</a>
                        </div>
                      </td>
                      <td>Approved</td>
                      <td>
                        <button type="button" class="btn btn-success btn-fw">
                          I want to ship
                        </button>
                        <a href="#" className="cancelText">
                          Cancel
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            <i className="input-helper"> </i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <span>4368241729 </span>
                        </div>
                      </td>
                      <td> 28 Apr 2022, 07: 12 pm </td>
                      <td> Manual </td>
                      <td>
                        <div className="proddetailsMain">
                          <div className="proddetails">
                            <span>ecsdcs</span>
                            <b>QTY: 1</b>
                          </div>
                          <img src="/static/media/lockscreen-bg.0d7ef366.jpg" />
                        </div>
                      </td>
                      <td> ₹122 / - cod </td>
                      <td>
                        <div className="custdetsils">
                          <p>Johanna Barreto</p>
                          <p>Ph: 9158126836</p>
                          <a href="#">VIEW / EDIT DETAILS</a>
                        </div>
                      </td>
                      <td>Approved</td>
                      <td>
                        <button type="button" class="btn btn-success btn-fw">
                          I want to ship
                        </button>
                        <a href="#" className="cancelText">
                          Cancel
                        </a>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="pagination-wrap">
            <div className="showTables">
              <p>Show</p>
              <select class="form-control" id="exampleSelectGender">
                <option>1</option>
                <option>2</option>
              </select>
            </div>

            <Pagination>
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Item>{5}</Pagination.Item>

              <Pagination.Next />
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
