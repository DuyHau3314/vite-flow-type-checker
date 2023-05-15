// @flow
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import { format } from 'date-fns';

// ag-grid
import { AgGridColumn, AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from "@ag-grid-community/all-modules"
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-bootstrap.css';
import '../../assets/scss/ag-grid-acmecorp.scss';

import { packageTypeTranslator, serviceTranslator } from '../../helpers/translators';

// actions
import { ordersGetAllOrders, ordersCreateLabelForOrder, ordersResetState } from '../../redux/actions';

// component
import PageTitle from '../../components/PageTitle';
import { validForRating, validForPurchasing } from '../../helpers/spec-validators';

const ActionsRenderer = (params) => {
    const order = params.data;

    const editLink = "/pages/edit-order?id=" + params.data.id;
    const editMenu =
        <Dropdown className="float-end" align="end">
            <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                <i className="mdi mdi-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item><Link to={editLink}>Edit</Link></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>;

    if (order.purchased) {
        const labelLink = "/pages/label?id=" + params.data.id;
        const actionTag = 'View';
        return (
            <>
                <Link to={labelLink} className="action-icon">
                    <Button type="button" className="btn btn-primary btn-sm mb-2" style={{ width: "100px" }}>{actionTag}</Button>
                </Link>
            </>
        );
    } else if (validForPurchasing(order)) {
        const onPurchase = params.onPurchase;
        return (
            <>
                <Button type="button" className="btn btn-primary btn-sm mb-2" style={{ width: "100px" }} onClick={() => onPurchase(order.id)}>Buy</Button>
                {editMenu}
            </>
        );
    } else {
        return (
            <>
                <Link to={editLink} className="action-icon">
                    <Button type="button" className="btn btn-primary btn-sm mb-2" style={{ width: "100px" }}>Edit</Button>
                </Link>
            </>
        );
    }
};

const toAddressRenderer = (params) => {
    const { companyName, firstName, middleName, lastName } = params.data.toAddress;
    const { cityLocality, stateProvince, postalCode } = params.data.toAddress;
    const firstLine = [companyName, firstName, middleName, lastName].filter(n => !!n).join(' ');
    const secondLine = [cityLocality, stateProvince, postalCode].filter(n => !!n).join(' ');
    return firstLine + '\n' + secondLine;
};

const integrationRenderer = (params) => {
    return <span className="badge badge-success-lighten">csv</span>;
};

const serviceRenderer = (params) => {
    let service = params.data.serviceName || params.data.service || '';
    service = serviceTranslator(service);
    if (params.data.price) {
        service += '\n' + `$${params.data.price.toFixed(2)}`;
    }
    return service;
};

const statusRenderer = (params) => {
    const order = params.data;
    if (order.purchased)
        return <span className="badge badge-success-lighten">PURCHASED</span>;
    else {
        return <span className="badge badge-warning-lighten">NOT PURCHASED</span>;
        //if (validForRating(order)) {
        //    badges.push(<br />);
        //    badges.push(<span className="badge badge-info-lighten">READY FOR RATING</span>);
        //}
        //if (validForPurchasing(order)) {
        //    badges.push(<br />);
        //    badges.push(<span className="badge badge-info-lighten">READY FOR PURCHASING</span>);
        //}
        //return <div>{badges}</div>;
    }
};

const packageRenderer = (params) => {
    const packageSpec = params.data.package;
    if (!packageSpec)
        return '';
    const packageType = packageTypeTranslator(packageSpec.packageType) || '';
    const weight = packageSpec.weightValue || '';
    const weightUnit = packageSpec.weightUnit || '';
    return packageType + '\n' + `${weight.toFixed(2)} ${weightUnit}`;
};

const itemsRenderer = (params) => {
    const noItems = params.data.items ? params.data.items.length : 0;
    return <span className="badge badge-outline-dark">{noItems}</span>;
};

const orderDateGetter = (params) => {
    return params.data.order_date ? `${format(Date.parse(params.data.orderDate), 'MM/dd/yyyy')}` : '';
};

const Orders = (): React$Element<React$FragmentType> => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createLabelForOrderHandler = (orderId) => {
        dispatch(ordersCreateLabelForOrder(orderId, false));
    };

    const [columnDefs] = useState([
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            maxWidth: 30
        },
        { headerName: 'Order ID', field: 'externalOrderId' },
        { headerName: 'Order Date', valueGetter: orderDateGetter },
        { headerName: 'Source', cellRenderer: integrationRenderer },
        { headerName: 'Customer', cellRenderer: toAddressRenderer, cellStyle: { 'whiteSpace': 'pre' } },
        { headerName: 'Items', cellRenderer: itemsRenderer, width: 75 },
        { headerName: 'Package', cellRenderer: packageRenderer, cellStyle: { 'whiteSpace': 'pre' } },
        { headerName: 'Service', valueGetter: serviceRenderer, cellStyle: { 'whiteSpace': 'pre' } },
        { headerName: 'Status', cellRenderer: statusRenderer, width: 100, cellStyle: { 'whiteSpace': 'pre' } },
        { headerName: 'Actions', field: 'actions', cellRendererFramework: ActionsRenderer, width: 120, cellRendererParams: { onPurchase: createLabelForOrderHandler } }
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

    const gridOptions = {
        defaultColDef: {
            sortable: false,
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

    const gridRef = useRef();

    const { loading, orders, creatingOrder, createdOrder } = useSelector((state) => ({
        loading: state.Orders.loading,
        orders: state.Orders.orders,
        creatingOrder: state.Orders.creatingOrder,
        createdOrder: state.Orders.createdOrder
    }));

    useEffect(() => {
        dispatch(ordersGetAllOrders(false, true));
    }, []);

    useEffect(() => {
        if (createdOrder) {
            navigate('/pages/label?id=' + createdOrder.id);
        }
        return () => {
            dispatch(ordersResetState());
        };
    }, [createdOrder]);

    const [selectedOrderId, setSelectedOrderId] = useState(-1);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Orders'}
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
                                        <Link to='/pages/new-order' className="action-icon">
                                            <Button variant="primary" className="mb-2 me-2">
                                                <i className="mdi mdi-basket me-1"></i> Add New Order
                                            </Button>
                                        </Link>
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

export default Orders;