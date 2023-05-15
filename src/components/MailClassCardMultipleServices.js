import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsps } from "@fortawesome/free-brands-svg-icons";

const MailClassCardMultipleServices = (props): React$Element<React$FragmentType> => {
    const rates = props['rates'].sort((a, b) => (a.price > b.price) ? 1 : -1);
    const lowestRate = rates[0];
    const highestRate = rates[rates.length - 1];

    let priceTypeText = null;
    switch (lowestRate.priceType) {
        case 'retail':
            priceTypeText = "Retail";
            break;
        case 'commercial_base':
            priceTypeText = 'Commercial Base';
            break;
        case 'commercial_plus':
            priceTypeText = 'Commercial Plus';
            break;
        case 'nsa':
            priceTypeText = 'NSA';
            break;
        default:
            priceTypeText = lowestRate.priceType;
      } 

    const purchaseHandler = () => {
        props.purchaseService(lowestRate.service, lowestRate.packageType);
    };

    return (
        <Card className="">
            <Card.Body>
                <Row>
                    <Col sm={1} className="d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faUsps} size="3x" /> 
                    </Col>
                    <Col sm={8}>
                        <h4>{lowestRate.serviceName}</h4>
                        <p> 2 Day(s)</p>
                    </Col>
                    <Col sm={2}>
                        <h5 className="small"><del>${highestRate.price}</del></h5>
                        <h5>${lowestRate.price}</h5>
                        <p>{priceTypeText}</p>
                    </Col>
                    <Col sm={1} className="d-flex align-items-center justify-content-center">
                        <button type="button" className="btn btn-primary float-end" onClick={purchaseHandler}>
                            <i className=""></i>Purchase
                        </button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default MailClassCardMultipleServices;