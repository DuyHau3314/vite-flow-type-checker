// @flow
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useReactToPrint } from 'react-to-print';

// components
import ComponentToPrint from '../../components/ComponentToPrint';
import PageTitle from '../../components/PageTitle';
import Spinner from '../../components/Spinner';
import MailClassCard from '../../components/MailClassCard';
import Activity from './Activity';
import Items from './Items';
import OrderSummary from './OrderSummary';
import ShippingInfo from './ShippingInfo';
import BillingInfo from './BillingInfo';
import OrderDetails2 from './OrderDetails2';
import PackageSpecs from './PackageSpecs';
import Address from './Address';
import Shipment from './Shipment';
import Tracking from './Tracking';
import Rates from './Rates';

import { validForRating, validForPurchasing } from '../../helpers/spec-validators';

// actions
import { labelGetOrder, labelGetRatesForOrder, labelCreateLabelForOrder, labelUpdateOrderAndCreateLabel } from '../../redux/actions';

var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const Label = (): React$Element<React$FragmentType> => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderId = params.get("id");

    const { order, loadingOrder, loadingRates, rates } = useSelector((state) => ({
        order: state.Label.order,
        loadingOrder: state.Label.loadingOrder,
        loadingRates: state.Label.loadingRates,
        rates: state.Label.rates
    }));

    useEffect(() => {
        dispatch(labelGetOrder(orderId, true, true));
    }, []);

    useEffect(() => {
        if (order) {
            setSelectedService(order.service);
            setSelectedPackageType(order.package.packageType);
            if (!order.purchased) {
                dispatch(labelGetRatesForOrder(orderId, false));
            }
        }
        console.log('order', order);
    }, [order]);

    const createLabelForOrderHandler = () => {
        if (selectedService && selectedPackageType) {
            console.log('will update and create..');
            const updateOrderSpec = {
                service: selectedService,
                packageType: selectedPackageType
            }
            dispatch(labelUpdateOrderAndCreateLabel(orderId, updateOrderSpec, true, true));
        }
        else {
            console.log('creating label...');
            dispatch(labelCreateLabelForOrder(orderId, true));
        }
    };

    const [selectedService, setSelectedService] = useState(null);
    const [selectedPackageType, setSelectedPackageType] = useState(null);

    const serviceSelectionHandler = (props) => {
        console.log('selected', props.service, props.packageType);
        setSelectedService(props.service);
        setSelectedPackageType(props.packageType);
    };

    const readyForPurchase = selectedService && selectedPackageType && validForPurchasing(order);
    const readyForRating = validForRating(order);

    const componentRef = useRef();
    const printHandler = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <PageTitle breadCrumbItems={[]} title={'Order and Shipment Details'} />

            <div style={{ display: 'none' }}>
                <ComponentToPrint ref={componentRef} labelBase64Content={order && order.purchased && order.base64Label} />
            </div>

            {loadingOrder && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
            {!loadingOrder && order &&
                <div>
                    <Row>
                        <Col className="col-sm-8">
                            <Row>
                                <OrderDetails2 order={order} />
                            </Row>
                            <Row>
                                <Address order={order} />
                            </Row>
                        </Col>

                        <Col className="col-sm-4 ps-4">
                            <Row>
                                <Shipment order={order} />
                            </Row>
                            <Row>
                                {order.purchased && <Tracking order={order} />}
                                {!order.purchased && !rates && <Spinner animation="border" role="status"><span className="visually-hidden">Loading rates...</span></Spinner>}
                                {!order.purchased && rates && rates.length > 0 && <Rates selectedService={selectedService} selectedPackageType={selectedPackageType} rates={rates} serviceSelectionHandler={serviceSelectionHandler} />}
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-sm-6">
                            <Link to='/pages/orders' className="btn text-muted d-none d-sm-inline-block btn-link fw-semibold">
                                <i className="mdi mdi-arrow-left"></i> Orders
                            </Link>
                        </Col>
                        {order.purchased &&
                            <Col className="col-sm-6">
                                <div className="text-sm-end">
                                    <button type="button" className="btn btn-outline-danger disabled mb-2">Void label</button>

                                    <div className="btn-group">
                                        <button type="button" className="btn btn-primary mb-2" onClick={printHandler}>Print label</button>
                                        <button type="button" className="btn btn-primary mb-2 me-1 dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className="visually-hidden">Toggle Dropdown</span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Print packing slip and label</a></li>
                                            <li><a className="dropdown-item" href="#">Print packing slip only</a></li>
                                            <li><a className="dropdown-item" href="#">Print customs invoice</a></li>
                                            <li><a className="dropdown-item" href="#">Print return label</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" href="#">Download label</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" href="#">Send email</a></li>
                                        </ul>
                                    </div>

                                </div>
                            </Col>
                        }
                        {!order.purchased &&
                            <div className="col-sm-6">
                                <div className="text-sm-end">
                                    <Link to={"/pages/edit-order?id=" + orderId} className="action-icon">
                                        <button type="button" className="btn btn-outline-dark mb-2">Edit order</button>
                                    </Link>
                                    <button type="button" className="btn btn-primary mb-2 me-1" onClick={createLabelForOrderHandler} disabled={!readyForPurchase}>Buy label</button>
                                </div>
                            </div>
                        }
                    </Row>
                </div>
            }
        </>
    );
};

export default Label;
