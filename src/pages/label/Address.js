import React from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';
import enFlag from '../../assets/images/flags/us.jpg';

const Address = (params) => {
    const order = params.order;

    const fromName = (order.fromAddress.firstName || '') + " " + (order.fromAddress.middleName || '') + " " + (order.fromAddress.lastName || '');
    const fromCompanyName = (order.fromAddress.companyName || '');
    const toName = (order.toAddress.firstName || '') + " " + (order.toAddress.middleName || '') + " " + (order.toAddress.lastName || '');
    const toCompanyName = (order.toAddress.companyName || '');

    return (
        <Card>
            <Card.Header className="mb-2 text-uppercase p-2">
                <i className="mdi mdi-office-building me-1"></i> Address
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col className="col-md-6">
                        <h6 className="text-uppercase text-muted mt-0">From address</h6>
                        {fromName && fromName.trim() && <h5>{fromName}</h5>}
                        {fromCompanyName && fromCompanyName.trim() && <h5>{fromCompanyName}</h5>}
                        <address className="mb-0 font-14 address-lg">
                            {order.fromAddress.street1}<br />
                            {order.fromAddress.cityLocality} {order.fromAddress.stateProvince} {order.fromAddress.postalCode}<br />
                            <img src={enFlag} className="me-1" height="12" />
                        </address>
                    </Col>
                    <Col className="col-md-6">
                        <h6 className="text-uppercase text-muted mt-0">To address</h6>
                        {toName && toName.trim() && <h5>{toName}</h5>}
                        {toCompanyName && toCompanyName.trim() && <h5>{toCompanyName}</h5>}
                        <address className="mb-0 font-14 address-lg">
                            {order.toAddress.street1}<br />
                            {order.toAddress.cityLocality} {order.toAddress.stateProvince} {order.toAddress.postalCode}<br />
                            <img src={enFlag} className="me-1" height="12" />
                        </address>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Address;