import React from 'react';

const ShippingInfo = (props) => {
    const details = props.details || {};
    return (
        <>
            <h5>{props.addressType}</h5>
            <address className="mb-0 font-14 address-lg">
                {details.first_name} {details.last_name}<br />
                {details.street1}<br />
                {details.city_locality} {details.state_province} {details.postal_code}
            </address>
        </>
    );
};

export default ShippingInfo;