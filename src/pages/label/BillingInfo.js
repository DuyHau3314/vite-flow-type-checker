import React from 'react';

const BillingInfo = (props) => {
    const details = props.details || {};
    return (
        <>
            <ul className="list-unstyled mb-0">
                <li>
                    <p className="mb-2">
                        <span className="fw-bold me-2">Tracking Number:</span> {details.trackingNumber}
                    </p>
                    <p className="mb-0">
                        <span className="fw-bold me-2">Ship Date:</span> {details.ship_date}
                    </p>
                </li>
            </ul>
        </>
    );
};

export default BillingInfo;