const carrierTranslator = (carrier) => {
    let carrierName = null;
    switch (carrier) {
        case 'usps':
            carrierName = "USPS";
            break;
        case 'fedex':
            carrierName = 'FedEx';
            break;
        case 'ups':
            carrierName = 'UPS';
            break;
        case 'dhl':
            carrierName = 'DHL';
            break;
        default:
            carrierName = carrier;
    }
    return carrierName;
};


const packageTypeTranslator = (packageType) => {
    let packageTypeName = null;
    switch (packageType) {
        case 'parcel':
            packageTypeName = "Parcel";
            break;
        case 'flat_rate_envelope':
            packageTypeName = 'Flat Rate Envelope';
            break;
        case 'large_flat_rate_box':
            packageTypeName = 'Large Flat Rate Box';
            break;
        case 'medium_flat_rate_box':
            packageTypeName = 'Medium Flat Rate Box';
            break;
        case 'small_flat_rate_box':
            packageTypeName = 'Small Flat Rate Box';
            break;
        default:
            packageTypeName = packageType;
    }
    return packageTypeName;
};

const serviceTranslator = (service) => {
    let serviceName = null;
    switch (service) {
        case 'usps_first_class':
            serviceName = "USPS First Class Package Service";
            break;
        case 'usps_priority_mail':
            serviceName = 'USPS Priority Mail';
            break;
        case 'usps_parcel_select_ground':
            serviceName = 'USPS Parcel Select Ground,';
            break;
        case 'usps_first_class_international':
            serviceName = 'USPS First Class International';
            break;
        case 'usps_priority_mail_international':
            serviceName = 'USPS Priority Mail International';
            break;
        case 'usps_priority_mail_express_international':
            serviceName = 'USPS Priority Mail Express International';
            break;
        default:
            serviceName = service;
    }
    return serviceName;
};

const priceTypeTranslator = (priceType) => {
    let priceTypeText = null;
    switch (priceType) {
        case 'retail':
            priceTypeText = "Retail";
            break;
        case 'commercial_base':
            priceTypeText = 'Commercial Base';
            break;
        case 'commercial_plus':
            priceTypeText = 'Commercial Plus';
            break;
        case 'commercial':
            priceTypeText = 'Commercial';
            break;
        case 'nsa':
            priceTypeText = 'NSA';
            break;
        default:
            priceTypeText = priceType;
    }

    return priceTypeText;
};

export { carrierTranslator, packageTypeTranslator, serviceTranslator, priceTypeTranslator };