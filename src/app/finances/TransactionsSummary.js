import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Pagination from "react-bootstrap/Pagination";
import { trackPromise } from 'react-promise-tracker';
import './Finances.scss';

const API_URL = process.env.API_URL || 'https://api.bhejooo.com';
export const TRANSACTION_SUMMARY = `${API_URL}/finance/transactions`;

const PAGINATION_LIMIT = 5;

const TransactionsSummary = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        trackPromise(axios.get(TRANSACTION_SUMMARY + '?total=10&skip=' + (activePage-1)).then(res => {
            setTransactionData(res.data);
        }))
    }, [activePage]);

    let pageItems = [...(activePage > 1 ? [<Pagination.Prev onClick={() => setActivePage(activePage-1)}/>] : [])];
    for (let number = 1; number <= PAGINATION_LIMIT; number++) {
        pageItems.push(
          <Pagination.Item key={number} active={number === activePage} onClick={() => setActivePage(number)}>
            {number}
          </Pagination.Item>,
        );
    }
    pageItems.push(...(activePage < PAGINATION_LIMIT ? [<Pagination.Next onClick={() => setActivePage(activePage+1)}/>] : []))

    return (
        <div className="transaction-summary">
            <div className="topBar">
                <h2>Transactions Summary</h2>
            </div>
            <div className="summary-table grid-margin">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <div className="columns">
                                <div className="flex-2 table-item head-item">ORDER ID</div>
                                <div className="flex-1 table-item head-item">PAYMENT MODE</div>
                                <div className="flex-2 table-item head-item">AWB</div>
                                <div className="flex-1 table-item head-item">WALLET TYPE</div>
                                <div className="flex-1 table-item head-item">SHIPPING CHARGES</div>
                                <div className="flex-2 table-item head-item">DATE</div>
                                <div className="flex-2 table-item head-item">ORDER DESCRIPTION</div>
                                <div className="flex-1 table-item head-item">ORDER REMARKS</div>
                                <div className="flex-2 table-item head-item">TRANSACTION TYPE</div>
                            </div>
                            {transactionData.map(data => (
                                <div className="columns">
                                    <div className="flex-2 table-item">{data.order.id}</div>
                                    <div className="flex-1 table-item">{data.order.payment_mode}</div>
                                    <div className="flex-2 table-item">{data.order.tracking_id}</div>
                                    <div className="flex-1 table-item">{data.affected_balance}</div>
                                    <div className="flex-1 table-item">{data.amount}</div>
                                    <div className="flex-2 table-item">{new Date(data.created_at).toLocaleString()}</div>
                                    <div className="flex-2 table-item">{data.description}</div>
                                    <div className="flex-1 table-item">{data.remarks}</div>
                                    <div className="flex-2 table-item">{data.transaction_type}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pagination-section">
                <Pagination>{pageItems}</Pagination>
            </div>
        </div>
    )
}

export default TransactionsSummary;