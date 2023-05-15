import React from 'react';

const OrderSummary = (props) => {
    const summary = props.summary || {};

    return (
        <div className="table-responsive">
            <table className="table mb-0">
                <thead className="table-light">
                    <tr>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Shipping Fees :</td>
                        <td>{summary.price}</td>
                    </tr>
                    <tr>
                        <td>Additional Fees :</td>
                        <td>{0.0}</td>
                    </tr>
                    <tr>
                        <td>Estimated Tax : </td>
                        <td>{0.0}</td>
                    </tr>
                    <tr>
                        <th>Total :</th>
                        <td>{summary.price}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrderSummary;