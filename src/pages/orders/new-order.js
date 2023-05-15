import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// components
import PageTitle from '../../components/PageTitle';
import AddressComponent from '../../components/AddressComponent';
import PackageComponent from '../../components/PackageComponent';
import Spinner from '../../components/Spinner';
import Items from './items';
import Rates from '../label/Rates';
import Options from './options';

// validators
import { validForRating } from '../../helpers/spec-validators';

//TODO: remove
import { fromAddress } from '../../helpers';

import { validForCreate } from '../../helpers/spec-validators';

// actions
import { newOrderUpdateOrderSpec, newOrderCreateOrder, newOrderGetRates, newOrderResetState } from '../../redux/actions';

const NewOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loadingRates, rates, error, orderSpec, creating, created, createdOrderId } = useSelector((state) => ({
        loadingRates: state.NewOrder.loadingRates,
        rates: state.NewOrder.rates,
        error: state.NewOrder.error,
        orderSpec: state.NewOrder.orderSpec,
        creating: state.NewOrder.creating,
        created: state.NewOrder.created,
        createdOrderId: state.NewOrder.createdOrderId
    }));

    // do no dispatch getRates on the first render
    const [didRender, setDidRender] = useState(false);
    useEffect(() => {
        setDidRender(true);
    }, []);

    useEffect(() => {
        console.log('rates', rates);
    }, [rates]);

    // dispatch getRates when any package specs change if all is valid
    useEffect(() => {
        console.log('orderSpec', orderSpec);
        if (didRender) {
            if (validForRating(orderSpec)) {
                dispatch(newOrderGetRates(orderSpec, true));
            }
        }
    }, [orderSpec]);


    const createOrderHandler = () => {
        orderSpec.service = selectedService;
        orderSpec.package.packageType = selectedPackageType || orderSpec.package.packageType;
        dispatch(newOrderCreateOrder(orderSpec, false, false));
    };

    useEffect(() => {
        if (created) {
            navigate('/pages/label?id=' + createdOrderId);
        }
        return () => {
            dispatch(newOrderResetState());
        };
    }, [created, createdOrderId]);

    const [selectedService, setSelectedService] = useState(null);
    const [selectedPackageType, setSelectedPackageType] = useState(null);

    const serviceSelectionHandler = (props) => {
        console.log('selected', props.service, props.packageType);
        setSelectedService(props.service);
        setSelectedPackageType(props.packageType);
    };

    // gets called by the address component when any of the data changes
    // and triggers the getPrice call via useEffect()
    const addressChangeHandler = (specData) => {
        console.log('address changed: ', specData);
        dispatch(newOrderUpdateOrderSpec({
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
        dispatch(newOrderUpdateOrderSpec({
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
        dispatch(newOrderUpdateOrderSpec({
            items: specData.items
        }));
    };

    const readyForCreate = orderSpec && validForCreate(orderSpec);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Create New Order'}
            />

            <Row>
                <Col className="col-lg-8">
                    <Row>
                        <Col className="col-lg-12">
                            <Items items={orderSpec.items} onSpecDataChange={itemsChangeHandler} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-12">
                            <AddressComponent fromAddress={fromAddress} toAddress={orderSpec.toAddress} onSpecDataChange={addressChangeHandler} />
                        </Col>
                    </Row>
                </Col>

                <Col className="col-lg-4">
                    <Row>
                        <Col className="col-lg-12">
                            <PackageComponent packageSpec={orderSpec.package} onSpecDataChange={packageChangeHandler} />
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
                        <Button className="btn btn-secondary mb-2" onClick={createOrderHandler} disabled={!readyForCreate}>Create order</Button>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default NewOrder;