import { LabelActionTypes } from './constants';

const INIT_STATE = {
    loadingOrder: false,
    loadingRates: false,
    creatingLabel: false,
    error: null,
    order: null,
    rates: null
};

type LabelAction = {
    type: string,
    payload: { actionType?: string, data?: any, error?: string },
};
//TODO: define data type for order
type State = { loadingOrder: Boolean, loadingRates: Boolean, creatingLabel: Boolean, error?: null, order: any, rates: [] };

const Label = (state: State = INIT_STATE, action: LabelAction): any => {
    //console.log(action);
    switch (action.type) {
        case LabelActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case LabelActionTypes.GET_ORDER: {
                    return { ...state, loadingOrder: false, order: action.payload.data };
                }
                case LabelActionTypes.GET_RATES_FOR_ORDER: {
                    return { ...state, loadingRates: false, rates: action.payload.data };
                }
                case LabelActionTypes.CREATE_LABEL_FOR_ORDER: {
                    return { ...state, creatingLabel: false, order: action.payload.data };
                }
                case LabelActionTypes.UPDATE_ORDER_AND_CREATE_LABEL: {
                    return { ...state, creatingLabel: false, order: action.payload.data };
                }
                default:
                    return { ...state };
            }

        case LabelActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case LabelActionTypes.GET_ORDER: {
                    return { ...state, loadingOrder: false };
                }
                case LabelActionTypes.GET_RATES_FOR_ORDER: {
                    return { ...state, loadingRates: false };
                }
                case LabelActionTypes.CREATE_LABEL_FOR_ORDER: {
                    return { ...state, creatingLabel: false };
                }
                case LabelActionTypes.UPDATE_ORDER_AND_CREATE_LABEL: {
                    return { ...state, creatingLabel: false };
                }
                default:
                    return { ...state };
            }

        case LabelActionTypes.GET_ORDER:
            return { ...state, loadingOrder: true, order: null };
        case LabelActionTypes.GET_RATES_FOR_ORDER:
            return { ...state, loadingRates: true, rates: [] };
        case LabelActionTypes.CREATE_LABEL_FOR_ORDER:
            return { ...state, creatingLabel: true }; // let order be the existing one
        case LabelActionTypes.UPDATE_ORDER_AND_CREATE_LABEL:
            return { ...state, creatingLabel: true }; // let order be the existing one
        default:
            return { ...state };
    }
};

export default Label;
