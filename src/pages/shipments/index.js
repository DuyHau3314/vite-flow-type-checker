// @flow
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Col, Row, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import { format } from 'date-fns';

import uspsLogoImg from '../../assets/images/usps-logo-transparent.png';

// ag-grid
import { AgGridColumn, AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from "@ag-grid-community/all-modules"
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-bootstrap.css';
import '../../assets/scss/ag-grid-acmecorp.scss';

// actions
import { getAllShipments, shipmentsGetOrder, shipmentsResetState, shipmentsCreateManifest } from '../../redux/actions';

// component
import PageTitle from '../../components/PageTitle';
import { serviceTranslator } from '../../helpers/translators';

const ActionsRenderer = (params) => {
    const onGetOrder = params.onGetOrder;

    const viewLink = "/pages/label?id=" + params.data.id;
    const viewMenu =
        <Dropdown className="float-end" align="end">
            <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                <i className="mdi mdi-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item><Link to={viewLink}>View</Link></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>;
    return (
        <>
            <Button className="btn-primary btn-sm mb-2" onClick={() => onGetOrder(params.data.id)}>Download</Button>
            {viewMenu}
        </>
    );
};

const CarrierRenderer = (props) => {
    return <img src={uspsLogoImg} height="30" />;
};

const fromAddressRenderer = (params) => {
    const { companyName, firstName, middleName, lastName } = params.data.fromAddress;
    const { cityLocality, stateProvince, postalCode } = params.data.fromAddress;
    const firstLine = [companyName, firstName, middleName, lastName].filter(n => !!n).join(' ');
    const secondLine = [cityLocality, stateProvince, postalCode].filter(n => !!n).join(' ');
    return firstLine + '\n' + secondLine;
};

const toAddressRenderer = (params) => {
    const { companyName, firstName, middleName, lastName } = params.data.toAddress;
    const { cityLocality, stateProvince, postalCode } = params.data.toAddress;
    const firstLine = [companyName, firstName, middleName, lastName].filter(n => !!n).join(' ');
    const secondLine = [cityLocality, stateProvince, postalCode].filter(n => !!n).join(' ');
    return firstLine + '\n' + secondLine;
};

const priceValueGetter = (params) => {
    return `$${params.data.price.toFixed(2)}`;
};

const shipDateGetter = (params) => {
    return `${format(Date.parse(params.data.shipDate), 'MM/dd/yyyy')}`;
};

const serviceValueGetter = (params) => {
    return serviceTranslator(params.data.service);
};

const statusRenderer = (params) => {
    const order = params.data;
    if (order.carrierManifest != null)
        return <span className="badge badge-success-lighten">MANIFESTED</span>;
    else {
        return <span className="badge badge-warning-lighten">UNMANIFESTED</span>;
    }
};

const Shipments = (): React$Element<React$FragmentType> => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getOrderHandler = (orderId) => {
        dispatch(shipmentsGetOrder(orderId, true, true));
    };

    const { loading, orders, loadingOrder, order, creatingManifest, manifest } = useSelector((state) => ({
        loading: state.Shipments.loading,
        orders: state.Shipments.shipments,
        loadingOrder: state.Shipments.loadingOrder,
        order: state.Shipments.order,
        creatingManifest: state.Shipments.creatingManifest,
        manifest: state.Shipments.manifest
    }));

    useEffect(() => {
        if (order) {
            const file = new Blob([Buffer.from(order.base64Label, 'base64')], { type: 'data:image/png' });
            const element = document.createElement("a");
            element.href = URL.createObjectURL(file);
            element.download = "label.png";
            document.body.appendChild(element);
            element.click();
        }
    }, [order]);

    useEffect(() => {
        dispatch(getAllShipments());
        return () => {
            dispatch(shipmentsResetState());
        }
    }, []);

    useEffect(() => {
        if (manifest) {
            navigate('/pages/manifests');
        }
    }, [manifest]);

    const manifestHandler = () => {
        console.log('here');
        const selectedRows = gridRef.current.api.getSelectedRows();
        const manifestSpec = {
          trackingNumbers: selectedRows.map(row => row.trackingNumber)
        }
        dispatch(shipmentsCreateManifest(manifestSpec, false, false));
    };

    const [columnDefs] = useState([
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            maxWidth: 30
        },
        { headerName: 'Ship Date', valueGetter: shipDateGetter, width: 120 },
        { headerName: 'From', cellRenderer: fromAddressRenderer, cellStyle: { 'whiteSpace': 'pre' } },
        { headerName: 'To', cellRenderer: toAddressRenderer, cellStyle: { 'whiteSpace': 'pre' } },
        { headerName: 'Carrier', cellRenderer: CarrierRenderer },
        { headerName: 'Service', valueGetter: serviceValueGetter },
        { headerName: 'Price', valueGetter: priceValueGetter, width: 100 },
        { headerName: 'Tracking Number', field: 'trackingNumber' },
        { headerName: 'Status', cellRenderer: statusRenderer, width: 100, cellStyle: { 'whiteSpace': 'pre' } },
        { headerName: 'Actions', field: 'actions', cellRenderer: ActionsRenderer, width: 120, cellRendererParams: { onGetOrder: getOrderHandler } }
    ]);

    const sizeToFit = useCallback(() => {
        gridRef.current.api.sizeColumnsToFit();
    }, []);

    // not used for now
    const autoSizeAll = useCallback((skipHeader) => {
        console.log('sizing');

        const allColumnIds = [];
        gridRef.current.columnApi.getColumns().forEach((column) => {
            allColumnIds.push(column.getId());
        });
        gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
    }, []);

    const gridRef = useRef();

    const gridOptions = {
        defaultColDef: {
            sortable: true,
            resizable: true,
            //flex: 1
        },
        suppressCellSelection: true,
        rowHeight: 69,
        headerHeight: 52,
        onGridReady: (event) => {
            sizeToFit();
        }
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Shipments'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col xl={8}>
                                    <div>
                                        <span className="d-flex align-items-center">
                                            Search :{' '}
                                            <input
                                                className="form-control w-auto ms-1"
                                            />
                                        </span>
                                    </div>
                                </Col>

                                <Col xl={4}>
                                    <div className="text-lg-end mt-xl-0 mt-2">
                                        <Button variant="primary" className="mb-2 me-2" onClick={manifestHandler}>
                                            <i className="mdi mdi-file-sign me-1"></i> Manifest
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                            {loading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
                            {!loading && orders &&
                                <div className="ag-theme-bootstrap ag-theme-acmecorp" style={{ height: "800px", width: "100%" }}>
                                    <AgGridReact
                                        ref={gridRef}
                                        gridOptions={gridOptions}
                                        modules={AllCommunityModules}
                                        rowData={orders}
                                        columnDefs={columnDefs}
                                        rowSelection={'multiple'}
                                    >
                                    </AgGridReact>
                                </div>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Shipments;