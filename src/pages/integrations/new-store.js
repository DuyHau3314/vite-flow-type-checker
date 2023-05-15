// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import { useSelector, useDispatch } from 'react-redux';

// components
import PageTitle from '../../components/PageTitle';
import { FormInput } from '../../components/';

// actions
import { createCsvIntegrationWithBatchContent } from '../../redux/actions';

import DEFAULT_CSV_PARAMS from './default-csv-params';

const BasicWizard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [integration, setIntegration] = useState({ name: null, type: 'csv', active: true, params: DEFAULT_CSV_PARAMS });
    const [batch, setBatch] = useState({ label: 'initial csv upload' });
    const [file, setFile] = useState();

    const { loading, error, uploaded } = useSelector((state) => ({
        loading: state.NewCsvIntegrationBatch.loading,
        error: state.NewCsvIntegrationBatch.error,
        uploaded: state.NewCsvIntegrationBatch.uploaded
    }));

    useEffect(() => {
        if (uploaded) {
            navigate('/integrations/stores');
        }
    }, [uploaded]);

    const integrationNameChangeHandler = (event) => {
        setIntegration({ ...integration, name: event.target.value });
    };

    const fileChangeHandler = (event) => {
      setFile(event.target.files[0])
    };

    const submitHandler = () => {
        const formData = { file: file, fileName: file.name };
        dispatch(createCsvIntegrationWithBatchContent(integration, batch, formData));
    };

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-3"> Add New Integration</h4>

                <Wizard>
                    <Steps>
                        <Step
                            id="name"
                            render={({ next }) => (
                                <Form>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label htmlFor="name" column md={3}>
                                            Name
                                        </Form.Label>
                                        <Col md={9}>
                                            <FormInput
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Enter name"
                                                onChange={integrationNameChangeHandler}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label htmlFor="type" column md={3}>
                                            Type
                                        </Form.Label>
                                        <Col md={9}>
                                            <FormInput
                                                name="select"
                                                type="select"
                                                containerClass="mb-3"
                                                className="form-select"
                                                id="type"
                                                key="select">
                                                <option>CSV</option>
                                                <option disabled>Shopify</option>
                                                <option disabled>Amazon</option>
                                                <option disabled>ShipHero</option>
                                            </FormInput>
                                        </Col>
                                    </Form.Group>

                                    <ul className="list-inline wizard mb-0">
                                        <li className="next list-inline-item float-end">
                                            <Button onClick={next} variant="success">
                                                Next
                                            </Button>
                                        </li>
                                    </ul>
                                </Form>
                            )}
                        />
                        <Step
                            id="file-upload"
                            render={({ next, previous }) => (
                                <Form>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label htmlFor="file" column md={3}>
                                            Upload file
                                        </Form.Label>
                                        <Col md={9}>
                                            <FormInput
                                                type="file"
                                                name="file"
                                                containerClass={'mb-3'}
                                                key="file"
                                                id="file"
                                                onChange={fileChangeHandler}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <ul className="list-inline wizard mb-0">
                                        <li className="previous list-inline-item">
                                            <Button onClick={previous} variant="info">
                                                Previous
                                            </Button>
                                        </li>
                                        <li className="next list-inline-item float-end">
                                            <Button onClick={submitHandler} variant="success" disabled={loading}>
                                            {loading && <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />}
                                            {loading && <span>Submitting</span>}
                                            {!loading && <span>Submit</span>}
                                            </Button>
                                        </li>
                                    </ul>
                                </Form>
                            )}
                        />
                    </Steps>
                </Wizard>
            </Card.Body>
        </Card>
    );
};

const NewStore = (): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Stores'}
            />

            <Row>
                <Col xl={6}>
                    <BasicWizard />
                </Col>
            </Row>
        </>
    );
};

export default NewStore;
