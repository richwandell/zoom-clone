import * as React from "react";
import {appInitialState, appReducer} from "../../reducers/AppReducer";
import {useReducer} from "react";

export const AppContext = React.createContext(appInitialState);

export function AppContextProvider(props) {
    const [state, dispatch] = useReducer(appReducer, appInitialState);

    return (
        <AppContext.Provider value={{state, dispatch}} >
            {props.children}
        </AppContext.Provider>
    )
}