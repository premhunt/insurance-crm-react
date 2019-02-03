import {
    DASHBOARD_LOAD_POLICIES_RECEIVED,
    DASHBOARD_LOAD_POLICIES_REQUEST,
    DASHBOARD_LOAD_POLICY_ITEM_RECEIVED,
    DASHBOARD_LOAD_POLICY_ITEM_REQUEST,
    DASHBOARD_SELECT_POLICY
} from "./constants";
import {requests} from "../agent";
import {uriId} from "../apiUtils";



export const dashboardLoadPolicyItemRequest = () => {
    return {
        type: DASHBOARD_LOAD_POLICY_ITEM_REQUEST
    }
};

export const dashboardLoadPolicyItemReceived = (data) => {
        console.log('item',data)
    return {
        type: DASHBOARD_LOAD_POLICY_ITEM_RECEIVED,
        data
    }
};

export const dashboardLoadPolicyItem = (id) => {

    return (dispatch) => {
        dispatch(dashboardLoadPolicyItemRequest(id));
        return requests.get(`/policies/${id}`,true).then(
            response => dispatch(dashboardLoadPolicyItemReceived(response))
        ).catch(error => console.log(error));
    }
};



export const dashboardPoliciesRequest = () => {
    return {
        type: DASHBOARD_LOAD_POLICIES_REQUEST
    }
};

export const dashboardPoliciesReceived = (data) => {

    return {
        type: DASHBOARD_LOAD_POLICIES_RECEIVED,
        data
    }
}

export const dashboardLoadPolicies = () => {

    return (dispatch) => {
        dispatch(dashboardPoliciesRequest());
        return requests.get('/policies',true).then(
            response => dispatch(dashboardPoliciesReceived(response))
        ).catch(error => console.log(error));
    }
};

export const dashboardSelectPolicy = (policy) => (dispatch) => {
   dispatch(dashboardPutPolicyAsSelected(policy));
   dispatch(dashboardLoadPolicyItem(uriId(policy)));
};


export const dashboardPutPolicyAsSelected = (policy) => {
    return {
        type: DASHBOARD_SELECT_POLICY,
        policy
    }
}