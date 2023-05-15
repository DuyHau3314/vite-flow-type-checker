import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Form, FloatingLabel, InputGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import FormInput from './FormInput';
import Spinner from './Spinner';
import { useSelector, useDispatch } from 'react-redux';
import MaskedInput from 'react-text-mask';
import Select from 'react-select';

import { addressComponentGetAllAddresses } from '../redux/actions';

import Autocomplete from './Autocomplete';

//TODO: move to utils
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// TODO: consider Reducers
const AddressComponent = (props) => {
    const dispatch = useDispatch();

    const { loadingAddresses, addresses, error } = useSelector((state) => ({
        loadingAddresses: state.AddressComponentReducers.loadingAddresses,
        addresses: state.AddressComponentReducers.addresses,
        error: state.AddressComponentReducers.error,
      }));    

    const fromAddress = props.fromAddress;
    const toAddress = props.toAddress;
    const toAddressDefaultValue = !isEmpty(toAddress) ? `${toAddress.street1} ${toAddress.cityLocality}, ${toAddress.stateProvince}, ${toAddress.countryCode}` : null;

    const [firstName, setFirstName] = useState(toAddress.firstName);
    const [middleName, setMiddleName] = useState(toAddress.middleName);
    const [lastName, setLastName] = useState(toAddress.lastName);
    const [companyName, setCompanyName] = useState(toAddress.companyName);
    const [address, setAddress] = useState(toAddressDefaultValue);

    // do not fire onSpecDataChange on first render
    const [didRender, setDidRender] = useState(false);
    useEffect(() => {
        setDidRender(true);
    }, []);

    useEffect(() => {
        if (didRender) {
            props.onSpecDataChange({
                firstName, middleName, lastName, companyName, address
            });
        }
    }, [firstName, middleName, lastName, companyName, address]);

    useEffect(() => {
        dispatch(addressComponentGetAllAddresses());
    }, []);

    const firstNameChangeHandler = (event) => {
        setFirstName(event.target.value);
    };

    const middleNameChangeHandler = (event) => {
        setMiddleName(event.target.value);
    };

    const lastNameChangeHandler = (event) => {
        setLastName(event.target.value);
    };

    const companyNameChangeHandler = (event) => {
        setCompanyName(event.target.value);
    };

    const addressChangeHandler = (address) => {
        setAddress(address);
    };

    return (
        <>
            <Row>
                <div>
                    <Card>
                        <Card.Header className="mb-2 text-uppercase p-2">
                            <i className="mdi mdi-office-building me-1"></i> Address
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md>
                                    <p>From: {fromAddress.firstName} {fromAddress.lastName}, {fromAddress.street1}, {fromAddress.cityLocality}, {fromAddress.stateProvince} {fromAddress.postalCode}</p>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={4}>
                                    <FormInput
                                        value={firstName}
                                        label="First Name"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        containerClass={'mb-3'}
                                        key="firstName"
                                        onChange={firstNameChangeHandler}
                                    />
                                </Col>
                                <Col md={4}>
                                    <FormInput
                                        value={middleName}
                                        label="Middle Name"
                                        type="text"
                                        name="middleName"
                                        placeholder="Middle Name"
                                        containerClass={'mb-3'}
                                        key="middleName"
                                        onChange={middleNameChangeHandler}
                                    />
                                </Col>
                                <Col md={4}>
                                    <FormInput
                                        value={lastName}
                                        label="Last Name"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        containerClass={'mb-3'}
                                        key="lastName"
                                        onChange={lastNameChangeHandler}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormInput
                                        value={companyName}
                                        label="Company Name"
                                        type="text"
                                        name="companyName"
                                        placeholder="Company Name"
                                        containerClass={'mb-3'}
                                        key="companyName"
                                        onChange={companyNameChangeHandler}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Address</label>
                                        <Autocomplete defaultValue={address} updateAddress={addressChangeHandler} />
                                    </div>
                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </>
    );
};

export default AddressComponent;