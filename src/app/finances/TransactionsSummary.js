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
                                <div className="flex-1 table-item head-item">TYPE</div>
                                <div className="flex-2 table-item head-item">CATEGORY</div>
                                <div className="flex-1 table-item head-item">AMOUNT</div>
                                <div className="flex-1 table-item head-item">AFFECTED</div>
                                <div className="flex-2 table-item head-item">CREATED AT</div>
                                <div className="flex-1 table-item head-item">REMARKS</div>
                            </div>
                            {transactionData.map(data => (
                                <div className="columns">
                                    <div className="flex-2 table-item">{data.order}</div>
                                    <div className="flex-1 table-item">{data.type}</div>
                                    <div className="flex-2 table-item">{data.category}</div>
                                    <div className="flex-1 table-item">{data.amount}</div>
                                    <div className="flex-1 table-item">{data.affected}</div>
                                    <div className="flex-2 table-item">{new Date(data.created_at).toLocaleString()}</div>
                                    <div className="flex-1 table-item">{data.remarks}</div>
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