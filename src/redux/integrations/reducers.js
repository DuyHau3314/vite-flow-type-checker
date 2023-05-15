import { IntegrationsActionTypes } from './constants';

const INIT_STATE = {
    loading: false,
    error: null,
    integrations: null
};

type IntegrationsAction = {
    type: string,
    payload: { actionType?: string, data?: any, error?: string },
};
//TODO: define data type for integrations
type State = { loading: Boolean, error?: null, integrations: any };

const Integrations = (state: State = INIT_STATE, action: IntegrationsAction): any => {
    //console.log(action);
    switch (action.type) {
        case IntegrationsActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case IntegrationsActionTypes.GET_ALL_INTEGRATIONS: {
                    return { ...state, loading: false, integrations: action.payload.data };
                }
                default:
                    return { ...state, loading: false };
            }

        case IntegrationsActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                default:
                    return { ...state, loading: false };
            }

        case IntegrationsActionTypes.GET_ALL_INTEGRATIONS:
            return { ...state, loading: true, integrations: null }
        default:
            return { ...state };
    }
};

export default Integrations;
