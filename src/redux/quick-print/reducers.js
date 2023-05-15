import { QuickPrintActionTypes } from './constants';
import { OrderSpec } from '../types';

const INIT_STATE = {
    rates: [],
    loading: false,
    error: null,
    orderSpec: {
        fromAddress: {},
        toAddress: {},
        shipDate: null,
        warehouseId: null,
        service: null,
        priceType: null,
        carrierOptions: {},
        returnsIndicator: null,
        package: {}
    },
    purchasing: false,
    purchased: false,
    purchasedOrderId: null,
};

type QuickPrintAction = {
    type: string,
    payload: { actionType?: string, data?: any, error?: string },
};
type State = { rates?: [] | null, loading: Boolean, error?: null, orderSpec?: OrderSpec, purchasing: Boolean, purchased: Boolean, purchasedOrderId?: number };

const QuickPrint = (state: State = INIT_STATE, action: QuickPrintAction): any => {
    //console.log(action);
    switch (action.type) {
        case QuickPrintActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                //case QuickPrintActionTypes.GET_PRICE: {
                //    return {...state, prices: [...state.prices, action.payload.data] };
                //}
                case QuickPrintActionTypes.GET_RATES: {
                    return { ...state, rates: action.payload.data, loading: false };
                }
                // the create-label API call will create an order object
                case QuickPrintActionTypes.CREATE_LABEL: {
                    return { ...state, purchasing: false, purchased: true, purchasedOrderId: action.payload.data };
                }
                default:
                    return { ...state };
            }

        case QuickPrintActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                //case QuickPrintActionTypes.GET_PRICE: {
                //    return {
                //        ...state,
                //        // silently swallow the error, hoping that at least one price
                //        // request will be successful
                //        // error: action.payload.error
                //    };
                //}
                case QuickPrintActionTypes.GET_RATES: {
                    return { ...state, error: action.payload.data, loading: false };
                }
                case QuickPrintActionTypes.CREATE_LABEL: {
                    return { ...state, purchasing: false, purchased: false };
                }
                default:
                    return { ...state };
            }

        //case QuickPrintActionTypes.GET_ALL_PRICES_INIT:
        //    return { ...state, loading: true, prices: [] };
        //case QuickPrintActionTypes.GET_ALL_PRICES_SUCCESS:
        //    return { ...state, loading: false };
        //case QuickPrintActionTypes.GET_ALL_PRICES_ERROR:
        //    return { ...state, loading: false };
        case QuickPrintActionTypes.GET_RATES:
            return { ...state, loading: true, rates: [] };
        case QuickPrintActionTypes.UPDATE_ORDER_SPEC:
            return { ...state, orderSpec: { ...state.orderSpec, ...action.payload.data } };
        case QuickPrintActionTypes.CREATE_LABEL:
            return { ...state, purchasing: true };
        case QuickPrintActionTypes.RESET_STATE:
            return INIT_STATE;
        default:
            return { ...state };
    }
};

export default QuickPrint;
