import React, {useReducer, createContext, useContext} from 'react';
import {API_REQUEST, USER_INFOS, USER_REPOS_LIST, REPO_DETAILS, ERROR} from "./actions";

const StoreContext = createContext();

const baseUrl = 'https://api.github.com/users/';

const initialState = {
    userInfos: {},
    userReposList: [],
    repoDetails: {},
    loading: false,
    error: false,
}
const reducer = (state, action) => {
    switch (action.type) {
        case API_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_INFOS:
            return {
                ...state,
                loading: false,
                userInfos: action.payload
            }
        case USER_REPOS_LIST:
            return {
                ...state,
                loading: false,
                userReposList: action.payload
            }
        case REPO_DETAILS:
            return {
                ...state,
                loading: false,
                repoDetails: action.payload
            }
        case ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        default:
            return state;
    }
}
export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}
export const useStore = () => useContext(StoreContext);
