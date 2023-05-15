import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, FloatingLabel, InputGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import FormInput from './FormInput';
import MaskedInput from 'react-text-mask';
import Select from 'react-select';

import { packageTypeTranslator } from '../helpers/translators';

const WEIGHT_UNITS = [{ label: 'oz', value: 'oz' }, { label: 'lb', value: 'lb' }];
const DEFAULT_WEIGHT_UNIT = 'oz';
const DIM_UNITS = [{ label: 'in', value: 'in' }, { label: 'cm', value: 'cm' }];
const DEFAULT_DIM_UNIT = 'in';
const CURRENCY_UNITS = [{ label: 'usd', value: 'usd' }];
const DEFAULT_CURRENCY_UNIT = 'usd';
const PACKAGE_TYPES = [{ label: 'Parcel', value: 'parcel' }, { label: 'Flat Rate Envelope', value: 'flat_rate_envelope' }, { label: 'Small Flat Rate Box', value: 'small_flat_rate_box' }, { label: 'Medium Flat Rate Box', value: 'medium_flat_rate_box' }, { label: 'Large Flat Rate Box', value: 'large_flat_rate_box' }];
const DEFAULT_PACKAGE_TYPE = 'parcel';

const optionWrapper = (optionLabel, optionValue) => {
    return { label: `${optionLabel}`, value: `${optionValue}` };
};

// TODO: consider Reducers
// TODO: these match the Address fields of PackageSpec. Refactor to keep these better aligned.
const PackageComponent = (props) => {
    const packageSpec = props.packageSpec;

    const defaultPackageType = packageSpec.packageType ? packageSpec.packageType : DEFAULT_PACKAGE_TYPE;
    const defaultWeightUnit = packageSpec.weightUnit ? packageSpec.weightUnit : DEFAULT_WEIGHT_UNIT;
    const defaultInsuredValueUnit = packageSpec.insuredValueUnit ? packageSpec.insuredValueUnit : DEFAULT_CURRENCY_UNIT;
    const defaultDimensionUnit = packageSpec.dimensionsUnit ? packageSpec.dimensionsUnit : DEFAULT_DIM_UNIT;

    const [packageType, setPackageType] = useState(defaultPackageType);
    const [weightValue, setweightValue] = useState(packageSpec.weightValue);
    const [weightUnit, setweightUnit] = useState(defaultWeightUnit);
    const [insuredValueValue, setInsuredValueValue] = useState(packageSpec.insuredValueValue);
    const [insuredValueUnit, setInsuredValueUnit] = useState(defaultInsuredValueUnit);
    const [dimensionsLength, setDimensionsLength] = useState(packageSpec.dimensionsLength);
    const [dimensionsWidth, setDimensionsWidth] = useState(packageSpec.dimensionsWidth);
    const [dimensionsHeight, setDimensionsHeight] = useState(packageSpec.dimensionsHeight);
    const [dimensionsUnit, setDimensionsUnit] = useState(defaultDimensionUnit);

    // do not fire onSpecDataChange on first render
    const [didRender, setDidRender] = useState(false);
    useEffect(() => {
        setDidRender(true);
    }, []);

    useEffect(() => {
        if (didRender) {
            props.onSpecDataChange({
                packageType, weightValue, weightUnit,
                insuredValueValue, insuredValueUnit, dimensionsLength,
                dimensionsWidth, dimensionsHeight, dimensionsUnit
            });
        }
    }, [packageType, weightValue, weightUnit, insuredValueValue, insuredValueUnit, dimensionsLength, dimensionsWidth, dimensionsHeight, dimensionsUnit]);

    const packageTypeChangeHandler = (event) => {
        setPackageType(event.value);
    };

    const weightValueChangeHandler = (event) => {
        setweightValue(event.target.value);
    };

    const weightUnitChangeHandler = (event) => {
        setweightUnit(event.value);
    };

    const insuredValueValueChangeHandler = (event) => {
        setInsuredValueValue(event.target.value);
    };

    //TODO
    const insuredValueUnitChangeHandler = (event) => {
        setInsuredValueUnit(event.target.value);
    };

    const dimensionsLengthChangeHandler = (event) => {
        setDimensionsLength(event.target.value);
    };

    const dimensionsWidthChangeHandler = (event) => {
        setDimensionsWidth(event.target.value);
    };

    const dimensionsHeightChangeHandler = (event) => {
        setDimensionsHeight(event.target.value);
    };

    const dimensionsUnitChangeHandler = (event) => {
        setDimensionsUnit(event.value);
    };

    return (
        <>
            <Row>
                <div>
                    <Card>
                        <Card.Header className="mb-2 text-uppercase p-2">
                            <i className="mdi mdi-widgets-outline me-1"></i> Package
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <FormInput
                                        label="Weight"
                                        type="number"
                                        placeholder="weight"
                                        defaultValue={weightValue}
                                        onChange={weightValueChangeHandler} />
                                </Col>
                                <Col md={6}>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Unit</label>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            options={WEIGHT_UNITS}
                                            defaultValue={optionWrapper(weightUnit, weightUnit)}
                                            onChange={weightUnitChangeHandler}>
                                        </Select>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Package Type</label>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            options={PACKAGE_TYPES}
                                            defaultValue={optionWrapper(packageTypeTranslator(packageType), packageType)}
                                            onChange={packageTypeChangeHandler}>
                                        </Select>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormInput
                                        label="Length"
                                        type="number"
                                        placeholder="Length"
                                        defaultValue={dimensionsLength}
                                        onChange={dimensionsLengthChangeHandler} />

                                </Col>
                                <Col md={3}>
                                    <FormInput
                                        label="Width"
                                        type="number"
                                        placeholder="Width"
                                        defaultValue={dimensionsWidth}
                                        onChange={dimensionsWidthChangeHandler} />
                                </Col>
                                <Col md={3}>
                                    <FormInput
                                        label="Height"
                                        type="number"
                                        placeholder="Height"
                                        defaultValue={dimensionsHeight}
                                        onChange={dimensionsHeightChangeHandler} />
                                </Col>
                                <Col md={3}>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Unit</label>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            options={DIM_UNITS}
                                            defaultValue={optionWrapper(dimensionsUnit, dimensionsUnit)}
                                            onChange={dimensionsUnitChangeHandler}>
                                        </Select>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormInput
                                        label="Value"
                                        type="number"
                                        placeholder="value"
                                        defaultValue={insuredValueValue}
                                        onChange={insuredValueValueChangeHandler} />
                                </Col>
                                <Col md={6}>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Currency</label>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            defaultValue={optionWrapper(insuredValueUnit, insuredValueUnit)}
                                            options={CURRENCY_UNITS}
                                            onChange={insuredValueUnitChangeHandler}>
                                        </Select>
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

export default PackageComponent;