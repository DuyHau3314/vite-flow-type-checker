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
import { manifestsGetAllManifests, manifestsResetState, manifestsGetManifest, manifestsCreateManifestForAllUnmanifested } from '../../redux/actions';

// component
import PageTitle from '../../components/PageTitle';

const ActionsRenderer = (params) => {
    const manifest = params.data;

    const viewLink = "/pages/manifest?id=" + params.data.id;
    const viewMenu =
        <Dropdown className="float-end" align="end">
            <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                <i className="mdi mdi-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item><Link to={viewLink}>View</Link></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>;

    const onDownload = params.onDownload;
    return (
        <>
            <Button type="button" className="btn btn-primary btn-sm mb-2" style={{ width: "100px" }} onClick={() => onDownload(manifest.id)}>Download</Button>
            {viewMenu}
        </>
    );
};

const shipmentDateGetter = (params) => {
    return params.data.shipmentDate ? `${format(Date.parse(params.data.shipmentDate), 'MM/dd/yyyy')}` : '';
};

const shipmentsNoGetter = (params) => {
    return params.data.priorityCount +
        params.data.expressCount +
        params.data.otherCount +
        params.data.firstClassCount +
        params.data.returnsCount +
        params.data.internationalCount;
};

const statusRenderer = (params) => {
    const manifest = params.data;
    if (manifest.status === 'created')
        return <span className="badge badge-success-lighten">Created</span>;
    else {
        return <span className="badge badge-warning-lighten">Next State</span>;
    }
}

const shipmentAddressRenderer = (params) => {
    const { companyName, firstName, middleName, lastName } = params.data.shipmentAddress;
    const { cityLocality, stateProvince, postalCode } = params.data.shipmentAddress;
    const firstLine = [companyName, firstName, middleName, lastName].filter(n => !!n).join(' ');
    const secondLine = [cityLocality, stateProvince, postalCode].filter(n => !!n).join(' ');
    return firstLine + '\n' + secondLine;
};

const CarrierRenderer = (props) => {
    return <img src={uspsLogoImg} height="30" />;
};

const Manifests = (): React$Element<React$FragmentType> => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loadingManifests, manifests, downloadingManifest, downloadedManifest } = useSelector((state) => ({
        loadingManifests: state.Manifests.loadingManifests,
        manifests: state.Manifests.manifests,
        downloadingManifest: state.Manifests.downloadingManifest,
        downloadedManifest: state.Manifests.downloadedManifest
    }));

    useEffect(() => {
        if (downloadedManifest) {
            const file = new Blob([Buffer.from(downloadedManifest.base64ScanForm, 'base64')], { type: 'data:image/png' });
            const element = document.createElement("a");
            element.href = URL.createObjectURL(file);
            element.download = "scan-form.png";
            document.body.appendChild(element);
            element.click();
        }
    }, [downloadedManifest]);

    useEffect(() => {
        dispatch(manifestsGetAllManifests(false, true));
        return () => {
            dispatch(manifestsResetState());
        }
    }, []);

    useEffect(() => {
        console.log(manifests);
    }, [manifests]);

    const getImageForManifestHandler = (manifestId) => {
        dispatch(manifestsGetManifest(manifestId, true, true));
    };

    const [columnDefs] = useState([
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            maxWidth: 30
        },
        { headerName: 'Date', valueGetter: shipmentDateGetter },
        { headerName: 'Status', cellRenderer: statusRenderer, width: 100, cellStyle: { 'whiteSpace': 'pre' } },
        { headerName: 'Address', cellRenderer: shipmentAddressRenderer, cellStyle: { 'whiteSpace': 'pre' } },
        { headerName: 'Carrier', cellRenderer: CarrierRenderer },
        { headerName: 'Shipments', valueGetter: shipmentsNoGetter },
        { headerName: 'Tracking Number', field: 'trackingNumber' },
        { headerName: 'Actions', field: 'actions', cellRendererFramework: ActionsRenderer, width: 120, cellRendererParams: { onDownload: getImageForManifestHandler } }
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

    const createManifestHandler = () => {
        dispatch(manifestsCreateManifestForAllUnmanifested(false, false));
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Manifests'}
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
                                        <Button onClick={createManifestHandler} variant="primary" className="mb-2 me-2">
                                            <i className="mdi mdi-basket me-1"></i> New Manifest for Unmanifested Shipments
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                            {loadingManifests && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
                            {!loadingManifests && manifests &&
                                <div className="ag-theme-bootstrap ag-theme-acmecorp" style={{ height: "800px", width: "100%" }}>
                                    <AgGridReact
                                        ref={gridRef}
                                        gridOptions={gridOptions}
                                        modules={AllCommunityModules}
                                        rowData={manifests}
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

export default Manifests;