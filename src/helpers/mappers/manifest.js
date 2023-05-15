import { addressResponseToAddressObject } from './misc';

const manifestObjectToManifestRequest = (manifest) => {
    return {
        tracking_numbers: manifest.trackingNumbers
    };
};

const manifestResponseToManifestObject = (response) => {
    return {
        id: response.id,
        createdAt: response.created_at,
        shipmentDate: response.shipment_date,
        status: response.status,
        trackingNumber: response.tracking_number,
        auto: response.auto,
        priorityCount: response.priority_count,
        expressCount: response.express_count,
        otherCount: response.other_count,
        firstClassCount: response.first_class_count,
        returnsCount: response.returns_count,
        internationalCount: response.international_count,
        base64ScanForm: response.base64_scan_form,
        entryFacility: response.entry_facility,
        entryFacilityZip: response.entry_facility_zip,
        entryFacilityZip4: response.entry_facility_zip4,
        shipmentAddress: response.shipment_address && addressResponseToAddressObject(response.shipment_address),
    };
};

export { manifestObjectToManifestRequest, manifestResponseToManifestObject };