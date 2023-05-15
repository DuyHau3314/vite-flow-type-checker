import React from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';

import { carrierTranslator, packageTypeTranslator, serviceTranslator } from '../../helpers/translators';

const Shipment = (props) => {
    const order = props.order;
    const packageSpec = order.package;
    const dimensions = `${packageSpec.dimensionsLength || 'N/A'} X ${packageSpec.dimensionsWidth || 'N/A'} X ${packageSpec.dimensionsHeight || 'N/A'} (${order.dimensionsUnit || 'N/A'})`;
    const weight = `${packageSpec.weightValue || ''} ${packageSpec.weightUnit || ''}`;

    return (
        <Card>
            <Card.Header className="mb-2 text-uppercase Row-2">
                <i className="mdi mdi-office-building me-1"></i> Shipment
            </Card.Header>
            <Card.Body>
                <Row>
                    <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Carrier:</span></Col><Col className="col-lg-8">{carrierTranslator(order.carrier) || ''}</Col></Row>
                    <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Service:</span></Col><Col className="col-lg-8">{order.serviceName || serviceTranslator(order.service) || ''}</Col></Row>
                    <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Package:</span></Col><Col className="col-lg-8">{packageTypeTranslator(packageSpec.packageType) || ' '}</Col></Row>
                    <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Dimensions:</span></Col><Col className="col-lg-8">{dimensions || ''}</Col></Row>
                    <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Weight:</span></Col><Col className="col-lg-8">{weight || ''}</Col></Row>
                    <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Options:</span></Col><Col className="col-lg-8">Insurance, Signature</Col></Row>
                    <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Rate:</span></Col><Col className="col-lg-8">{order.price || ''}</Col></Row>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Shipment;