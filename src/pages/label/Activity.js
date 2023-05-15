import React from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

import Timeline from '../../components/Timeline';
import TimelineItem from '../../components/TimelineItem';
import CardTitle from '../../components/CardTitle';

const Activity = (): React$Element<any> => {
    return (
        <Card>
            <Card.Body className="pb-0">
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-2"
                    title="Tracking Events"
                    menuItems={[
                        { label: 'Switch to map view' }
                    ]}
                />
            </Card.Body>
            <SimpleBar style={{ maxHeight: '350px', width: '100%' }}>
                <Card.Body className="py-0">
                    <Timeline>
                        <TimelineItem>
                            <i className="mdi mdi-upload bg-info-lighten text-info timeline-icon"></i>
                            <div className="timeline-item-info">
                                <Link to="#" className="text-info fw-bold mb-1 d-block">
                                    Received data
                                </Link>
                                <small>USPS received data</small>
                                <p className="mb-0 pb-2">
                                    <small className="text-muted">2023-01-26 00:00:00</small>
                                </p>
                            </div>
                        </TimelineItem>

                        <TimelineItem>
                            <i className="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"></i>
                            <div className="timeline-item-info">
                                <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                    Accepted at USPS Facility
                                </Link>
                                <small>
                                    AUSTIN, TX, 78738, USA
                                </small>
                                <p className="mb-0 pb-2">
                                    <small className="text-muted">2023-02-06 15:36:00</small>
                                </p>
                            </div>
                        </TimelineItem>

                        <TimelineItem>
                            <i className="mdi mdi-microphone bg-info-lighten text-info timeline-icon"></i>
                            <div className="timeline-item-info">
                                <Link to="#" className="text-info fw-bold mb-1 d-block">
                                    Received by Local Unit
                                </Link>
                                <small>
                                    ROY, UT, 84067, USA
                                </small>
                                <p className="mb-0 pb-2">
                                    <small className="text-muted">2023-02-08 06:42:00</small>
                                </p>
                            </div>
                        </TimelineItem>

                        <TimelineItem>
                            <i className="mdi mdi-upload bg-primary-lighten text-primary timeline-icon"></i>
                            <div className="timeline-item-info">
                                <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                    Arrived at USPS Facility
                                </Link>
                                <small>
                                    PROVO, UT, 84605, USA
                                </small>
                                <p className="mb-0 pb-2">
                                    <small className="text-muted">2023-02-08 07:59:00</small>
                                </p>
                            </div>
                        </TimelineItem>
                        <TimelineItem>
                            <i className="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"></i>
                            <div className="timeline-item-info">
                                <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                    Received by Local Unit
                                </Link>
                                <small>
                                    PROVO, UT, 84601, USA
                                </small>
                                <p className="mb-0 pb-2">
                                    <small className="text-muted">2023-02-09 03:32:00</small>
                                </p>
                            </div>
                        </TimelineItem>
                        <TimelineItem>
                            <i className="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"></i>
                            <div className="timeline-item-info">
                                <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                    Out for Delivery
                                </Link>
                                <small>
                                    PROVO, UT, 84604, USA
                                </small>
                                <p className="mb-0 pb-2">
                                    <small className="text-muted">2023-02-09 06:10:00</small>
                                </p>
                            </div>
                        </TimelineItem>
                        <TimelineItem>
                            <i className="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"></i>
                            <div className="timeline-item-info">
                                <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                    Delivered
                                </Link>
                                <small>
                                    PROVO, UT, 84604, USA
                                </small>
                                <p className="mb-0 pb-2">
                                    <small className="text-muted">2023-02-09 10:46:00</small>
                                </p>
                            </div>
                        </TimelineItem>
                    </Timeline>
                </Card.Body>
            </SimpleBar>
        </Card>
    );
};

export default Activity;