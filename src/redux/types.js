import { string } from "yup";

export type Address = {
    firstName: string,
    middleName: string,
    lastName: string,
    street1: string,
    street2: string,
    street3: string,
    cityLocality: string,
    stateProvince: string,
    postalCode: string,
    countryCode: string
};

export type CarrierOptions = {
    entryFacility: string,
    sortType: string,
    machinable: boolean,
    sundayHoliday: boolean,
    inductionPostalCode: string
};

export type ShipmentValue = {
    value: number,
    unit: string
};

export type ShipmentDimensions = {
    value: number,
    unit: string
};

export type ShipmentWeight = {
    value: number,
    unit: string
};

export type OrderSpec = {
    fromAddress: Address,
    toAddress: Address,
    shipDate: string,
    warehouseId: string,
    service: string,
    carrier: string,
    priceType: string,
    carrierOptions: CarrierOptions,
    returnsIndicator: boolean
};

export type PackageSpec = {
    packageType: string,
    shipmentValueValue: number,
    shipmentValueUnit: string,
    dimensionsLength: number,
    dimensionsWidth: number,
    dimensionsHeight: number,
    dimensionsUnit: string,
    weightValue: number,
    weightUnit: string
};