import React, { useState } from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';
import SimpleBar from "simplebar-react";
import classNames from "classnames";

import { FormInput } from '../../components';

import uspsLogoImg from '../../assets/images/usps-250x100.png';

const RateCard = (props) => {
    const rate = props.rate;

    return (
        <button type="button" className="list-group-item list-group-item-action ribbon-box">
            <div className="d-flex">
                <div className="">
                    <img src={uspsLogoImg} width="100" />
                </div>
                <div className="">
                    <h5>
                        <p className="mb-1">{rate.serviceName}</p>
                    </h5>
                    <p className="font-14 mb-1">3 days</p>
                </div>
                <div className="ms-auto">
                    <p className="mb-0">${rate.price}</p>
                </div>
            </div>
        </button>
    );
};

const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const Rates = (props) => {
    const allRates = props.rates;
    const selectedService = props.selectedService;
    const selectedPackageType = props.selectedPackageType;

    let rates = [];
    if (Array.isArray(allRates) && allRates.length) {
        const rateGroupings = groupBy(allRates, 'serviceName');
        for (const rateGrouping in rateGroupings) {
            let rate = null;
            if (rateGroupings[rateGrouping].length == 1) {
                rate = rateGroupings[rateGrouping][0];
            } else {
                const sortedRates = rateGroupings[rateGrouping].sort((a, b) => (a.price > b.price) ? 1 : -1);
                rate = sortedRates[0]; // lowest rate
            }
            rates.push(rate);
        }
    }

    let defaultSelectedKey = null;
    if (selectedService && selectedPackageType) {
        console.log('trying to find', selectedService, selectedPackageType);
        rates.forEach((rate, index) => {
            if (rate.service === selectedService && rate.package.packageType === selectedPackageType) {
                defaultSelectedKey = index;
            }
        });
        console.log('found', defaultSelectedKey);
    }

    console.log('setting', defaultSelectedKey);
    const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);

    const selectHandler = (indexKey) => {
        setSelectedKey(indexKey);
        props.serviceSelectionHandler({ service: rates[indexKey].service, packageType: rates[indexKey].package.packageType });
    };

    return (
        <Card style={{ height: '100%' }}>
            <Card.Header className="mb-2 text-uppercase p-2">
                <i className="mdi mdi-widgets-outline me-1"></i> Rates
            </Card.Header>
            <SimpleBar className="card-body py-0" style={{ height: '80%' }}>
                {(rates || []).map((rate, i) => {
                    return (
                        <div className={classNames('border', 'd-flex', 'align-items-start', i === 0 ? 'mt-0' : 'mt-1', i === selectedKey ? 'service-selected' : 'service-not-selected')} onClick={event => selectHandler(i)} key={i}>
                            <div className="p-2">
                                <img src={uspsLogoImg} width="100" />
                            </div>
                            <div className="p-2">
                                <h5 className="mt-0 mb-1">{rate.serviceName}</h5>
                                <ul className="list-inline mb-0 font-13">
                                    <li className="list-inline-item text-muted">3 days</li>
                                </ul>
                            </div>
                            <div className="ms-auto p-2">
                                <p className="mb-0">${rate.price.toFixed(2)}</p>
                            </div>
                        </div>
                    );
                })}
            </SimpleBar>
        </Card >
    );
};

export default Rates;