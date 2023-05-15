// @flow
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// components
import HyperDatepicker from '../../../components/Datepicker';

import ShipmentsChart from './ShipmentsChart';

const ShipmentsDashboard = (): React$Element<React$FragmentType> => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    console.log('in EcommerceDashboard');

    return (
        <>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title-right">
                            </div>
                            <h4 class="page-title">Shipments Dashboard</h4>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-3">
                        <div class="tab-content">
                            <div class="tab-pane show active" id="justified-tabs-preview">
                                <ul class="nav nav-tabs nav-bordered mb-3">
                                    <li class="nav-item">
                                        <a href="#home-b2" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                            <i class="mdi mdi-home-variant d-md-none d-block"></i>
                                            <span class="d-none d-md-block">Shipments</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#profile-b2" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                            <i class="mdi mdi-account-circle d-md-none d-block"></i>
                                            <span class="d-none d-md-block">Cost</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#settings-b2" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
                                            <i class="mdi mdi-settings-outline d-md-none d-block"></i>
                                            <span class="d-none d-md-block">Average cost</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <ul class="nav float-end d-none d-lg-flex">
                            <li class="nav-item">
                                <a class="nav-link text-muted" href="#">Today</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-muted" href="#">7d</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-muted" href="#">15d</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-active" href="#">1m</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-muted" href="#">1y</a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-3">
                        <form className="d-flex">
                            <div className="input-group">
                                <HyperDatepicker
                                    value={selectedDate}
                                    inputClass="form-control-light"
                                    onChange={(date) => {
                                        onDateChange(date);
                                    }}
                                />
                            </div>
                            <Link to="#" className="btn btn-primary ms-2">
                                <i className="mdi mdi-autorenew"></i>
                            </Link>
                            <Link to="#" className="btn btn-primary ms-1">
                                <i className="mdi mdi-filter-variant"></i>
                            </Link>
                        </form>
                    </div>
                </div>


                <div class="row">
                    <div class="col-xl-3 col-lg-4">
                        <div class="card tilebox-one">
                            <div class="card-body">
                                <i class='uil uil-box float-end'></i>
                                <h6 class="text-uppercase mt-0">Shipments</h6>
                                <h2 class="my-2" id="active-users-count">2496</h2>
                                <p class="mb-0 text-muted">
                                    <span class="text-success me-2"><span class="mdi mdi-arrow-up-bold"></span> 5.27%</span>
                                    <span class="text-nowrap">From previous period</span>
                                </p>
                            </div>
                        </div>

                        <div class="card tilebox-one">
                            <div class="card-body">
                                <i class='uil uil-money-bill-stack float-end'></i>
                                <h6 class="text-uppercase mt-0">Cost</h6>
                                <h2 class="my-2" id="active-views-count">$23,962</h2>
                                <p class="mb-0 text-muted">
                                    <span class="text-danger me-2"><span class="mdi mdi-arrow-down-bold"></span> 1.08%</span>
                                    <span class="text-nowrap">From previous period</span>
                                </p>
                            </div>
                        </div>

                        <div class="card tilebox-one">
                            <div class="card-body">
                                <i class='uil uil-money-bill float-end'></i>
                                <h6 class="text-uppercase mt-0">Cost per shipment</h6>
                                <h2 class="my-2" id="active-views-count">$9.60</h2>
                                <p class="mb-0 text-muted">
                                    <span class="text-danger me-2"><span class="mdi mdi-arrow-down-bold"></span> 2.16%</span>
                                    <span class="text-nowrap">From previous period</span>
                                </p>
                            </div>
                        </div>
                    </div>


                    <div class="col-xl-9 col-lg-8">
                        <ShipmentsChart />
                    </div>
                </div>

                <div class="row">
                    <div class="col-xl-4 col-lg-6">
                        <div class="card">
                            <div class="d-flex card-header justify-content-between align-items-center">
                                <h4 class="header-title">Stores</h4>
                            </div>

                            <div class="card-body pt-0">

                                <div class="table-responsive">
                                    <table class="table table-sm table-centered mb-0 font-14">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Store</th>
                                                <th>Shipments</th>
                                                <th style={{ width: '40%' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Shopify</td>
                                                <td>1696</td>
                                                <td>
                                                    <div class="progress" style={{ height: '3px' }}>
                                                        <div class="progress-bar bg-primary" role="progressbar"
                                                            style={{ width: '100%', height: '20px' }}></div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Amazon</td>
                                                <td>756</td>
                                                <td>
                                                    <div class="progress" style={{ height: '3px' }}>
                                                        <div class="progress-bar bg-primary" role="progressbar"
                                                            style={{ width: '45%', height: '20px' }}></div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Direct</td>
                                                <td>44</td>
                                                <td>
                                                    <div class="progress" style={{ height: '3px' }}>
                                                        <div class="progress-bar bg-primary" role="progressbar"
                                                            style={{ width: '3%', height: '20px' }}></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-6">
                        <div class="card">
                            <div class="d-flex card-header justify-content-between align-items-center">
                                <h4 class="header-title">Carriers</h4>
                            </div>

                            <div class="card-body pt-0">
                                <div class="table-responsive">
                                    <table class="table table-sm table-centered mb-0 font-14">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Carrier</th>
                                                <th>Shipments</th>
                                                <th style={{ width: '40%' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>USPS</td>
                                                <td>1,373</td>
                                                <td>
                                                    <div class="progress" style={{ height: '3px' }}>
                                                        <div class="progress-bar" role="progressbar"
                                                            style={{ width: '81%', height: '20px' }}></div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>UPS</td>
                                                <td>599</td>
                                                <td>
                                                    <div class="progress" style={{ height: '3px' }}>
                                                        <div class="progress-bar" role="progressbar"
                                                            style={{ width: '35%', height: '20px' }}></div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>FedEx</td>
                                                <td>524</td>
                                                <td>
                                                    <div class="progress" style={{ height: '3px' }}>
                                                        <div class="progress-bar" role="progressbar"
                                                            style={{ width: '31%', height: '20px' }}></div>
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-6">
                        <div class="card">
                            <div class="d-flex card-header justify-content-between align-items-center">
                                <h4 class="header-title">Destinations</h4>
                            </div>

                            <div class="card-body pt-0">
                                <div class="table-responsive">
                                    <table class="table table-sm table-centered mb-0 font-14">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Country</th>
                                                <th>Shipments</th>
                                                <th style={{ width: '40%' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>US</td>
                                                <td>2,247</td>
                                                <td>
                                                    <div class="progress" style={{ height: '3px' }}>
                                                        <div class="progress-bar" role="progressbar"
                                                            style={{ width: '100%', height: '20px' }}></div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>CA</td>
                                                <td>187</td>
                                                <td>
                                                    <div class="progress" style={{ height: '3px' }}>
                                                        <div class="progress-bar" role="progressbar"
                                                            style={{ width: '8%', height: '20px' }}></div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>GB</td>
                                                <td>62</td>
                                                <td>
                                                    <div class="progress" style={{ height: '3px' }}>
                                                        <div class="progress-bar" role="progressbar"
                                                            style={{ width: '3%', height: '20px' }}></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShipmentsDashboard;
