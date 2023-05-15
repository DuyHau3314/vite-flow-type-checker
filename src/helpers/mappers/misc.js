const addressResponseToAddressObject = (response) => {
    return {
        companyName: response.company_name,
        firstName: response.first_name,
        middleName: response.middle_name,
        lastName: response.last_name,
        street1: response.street1,
        street2: response.street2,
        street3: response.street3,
        cityLocality: response.city_locality,
        stateProvince: response.state_province,
        postalCode: response.postal_code,
        countryCode: response.country_code,
        carrierRouteCode: response.carrier_route_code,
        residentialIndicator: response.residential_indicator
    };
};

const carrierOptionsRequestToCarrierOptionsObject = (response) => {
    return {
        entryFacility: response.entry_facility,
        sortType: response.sort_type,
        priceType: response.price_type,
        machinable: response.machinable,
        sundayHoliday: response.sunday_holiday,
        inductionPostalCode: response.induction_postal_code
    };
};

const itemRequestToItemObject = (response) => {
    return {
        description: response.description,
        quantity: response.quantity,
        itemWeightValue: response.item_weight && response.item_weight.value,
        itemWeightUnit: response.item_weight && response.item_weight.unit,
        itemValueValue: response.item_value && response.item_value.value,
        itemValueUnit: response.item_value && response.item_value.unit,
        itemDimensionsLength: response.item_dimensions && response.item_dimensions.length,
        itemdimensionsLength: response.item_dimensions && response.item_dimensions.width,
        itemDimensionsHeight: response.item_dimensions && response.item_dimensions.height,
        itemDimensionsUnit: response.item_dimensions && response.item_dimensions.unit,
        hsTariffNumber: response.hs_tariff_number,
        sku: response.sku,
        originCountryCode: response.origin_country_code
    };
};

const itemObjectToItemRequest = (item) => {
    let itemRequest = {
        description: item.description,
        quantity: item.quantity,
        hs_tariff_number: item.hsTariffNumber,
        sku: item.sku,
        origin_country_code: item.originCountryCode
    };

    if (item.itemWeightValue && item.itemWeightUnit) { 
        itemRequest = {
            ...itemRequest,
            item_weight: {
                value: item.itemWeightValue,
                unit: item.itemWeightUnit
            }
        };
    };

    if (item.itemValueValue && item.itemValueUnit) {
        itemRequest = {
            ...itemRequest,
            item_value: {
                value: item.itemValueValue,
                unit: item.itemValueUnit
            }
        };
    };

    if (item.itemDimensionsLength && item.itemdimensionsLength && item.itemDimensionsHeight && item.itemDimensionsUnit) {
        itemRequest = {
            ...itemRequest,
            item_dimensions: {
                length: item.itemDimensionsLength,
                width: item.itemdimensionsLength,
                height: item.itemDimensionsHeight,
                unit: item.itemDimensionsUnit
            }
        };
    }

    return itemRequest;
};

export { addressResponseToAddressObject, carrierOptionsRequestToCarrierOptionsObject, itemRequestToItemObject, itemObjectToItemRequest };