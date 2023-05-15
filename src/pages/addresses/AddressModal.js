import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { FormInput } from '../../components/';
import Autocomplete from '../../components/Autocomplete';
import { isEmpty } from '../../helpers/utils';

const AddressModal = ({ isOpen, onClose, saveHandler, addressEntry }) => {
    let initialAddressString = `${addressEntry?.street1 ?? ''} ${addressEntry?.cityLocality ?? ''} ${addressEntry.stateProvince ?? ''} ${addressEntry.countryCode ?? ''}`;
    initialAddressString = initialAddressString.trim();

    const [description, setDescription] = useState(addressEntry?.description ?? '');
    const [name, setName] = useState(addressEntry?.name ?? '');
    const [companyName, setCompanyName] = useState(addressEntry?.companyName ?? '');
    const [email, setEmail] = useState(addressEntry?.email ?? '');
    const [phone, setPhone] = useState(addressEntry?.phone ?? '');
    const [street1, setStreet1] = useState(addressEntry?.street1 ?? '');
    const [street2, setStreet2] = useState(addressEntry?.street2 ?? '');
    const [street3, setStreet3] = useState(addressEntry?.street3 ?? '');
    const [cityLocality, setCityLocality] = useState(addressEntry?.cityLocality ?? '');
    const [stateProvince, setStateProvince] = useState(addressEntry?.stateProvince ?? '');
    const [postalCode, setPostalCode] = useState(addressEntry?.postalCode ?? '');
    const [countryCode, setCountryCode] = useState(addressEntry?.countryCode ?? '');
    const [defaultEntry, setDefaultEntry] = useState(addressEntry?.defaultEntry ?? '');

    const handleSubmit = (event) => {
        event.preventDefault();
        saveHandler({
            description,
            name,
            companyName,
            email,
            phone,
            street1,
            street2,
            street3,
            cityLocality,
            stateProvince,
            postalCode,
            countryCode,
            defaultEntry
        });
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    const addressChangeHandler = (address) => {
        setStreet1(address.street1);
        setCityLocality(address.cityLocality);
        setStateProvince(address.stateProvince);
        setPostalCode(address.postalCode);
        setCountryCode(address.countryCode);
    };

    return (
        <Modal show={isOpen} onHide={handleClose} size="lg">
            <Modal.Header closeButton onHide={handleClose} className="modal-colored-header bg-primary">
                <Modal.Title className="m-0">Address</Modal.Title>
            </Modal.Header>
            <div className="p-1">
                <Modal.Body className="px-3 pt-3 pb-0">
                    <Row className="g-2">
                        <Col className="mb-3 col-md-12">
                            <FormInput
                                label="Description"
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col className="mb-3 col-md-6">
                            <FormInput
                                label="Name"
                                className="input"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Col>
                        <Col className="mb-3 col-md-6">
                            <FormInput
                                label="Company Name"
                                className="input"
                                type="text"
                                placeholder="Company Name"
                                value={companyName}
                                onChange={(event) => setCompanyName(event.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col className="mb-3 col-md-6">
                            <FormInput
                                label="Email"
                                className="input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Col>
                        <Col className="mb-3 col-md-6">
                            <FormInput
                                label="Phone"
                                className="input"
                                type="tel"
                                placeholder="Phone"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col className="mb-3 col-md-12">
                            <label className="form-label">Address</label>
                            <Autocomplete defaultValue={initialAddressString} updateAddress={addressChangeHandler} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3 col-md-12">
                            <FormInput
                                label="Default"
                                type="checkbox" 
                                id="defaultEntry"
                                value="defaultEntry"
                                onChange={(event) => setDefaultEntry(event.target.checked)} />
                        </Col>
                    </Row>
                    <div>
                        <div className="text-sm-end">
                            <Button className="btn btn-sm btn-primary mb-2" onClick={handleSubmit}>Save</Button>
                            <Button className="btn btn-sm btn-primary mb-2 btn-light" onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default AddressModal;
