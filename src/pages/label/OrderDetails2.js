import React from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';
import { format } from 'date-fns';

import uspsLogoImg from '../../assets/images/usps-250x100.png';

const OrderDetails2 = (props) => {
    const order = props.order;

    let itemsContent = "no items found in order";

    if (Array.isArray(order.items) && order.items.length > 0) {
        itemsContent = order.items.map(item =>
            <tr>
                <td>{item.description}</td>
                <td>{item.sku}</td>
                <td>{item.item_weight && `${item.item_weight.value} ${item.item_weight.unit}`}</td>
                <td>{item.quantity}</td>
                <td>${item.item_value && `${item.item_value.value}`}</td>
                <td>${item.quantity && item.item_value && item.quantity * item.item_value.value}</td>
            </tr>
        );
    }

    return (
        <Card>
            <Card.Header className="mb-2 text-uppercase p-2">
                <i className="mdi mdi-office-building me-1"></i> Items
            </Card.Header>
            <Card.Body>
                <Card className="widget-inline">

                    <Card.Body className="p-0">
                        <div className="row g-0">
                            <div className="col-sm-6 col-lg-2">
                                <Card className="card rounded-0 shadow-none m-0">
                                    <Card.Body className="text-center">
                                        <h5><span>{order.id}</span></h5>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-sm-6 col-lg-2">
                                <Card className="card rounded-0 shadow-none m-0 border-start border-light">
                                    <Card.Body className="text-center">
                                        <h5><span>{order.ship_date && format(Date.parse(order.ship_date), 'MM/dd/yyyy')}</span></h5>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-sm-6 col-lg-2">
                                <Card className="card rounded-0 shadow-none m-0 border-start border-light">
                                    <Card.Body className="text-center">
                                        source
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-sm-6 col-lg-2">
                                <Card className="card rounded-0 shadow-none m-0 border-start border-light">
                                    <Card.Body className="text-center">
                                        <h5>{order.shipment_weight && `${order.shipment_weight.value} ${order.shipment_weight.unit}`}</h5>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-sm-6 col-lg-2">
                                <Card className="card rounded-0 shadow-none m-0 border-start border-light">
                                    <Card.Body className="text-center">
                                        <h5><span>{Array.isArray(order.items) && order.items.length > 0 ? order.items.length : 0} qty</span></h5>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-sm-6 col-lg-2">
                                <Card className="card rounded-0 shadow-none m-0 border-start border-light">
                                    <Card.Body className="text-center">
                                        <h5><span>${Array.isArray(order.items) && order.items.length > 0 ? order.items.reduce((partialSum, item) => partialSum + (item.item_value ? (item.item_value.value || 0) : 0), 0) : 0}</span></h5>
                                    </Card.Body>
                                </Card>
                            </div>

                        </div>
                    </Card.Body>
                </Card>

                <div className="table-responsive" data-simplebar>
                    <table className="table mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Item</th>
                                <th>SKU</th>
                                <th>Weight</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsContent}
                        </tbody>
                    </table>
                </div>
            </Card.Body>
        </Card>
    );
};

export default OrderDetails2;