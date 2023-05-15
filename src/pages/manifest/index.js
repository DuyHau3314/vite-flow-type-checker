import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container,
    Row,
    Col,
    Card,
    ListGroup,
    ListGroupItem,
    Badge,
    Button,
} from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';

// component
import PageTitle from '../../components/PageTitle';
import Spinner from '../../components/Spinner';
import ComponentToPrint from '../../components/ComponentToPrint';

// actions
import { manifestGetManifest } from '../../redux/actions';

const dateRenderer = (date) => {
    return date ? `${format(Date.parse(date), 'MM/dd/yyyy')}` : '';
};

const addressRenderer = (address) => {
    const { companyName, firstName, middleName, lastName } = address;
    const { cityLocality, stateProvince, postalCode } = address;
    const firstLine = [companyName, firstName, middleName, lastName].filter(n => !!n).join(' ');
    const secondLine = [cityLocality, stateProvince, postalCode].filter(n => !!n).join(' ');
    return firstLine + '\n' + secondLine;
};

const getDomesticNo = (manifest) => {
    return manifest.priorityCount + manifest.expressCount + manifest.otherCount + manifest.firstClassCount + manifest.returnsCount;
};

const getInternationalNo = (manifest) => {
    return manifest.internationalCount;
};

const getTotalNo = (manifest) => {
    return getDomesticNo(manifest) + getInternationalNo(manifest);
};

const Manifest = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const manifestId = params.get("id");

    const { error, loadingManifest, manifest } = useSelector((state) => ({
        error: state.Manifest.error,
        manifest: state.Manifest.manifest,
        loadingManifest: state.Manifest.loadingManifest
    }));

    useEffect(() => {
        dispatch(manifestGetManifest(manifestId, true, true));
    }, []);

    const componentRef = useRef();
    const printHandler = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Manifest Details'}
            />

            <div style={{ display: 'none' }}>
                <ComponentToPrint ref={componentRef} labelBase64Content={manifest && manifest.base64ScanForm} />
            </div>

            {loadingManifest && <Spinner animation="border" role="status"><span className="visually-hidden">Loading manifest...</span></Spinner>}
            {!loadingManifest && manifest && (
                <>
                    <Row>
                        <Col lg={6}>
                            <Row>
                                <Col xs={12}>
                                    <Card>
                                        <Card.Header className="mb-2 text-uppercase Row-2">
                                            <i className="mdi mdi-office-building me-1"></i> Manifest
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Manifest ID:</span></Col><Col className="col-lg-8">{manifest.id}</Col></Row>
                                                <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Date Created:</span></Col><Col className="col-lg-8">{dateRenderer(manifest.createdAt)}</Col></Row>
                                                <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Auto:</span></Col><Col className="col-lg-8">{manifest.auto ? <i className="mdi mdi-check-circle me-1"></i> : <i className="mdi mdi-close-circle me-1"></i>}</Col></Row>
                                                <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Status:</span></Col><Col className="col-lg-8"><span className="badge badge-success-lighten">{manifest.status}</span></Col></Row>
                                                <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Carrier:</span></Col><Col className="col-lg-8">{'USPS'}</Col></Row>
                                                <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Account Description:</span></Col><Col className="col-lg-8">TODO</Col></Row>
                                                <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Shipment Address:</span></Col><Col className="col-lg-8">{addressRenderer(manifest.shipmentAddress)}</Col></Row>
                                                <Row className="mb-2"><Col className="col-lg-4"><span className="fw-bold me-2">Shipment Date:</span></Col><Col className="col-lg-8">{dateRenderer(manifest.shipmentDate)}</Col></Row>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>

                        <Col lg={6}>
                            <Row>
                                <Col lg={12}>
                                    <Card>
                                        <Card.Header className="mb-2 text-uppercase Row-2">
                                            <i className="mdi mdi-widgets-outline me-1"></i> Labels
                                        </Card.Header>
                                        <Card.Body>
                                            <Card className="widget-inline">
                                                <Card.Body className="p-0">
                                                    <Row className="g-0">
                                                        <Col sm={6} lg={4}>
                                                            <Card
                                                                className="rounded-0 shadow-none m-0 border-start border-light"
                                                            >
                                                                <Card.Body className="text-center">
                                                                    <h5>{getDomesticNo(manifest)} domestic</h5>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>

                                                        <Col sm={6} lg={4}>
                                                            <Card
                                                                className="rounded-0 shadow-none m-0 border-start border-light"
                                                            >
                                                                <Card.Body className="text-center">
                                                                    <h5>
                                                                        <span>{getInternationalNo(manifest)} international</span>
                                                                    </h5>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>

                                                        <Col sm={6} lg={4}>
                                                            <Card
                                                                className="rounded-0 shadow-none m-0 border-start border-light"
                                                            >
                                                                <Card.Body className="text-center">
                                                                    <h5>
                                                                        <span>{getTotalNo(manifest)} total</span>
                                                                    </h5>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>

                                            <div className="table-responsive" style={{ maxHeight: '360px' }}>
                                                <table className="table mb-3">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>Service</th>
                                                            <th>Count</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Priority Mail</td>
                                                            <th>{manifest.priorityCount}</th>
                                                        </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr>
                                                            <td>Priority Mail Express</td>
                                                            <th>{manifest.expressCount}</th>
                                                        </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr>
                                                            <td>First Class Mail</td>
                                                            <th>{manifest.firstClassCount}</th>
                                                        </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr>
                                                            <td>Returns</td>
                                                            <th>{manifest.returnsCount}</th>
                                                        </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr>
                                                            <td>Other</td>
                                                            <th>{manifest.otherCount}</th>
                                                        </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr>
                                                            <td>International</td>
                                                            <th>{getInternationalNo(manifest)}</th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <Link to='/pages/manifests' className="btn text-muted d-none d-sm-inline-block btn-link fw-semibold">
                                <i className="mdi mdi-arrow-left" /> Manifests
                            </Link>
                        </Col>
                        <Col sm={6}>
                            <div className="text-sm-end">
                                <Button variant="outline-dark" className="mb-2">
                                    Cancel
                                </Button>
                                <Button variant="primary" className="mb-2 me-1" onClick={printHandler}>
                                    Print
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default Manifest;
