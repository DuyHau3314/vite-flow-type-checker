import React from 'react';

const PackageSpecs = (props) => {
    const details = props.details || {};
    return (
        <>
            <ul className="list-unstyled mb-0">
                <li>
                    <p className="mb-2">
                        <span className="fw-bold me-2">Shipment Weight:</span> {details.shipment_weight && `${details.shipment_weight.value} ${details.shipment_weight.unit}`}
                    </p>
                    <p className="mb-2">
                        <span className="fw-bold me-2">Dimensions:</span> {details.shipment_dimensions && `${details.shipment_dimensions.length}X${details.shipment_dimensions.width}X${details.shipment_dimensions.height} ${details.shipment_dimensions.unit}`}
                    </p>
                    <p className="mb-2">
                        <span className="fw-bold me-2">Carrier:</span> {details.carrier}
                    </p>
                    <p className="mb-2">
                        <span className="fw-bold me-2">Service:</span> {details.service}
                    </p>
                </li>
            </ul>
        </>
    );
};

export default PackageSpecs;