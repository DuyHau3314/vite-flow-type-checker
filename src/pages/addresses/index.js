// @flow
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import PageTitle from '../../components/PageTitle';
import AddressModal from './AddressModal';
import { isEmpty } from '../../helpers/utils';

// ag-grid
import { AgGridColumn, AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from "@ag-grid-community/all-modules"
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-bootstrap.css';
import '../../assets/scss/ag-grid-acmecorp.scss';

import { addressBookGetAllAddresses, addressBookCreateAddress, addressBookDeleteAddress, addressBookUpdateAddress } from '../../redux/actions';

const actionsRenderer = (params) => {
  const addressEntry = params.data;
  const onModify = params.onModify;
  const onDelete = params.onDelete;
  return (
    <>
      <Button type="button" className="btn btn-secondary btn-sm mb-2 me-1" style={{ width: "100px" }} onClick={() => onModify(addressEntry)}>Modify</Button>
      <Button type="button" className="btn btn-danger btn-sm mb-2" style={{ width: "100px" }} onClick={() => onDelete(addressEntry.id)}>Delete</Button>
    </>
  );
};

const defaultRenderer = (params) => {
  if (params.data.defaultEntry) {
    return <i className="mdi mdi-check-circle me-1"></i>;
  }
};

const nameRenderer = (params) => {
  const { name, companyName } = params.data;
  let nameLines = '';
  if (!isEmpty(name))
    nameLines += name + '\n';
  if (!isEmpty(companyName))
    nameLines += companyName + '\n';
  return nameLines.trim();
};

const addressRenderer = (params) => {
  const { street1, street2, street3 } = params.data;
  let addressLines = '';
  if (!isEmpty(street1))
    addressLines += street1 + '\n';
  if (!isEmpty(street2))
    addressLines += street2 + '\n';
  if (!isEmpty(street3))
    addressLines += street3 + '\n';
  return addressLines.trim();
};

const locationRenderer = (params) => {
  const { cityLocality, stateProvince, postalCode, countryCode } = params.data;
  const firstLine = [cityLocality, stateProvince, postalCode].filter(n => !!n).join(' ');
  const secondLine = countryCode;
  let locationLines = '';
  if (!isEmpty(firstLine))
    locationLines += firstLine + '\n';
  if (!isEmpty(secondLine))
    locationLines += secondLine + '\n';
  return locationLines.trim();
};

const phoneEmailRenderer = (params) => {
  const { phone, email } = params.data;
  let lines = '';
  if (!isEmpty(phone))
    lines += phone + '\n';
  if (!isEmpty(email))
    lines += email + '\n';
  return lines;
};

const Addresses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadingAddresses, addresses, error, creatingAddress, createdAddress, deletingAddress, deletedAddress, updatingAddress, updatedAddress, initialAddress } = useSelector((state) => ({
    loadingAddresses: state.AddressBook.loadingAddresses,
    addresses: state.AddressBook.addresses,
    error: state.AddressBook.error,
    creatingAddress: state.AddressBook.creatingAddress,
    createdAddress: state.AddressBook.createdAddress,
    deletingAddress: state.AddressBook.deletingAddress,
    deletedAddress: state.AddressBook.deletedAddress,
    updatingAddress: state.AddressBook.updatingAddress,
    updatedAddress: state.AddressBook.updatedAddress,
    initialAddress: state.AddressBook.initialAddress
  }));

  const [selectedAddressEntry, setSelectedAddressEntry] = useState(initialAddress);

  const [showAddressModal, setShowAddressModal] = useState(false);

  const onAddressModalClose = () => {
    setSelectedAddressEntry(initialAddress);
    setShowAddressModal(false);
  };

  useEffect(() => {
    dispatch(addressBookGetAllAddresses());
  }, []);

  useEffect(() => {
    dispatch(addressBookGetAllAddresses());
  }, [createdAddress, deletedAddress, updatedAddress]);

  const saveAddressHandler = (params) => {
    if (selectedAddressEntry != initialAddress) {
      console.log('will update');
      dispatch(addressBookUpdateAddress(selectedAddressEntry.id, params));
    }
    else
      dispatch(addressBookCreateAddress(params));
  };

  const modifyAddressEntryHandler = (params) => {
    setSelectedAddressEntry(params);
    setShowAddressModal(true);
  };

  const deleteAddressEntryHandler = (params) => {
    dispatch(addressBookDeleteAddress(params));
  }

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Description", field: "description" },
    { headerName: "Default", field: "default", cellRenderer: defaultRenderer, width: 75 },
    { headerName: "Name", cellRenderer: nameRenderer, cellStyle: { 'whiteSpace': 'pre' } },
    { headerName: "Phone & Email", cellRenderer: phoneEmailRenderer, cellStyle: { 'whiteSpace': 'pre' } },
    { headerName: "Address", cellRenderer: addressRenderer, cellStyle: { 'whiteSpace': 'pre' } },
    { headerName: "Location", cellRenderer: locationRenderer, cellStyle: { 'whiteSpace': 'pre' } },
    { headerName: 'Actions', field: 'actions', cellRendererFramework: actionsRenderer, width: 120, cellRendererParams: { onModify: modifyAddressEntryHandler, onDelete: deleteAddressEntryHandler } }
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
        title={'Addresses'}
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
                    <Button variant="primary" className="mb-2 me-2" onClick={() => setShowAddressModal(true)}>
                      <i className="mdi mdi-file-sign me-1"></i> Add New Address
                    </Button>
                    {showAddressModal && <AddressModal
                      isOpen={showAddressModal}
                      onClose={onAddressModalClose}
                      saveHandler={saveAddressHandler}
                      addressEntry={selectedAddressEntry}
                    />}
                  </div>
                </Col>
              </Row>

              {loadingAddresses && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
              {!loadingAddresses && addresses &&
                <div className="ag-theme-bootstrap ag-theme-acmecorp" style={{ height: "800px", width: "100%" }}>
                  <AgGridReact
                    ref={gridRef}
                    gridOptions={gridOptions}
                    columnDefs={columnDefs}
                    rowData={addresses}
                    modules={AllCommunityModules}
                    rowSelection="none"
                    suppressCellSelection={true}
                  />
                </div>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Addresses;