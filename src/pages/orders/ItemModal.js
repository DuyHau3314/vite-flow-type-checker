import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { FormInput } from '../../components/';
import Select from 'react-select';

const COUNTRY_CODES = [{ label: 'US', value: 'US' }];
const DEFAULT_CONTRY_CODE = 'US';
const WEIGHT_UNITS = [{ label: 'oz', value: 'oz' }, { label: 'lb', value: 'lb' }];
const DEFAULT_WEIGHT_UNIT = 'oz';
const CURRENCY_UNITS = [{ label: 'usd', value: 'usd' }];
const DEFAULT_CURRENCY_UNIT = 'usd';

const optionWrapper = (optionLabel, optionValue) => {
    return { label: `${optionLabel}`, value: `${optionValue}` };
};

const ItemModal = ({isOpen, onClose, saveHandler, itemEntry}) => {
    const [description, setDescription] = useState(itemEntry?.description ?? '');
    const [sku, setSku] = useState(itemEntry?.sku ?? '');
    const [hsTariffNumber, setHsTariffNumber] = useState(itemEntry?.hsTariffNumber ?? '');
    const [originCountryCode, setOriginCountryCode] = useState(itemEntry?.originCountryCode ?? '');
    const [itemWeightValue, setItemWeightValue] = useState(itemEntry?.itemWeightValue ?? '');
    const [itemWeightUnit, setItemWeightUnit] = useState(itemEntry?.itemWeightUnit ?? '');
    const [quantity, setQuantity] = useState(itemEntry?.quantity ?? '');
    const [itemValueValue, setItemValueValue] = useState(itemEntry?.itemValueValue ?? '');
    const [itemValueUnit, setItemValueUnit] = useState(itemEntry?.itemValueUnit ?? '');

    const handleSubmit = (event) => {
        event.preventDefault();
        saveHandler({
            description,
            sku,
            hsTariffNumber,
            originCountryCode,
            itemWeightValue,
            itemWeightUnit,
            quantity,
            itemValueValue,
            itemValueUnit
        });
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    };

    const skuChangeHandler = (event) => {
        setSku(event.target.value);
    };

    const hsTariffNumberChangeHandler = (event) => {
        setHsTariffNumber(event.target.value);
    };

    const originCountryCodeChangeHandler = (event) => {
        setOriginCountryCode(event.value);
    };

    const itemWeightValueChangeHandler = (event) => {
        setItemWeightValue(event.target.value);
    };

    const itemWeightUnitChangeHandler = (event) => {
        setItemWeightUnit(event.value);
    };

    const quantityChangeHandler = (event) => {
        setQuantity(event.target.value);
    };

    const itemValueValueChangeHandler = (event) => {
        setItemValueValue(event.target.value);
    };

    const itemValueUnitChangeHandler = (event) => {
        setItemValueUnit(event.value);
    };

    return (
        <Modal show={isOpen} onHide={handleClose} size="lg">
            <Modal.Header closeButton onHide={handleClose} className="modal-colored-header bg-primary">
                <Modal.Title className="m-0">Item</Modal.Title>
            </Modal.Header>
            <div className="p-1">
                <Modal.Body className="px-3 pt-3 pb-0">
                    <div className="mb-2">
                        <Row className="g-2">
                            <Col className="mb-3 col-md-4">
                                <FormInput
                                    label="Item"
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    containerClass={'mb-3'}
                                    key="name"
                                    value={description}
                                    onChange={descriptionChangeHandler}
                                />
                            </Col>
                            <Col className="mb-3 col-md-3">
                                <FormInput
                                    label="SKU"
                                    type="text"
                                    name="sku"
                                    placeholder="SKU"
                                    containerClass={'mb-3'}
                                    key="sku"
                                    value={sku}
                                    onChange={skuChangeHandler}
                                />
                            </Col>
                            <Col className="mb-3 col-md-3">
                                <FormInput
                                    label="HTS Code"
                                    type="text"
                                    name="hsTariffNumber"
                                    placeholder="HTS Code"
                                    containerClass={'mb-3'}
                                    key="hsTariffNumber"
                                    value={hsTariffNumber}
                                    onChange={hsTariffNumberChangeHandler}
                                />
                            </Col>
                            <Col className="mb-3 col-md-2">
                                <label className="form-label">Origin</label>
                                <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    options={COUNTRY_CODES}
                                    defaultValue={optionWrapper(originCountryCode, originCountryCode)}
                                    onChange={originCountryCodeChangeHandler}>
                                </Select>
                            </Col>
                        </Row>

                        <Row className="g-2">
                            <Col className="mb-3 col-md-3">
                                <FormInput
                                    label="Weight"
                                    type="number"
                                    placeholder="weight"
                                    value={itemWeightValue}
                                    onChange={itemWeightValueChangeHandler} />
                            </Col>
                            <Col className="mb-3 col-md-2">
                                <label className="form-label">Unit</label>
                                <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    options={WEIGHT_UNITS}
                                    defaultValue={optionWrapper(itemWeightUnit, itemWeightUnit)}
                                    onChange={itemWeightUnitChangeHandler}>
                                </Select>
                            </Col>
                            <Col className="mb-3 col-md-2">
                                <FormInput
                                    label="Quantity"
                                    type="number"
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChange={quantityChangeHandler} />
                            </Col>
                            <Col className="mb-3 col-md-3">
                                <FormInput
                                    label="Price"
                                    type="number"
                                    placeholder="Price"
                                    value={itemValueValue}
                                    onChange={itemValueValueChangeHandler} />
                            </Col>
                            <Col className="mb-3 col-md-2">
                                <label className="form-label">Currency</label>
                                <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    options={CURRENCY_UNITS}
                                    defaultValue={optionWrapper(itemValueUnit, itemValueUnit)}
                                    onChange={itemValueUnitChangeHandler}>
                                </Select>
                            </Col>

                            <div>
                                <div className="text-sm-end">
                                    <Button className="btn btn-sm btn-primary mb-2" onClick={handleSubmit}>Add item</Button>
                                    <Button className="btn btn-sm btn-primary mb-2 btn-light" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>

                        </Row>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default ItemModal;