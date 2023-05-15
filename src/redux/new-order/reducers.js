import { NewOrderActionTypes } from './constants';
import { OrderSpec } from '../types';

const INIT_STATE = {
    rates: [],
    loadingRates: false,
    error: null,
    orderSpec: {
        fromAddress: {},
        toAddress: {},
        shipDate: null,
        warehouseId: null,
        service: null,
        carrierOptions: {},
        returnsIndicator: null,
        package: {},
        items: []
    },
    creating: false,
    created: false,
    createdOrderId: null,
};

type NewOrderAction = {
    type: string,
    payload: { actionType?: string, data?: any, error?: string },
};
type State = { rates?: [] | null, loadingRates: Boolean, error?: null, orderSpec?: OrderSpec, creating: Boolean, created: Boolean, createdOrderId?: number };

const NewOrder = (state: State = INIT_STATE, action: NewOrderAction): any => {
    //console.log(action);
    switch (action.type) {
        case NewOrderActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case NewOrderActionTypes.GET_RATES: {
                    return { ...state, rates: action.payload.data, loadingRates: false };
                }
                case NewOrderActionTypes.CREATE_ORDER: {
                    return { ...state, creating: false, created: true, createdOrderId: action.payload.data };
                }
                default:
                    return { ...state };
            }

        case NewOrderActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case NewOrderActionTypes.GET_RATES: {
                    return { ...state, error: action.payload.data, loadingRates: false };
                }
                case NewOrderActionTypes.CREATE_ORDER: {
                    return { ...state, creating: false, created: false };
                }
                default:
                    return { ...state };
            }

        case NewOrderActionTypes.GET_RATES:
            return { ...state, loadingRates: true, rates: [] };
        case NewOrderActionTypes.UPDATE_ORDER_SPEC:
            return { ...state, orderSpec: { ...state.orderSpec, ...action.payload.data } };
        case NewOrderActionTypes.CREATE_ORDER:
            return { ...state, creating: true, created: false };
        case NewOrderActionTypes.RESET_STATE:
            const x = INIT_STATE;
            x.orderSpec.items = []; //TODO: why is this necessary?!
            return x;
        default:
            return { ...state };
    }
};

export default NewOrder;
