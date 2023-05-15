import React from 'react';

const OrderDetails = (props) => {
    const details = props.details || {};
    return (
        <>
            <ul className="list-unstyled mb-0">
                <li>
                    <p className="mb-2">
                        <span className="fw-bold me-2">ID:</span> {details.id}
                    </p>
                    <p className="mb-2">
                        <span className="fw-bold me-2">External Order ID:</span> {details.external_order_id}
                    </p>
                    <p className="mb-0">
                        <span className="fw-bold me-2">Source:</span> N/A
                    </p>
                </li>
            </ul>
        </>
    );
};

export default OrderDetails;