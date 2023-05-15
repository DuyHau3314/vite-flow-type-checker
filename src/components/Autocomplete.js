import { useRef, useEffect } from "react";
import { Form } from 'react-bootstrap';

// TODO: these match the address fields of order. Refactor to keep these better aligned.
const fillInAddress = (place) => {
    let street1 = "";
    let street2 = "";
    let street3 = "";
    let cityLocality = "";
    let stateProvince = "";
    let postalCode = "";
    let countryCode = "";

    for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
            case "street_number": {
                street1 = `${component.long_name} ${street1}`;
                break;
            }

            case "route": {
                street1 += component.short_name;
                break;
            }

            case "postal_code": {
                postalCode = `${component.long_name}${postalCode}`;
                break;
            }

            case "postal_code_suffix": {
                postalCode = `${postalCode}-${component.long_name}`;
                break;
            }

            case "locality":
                cityLocality = component.long_name;
                break;

            case "administrative_area_level_1": {
                stateProvince = component.short_name;
                break;
            }

            case "country":
                countryCode = component.short_name;
                break;
        }
    }

    return { street1, street2, street3, cityLocality, stateProvince, postalCode, countryCode }
};

const Autocomplete = (props) => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const defaultValue = props.defaultValue;

    const options = {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "name"],
        types: []
    };

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );

        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            props.updateAddress(fillInAddress(place));
        });
    }, []);

    // TODO: this should be a generic input
    return (
        <Form.Control className="" defaultValue={defaultValue} ref={inputRef} />
    );
};
export default Autocomplete;
