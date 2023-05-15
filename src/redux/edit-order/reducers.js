import { EditOrderActionTypes } from './constants';
import { OrderSpec } from '../types';

const INIT_STATE = {
    order: null,
    loadingOrder: false,
    updatingOrder: false,
    updatedOrder: false,
    rates: [],
    loadingRates: false,
    error: null
};

type EditOrderAction = {
    type: string,
    payload: { actionType?: string, data?: any, error?: string },
};
type State = { error?: null, order?: any, loadingOrder: Boolean, updatingOrder: Boolean, updatedOrder: Boolean, rates: [], loadingOrder: Boolean, error: null };

const EditOrder = (state: State = INIT_STATE, action: EditOrderAction): any => {
    //console.log(action);
    switch (action.type) {
        case EditOrderActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case EditOrderActionTypes.GET_ORDER: {
                    return { ...state, loadingOrder: false, order: action.payload.data };
                }
                case EditOrderActionTypes.UPDATE_ORDER: {
                    return { ...state, updatingOrder: false, updated: true, order: action.payload.data };
                }
                case EditOrderActionTypes.GET_RATES_FOR_ORDER: {
                    return { ...state, loadingRates: false, rates: action.payload.data };
                }
                default:
                    return { ...state };
            }

        case EditOrderActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case EditOrderActionTypes.GET_ORDER: {
                    return { ...state, loadingOrder: false };
                }
                case EditOrderActionTypes.UPDATE_ORDER: {
                    return { ...state, updatingOrder: false, updatedOrder: false };
                }
                case EditOrderActionTypes.GET_RATES_FOR_ORDER: {
                    return { ...state, loadingRates: false };
                }
                default:
                    return { ...state };
            }

        case EditOrderActionTypes.GET_ORDER:
            return { ...state, loadingOrder: true, order: null };
        case EditOrderActionTypes.UPDATE_ORDER_SPEC:
            return { ...state, order: { ...state.order, ...action.payload.data } };
        case EditOrderActionTypes.UPDATE_ORDER:
            return { ...state, updatingOrder: true };
        case EditOrderActionTypes.GET_RATES_FOR_ORDER:
            return { ...state, loadingRates: true, rates: [] };
        case EditOrderActionTypes.RESET_STATE:
            return INIT_STATE;
        default:
            return { ...state };
    }
};

export default EditOrder;
