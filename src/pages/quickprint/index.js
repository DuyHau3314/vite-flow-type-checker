// @flow
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MailClassCard from '../../components/MailClassCard';
import MailClassCardMultipleServices from '../../components/MailClassCardMultipleServices';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Rates from '../label/Rates';

// components
import PageTitle from '../../components/PageTitle';
import AddressComponent from '../../components/AddressComponent';
import PackageComponent from '../../components/PackageComponent';
import Spinner from '../../components/Spinner';

// validators
import { validForRating } from '../../helpers/spec-validators';

// actions
import { quickPrintGetRates, quickPrintUpdateOrderSpec, quickPrintCreateLabel, quickPrintResetState } from '../../redux/actions';

import { fromAddress } from '../../helpers';
import { orders } from '../apps/Ecommerce/Data';

const QuickPrint = (): React$Element<React$FragmentType> => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, rates, error, orderSpec, purchasing, purchased, purchasedOrderId } = useSelector((state) => ({
        loading: state.QuickPrint.loading,
        rates: state.QuickPrint.rates,
        error: state.QuickPrint.error,
        orderSpec: state.QuickPrint.orderSpec,
        purchasing: state.QuickPrint.purchasing,
        purchased: state.QuickPrint.purchased,
        purchasedOrderId: state.QuickPrint.purchasedOrderId
    }));

    // do no dispatch getRates on the first render
    const [didRender, setDidRender] = useState(false);
    useEffect(() => {
        setDidRender(true);
    }, []);

    // dispatch getRates when any package specs change if all is valid
    useEffect(() => {
        if (didRender) {
            if (validForRating(orderSpec)) {
                dispatch(quickPrintGetRates(orderSpec, true));
            }
        }
    }, [orderSpec]);

    useEffect(() => {
        if (purchased) {
            navigate('/pages/label?id=' + purchasedOrderId);
        }
        return () => {
            dispatch(quickPrintResetState());
        };
    }, [purchased, purchasedOrderId]);

    const purchaseHandler = () => {
        orderSpec.service = selectedService;
        orderSpec.package.packageType = selectedPackageType;
        dispatch(quickPrintCreateLabel(orderSpec, false));
    };

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
        dispatch(quickPrintUpdateOrderSpec({
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
        }, false, false));
    };

    // gets called by the package component when any of the data changes
    // and triggers the getPrice call via useEffect()
    const packageChangeHandler = (specData) => {
        console.log('package changed: ', specData);
        dispatch(quickPrintUpdateOrderSpec({
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

    const canBuyLabel = orderSpec && selectedService && selectedPackageType;

    //TODO: implement error
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Quick Print'}
            />

            <Row>
                <Col className="col-lg-7">
                    <AddressComponent fromAddress={fromAddress} toAddress={orderSpec.toAddress} onSpecDataChange={addressChangeHandler} />
                    <PackageComponent packageSpec={orderSpec.package} onSpecDataChange={packageChangeHandler} />
                </Col>

                <Col className="col-lg-5">
                    {loading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
                    {!loading && rates && rates.length > 0 &&
                        <>
                            <Row>
                                <div style={{ height: '600px' }}>
                                    <Rates selectedService={selectedService} selectedPackageType={selectedPackageType} rates={rates} serviceSelectionHandler={serviceSelectionHandler} />
                                </div>
                            </Row>
                            <Row className="mt-2">
                                <div className="text-sm-end">
                                    <button type="button" className="btn btn-primary mb-2 me-1" onClick={purchaseHandler} disabled={!canBuyLabel}>Buy label</button>
                                </div>
                            </Row>
                        </>
                    }
                </Col>
            </Row>

            <Modal show={purchasing} backdrop="static" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Creating order label. Please do no click 'back' in your browser or refresh the page.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default QuickPrint;
