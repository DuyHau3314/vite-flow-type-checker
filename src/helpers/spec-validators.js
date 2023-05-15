//TODO: move to utils
function isEmpty(obj) {
    if (obj === undefined) {
        return true;
    }
    if (obj == null) {
        return true;
    }
    return Object.keys(obj).length === 0;
}

// The Rates API doesn't really need a full address, but this is necessary for the
// quick print since the user will go straight into label printing. If this wasn't
// enforced, then it would make validation of the label request more awkward.
const validAddress = (address) => {
    return (address != null) &&
        (!isEmpty(address.firstName) && !isEmpty(address.lastName) || !isEmpty(address.companyName)) &&
        !isEmpty(address.street1) &&
        !isEmpty(address.cityLocality) &&
        !isEmpty(address.postalCode) &&
        !isEmpty(address.countryCode);
};

// a valid rate spec for getting rates requires a valid from address, to address and weight (at a 
// minimum), even though the price request doesn't need all the parameters (i.e. name)
const validForRating = (spec) => {
    console.log('in validForRating');
    const x = (spec != null) && (spec.package != null) &&
        !isEmpty(spec.package.weightValue) &&
        validAddress(spec.fromAddress) &&
        validAddress(spec.toAddress);
    console.log('validForRating: ' + x);
    return x;
};

const validForCreate = (spec) => {
    return (spec != null) && (spec.package != null) &&
        validAddress(spec.fromAddress) &&
        validAddress(spec.toAddress);
};

const validForPurchasing = (spec) => {
    return (spec != null) && (spec.package != null) &&
        (spec.package.weightValue != null && spec.package.weightValue > 0) &&
        validAddress(spec.fromAddress) &&
        validAddress(spec.toAddress);
};

export { validAddress, validForRating, validForCreate, validForPurchasing };