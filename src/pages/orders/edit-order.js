// @flow
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

// components
import PageTitle from '../../components/PageTitle';
import AddressComponent from '../../components/AddressComponent';
import PackageComponent from '../../components/PackageComponent';
import Spinner from '../../components/Spinner';
import Items from './items';
import Rates from '../label/Rates';

// validators
// import { validPackageSpecForRating } from '../../helpers/spec-validators';

// actions
import { editOrderGetOrder, editOrderUpdateSpec, editOrderGetRatesForOrder, editOrderUpdateOrder } from '../../redux/actions';

import { fromAddress } from '../../helpers';

const EditOrder = (): React$Element<React$FragmentType> => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderId = params.get("id");

    const { error, loadingOrder, order, updatingOrder, updatedOrder, rates, loadingRates } = useSelector((state) => ({
        error: state.EditOrder.error,
        order: state.EditOrder.order,
        loadingOrder: state.EditOrder.loadingOrder,
        updatingOrder: state.EditOrder.updatingOrder,
        updatedOrder: state.EditOrder.updatedOrder,
        rates: state.EditOrder.rates,
        loadingRates: state.EditOrder.loadingRates
    }));

    useEffect(() => {
        dispatch(editOrderGetOrder(orderId, true, true));
    }, []);

    useEffect(() => {
        console.log('got an order', order);
        if (order) {
            dispatch(editOrderGetRatesForOrder(orderId, false));
        }
    }, [order]);

    const updateHandler = () => {
        console.log('updating order', order);
        //dispatch(editOrderUpdateOrder(order, false));
    };

    // gets called by the address component when any of the data changes
    // and triggers the getPrice call via useEffect()
    const addressChangeHandler = (specData) => {
        console.log('address changed: ', specData);
        dispatch(editOrderUpdateSpec({
            fromAddress: fromAddress,
            toAddress: {
                firstName: specData.firstName,
                middleName: specData.middleName,
                lastName: specData.lastName,
                companyName: specData.companyName,
                //street1: specData.street1,
                //city: specData.city,
                //postalCode: specData.postalCode,
                //stateProvince: specData.stateProvince,
                //countryCode: specData.countryCode
                ...specData.address // TODO: the Autocomplete class maintains matching object keys as the Address spec object. Needs refactoring.
            }
        }));
    };

    // gets called by the package component when any of the data changes
    // and triggers the getPrice call via useEffect()
    const packageChangeHandler = (specData) => {
        console.log('package changed: ', specData);
        dispatch(editOrderUpdateSpec({
            package: {
                packageType: specData.packageType,
                insuredValueValue: specData.insuredValueValue,
                insuredValueUnit: specData.insuredValueUnit,
                dimensionsLength: specData.dimensionsLength,
                dimensionsWidth: specData.dimensionsWidth,
                dimensionsHeight: specData.dimensionsHeight,
                dimensionsUnit: specData.dimensionsUnit,
                weightValue: specData.weightValue,
                weightUnit: specData.weightUnit
            }
        }));
    };

    const itemsChangeHandler = (specData) => {
        console.log('items changed: ', specData);
        dispatch(editOrderUpdateSpec({
            items: specData.items
        }));
    };

    const [selectedService, setSelectedService] = useState(null);
    const [selectedPackageType, setSelectedPackageType] = useState(null);

    const serviceSelectionHandler = (props) => {
        console.log('selected', props.service, props.packageType);
        setSelectedService(props.service);
        setSelectedPackageType(props.packageType);
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Edit Order'}
            />

            {loadingOrder && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
            {!loadingOrder && order &&
                <>
                    <Row>
                        <Col className="col-lg-8">
                            <Row>
                                <Col className="col-lg-12">
                                    <Items items={order.items} onSpecDataChange={itemsChangeHandler} />
                                </Col>
                            </Row>

                            <Row>
                                <Col className="col-12">
                                    <AddressComponent fromAddress={fromAddress} toAddress={order.toAddress} onSpecDataChange={addressChangeHandler} />
                                </Col>
                            </Row>
                        </Col>

                        <Col className="col-lg-4">
                            <Row>
                                <Col className="col-lg-12">
                                    <PackageComponent packageSpec={order.package} onSpecDataChange={packageChangeHandler} />
                                </Col>
                            </Row>

                            <Row>
                                <Col className="col-lg-12">
                                    <div style={{ height: '300px' }}>
                                        {loadingRates && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
                                        {!loadingRates && rates && rates.length > 0 && <Rates selectedService={selectedService} selectedPackageType={selectedPackageType} rates={rates} serviceSelectionHandler={serviceSelectionHandler} />}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-sm-6">
                            <Link to='/pages/orders' className="btn text-muted d-none d-sm-inline-block btn-link fw-semibold">
                                <i className="mdi mdi-arrow-left"></i> Orders
                            </Link>
                        </Col>
                        <Col className="col-sm-6">
                            <div className="text-sm-end">
                                <Button className="btn btn-secondary mb-2" onClick={updateHandler}>Update order</Button>
                            </div>
                        </Col>
                    </Row>
                </>
            }
        </>
    );
};
export default EditOrder;
