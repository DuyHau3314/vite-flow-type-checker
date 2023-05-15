import React from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';

const Tracking = (props) => {
    const order = props.order;

    return (
        <Card>
            <Card.Body>
                <h5 className="mb-3 text-uppercase bg-light p-2"><i className="mdi mdi-office-building me-1"></i> Tracking</h5>

                <Row>
                    <Col className="col-lg-6 mb-3">
                        <h6 className="text-uppercase text-muted mt-0">Delivery estimate</h6>
                        <h5 className="my-2" id="active-users-count">Fri Mar 3, 2023</h5>
                        <p className="mb-0 text-muted">
                            <span className="text-success me-2"> On time</span>
                        </p>
                    </Col>
                    <Col className="col-lg-6 mb-3">
                        <h6 className="text-uppercase text-muted mt-0">Shipped</h6>
                        <h5 className="my-2" id="active-users-count">Wed Mar 1, 2023</h5>
                        <h6>
                            <a href="https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=9205500000000000000000%2C&tABt=false" className="text-body fw-bold">{order.trackingNumber}</a>
                        </h6>
                    </Col>
                </Row>

                <Row>
                    <Col className="col-lg-12">
                        <div className="table-responsive-sm" data-simplebar>
                            <table className="table table-centered mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Date</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            Fri Mar 3, 2023
                                            <br />
                                            10:30 AM
                                        </td>
                                        <td>
                                            Arrival scan
                                            <br />
                                            Burlingame, CA 94010
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Thurs Mar 2 2023
                                            <br />
                                            4:00 PM
                                        </td>
                                        <td>
                                            Departure scan
                                            <br />
                                            Reno, CA 89510
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Thurs Mar 2, 2023
                                            <br />
                                            8:00 AM
                                        </td>
                                        <td>
                                            Arrival scan
                                            <br />
                                            Reno, CA 89510
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Wed Mar 21 2023
                                            <br />
                                            8:00 AM
                                        </td>
                                        <td>
                                            Departure scan
                                            <br />
                                            Salt Lake City, UT 84124
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card >
    );
};

export default Tracking;