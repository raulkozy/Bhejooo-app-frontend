import React, { useEffect, useRef, useState } from "react";
import "./ManageOrders.scss";
import { Trans } from "react-i18next";
import { Form, Toast } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import * as XLSX from "xlsx";
import { trackPromise } from "react-promise-tracker";
import ReactPaginate from "react-paginate";

const API_URL = process.env.API_URL || 'https://api.bhejooo.com';
export const ORDER_URL = `${API_URL}/order/list`;
export const UPDATE_ORDER = `${API_URL}/order`;
export const SHIPPING_LABEL = `${API_URL}/document/shipping_label`;
export const EXPORT_URL = `${API_URL}/order/export`;

const ManageOrders = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemlength, setItemlength] = useState(0);
  const [total, setTotal] = useState(10);
  const [list, setList] = useState();
  const [selectedList, setSelectedList] = useState([]);
  const [status, setStatus] = useState('TO_BE_PROCESSED');
  const [checked, setChecked] = useState();
  const [toast, setToast] = useState(false);
  const [failtoast, setFailToast] = useState(false);
  const table = useRef();
  useEffect(() => {
    const params = status ? '?total='+total+'&status='+status : '?total='+total;
    trackPromise(axios.get(ORDER_URL+params).then(res => {
      setList(res.data);
      setItemlength(res.headers.totalcount);
      setPageCount(Math.ceil(res.headers.totalcount / total));
    }))
  }, [status,total]);
  const exportToExcel = () => {
    trackPromise(axios.post(EXPORT_URL,{order_ids: selectedList}).then(res=>{
        var workbook = XLSX.utils.book_new();
        // Extract Data (create a workbook object from the table)
        var ws = XLSX.utils.json_to_sheet(res.data);
        XLSX.utils.book_append_sheet(workbook, ws, 'Order List');
        // Package and Release Data (`writeFile` tries to write and save an XLS file)
        XLSX.writeFile(workbook, "Report.xls");
        setToast(true);
      },
      e=>{
        setFailToast(true);
      }))
    
  };
  const shipOrderAll = () => {
      trackPromise(axios.put(UPDATE_ORDER,{order_ids: selectedList},
      {
        headers: {
          move_to: 'PROCESSED'
        }
      }
      ).then(res=>{
        setToast(true);
      },
      e=>{
        setFailToast(true);
      }))
  };
  const shipOrder = (id) => {
    trackPromise(axios.put(UPDATE_ORDER,{order_ids: [id]},
    {
      headers: {
        move_to: 'PROCESSED'
      }
    }
    ).then(res=>{
        setToast(true);
      },
      e=>{
        setFailToast(true);
    }))
  };
  const cancelOrder = (id) => {
    trackPromise(axios.put(UPDATE_ORDER,{order_ids: [id]},
    {
      headers:{
        move_to: 'CANCELLED'
      }
    }
    ).then(res=>{
        setToast(true);
      },
      e=>{
        setFailToast(true);
    }))
  };
  const cancelOrderAll = () => {
    trackPromise(axios.put(UPDATE_ORDER,{order_ids: selectedList},
    {
      headers:{
        move_to: 'CANCELLED'
      }
    }
    ).then(res=>{
        setToast(true);
      },
      e=>{
        setFailToast(true);
    }))
  };
  const downloadLabel = (id) => {
    trackPromise(axios.post(SHIPPING_LABEL, {order_ids: [id]}, { responseType: 'blob' }).then(res=>{
      var blob=new Blob([res.data], {type: "application/pdf"});
      var link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      link.download="Shipping_label.pdf";
      link.click();
      setToast(true);
    },
    e=>{
      setFailToast(true);
    }))
  }
  const downloadLabelAll = () => {
    trackPromise(axios.post(SHIPPING_LABEL, {order_ids: selectedList}, { responseType: 'blob' }).then(res=>{
      var blob=new Blob([res.data], {type: "application/pdf"});
      var link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      link.download="Shipping_label.pdf";
      link.click();
      setToast(true);
    },
    e=>{
      setFailToast(true);
    }))
  }
  const navigate = () => {
    setToast(false);
    setFailToast(false);
  };
  const handlePageClick = (event) => {
    const newOffset = (event.selected * total) % itemlength;
    const params = status ? '?total='+total+'&status='+status+'&skip='+newOffset : '?total='+total+'&skip='+newOffset ;
    trackPromise(axios.get(ORDER_URL+params).then(res => {
      setList(res.data);
      setItemlength(res.headers.totalcount);
      setPageCount(Math.ceil(res.headers.totalcount / total));
    }))
  };
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
          <a className={status == 'TO_BE_PROCESSED' ? "active" : ""} href="javascript:;" onClick={() => setStatus('TO_BE_PROCESSED')}>To be proceessed</a>
          <a className={status == 'PROCESSED' ? "active" : ""} href="javascript:;" onClick={() => setStatus('PROCESSED')}>Ready to ship</a>
          <a className={status == 'SHIPPED' ? "active" : ""} href="javascript:;" onClick={()=> setStatus('SHIPPED')}>Shipped</a>
          <a className={status == 'DELIVERED' ? "active" : ""} href="javascript:;" onClick={()=> setStatus('DELIVERED')}>Closed</a>
          <a className={status == 'CANCELLED' ? "active" : ""} href="javascript:;" onClick={() => setStatus('CANCELLED')}>Cancelled</a>
          <a className={status == '' ? "active" : ""} href="javascript:;" onClick={()=> setStatus("")}>All orders</a>
        </div>
      </div>
      <div className="filterBar">
        {window.innerWidth > 726 ? (<div className="filterByDate">
          <select class="form-control" id="exampleSelectGender">
            <option>Filter by date</option>

          </select>
        </div>):(<br />)}
        {window.innerWidth > 726 && (<div className="searchBar">
          <i className="mdi mdi-magnify"></i>
          <input type="text" class="form-control" placeholder="Search products" />
        </div>)}
        <div className="bulk-action">
          <div className="row">
            {status == 'TO_BE_PROCESSED' && (
                <button type="button" className="btn btn-success btn-fw" disabled={selectedList.length<2} onClick={shipOrderAll}>
                  I want to ship
                </button>)}
            {status == 'PROCESSED' && (
              <>  
                <button type="button" className="btn btn-danger btn-fw" style={{ marginLeft: '16px', height: '30px' }} disabled={selectedList.length<2} onClick={cancelOrderAll}>
                  Cancel
                </button>
                <button type="button" className="btn btn-light btn-fw" style={{ marginLeft: '16px', height: '30px' }} disabled={selectedList.length<2} onClick={downloadLabelAll}>
                  Shipping Label
                </button>
              </>)}
            <button type="button" className="btn btn-info btn-fw" style={{ marginLeft: '16px', height: '30px' }} onClick={exportToExcel}>
              Export to Excel
            </button>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-12 grid-margin manage-orders-wrapper">
          <div className="card">
            <div className="card-body">
              {/* <h4 className="card-title">Manage Orders</h4> */}
              <div className="table-responsive">
                <table className="table" ref={table}>
                  <thead>
                    <tr>
                      <th style={{ width: "25px" }}>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              onChange={(e)=>{setChecked(e.target.checked);if(e.target.checked)setSelectedList(list.map(o=>o.id))
                                else setSelectedList([])}}
                            />
                            <i className="input-helper"> </i>
                          </label>
                        </div>
                      </th>
                      <th> ORDER ID </th>
                      <th style={{ width: "120px" }}> AWB </th>
                      <th style={{ width: "150px" }}> ORDER DATE & TIME </th>
                      <th> CHANNEL </th>
                      <th style={{ width: "134px" }}> PRODUCT DETAILS </th>
                      <th> PAYMENT </th>
                      <th style={{ width: "176px" }}> CUSTOMER DETAILS </th>
                      <th style={{ width: "115px" }}> STATUS </th>
                      <th>ACTIONS </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list && list
                      .map(ele => (
                        <tr>
                          <td>
                            <div className="form-check form-check-muted m-0">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={checked}
                                  onChange={(e)=>{if(e.target.checked)setSelectedList(old=>[...old, ele.id])
                                    else setSelectedList(old=>old.filter(o=>o!==ele.id))}}
                                />
                                <i className="input-helper"> </i>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <span>{ele.id} </span>
                            </div>
                          </td>
                          <td>{ele.tracking_id}</td>
                          <td> {new Date(ele.created_at).toLocaleString()} </td>
                          <td> {ele.channel} </td>
                          <td>
                            <div className="proddetailsMain">
                              <div className="proddetails">
                                <span>{ele.product_name}</span>
                                <b>QTY: {ele.product_quantity}</b>
                              </div>
                            </div>
                          </td>
                          <td> ₹{ele.product_price * ele.product_quantity} / - {ele.payment_type} </td>
                          <td>
                            {ele.customer && (
                            <div className="custdetsils">
                              <p>{ele.customer.name}</p>
                              <p>Ph: {ele.customer.mobile_no}</p>
                              {/* <a href="#">VIEW / EDIT DETAILS</a> */}
                            </div>)}
                          </td>
                          <td>{ele.status=='TO_BE_PROCESSED'?'Approved':ele.status}</td>
                          <td>
                            {status == 'TO_BE_PROCESSED' && (
                              <>
                                <button type="button" class="btn btn-success btn-fw" onClick={()=>shipOrder(ele.id)}>
                                  I want to ship
                                </button>
                              </>)}
                            {status == 'PROCESSED' && (
                              <>
                                <button type="button" class="btn btn-light btn-fw" onClick={()=>downloadLabel(ele.id)}>
                                  Shipping Label
                                </button>
                                <a href="#" className="cancelText" onClick={()=>cancelOrder(ele.id)}>
                                  Cancel
                                </a>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    
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
              <select class="form-control" id="exampleSelectGender" onChange={(e)=>setTotal(e.target.value)}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={40}>40</option>
                <option value={80}>80</option>
              </select>
            </div>

            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={0}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              pageLinkClassName="page-link"
              nextClassName="page-link"
              previousClassName="page-link"
              activeLinkClassName="active-link"
            />  
          </div>
        </div>
      </div>

      {toast && (<Toast onClose={navigate} className="toast-success" autohide={true}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body> Sucessful.</Toast.Body>
        </Toast>
        )}
        {failtoast && (<Toast onClose={navigate} className="toast-danger" autohide={true}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Failure</strong>
          </Toast.Header>
          <Toast.Body> Failed.</Toast.Body>
        </Toast>
        )}
    </div>
  );
};

export default ManageOrders;
