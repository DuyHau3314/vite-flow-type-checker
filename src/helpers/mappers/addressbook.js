const addressBookEntryResponseToAddressBookEntryObject = (response) => {
    return {
        id: response.id,
        description: response.description,
        createdAt: response.created_at,
        companyName: response.company_name,
        name: response.name,
        email: response.email,
        phone: response.phone,
        street1: response.street1,
        street2: response.street2,
        street3: response.street3,
        cityLocality: response.city_locality,
        stateProvince: response.state_province,
        postalCode: response.postal_code,
        countryCode: response.country_code,
        defaultEntry: response.default_entry
    };
};

const addressBookEntryObjectToAddressBookEntryRequest = (object) => {
    return {
        description: object.description,
        company_name: object.companyName,
        name: object.name,
        email: object.email,
        phone: object.phone,
        street1: object.street1,
        street2: object.street2,
        street3: object.street3,
        city_locality: object.cityLocality,
        state_province: object.stateProvince,
        postal_code: object.postalCode,
        country_code: object.countryCode,
        default_entry: object.defaultEntry
    };
};

export { addressBookEntryResponseToAddressBookEntryObject, addressBookEntryObjectToAddressBookEntryRequest };