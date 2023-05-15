import { OrdersActionTypes } from './constants';

const INIT_STATE = {
    loading: false,
    error: null,
    orders: null,
    creatingLabel: false,
    createdOrder: null,
};

type OrdersAction = {
    type: string,
    payload: { actionType?: string, data?: any, error?: string, creatingLabel: Boolean, createdOrder: any },
};
//TODO: define data type for orders
type State = { loading: Boolean, error?: null, orders: any };

const Orders = (state: State = INIT_STATE, action: OrdersAction): any => {
    //console.log(action);
    switch (action.type) {
        case OrdersActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case OrdersActionTypes.GET_ALL_ORDERS: {
                    return { ...state, loading: false, orders: action.payload.data };
                }
                case OrdersActionTypes.CREATE_LABEL_FOR_ORDER: {
                    return { ...state, creatingLabel: false, createdOrder: action.payload.data };
                }
                default:
                    return { ...state, loading: false };
            }

        //TODO: need error response for GET_ALL_ORDERS
        case OrdersActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case OrdersActionTypes.CREATE_LABEL_FOR_ORDER: {
                    return { ...state, creatingLabel: false };
                }
                default:
                    return { ...state, loading: false };
            }

        case OrdersActionTypes.GET_ALL_ORDERS:
            return { ...state, loading: true, orders: null }
        case OrdersActionTypes.CREATE_LABEL_FOR_ORDER:
            return { ...state, creatingLabel: true };
        case OrdersActionTypes.RESET_STATE:
            return INIT_STATE;
        default:
            return { ...state };
    }
};

export default Orders;
