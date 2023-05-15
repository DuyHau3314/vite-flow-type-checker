import { addressResponseToAddressObject, carrierOptionsRequestToCarrierOptionsObject } from './misc';

const rateResponseToRateObject = (response) => {
    const firstPackageSpec = response.packages[0];

    return {
        id: response.id,
        createdAt: response.created_at,
        purchased: response.purchased,
        serviceName: response.service_name,
        price: response.price,
        zone: response.zone,
        ratingWeightValue: response.rating_weight && response.rating_weight.value,
        ratingWeightUnit: response.rating_weight && response.rating_weight.unit,
        ratingDimensionsLength: response.rating_dimensions && response.rating_dimensions.length,
        ratingdimensionsLength: response.rating_dimensions && response.rating_dimensions.width,
        ratingDimensionsHeight: response.rating_dimensions && response.rating_dimensions.height,
        cubic: response.cubic,
        trackingNumber: response.tracking_number,
        base64Label: response.base64_label,
        fromAddress: response.from_address && addressResponseToAddressObject(response.from_address),
        toAddress: response.to_address && addressResponseToAddressObject(response.to_address),
        shipDate: response.ship_date,
        warehouseId: response.warehouse_id,
        service: response.service,
        carrier: response.carrier,
        carrierOptions: response.carrier_options && carrierOptionsRequestToCarrierOptionsObject(response.carrier_options),
        returnsIndicator: response.returns_indicator,
        package: {
            packageType: firstPackageSpec.package_type,
            weightValue: firstPackageSpec.weight.value,
            weightUnit: firstPackageSpec.weight.unit,
            insuredValueValue: firstPackageSpec.insured_value && firstPackageSpec.insured_value.value,
            insuredValueUnit: firstPackageSpec.insured_value && firstPackageSpec.insured_value.unit,
            dimensionsLength: firstPackageSpec.dimensions && firstPackageSpec.dimensions.length,
            dimensionsWidth: firstPackageSpec.dimensions && firstPackageSpec.dimensions.width,
            dimensionsHeight: firstPackageSpec.dimensions && firstPackageSpec.dimensions.height,
            dimensionsUnit: firstPackageSpec.dimensions && firstPackageSpec.dimensions.unit,
            cubic: firstPackageSpec.cubic,
            ratingWeightValue: firstPackageSpec.rating_weight && firstPackageSpec.rating_weight.value,
            ratingWeightUnit: firstPackageSpec.rating_weight && firstPackageSpec.rating_weight.unit,
            ratingDimensionsLength: firstPackageSpec.rating_dimensions && firstPackageSpec.rating_dimensions.length,
            ratingdimensionsLength: firstPackageSpec.rating_dimensions && firstPackageSpec.rating_dimensions.width,
            ratingDimensionsHeight: firstPackageSpec.rating_dimensions && firstPackageSpec.rating_dimensions.height,    
        }
    };
};

const rateObjectToRateRequest = (rateSpec) => {
    let request = {
        from_address: {
            first_name: rateSpec.fromAddress.firstName,
            middle_name: rateSpec.fromAddress.middleName,
            last_name: rateSpec.fromAddress.lastName,
            street1: rateSpec.fromAddress.street1,
            street2: rateSpec.fromAddress.street2,
            street3: rateSpec.fromAddress.street3,
            postal_code: rateSpec.fromAddress.postalCode,
            city_locality: rateSpec.fromAddress.cityLocality,
            state_province: rateSpec.fromAddress.stateProvince,
            country_code: rateSpec.fromAddress.countryCode
        },
        to_address: {
            first_name: rateSpec.toAddress.firstName,
            middle_name: rateSpec.toAddress.middleName,
            last_name: rateSpec.toAddress.lastName,
            street1: rateSpec.toAddress.street1,
            street2: rateSpec.toAddress.street2,
            street3: rateSpec.toAddress.street3,
            postal_code: rateSpec.toAddress.postalCode,
            city_locality: rateSpec.toAddress.cityLocality,
            state_province: rateSpec.toAddress.stateProvince,
            country_code: rateSpec.toAddress.countryCode
        },
        warehouse_id: rateSpec.warehouseId,
        carrier: rateSpec.carrier,
        service: rateSpec.service,
        returns_indicator: rateSpec.returnsIndicator
    };

    let packageSpec = {
        package_type: rateSpec.package.packageType,
        weight: {
            value: rateSpec.package.weightValue,
            unit: rateSpec.package.weightUnit
        }
    };

    if (rateSpec.package.insuredValueValue && rateSpec.package.insuredValueUnit) {
        packageSpec = {
            ...packageSpec,
            insured_value: {
                value: rateSpec.package.insuredValueValue,
                unit: rateSpec.package.insuredValueUnit
            }
        };
    }

    if (rateSpec.package.dimensionsLength && rateSpec.package.dimensionsWidth && rateSpec.package.dimensionsHeight && rateSpec.package.dimensionsUnit) {
        packageSpec = {
            ...packageSpec,
            dimensions: {
                length: rateSpec.package.dimensionsLength,
                width: rateSpec.package.dimensionsWidth,
                height: rateSpec.package.dimensionsHeight,
                unit: rateSpec.package.dimensionsUnit
            }
        };
    }

    request = {
        ...request,
        packages: [
            packageSpec
        ]
    };

    return request;
};

export { rateObjectToRateRequest, rateResponseToRateObject };