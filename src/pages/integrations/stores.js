// @flow
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import { format } from 'date-fns';

// ag-grid
import { AgGridColumn, AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from "@ag-grid-community/all-modules"
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-bootstrap.css';
import '../../assets/scss/ag-grid-acmecorp.scss';

// actions
import { getAllIntegrations } from '../../redux/actions';

// component
import PageTitle from '../../components/PageTitle';

const ActionsRenderer = (props) => {
    return (
        <>
            <Button type="button" className="btn btn-primary btn-sm mb-2">New Batch</Button>
            <a href="javascript:void(0);" className="action-icon"> <i className="mdi mdi-dots-vertical font-18"></i></a>
        </>
    );
};

const ActiveRenderer = (params) => {
    if (params.data.value)
        return <span className="badge bg-success">Active</span>;
    else
        return <span className="badge bg-danger">Deactived</span>;
};

const TypeCellRenderer = (props) => {
    return <i className="mdi mdi-file font-18"></i>;
};

const createdAtDateGetter = (params) => {
    return `${format(Date.parse(params.data.created_at), 'MM/dd/yyyy')}`;
};

const StoreIntegrations = (): React$Element<React$FragmentType> => {
    const dispatch = useDispatch();

    const [columnDefs] = useState([
        { headerName: 'Name', field: 'name' },
        { headerName: 'Type', cellRenderer: TypeCellRenderer },
        { headerName: 'Active', field: 'active', cellRenderer: ActiveRenderer },
        { headerName: 'Auto Import', field: 'auto_import' },
        { headerName: 'Created At', valueGetter: createdAtDateGetter },
        { headerName: 'Actions', field: 'actions', cellRenderer: ActionsRenderer }
    ]);

    const gridOptions = {
        defaultColDef: {
            sortable: true,
            resizable: true,
            flex: 1
        },
        rowHeight: 69,
        headerHeight: 52
    };

    const { loading, integrations } = useSelector((state) => ({
        loading: state.Integrations.loading,
        integrations: state.Integrations.integrations
    }));

    useEffect(() => {
        dispatch(getAllIntegrations());
    }, []);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Integrations'}
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
                                        <Link to='/integrations/new-store' className="action-icon">
                                            <Button variant="primary" className="mb-2 me-2">
                                                <i className="mdi mdi-basket me-1"></i> Add New Integration
                                            </Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>

                            {loading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
                            {!loading && integrations &&
                                <div className="ag-theme-bootstrap ag-theme-acmecorp" style={{ height: "800px", width: "100%" }}>
                                    <AgGridReact
                                        gridOptions={gridOptions}
                                        modules={AllCommunityModules}
                                        rowData={integrations}
                                        columnDefs={columnDefs}
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

export default StoreIntegrations;