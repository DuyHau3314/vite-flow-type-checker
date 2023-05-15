import { addressResponseToAddressObject, carrierOptionsRequestToCarrierOptionsObject, itemRequestToItemObject, itemObjectToItemRequest } from './misc';
import { manifestResponseToManifestObject } from './manifest';

const updateOrderObjectToUpdateOrderRequest = (updateSpec) => {
    return {
        service: updateSpec.service,
        package_type: updateSpec.packageType
    };
};

const orderResponseToOrderObject = (response) => {
    const firstPackageSpec = response.packages[0];

    return {
        id: response.id,
        createdAt: response.created_at,
        purchased: response.purchased,
        serviceName: response.service_name,
        price: response.price,
        zone: response.zone,
        trackingNumber: response.tracking_number,
        base64Label: response.base64_label,
        fromAddress: response.from_address && addressResponseToAddressObject(response.from_address),
        toAddress: response.to_address && addressResponseToAddressObject(response.to_address),
        returnToAddress: response.return_to_address && addressResponseToAddressObject(response.return_to_address),
        externalOrderId: response.external_order_id,
        shipDate: response.ship_date,
        warehouseId: response.warehouse_id,
        service: response.service,
        carrier: response.carrier,
        carrierOptions: response.carrier_options && carrierOptionsRequestToCarrierOptionsObject(response.carrier_options),
        nonDeliveryOption: response.non_delivery_option,
        returnsIndicator: response.returns_indicator,
        items: response.items && response.items.map(item => itemRequestToItemObject(item)),
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
        },
        carrierManifest: response.carrier_manifest && manifestResponseToManifestObject(response.carrier_manifest)
    };
};

const orderObjectToOrderRequest = (order) => {
    let request = {
        from_address: {
            first_name: order.fromAddress.firstName,
            middle_name: order.fromAddress.middleName,
            last_name: order.fromAddress.lastName,
            street1: order.fromAddress.street1,
            street2: order.fromAddress.street2,
            street3: order.fromAddress.street3,
            postal_code: order.fromAddress.postalCode,
            city_locality: order.fromAddress.cityLocality,
            state_province: order.fromAddress.stateProvince,
            country_code: order.fromAddress.countryCode
        },
        to_address: {
            first_name: order.toAddress.firstName,
            middle_name: order.toAddress.middleName,
            last_name: order.toAddress.lastName,
            street1: order.toAddress.street1,
            street2: order.toAddress.street2,
            street3: order.toAddress.street3,
            postal_code: order.toAddress.postalCode,
            city_locality: order.toAddress.cityLocality,
            state_province: order.toAddress.stateProvince,
            country_code: order.toAddress.countryCode
        },
        //return_to_address: ...
        warehouse_id: order.warehouseId,
        service: order.service,
        returns_indicator: order.returnsIndicator,
        packages: [],
        create_label: order.create_label
    };

    if (order.items && order.items.length > 0) {
        request = {
            ...request,
            items: order.items.map(item => itemObjectToItemRequest(item))
        };
    }

    let packageSpec = {
        package_type: order.package.packageType,
        weight: {
            value: order.package.weightValue,
            unit: order.package.weightUnit
        }
    };

    if (order.package.insuredValueValue && order.package.insuredValueUnit) {
        packageSpec = {
            ...packageSpec,
            insured_value: {
                value: order.package.insuredValueValue,
                unit: order.package.insuredValueUnit
            }
        };
    }

    if (order.package.dimensionsLength && order.package.dimensionsWidth && order.package.dimensionsHeight && order.package.dimensionsUnit) {
        packageSpec = {
            ...packageSpec,
            dimensions: {
                length: order.package.dimensionsLength,
                width: order.package.dimensionsWidth,
                height: order.package.dimensionsHeight,
                unit: order.package.dimensionsUnit
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

export { orderResponseToOrderObject, orderObjectToOrderRequest, updateOrderObjectToUpdateOrderRequest };