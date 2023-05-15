import { NewCsvIntegrationBatchActionTypes } from './constants';

const INIT_STATE = {
    loading: false,
    error: null,
    uploaded: false
};

type NewCsvIntegrationBatchAction = {
    type: string,
    payload: { actionType?: string, data?: any, error?: string },
};
//TODO: define data type for NewCsvIntegrationBatch
type State = { loading: Boolean, error?: null, uploaded: Boolean };

const NewCsvIntegrationBatch = (state: State = INIT_STATE, action: NewCsvIntegrationBatchAction): any => {
    //console.log(action);
    switch (action.type) {
        case NewCsvIntegrationBatchActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case NewCsvIntegrationBatchActionTypes.CREATE_CSV_INTEGRATION_BATCH:
                    return { ...state, loading: false, uploaded: true }; //TODO: should the API return anything for success?
                default:
                    return { ...state, loading: false, uploaded: false };
            }

        case NewCsvIntegrationBatchActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                default:
                    return { ...state, loading: false, uploaded: false };
            }

        case NewCsvIntegrationBatchActionTypes.CREATE_CSV_INTEGRATION_BATCH:
            return { ...state, loading: true }
        default:
            return { ...state };
    }
};

export default NewCsvIntegrationBatch;
