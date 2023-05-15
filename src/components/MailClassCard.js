import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsps } from "@fortawesome/free-brands-svg-icons";

import uspsLogoImg from '../assets/images/usps-250x100.png';

const MailClassCard = (props): React$Element<React$FragmentType> => {
    const purchaseHandler = () => {
        props.purchaseService(props.service, props.packageType);
    };

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col className="col-4">
                        <img src={uspsLogoImg} height="70" />
                    </Col>
                    <Col className="col-6">
                        <h5>{props.serviceName}</h5>
                        <p> 2 Day(s)</p>
                    </Col>
                    <Col className="col-2">
                        <Row>
                            <Col>
                                <h5 className='d-flex justify-content-center'>${props.price.toFixed(2)}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='d-flex justify-content-center'>
                                <button type="button" className="btn btn-primary" onClick={purchaseHandler}>
                                    <i className=""></i>Purchase
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default MailClassCard;