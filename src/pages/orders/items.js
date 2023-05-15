import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import ItemModal from './ItemModal';

const Items = (props) => {
    let itemsContent = "no items found in order";
    const initialItem = {};
    const initialItems = props.items;
    const [items, setItems] = useState(initialItems);

    //TODO: investigate why this doesn't work. For now, it's ok, because it simply
    //TODO: sets items to an empty array

    // do not fire onSpecDataChange on first render
    //const [didRender, setDidRender] = useState(false);
    //useEffect(() => {
    //    console.log('will set didrender');
    //    setDidRender(true);
    //}, []);

    useEffect(() => {
        //if (didRender) {
        props.onSpecDataChange({ items });
        //} else {
        //    console.log('will not call');
        //}
    }, [items]);

    const [selectedItemEntry, setSelectedItemEntry] = useState(initialItem);

    const [showItemModal, setShowItemModal] = useState(false);

    const onItemModalClose = () => {
        setSelectedItemEntry(initialItem);
        setShowItemModal(false);
      };    

    const saveItemHandler = (item) => {
        items.push(item);
        setItems(items);
    };

    if (Array.isArray(items) && items.length > 0) {
        itemsContent = items.map((item, i) =>
            <tr key={i}>
                <td>{item.description}</td>
                <td>{item.sku}</td>
                <td>{item.itemWeightValue} {item.itemWeightUnit}</td>
                <td>{item.quantity}</td>
                <td>${item.itemValueValue}</td>
                <td>${item.quantity && item.itemValueValue && item.quantity * item.itemValueValue}</td>
            </tr>
        );
    }

    const getTotalWeight = (items) => {
        return items.reduce((accumulator, item) => accumulator + (item.quantity || 0) * (item.itemWeightValue || 0), 0);
    };

    const getTotalValue = (items) => {
        return items.reduce((accumulator, item) => accumulator + (item.quantity || 0) * (item.itemValueValue || 0), 0);
    };

    return (
        <>
            <Card>
                <Card.Header className="mb-2 text-uppercase p-2">
                    <i className="mdi mdi-widgets-outline me-1"></i> Items
                </Card.Header>
                <Card.Body>
                    <Card className="widget-inline">
                        <Card.Body className="p-0">
                            <Row className="g-0">
                                <Col className="col-sm-6 col-lg-4">
                                    <Card className="rounded-0 shadow-none m-0 border-start border-light">
                                        <Card.Body className="text-center">
                                            <h5>{items ? items.length : 0} qty</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="col-sm-6 col-lg-4">
                                    <Card className="rounded-0 shadow-none m-0 border-start border-light">
                                        <Card.Body className="text-center">
                                            <h5><span>{items ? getTotalWeight(items) : 0} lb</span></h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="col-sm-6 col-lg-4">
                                    <Card className="rounded-0 shadow-none m-0 border-start border-light">
                                        <Card.Body className="text-center">
                                            <h5><span>${items ? getTotalValue(items) : 0}</span></h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <div className="table-responsive" data-simplebar style={{ maxHeight: 216 }}>
                        <table className="table mb-3">
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

                    <div>
                        <div className="text-sm-end">
                            <button type="button" className="btn btn-sm btn-outline-primary mb-0 mt-2" onClick={() => setShowItemModal(true)}>Add item</button>
                        </div>
                    </div>

                </Card.Body>
            </Card>

            {showItemModal && <ItemModal
                isOpen={showItemModal}
                onClose={onItemModalClose}
                saveHandler={saveItemHandler}
                itemEntry={selectedItemEntry}
            />}
        </>
    );
};

export default Items;